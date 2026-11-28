// The editor's side of simai.document-port (SIMAI Framework, editions 1.0.0-1.0.3, contract file 1.0.2):
// one storage element, a value per language and one revision for all. The
// host hands a port {id: "simai.document-port", capabilities, send(intent,
// payload) -> Promise<answer>}; this session asks it to load, then saves the
// language being edited as drafts against the revision it was given, and
// keeps the unsaved input through every answer that is not applied.
//
// Answers are taken as the port gives them: applied | conflict | refused |
// unavailable with the port's reasons. A send that throws or rejects is read
// as unavailable / storage-unavailable. A conflict is never repeated
// unchanged: the person keeps their version (a new save against the stored
// revision) or takes the stored one. An unavailable save is repeated with the
// same input and the same client_key, after retry_after when the host gave
// it; session-expired waits for retry() after sign-in.

export const DOCUMENT_PORT = "simai.document-port";

const ANSWERS = new Set(["applied", "conflict", "refused", "unavailable"]);

/** The port's id, read the way the Framework's connect-port reads it (id, else port). */
export function portId(port) {
    if (!port || typeof port !== "object") return "";
    if (typeof port.id === "string" && port.id) return port.id;
    if (typeof port.port === "string" && port.port) return port.port;
    return "";
}

/** A document port: named simai.document-port and able to send. */
export function isDocumentPort(port) {
    return portId(port) === DOCUMENT_PORT && typeof port.send === "function";
}

/** The capabilities a port announces, as a set of names (a list or an object of names). */
export function capabilitiesOf(port) {
    const given = port?.capabilities;
    if (Array.isArray(given)) return new Set(given.filter((name) => typeof name === "string"));
    if (given && typeof given === "object") return new Set(Object.keys(given).filter((name) => given[name]));
    return new Set();
}

