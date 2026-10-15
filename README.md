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

- Day strip (7 days back, 21 ahead), today highlighted; current appointment outlined in green.
- Each appointment: start/end time, title, location, duration; tap to expand **Notes** (the event description — menu plans, lab prep instructions, etc.).
- All-day events (e.g. "fasting from midnight") pinned at the top of the day.
- Auto-refresh every 60 s and whenever the page regains focus; "Live · 14:02" indicator in the header turns amber if the last refresh failed.
- Works on phones; printable (notes expanded).

## Setup (one-off)

1. **API key** — Google Cloud Console → APIs & Services → enable *Google Calendar API* → Credentials → *Create API key*. Restrict it: Application = HTTP referrers (`https://cal.paracelsus-recovery.com/*`, `https://andreolf.github.io/*`), API = Google Calendar API only. Paste into `config.js`.
2. **GitHub Pages** — Settings → Pages → Source: *Deploy from branch* `main` / root. The `CNAME` file sets the custom domain.
3. **DNS** (David) — `cal.paracelsus-recovery.com CNAME andreolf.github.io`. Then tick *Enforce HTTPS* in the Pages settings once the certificate is issued.

## Adding a client

Share the client's Google Calendar publicly, copy its Calendar ID, build the link. No deploy needed.

## Files

- `index.html` — the whole app (no build step, no dependencies besides Google Fonts).
- `config.js` — API key + display settings.
- `CNAME`, `.nojekyll` — GitHub Pages.
