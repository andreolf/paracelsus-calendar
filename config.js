// Paracelsus client schedule — configuration
// 1. Create a Google Cloud API key with ONLY the "Google Calendar API" enabled,
//    restricted to HTTP referrers: https://cal.paracelsus-recovery.com/*
// 2. Paste it below. (Safe to publish: it can only read calendars that are already public.)
window.PARA_CAL = {
  apiKey: "",                 // <-- paste the API key here
  timeZone: "Europe/Zurich",
  daysBack: 7,                // how far back the day strip goes
  daysForward: 21,            // how far ahead
  refreshSeconds: 60          // auto-refresh interval
};
