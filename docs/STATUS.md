# Status

## Owner decisions

| Date | Decision |
|:---|:---|
| 2026-10-31 | The block toolbar sits above the block (prototype `block-canvas.html`) |
| 2026-10-31 | One core, two modes: layout and content |
| 2026-10-31 | JSON is the main store of content, with HTML support and conversion; content builds on the Framework's layout standard |
| 2026-10-31 | The editor also edits Docara's blocks, and saves Markdown in Docara's syntax for documentation |
| 2026-10-31 | Everything runs on Framework components; universal parts go to the free Framework, editor parts to Pro |
| 2026-10-31 | The plan below; this repository; one shared PHP renderer for Docara and Larena |

The full reasoning, the Framework and Docara threads' answers and the open
points are kept in the dispatcher's control plane:
`control/ui-mail/CONTENT-STANDARD-PROPOSAL.md` (section 9) and
`control/ui-mail/BLOCK-CANVAS-SPEC.md` in `simai/ui-control`.

## Plan

| Step | Owner | What it delivers | Done when |
|:---|:---|:---|:---|
| 1 | Framework | Selection, toolbar and insert in `sf-composition-overlay`, letters patched block by block | probes show no reload and no jump; existing callers unchanged |
| 2 | Framework | Inline model keeps unknown nodes (the `toSegments` fix), an inline component atom | an edit next to an unknown node keeps it |
| 3 | Framework | Content types of the first edition and missing display parts (card, figure, vertical numbered list) | each type renders, validates and edits |
| 4 | Framework, then a new package | A conformance kit (Document to HTML), then one PHP renderer shared by Docara and Larena | the PHP renderer passes the kit; package name and place agreed with the owner |
| 5 | ui-pro and this repository | `sf-content-editor` and the block picker in ui-pro, proved here on real pages | both modes work together on a page here |
| 6 | Docara | A source-preserving Markdown adapter | Docara's own test: a real page saves byte for byte, one edit changes one range |
| 7 | Larena | Larena's storage | agreed with the Larena thread |

This repository starts with the shell (panels that resize and close, the page
list, the two modes switching) over pinned Framework and Pro releases, and takes
each part as it is released.
