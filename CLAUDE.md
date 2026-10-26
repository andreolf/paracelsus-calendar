# Paracelsus client schedule — context for Claude Code

## What this is
Live at **https://cal.paracelsus-recovery.com** (since 17 Oct 2026), served from GitHub Pages (`main` / root). Replaces the WordPress client calendar pages (`paracelsus-recovery.com/event/<initials>/`, built by the Fooz agency), which lagged behind Google Calendar. Owner: Francesco Andreoli (andreolf). DNS: David Bachmann (dacide.com). Client links are issued by Maria Pena (clinical team).

Full history, decisions and lessons live in Francesco's private vault `andreolf/second-brain`: `Projects/paracelsus-recovery/paracelsus-client-calendar.md` (current state), `…/paracelsus-client-calendar-log.md` (decisions), `…/docs/2026-10-client-calendar-build-record.md` (full record).

## Requirements
- Jan (Feb 2026): appointment **notes** from the event description (menus, lab prep) visible per event. Clients only ever get a link, never calendar access.
- Maria (16 Oct 2026): every day side by side, swipeable, like the WordPress page.

## How it works
- `index.html` — the app, no build step. Reads the client's **public** Google Calendar with Calendar API v3 from the browser using the key in `config.js`. Refresh every 60 s and on focus. Layouts: phones one day + peek; 600–999 px three days; ≥ 1000 px Monday–Sunday week (snaps to Mondays). All-day items render as chips; tablet/desktop open a details card on tap. Range is whole weeks, ~1 back to ~3 ahead. `?demo` = sample data (fictional; keep it that way).
- Links: short `/<first-name>-<initials>` → `<initials>@paracelsus-recovery.com` (via `404.html` → `/?s=…`, then `history.replaceState`); long `/?c=<base64url id>&n=<name>` for other calendars.
- `link.html` — link builder for Maria: Calendar ID / public URL / embed code / `?cid=` link + first name (required) → link; rejects secret iCal addresses; checks the calendar is public.
- `config.js` — browser API key "paracelsus-calendar-web", public by design: restricted to websites `andreolf.github.io/*` + `cal.paracelsus-recovery.com/*` and to the Calendar API (verified). Timezone Europe/Zurich, ranges, refresh.
- `CNAME` — `cal.paracelsus-recovery.com`. Cloudflare record `cal` CNAME `andreolf.github.io` must stay **DNS only (grey cloud)** or certificate renewal fails. `.nojekyll` present.

## Rules
- **No client data in this public repo, ever**: no client names, initials, calendar IDs or appointment contents, not even as examples (use `/anna-abc`). A real client link slipped in once (17 Oct 2026) and history had to be rewritten.
- Changes go through a branch + pull request; Francesco's hooks block pushing to the default branch and `rm -rf` (use `trash`).
- Brand: paracelsus-recovery.com style (Reckless Neue / TWK Lausanne Pan; the brand font files aren't CORS-enabled, so the site uses Newsreader / Inter), Pale01 `#FAF6EE` bg, Ink `#181918`, Yellow01 `#FFE9C0` notes, Green02 `#576A28` "now", eyebrows `#6A665B`, hairlines `#C5BEAA`, pill buttons.

## Known risk (accepted 17 Oct 2026)
Calendars are public and their IDs are initials, so schedules are guessable directly from Google. Fix if that changes: private calendars + an Apps Script web app under a clinic account + random link codes; `load()` in `index.html` is the only data-access code to change.

## Open
- iPad portrait: three days or full week? (asked, no answer)
- Maria issues links for current clients; date to stop using the WordPress client pages.
- Short-link previews in WhatsApp not verified (first response is HTTP 404).
- Real-device check on iPhone/iPad (tested in emulation only).
- Unused "API key 1" in the Google Cloud project.
- Nice-to-haves: "add to phone calendar" (.ics) per event, German strings, PWA manifest.
