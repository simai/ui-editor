# SIMAI Editor

The component set `editor` of SIMAI Framework (`package/`: `sf-editor`) and
the reference page editor screen built on it. Read `README.md`,
`package/README.md` and `docs/STATUS.md` first.

- The set's components are written only in `package/` (standard
  `simai.component-set` 1.0.0, the passport `package/set.json`), never in
  `simai/ui-pro` or `simai/ui-source` from here. A missing Framework part (a
  token, a utility, a core API, a Loader change, the registry entry) is
  ordered from the SIMAI Framework dispatcher (work
  `task-fcda784dfeba45c1bf64`) through the Federation bus.
- Every component entering the set passes the framework-first review: what
  another set or product could use is ordered from SIMAI Framework first.
- Outside `package/` the editor screen is an assembly: it writes no
  components, only wires released Framework parts and the set.
- Pin exact Framework releases (`ui-<12>`, the ui-source revision of its
  release lock) and exact packages; never `latest` or `main`.
- English in code, commits and docs; interface text RU/EN through
  dictionaries.
- No secrets, `.env`, real customer content or local paths in the repository.
- Nothing is published (npm, release, tag, opening the repository) without
  the dispatcher's release route and the owner's yes.
- The prototypes are behaviour references only.
