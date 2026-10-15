# Paracelsus client schedule — context for Claude Code

## What this is
Static replacement for the WordPress client calendar pages (`paracelsus-recovery.com/event/<client>-calendar`, built by the Fooz agency), to be served at **https://cal.paracelsus-recovery.com** from GitHub Pages. Owner: Francesco Andreoli (andreolf). DNS will be set by David Bachmann (dacide.com).

## Why (14 Oct 2026)
- Jan Gerber (CEO) email "URGENT! Online schedule issues": the WordPress pages don't feed through from Google Calendar, or only with massive delays; clients unhappy. WordPress is being retired.
- David's voice note: build it standalone with Claude Code, host on andreolf's GitHub, he points `cal.` at it.
- Hard requirement (Jan, Feb 2026): appointment **notes** from the Google Calendar event description (menu plans, lab-prep instructions, "what's for lunch") must be visible — expand/collapse per event. Clients must only ever receive the link, never direct calendar access.

## How it works
- `index.html` — whole app, no build step. Reads `?c=<calendarId>&n=<first name>` (or `#c=`), calls Google Calendar API v3 directly with the API key from `config.js`, renders a day strip (7 back / 21 ahead) and the selected day's events with expandable sanitized notes. Auto-refresh 60 s + on focus. `?demo` = sample data.
- `config.js` — `apiKey` (empty until created), timezone Europe/Zurich, ranges.
- `CNAME` — `cal.paracelsus-recovery.com`. `.nojekyll` present.
- Requires each client calendar to be shared **publicly** ("see all event details"). Francesco believes they already are — verify with one real calendar ID before rollout. If they are not public, fallback plan: Google Apps Script web app (runs as clinic account, returns JSON) or a GitHub Action polling private ICS URLs into `data/*.json`; `load()` in index.html is the only place to change.
- No client data in the repo on purpose (repo may be public; Pages from a private repo needs GitHub Pro).

## Brand
Pale01 `#FAF6EE` bg, Pale02 `#F3EDDA`, Yellow01 `#FFE9C0` (notes box / open chevron), Yellow03 `#FFD48B`, Green02 `#576A28` ("now" + live dot), Ink `#181918`. Display: Reckless Neue → Source Serif 4 fallback; body: TWK Lausanne → Inter fallback. Pill buttons.

## Remaining steps
1. `gh repo create andreolf/paracelsus-calendar --public --source=. --push` then enable Pages: Settings → Pages → Deploy from branch `main` / root (or `gh api -X POST repos/andreolf/paracelsus-calendar/pages -f source[branch]=main -f source[path]=/`).
2. Google Cloud: enable Calendar API, create API key restricted to HTTP referrers `https://cal.paracelsus-recovery.com/*` and `https://andreolf.github.io/*`, API restriction = Calendar API only → paste into `config.js`, commit.
3. Test with a real calendar: `https://andreolf.github.io/paracelsus-calendar/?c=<id>` before DNS.
4. David: `cal CNAME andreolf.github.io`; then tick Enforce HTTPS in Pages settings.
5. Send Jan/David the demo link (`?demo`) and the per-client link format.

## Nice-to-haves (not started)
- Week view toggle; "add to phone calendar" (.ics) per event; German strings; PWA manifest so clients can add it to the home screen.
