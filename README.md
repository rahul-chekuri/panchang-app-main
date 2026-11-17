# Daily Telugu Panchangam

An installable, mobile-friendly static web app focused on Telugu/South Indian Panchangam conventions. It combines a chosen date and location with the Shubhakruth Samvatsara ghadiya table you supplied. Regional and family almanac differences can still apply.

## Features

- Opens with today's date and requests current device location (browser permission is required).
- Searches places with OpenStreetMap; if automatic location fails, a valid saved location is used with an explicit warning.
- Calculates sunrise, sunset, and Moon phase locally, without an external solar-data service.
- Shows a non-blocking loading popup during location lookup, place search, and chart calculation.
- Centers loading on the viewport and lists favorable time windows from 4 AM to 10 PM above the unchanged detailed charts.
- Shows Rahu Kalam, Yamagandam, Gulika Kalam, all weekday Durmuhurtham windows, and automatic Varjyam windows.
- Computes one-hour planetary horas across daytime and nighttime, restarting at sunset and shortening boundary intervals.
- Repeats the 30-row ghadiya table during each day and night cycle and highlights overlapping periods.
- Responsive layout and installable PWA shell; the app files are cached after first visit.


## Entering your own sunrise and sunset

Enter both **Sunrise (optional)** and **Sunset (optional)** with a date to calculate without a location or a solar-data network request. Use local clock times from your almanac; sunrise must precede sunset. In manual mode the next day's sunrise is estimated as today's entered sunrise, which may differ from the actual time. If only one time is entered, a location is required to calculate the missing times. Tap **Auto** to clear both fields and use location-based calculations, including the next day's sunrise.

Moon phase defaults to **Auto**, estimated with SunCalc at noon on the selected date in the selected location's timezone. With manually entered solar times, the manual-timezone field is used (initially Indian Standard Time, `Asia/Kolkata`). Moon horas are favorable during waxing and unfavorable during waning. You can override the estimate using your almanac. This is an astronomical estimate, not an exact tithi/paksha transition calculation; the one selected phase applies to the whole displayed interval, including the night. Review the override near new/full Moon or if the phase changes during the interval.

For manual times, **Timezone for manual sunrise/sunset** defaults to `Asia/Kolkata` for South India, even if the device is abroad. Both Varjyam and automatic Moon phase use this explicit timezone; sunrise/sunset alone cannot determine it. Location mode ignores this field and uses the selected place's timezone. This regional focus does not restrict who can open the app.

## Publish on GitHub Pages

The `Deploy Panchangam PWA to GitHub Pages` workflow publishes the root of `main` on every push. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions** if it is not already selected. After the workflow succeeds, GitHub Pages shows the site URL in the Pages settings and deployment.

## Calculation notes

Rahu Kalam, Yamagandam, and Gulika use the standard weekday segment numbers for dividing sunrise-to-sunset into eight equal parts. Durmuhurtham divides daylight into 15 parts: Sunday 14; Monday 9 and 12; Tuesday 4 plus the 7th part of the night; Wednesday 8; Thursday 6 and 12; Friday 4 and 9; Saturday 1 and 2 (consecutive). Tuesday's nighttime muhurta uses one fifteenth of sunset to next sunrise, not daytime length. The manual next-sunrise estimate also affects this nighttime window. These rules follow the weekday table explained by [PanchangTime](https://panchangtime.com/about/dur-muhurtam); regional conventions may differ.

Horas begin at sunrise in one-hour increments, with the last daytime interval shortened at sunset. At sunset the weekday's nighttime chart begins, also in one-hour increments, with its last interval shortened at next sunrise. The nighttime sequence starts at the 13th planet of the weekday's chart regardless of the number of daytime intervals.

Ghadiya uses fixed 24-minute intervals, restarting the selected weekday's 30-row table at sunset, as requested. If either cycle exceeds 12 hours the same table repeats from its first row; the last slot is shortened at sunset or next sunrise. The selected weekday is retained after midnight. This nighttime repetition is an app convention, not a separate supplied nighttime source table. Times after midnight are marked `+1 day`.

Results appear in Telugu alongside the user's original Romanized text (not an English translation). Telugu spellings of ambiguous source phrases should be verified. Good/bad ratings are inferred from the result text, with ambiguous phrases left neutral. A ghadiya row is red if it overlaps an avoid period or unfavorable hora, or has an unfavorable result. Mixed horas (Mercury and Mars) make an otherwise favorable row amber. Green requires a favorable ghadiya result and favorable overlapping hora. Hora badges display their own rating independently of avoid periods.

Solar times are calculated locally with SunCalc, using tz-lookup for the coordinates' timezone and the browser's timezone database for DST. These are estimates; timezone lookup can be approximate near borders, and local terrain/horizon effects are not included. Check your local almanac if precise times are needed. Polar dates without sunrise or sunset show an explicit error rather than invented times. Both libraries are bundled and cached for offline chart calculations after the first successful visit; device location availability still depends on the browser/device. Place search uses OpenStreetMap Nominatim and needs internet access; requests time out after 15 seconds. Please use it respectfully and avoid repeated rapid searches.

Bundled libraries: `vendor/suncalc.js` (SunCalc 1.9.0, BSD-2-Clause; see `vendor/suncalc.LICENSE`) and `vendor/tz-lookup.js` (tz-lookup 6.1.25, CC0; see `vendor/tz-lookup.LICENSE`). Keep the entire `vendor/` folder when deploying.

