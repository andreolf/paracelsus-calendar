# Paracelsus Recovery — client schedule

Static replacement for the WordPress `/event/<client>-calendar` pages.
Reads a client's **Google Calendar** directly (public calendar + API key), so there is no sync and no delay: what the clinical team types in Google Calendar is what the client sees within a minute.

Live at **https://cal.paracelsus-recovery.com**

## Link format

```
https://cal.paracelsus-recovery.com/?c=<calendar-id>&n=<first name>
```

- `c` — the Google Calendar ID (Calendar settings → *Integrate calendar* → "Calendar ID"). It may also be base64url-encoded to keep links tidy.
- `n` — optional, shown in the heading ("Anna's schedule"). Leave out for "Your schedule".
- `?demo` — shows sample data (useful for showing the design).

The client's calendar must be shared **publicly** ("Make available to public → See all event details"), as the current WordPress pages already require.

## What clients see

- Every day side by side, swipeable (like the old WordPress page), covering whole weeks from ~1 week back to ~3 weeks ahead:
  - **Phones:** one day per screen with the next one peeking in; after swiping, the page jumps back to the top of that day.
  - **iPad portrait / phones in landscape (600–999 px):** three days.
  - **iPad landscape / desktop (≥1000 px):** the full Monday–Sunday week, with Previous / This / Next week.
- Sticky day strip to jump to any day; today and the current appointment are highlighted.
- Each appointment: start/end time, title, location, duration; tap for **Notes** (the event description — menu plans, lab prep instructions, etc.): inline on phones, a details card on iPad/desktop.
- All-day events (e.g. "fasting from midnight") pinned at the top of the day.
- Auto-refresh every 60 s and whenever the page regains focus; "Live · 14:02" indicator in the header turns amber if the last refresh failed.
- Handles iPhone notch/safe areas, rotation and short landscape screens; printable (notes expanded).

## Setup (one-off)

1. **API key** — Google Cloud Console → APIs & Services → enable *Google Calendar API* → Credentials → *Create API key*. Restrict it: Application = HTTP referrers (`https://cal.paracelsus-recovery.com/*`, `https://andreolf.github.io/*`), API = Google Calendar API only. Paste into `config.js`.
2. **GitHub Pages** — Settings → Pages → Source: *Deploy from branch* `main` / root. Add the `CNAME` file (`cal.paracelsus-recovery.com`) only after DNS exists, otherwise github.io redirects to a dead domain.
3. **DNS** (David) — `cal.paracelsus-recovery.com CNAME andreolf.github.io`. Then tick *Enforce HTTPS* in the Pages settings once the certificate is issued.

## Adding a client

Share the client's Google Calendar publicly, then open **`/link.html`** (the client link builder): paste the Calendar ID (or the calendar's public/embed URL), add the client's first name, copy the link. It encodes the ID, and once the API key is set it also checks the calendar is public. No deploy needed.

## Files

- `index.html` — the whole app (no build step, no dependencies besides Google Fonts).
- `link.html` — client link builder for the clinical team (nothing stored).
- `config.js` — API key + display settings.
- `CNAME`, `.nojekyll` — GitHub Pages (custom domain `cal.paracelsus-recovery.com`).
