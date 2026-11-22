# Beyond the Label: site

A static site made of plain HTML, CSS, and JavaScript. There is no build step, no server, and no tracking. Nothing a visitor enters leaves their browser.

## Run it
- **Offline (showcase table):** double-click `index.html`. Test this once on the showcase laptop before the day.
- **Local server:** `python3 -m http.server 8765` in this folder, then open http://127.0.0.1:8765/
- **Publish:** upload this folder to any static host (GitHub Pages, Netlify, Cloudflare Pages).

## Showcase table
- `#/showcase`: a 4-step, about 3-minute walk through one case, in large type, with a "Start over for the next visitor" button. Showcase answers are kept in memory only, and "Start over" also clears any progress a visitor saved in the full cases on that laptop (the theme choice is kept). Choose the case with `SHOWCASE_CASE` in `js/app.js`.
- `#/handout`: a one-page printable handout. Add the QR code and site address once the site is published.

## Where the words live
| File | What to edit |
|---|---|
| `js/cases/caseN.js` | One file per case. Case 1 is the fullest example of every field. A case with `ready: false` shows as "In development". |
| `js/sources.js` | The Sources page. Cite a source inside case text with `[[source-id]]`. |
| `js/app.js` | Page copy for Home, How it works, Why this happens, About, Take a break, and the Final screen. Each is a `render…` function. |
| `css/styles.css` | Design tokens are at the top. |

## After any content edit
- Run `node tools/validate-cases.js` and `node tools/smoke-test.js` from the repo root. The first checks fields and citation ids (not whether a source is accurate); the second renders every page and stage and fails on raw `[[id]]`, `undefined`, or `NaN`. Publishing runs both.
- In a browser, check that **Skip to content** and the **because** link in Case 1's Logic stage stay on the current page, and that browser Back still works.

## Before launch checklist

**Author tasks**
- [ ] Verify each source marked `status: "verify"` against the original (the case mechanisms and legal context first), then change it to `"checked"`. A source that doesn't support its sentence gets rewritten or removed, not just relabeled.
- [ ] Add NC State counseling and Women's Center details (`resourcesHTML` in `app.js`), from official NC State pages.
- [ ] Rehearse the showcase path with a timer and one classmate, and print the handout once on the real printer.
- [ ] Print the handout and scan its QR code with a phone to confirm it opens the live site.
- [ ] Remaining source checks: Aristotle edition; Wertheimer 1987 vs 1988 (copyright page); Mohanty and Davis titles against her anthology copy; ebook page ranges; DOIs for books (optional); web-page titles after (n.d.).
- [ ] Open `index.html` directly on the showcase laptop with Wi-Fi off.

**Done**
- [x] Creator’s name, “Why I made this,” “Who it’s for,” and a call to action on the About page, in her own words (Nov. 20, 2026).
- [x] Course readings checked against the ebook (page ranges from its print-page markers).
- [x] Hotline, NDVH, and 988 numbers confirmed on their official sites (Oct. 17, 2026). Re-check close to the showcase.
- [x] Vacatur placeholder replaced with Polaris's Criminal Records Relief page (checked Oct. 17, 2026).
- [x] Survivor-led organization links (NSN, GEMS) checked and linked from the Sources page. NSWP is still `verify`: its site didn't respond.
