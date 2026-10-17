# Beyond the Label: site

A static site made of plain HTML, CSS, and JavaScript. There is no build step, no server, and no tracking. Nothing a visitor enters leaves their browser.

## Run it
- **Offline (showcase table):** double-click `index.html`. Test this once on the showcase laptop before the day.
- **Local server:** `python3 -m http.server 8765` in this folder, then open http://127.0.0.1:8765/
- **Publish:** upload this folder to any static host (GitHub Pages, Netlify, Cloudflare Pages).

## Showcase table
- `#/showcase`: a 4-step, about 3-minute walk through one case, in large type, with a "Start over for the next visitor" button. Answers are kept in memory only. Choose the case with `SHOWCASE_CASE` in `js/app.js`.
- `#/handout`: a one-page printable handout. Add the QR code and site address once the site is published.

## Where the words live
| File | What to edit |
|---|---|
| `js/cases/caseN.js` | One file per case. Case 1 is the fullest example of every field. A case with `ready: false` shows as "In development". |
| `js/sources.js` | The Sources page. Cite a source inside case text with `[[source-id]]`. |
| `js/app.js` | Page copy for Home, How it works, Why this happens, About, Take a break, and the Final screen. Each is a `render…` function. |
| `css/styles.css` | Design tokens are at the top. |

## Before launch checklist
- [ ] Every source marked `status: "verify"` has been checked against the original. Then change it to `"checked"`.
- [ ] The hotline and 988 numbers are confirmed on their official sites. Then remove the "verify before launch" tags in `app.js`.
- [ ] NC State counseling and Women's Center details are added (`resourcesHTML` in `app.js`).
- [ ] The About page has the creator's name and "Why I made this", in the creator's own words.
- [ ] Opening `index.html` directly works on the showcase laptop, including with Wi-Fi off.
