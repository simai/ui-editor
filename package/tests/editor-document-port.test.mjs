// sf-editor's side of simai.document-port 1.0.2 (src/smart/editor/js/document-port.mjs):
// load, autosave against the revision, the client_key of a repeat, the
// conflict choice and the answers that keep the unsaved input. A host in
// memory answers as the port's kit describes; timers are driven by hand.
import assert from "node:assert/strict";
import test from "node:test";
import {DOCUMENT_PORT, DocumentSession, capabilitiesOf, isDocumentPort, portId} from "../src/smart/editor/js/document-port.mjs";

const doc = (text, locale = "ru") => ({schema: "simai.composition.document", schema_version: 1, locale, root: {id: "root", type: "layout.page", data: {text}}});

function memoryHost({rights = {save: true, publish: false}, languages = ["ru", "en"]} = {}) {
    const store = {revision: "1", values: {ru: doc("один")}, keys: new Map()};
    const sent = [];
    const host = {
        id: DOCUMENT_PORT,
        capabilities: ["history"],
        sent,
        store,
        mode: null,
        async send(intent, payload) {
            sent.push({intent, payload: structuredClone(payload)});
            if (host.mode === "throw") throw new Error("network");
            if (host.mode === "unavailable") return {answer: "unavailable", reason: "storage-unavailable", retry_after: 2};
            if (host.mode === "expired") return {answer: "refused", reason: "session-expired"};
            if (intent === "document.load") {
                return {answer: "applied", data: {target: {level: "page", ref: "page:1"}, revision: store.revision, languages, values: structuredClone(store.values), rights, limits: {max_nodes: 200, max_bytes: 262144}}};
            }
            if (intent === "document.save") {
                const seen = store.keys.get(payload.client_key);
                if (seen) return seen.input === JSON.stringify(payload) ? seen.answer : {answer: "conflict", reason: "idempotency-conflict", current_revision: store.revision, current: {revision: store.revision, values: structuredClone(store.values)}};
                if (payload.expected_revision !== store.revision) return {answer: "conflict", reason: "stale-revision", current_revision: store.revision, current: {revision: store.revision, languages, values: structuredClone(store.values)}};
                for (const [language, value] of Object.entries(payload.values)) {
                    if (value === null) delete store.values[language];
                    else store.values[language] = structuredClone(value);
                }
                store.revision = String(Number(store.revision) + 1);
                const answer = {answer: "applied", data: {revision: store.revision, values: structuredClone(payload.values)}};
                store.keys.set(payload.client_key, {input: JSON.stringify(payload), answer});
                return answer;
            }
            return {answer: "refused", reason: "unknown-intent"};
        },
    };
    return host;
}

function clock() {
    let id = 0;
    const due = new Map();
    return {
        setTimeout(fn, ms) { id += 1; due.set(id, {fn, ms}); return id; },
        clearTimeout(handle) { due.delete(handle); },
        async run() {
            const all = [...due.entries()];
            due.clear();
            for (const [, {fn}] of all) await fn();
            await new Promise((resolve) => setImmediate(resolve));
        },
        get waiting() { return [...due.values()].map(({ms}) => ms); },
    };
}

let keys = 0;
const key = () => `key-${(keys += 1)}`;

test("the port is told by its id and its send, as connect-port reads it", () => {
    assert.equal(portId({id: DOCUMENT_PORT}), DOCUMENT_PORT);
    assert.equal(portId({port: DOCUMENT_PORT}), DOCUMENT_PORT);
    assert.equal(isDocumentPort({id: DOCUMENT_PORT, send() {}}), true);
    assert.equal(isDocumentPort({id: DOCUMENT_PORT}), false);
    assert.equal(isDocumentPort({sources() {}, fields() {}, preview() {}}), false);
    assert.deepEqual([...capabilitiesOf({capabilities: ["history", "publish"]})], ["history", "publish"]);
    assert.deepEqual([...capabilitiesOf({capabilities: {history: {}, publish: null}})], ["history"]);
});

test("load keeps the element; an edit is saved after the delay against the loaded revision", async () => {
    const host = memoryHost();
    const timers = clock();
    const session = new DocumentSession(host, {timers, key});
    await session.load();
    assert.equal(session.state, "ready");
    assert.equal(session.revision, "1");
    assert.deepEqual(session.valueOf("ru"), doc("один"));
    assert.equal(session.valueOf("en"), null, "a language without a value is absent, never filled from another");
    session.edit("ru", doc("два"));
    assert.equal(session.state, "pending");
    await timers.run();
    const save = host.sent.at(-1);
    assert.equal(save.intent, "document.save");
    assert.deepEqual(save.payload.values, {ru: doc("два")}, "only the edited language is written");
    assert.equal(save.payload.expected_revision, "1");
    assert.ok(save.payload.client_key);
    assert.equal(session.state, "ready");
    assert.equal(session.revision, "2");
    assert.deepEqual(host.store.values.ru, doc("два"));
});