function randomKey() {
    const crypto = globalThis.crypto;
    if (crypto?.randomUUID) return crypto.randomUUID();
    return `k-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** One answer object, whatever the port gave: an unknown shape is a port failure. */
function normalize(answer) {
    if (answer && typeof answer === "object" && ANSWERS.has(answer.answer)) return answer;
    return {answer: "unavailable", reason: "storage-unavailable", message: "The port gave no answer object."};
}

/**
 * The session of one storage element.
 *
 * state: idle (nothing loaded) | loading | ready (saved, nothing pending) |
 * pending (an edit waits for its save) | saving | conflict | refused |
 * unavailable | failed (the load was not applied).
 * Listeners get {type: "state" | "loaded" | "taken"} after each step.
 */
export class DocumentSession {
    constructor(port, {delay = 800, key = randomKey, timers = globalThis} = {}) {
        this.port = port;
        this.delay = delay;
        this.key = key;
        this.timers = timers;
        this.capabilities = capabilitiesOf(port);
        this.listeners = new Set();
        this.state = "idle";
        this.reason = "";
        this.element = null;
        this.pending = null;
        this.flight = null;
        this.conflict = null;
        this.timer = null;
        this.closed = false;
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    emit(type) {
        for (const listener of this.listeners) listener({type, session: this});
    }

    set(state, reason = "") {
        this.state = state;
        this.reason = reason;
        this.emit("state");
    }

    async send(intent, payload) {
        try {
            return normalize(await this.port.send(intent, payload));
        } catch (error) {
            return {answer: "unavailable", reason: "storage-unavailable", message: String(error?.message ?? error)};
        }
    }

    get revision() {
        return this.element?.revision ?? null;
    }

    get languages() {
        return Array.isArray(this.element?.languages) ? this.element.languages : [];
    }

    get rights() {
        return this.element?.rights ?? {};
    }

    /** Whether the reader may write this language. */
    canWrite(language) {
        const rights = this.rights;
        if (rights.save !== true) return false;
        if (Array.isArray(rights.languages) && !rights.languages.includes(language)) return false;
        return true;
    }

    /** The stored value of a language, or null when it has none. */
    valueOf(language) {
        const values = this.element?.values;
        return values && Object.prototype.hasOwnProperty.call(values, language) ? values[language] : null;
    }

    async load() {
        this.set("loading");
        const answer = await this.send("document.load", {});
        if (this.closed) return answer;
        if (answer.answer !== "applied") {
            this.set("failed", answer.reason ?? "");
            return answer;
        }
        this.element = answer.data ?? {};
        this.pending = null;
        this.conflict = null;
        this.emit("loaded");
        this.set("ready");
        return answer;
    }

    /** An edit of one language: kept as pending and saved after the delay. */
    edit(language, value) {
        if (this.closed || !this.element) return false;
        if (!this.canWrite(language)) return false;
        this.pending = {...(this.pending ?? {}), [language]: value};
        // New input is a new write: a key belongs to one input.
        this.pendingKey = null;
        if (this.state === "conflict" || this.state === "refused" && this.reason === "session-expired") {
            this.emit("state");
            return true;
        }
        this.set("pending");
        this.schedule(this.delay);
        return true;
    }

    schedule(ms) {
        if (this.timer) this.timers.clearTimeout(this.timer);
        this.timer = this.timers.setTimeout(() => {
            this.timer = null;
            this.save();
        }, Math.max(0, ms));
    }

    /** Saves what is pending now, if nothing is on its way; another edit meanwhile waits for the answer. */
    async save() {
        if (this.closed || !this.pending || this.flight || this.state === "conflict") return null;
        const values = this.pending;
        this.pendingKey = this.pendingKey ?? this.key();
        const payload = {values, expected_revision: this.revision, client_key: this.pendingKey};
        this.set("saving");
        this.flight = payload;
        const answer = await this.send("document.save", payload);
        this.flight = null;
        if (this.closed) return answer;
        const changedMeanwhile = this.pending !== values;
        if (answer.answer === "applied") {
            const data = answer.data ?? {};
            const stored = data.values && typeof data.values === "object" ? data.values : values;
            const next = {...(this.element?.values ?? {})};
            for (const [language, value] of Object.entries(stored)) {
                if (value === null) delete next[language];
                else next[language] = value;
            }
            this.element = {...this.element, revision: data.revision ?? this.revision, values: next};
            if (changedMeanwhile) {
                // Only what came after this save is still unsaved.
                const rest = {};
                for (const [language, value] of Object.entries(this.pending)) if (values[language] !== value) rest[language] = value;
                this.pending = Object.keys(rest).length ? rest : null;
                this.pendingKey = null;
            } else {
                this.pending = null;
                this.pendingKey = null;
            }
            if (this.pending) {
                this.set("pending");
                this.schedule(0);
            } else {
                this.set("ready");
            }
            return answer;
        }
        if (answer.answer === "conflict") {
            this.conflict = {reason: answer.reason ?? "stale-revision", revision: answer.current_revision ?? answer.current?.revision ?? null, current: answer.current ?? null};
            this.pendingKey = null;
            this.set("conflict", this.conflict.reason);
            return answer;
        }
        if (answer.answer === "unavailable") {
            if (changedMeanwhile) this.pendingKey = null;
            this.set("unavailable", answer.reason ?? "storage-unavailable");
            const after = Number(answer.retry_after);
            this.schedule(Number.isFinite(after) && after > 0 ? after * 1000 : Math.max(this.delay * 4, 3000));
            return answer;
        }
        // refused: nothing written. session-expired waits for retry(); any
        // other refusal waits for a new edit or retry().
        this.pendingKey = null;
        this.refusal = answer;
        this.set("refused", answer.reason ?? "");
        return answer;
    }

    /** Repeats the pending save now (after sign-in, or a refusal the person dealt with). */
    retry() {
        if (!this.pending || this.state === "conflict") return null;
        if (this.timer) {
            this.timers.clearTimeout(this.timer);
            this.timer = null;
        }
        this.set("pending");
        return this.save();
    }

    /** Conflict: keep the person's version, written against the stored revision. */
    keepMine() {
        if (this.state !== "conflict" || !this.conflict) return null;
        const current = this.conflict.current;
        this.element = {...this.element, ...(current ?? {}), revision: this.conflict.revision ?? current?.revision ?? this.revision};
        this.conflict = null;
        this.pendingKey = null;
        this.set("pending");
        return this.save();
    }

    /** Conflict: take the stored version; the unsaved input is let go. */
    takeTheirs() {
        if (this.state !== "conflict" || !this.conflict) return false;
        const current = this.conflict.current;
        this.element = {...this.element, ...(current ?? {}), revision: this.conflict.revision ?? current?.revision ?? this.revision};
        this.conflict = null;
        this.pending = null;
        this.pendingKey = null;
        this.emit("taken");
        this.set("ready");
        return true;
    }

    close() {
        this.closed = true;
        if (this.timer) this.timers.clearTimeout(this.timer);
        this.timer = null;
        this.listeners.clear();
    }
}