### Automatic Varjyam

Varjyam uses Astronomy Engine 2.1.19 (`vendor/astronomy-engine.js`, MIT notice included in the file), not SunCalc's approximate Moon phase. Geocentric lunar longitude is converted to a Lahiri sidereal estimate using the J2000 mean ayanamsa (23.8570923537 degrees), IAU 2006 precession, and nutation. Nakshatra entry and exit are solved to within one second. Each Varjyam offset and its 4-ghati duration are scaled by the actual nakshatra span divided by 60; the duration is not fixed to 96 minutes.

The zero-based offsets in ghatis, from Ashwini through Revati, are: `50, 24, 30, 40, 14, 21, 30, 20, 32, 30, 20, 18, 21, 20, 14, 14, 10, 14, [20, 56], 24, 20, 10, 10, 18, 16, 24, 30`. Mula includes two windows. The scaled-span method is explained by [PanchangTime](https://panchangtime.com/about/varjyam), and the offset table including both Mula windows is cross-checked against the `amrita_gadiya_varjyam_star_map` in [PyJHora's constants](https://github.com/naturalstupid/PyJHora/blob/main/src/jhora/const.py) (reference data only, no PyJHora code is bundled).

Every window intersecting sunrise to next sunrise is included, including carryover from the preceding nakshatra, multiple windows, and after-midnight periods. Windows are clipped to the chart range. Days with no window explicitly say so. Varjyam participates in the same red overlap labels and exact ghadiya splitting as the other avoid periods.

Supported lunar dates are 1900–2100. Independent Swiss Ephemeris 2.10.03 (Moshier/Lahiri) checks across 40 date/timezone cases differed by at most 1.8 minutes at the endpoints; regression fixtures allow three minutes. This is a validated estimate, not an official almanac feed or a guarantee of matching every tradition. Verify important timings against your local Panchangam. Charts spanning a timezone/DST clock change are rejected explicitly because the current clock-minute timeline cannot represent repeated or skipped clock times safely. An invalid timezone or unsupported date produces an error rather than silently omitting Varjyam.

### Good-time summary

The summary lists only green portions under the existing ghadiya/hora/avoid-period rules, clipped to 4 AM–10 PM on the selected local calendar date. Adjacent green portions are merged without hiding intervening red or amber portions; boundary times include seconds when needed. Each window retains detail rows showing the exact subinterval, Telugu and Romanized ghadiya result, and Telugu/English hora name, so changes within a continuous green window remain visible. It uses the same slot generation and splitting functions as the detailed chart, not a separate favorable-time formula.

Before sunrise, it calculates the previous weekday's nighttime ghadiya/hora cycle and its Varjyam and Durmuhurtham. Location mode calculates the previous day's solar times locally. Manual or adjusted-solar mode reuses the entered/adjusted sunrise and sunset as estimates for the previous day and discloses this in the summary. Automatic Moon phase uses the previous date for that night; a manual phase override applies to both cycles. If the previous cycle cannot be calculated (for example at the supported date-range boundary), the summary explicitly reports missing pre-sunrise coverage while preserving the current detailed charts. All windows follow the app's conventions and are planning estimates, not guarantees of an outcome.

### Split ghadiya rows

The ghadiya card now stays neutral instead of inheriting the worst overlapping rating described above. Inside each card, colored rows split at every hora change and every avoid-period start/end. Only conditions active within that row affect its rating and badges. Bad ghadiya results, bad horas, or avoid periods make a row red; mixed or missing hora data and uncertain ghadiya results make it amber; otherwise it is green. Boundaries are computed without rounding; displayed times include seconds when needed and round to the nearest second. Thus a Rahu Kalam ending at 9:10 leaves 9:10–9:24 green when both ghadiya and hora are favorable. The separate hora overview retains its whole-hora overlap warnings.

Run the focused checks with `node --test app.test.cjs`.

### Updates and phone location

The service worker now requests current app files from the network without using the browser HTTP cache, saving successful responses for offline use. It falls back to the saved files only when the network fails. This means future file updates do not require a new cache version or incognito browsing. New workers activate immediately and never force-reload open tabs (forcing a reload during activation can leave the page loading forever). App registration bypasses cached worker scripts and checks for updates when the app returns to the foreground. An already-open tab may need a refresh after deployment.

On the first upgrade from the old cache-first worker, open the site online and refresh it once. If a browser still shows the old version, close all app tabs and reopen it; as a one-time recovery, clear this site's stored data in the browser settings (this also removes the saved location). Do not clear all browsing data.

Location requires the HTTPS site, permission for the site, and enabled device/browser Location Services. Open the link in Chrome or Safari rather than an embedded in-app browser. Permission denial, unavailable position and timeouts show distinct recovery messages. The request allows 30 seconds, has a 32-second safety cutoff, and accepts a device location up to five minutes old; it does not bypass permission or substitute an IP-based location. Android users should check the site's Location permission and the browser's permission in phone Settings; iPhone users should check Settings → Privacy & Security → Location Services and the browser's location access. City search and manual sunrise/sunset remain available if the device cannot return a position.

Run all focused checks with `node --test app.test.cjs sw.test.cjs`.