test("a stale revision is a conflict: nothing repeats on its own, the input is kept, and the person chooses", async () => {
    const host = memoryHost();
    const timers = clock();
    const session = new DocumentSession(host, {timers, key});
    await session.load();
    host.store.values.ru = doc("чужое");
    host.store.revision = "5";
    session.edit("ru", doc("моё"));
    await timers.run();
    assert.equal(session.state, "conflict");
    assert.equal(session.conflict.reason, "stale-revision");
    assert.equal(session.conflict.revision, "5");
    assert.deepEqual(session.conflict.current.values.ru, doc("чужое"), "the stored version to show beside the unsaved one");
    assert.deepEqual(session.pending, {ru: doc("моё")});
    const before = host.sent.length;
    session.edit("ru", doc("моё ещё"));
    await timers.run();
    assert.equal(host.sent.length, before, "a conflict is never repeated unchanged");
    await session.keepMine();
    assert.equal(host.sent.at(-1).payload.expected_revision, "5");
    assert.deepEqual(host.store.values.ru, doc("моё ещё"));
    assert.equal(session.state, "ready");
});

test("take theirs lets the unsaved input go and gives the stored version", async () => {
    const host = memoryHost();
    const timers = clock();
    const session = new DocumentSession(host, {timers, key});
    await session.load();
    host.store.values.ru = doc("чужое");
    host.store.revision = "7";
    let taken = 0;
    session.subscribe(({type}) => { if (type === "taken") taken += 1; });
    session.edit("ru", doc("моё"));
    await timers.run();
    assert.equal(session.takeTheirs(), true);
    assert.equal(taken, 1);
    assert.equal(session.pending, null);
    assert.equal(session.revision, "7");
    assert.deepEqual(session.valueOf("ru"), doc("чужое"));
    assert.equal(session.state, "ready");
});

test("unavailable repeats the same write with the same client_key after retry_after", async () => {
    const host = memoryHost();
    const timers = clock();
    const session = new DocumentSession(host, {timers, key});
    await session.load();
    host.mode = "unavailable";
    session.edit("ru", doc("два"));
    await timers.run();
    assert.equal(session.state, "unavailable");
    assert.deepEqual(timers.waiting, [2000], "retry_after is seconds");
    const first = host.sent.at(-1).payload;
    host.mode = null;
    await timers.run();
    const second = host.sent.at(-1).payload;
    assert.equal(second.client_key, first.client_key, "a repeat is the same operation");
    assert.deepEqual(second, first);
    assert.equal(session.state, "ready");
});

test("a send that throws is read as unavailable, never as an error of the editor", async () => {
    const host = memoryHost();
    const timers = clock();
    const session = new DocumentSession(host, {timers, key});
    await session.load();
    host.mode = "throw";
    session.edit("ru", doc("два"));
    await timers.run();
    assert.equal(session.state, "unavailable");
    assert.equal(session.reason, "storage-unavailable");
    assert.deepEqual(session.pending, {ru: doc("два")});
});

test("session-expired keeps the input and waits for retry after sign-in", async () => {
    const host = memoryHost();
    const timers = clock();
    const session = new DocumentSession(host, {timers, key});
    await session.load();
    host.mode = "expired";
    session.edit("ru", doc("два"));
    await timers.run();
    assert.equal(session.state, "refused");
    assert.equal(session.reason, "session-expired");
    session.edit("ru", doc("три"));
    assert.deepEqual(timers.waiting, [], "no write until the person signs in");
    host.mode = null;
    await session.retry();
    assert.deepEqual(host.store.values.ru, doc("три"));
    assert.equal(session.state, "ready");
});

test("rights: no save, or a language outside rights.languages, takes no edit", async () => {
    const host = memoryHost({rights: {save: true, languages: ["ru"]}});
    const session = new DocumentSession(host, {timers: clock(), key});
    await session.load();
    assert.equal(session.canWrite("ru"), true);
    assert.equal(session.canWrite("en"), false);
    assert.equal(session.edit("en", doc("two", "en")), false);
    const reader = new DocumentSession(memoryHost({rights: {save: false}}), {timers: clock(), key});
    await reader.load();
    assert.equal(reader.canWrite("ru"), false);
    assert.equal(reader.edit("ru", doc("x")), false);
});

test("an edit while a save is on its way is saved after it, against the new revision", async () => {
    const host = memoryHost();
    const timers = clock();
    const session = new DocumentSession(host, {timers, key});
    await session.load();
    session.edit("ru", doc("два"));
    const flight = session.save();
    session.edit("ru", doc("три"));
    await flight;
    await timers.run();
    assert.deepEqual(host.sent.filter(({intent}) => intent === "document.save").map(({payload}) => payload.expected_revision), ["1", "2"]);
    assert.deepEqual(host.store.values.ru, doc("три"));
    assert.equal(session.state, "ready");
});

test("a load that is not applied leaves the session failed with the port's reason", async () => {
    const session = new DocumentSession({id: DOCUMENT_PORT, send: async () => ({answer: "refused", reason: "access-denied"})}, {timers: clock(), key});
    await session.load();
    assert.equal(session.state, "failed");
    assert.equal(session.reason, "access-denied");
    assert.equal(session.edit("ru", doc("x")), false);
});
