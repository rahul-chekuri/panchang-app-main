# Daily Telugu Panchangam

An installable, mobile-friendly static web app that combines a chosen date and location with the Shubhakruth Samvatsara ghadiya table you supplied.

## Features

- Search a place with OpenStreetMap or use device location.
- Fetches local sunrise and sunset for the selected date from Open-Meteo.
- Shows Rahu Kalam, Yamagandam, Gulika Kalam, and a weekday Durmuhurtham window.
- Computes one-hour planetary horas across daytime and nighttime, restarting at sunset and shortening boundary intervals.
- Repeats the 30-row ghadiya table during each day and night cycle and highlights overlapping periods.
- Responsive layout and installable PWA shell; the app files are cached after first visit.


## Entering your own sunrise and sunset

Enter both **Sunrise (optional)** and **Sunset (optional)** with a date to calculate without a location or a solar-data network request. Use local clock times from your almanac; sunrise must precede sunset. In manual mode the next day's sunrise is estimated as today's entered sunrise, which may differ from the actual time. If only one time is entered, a location is required to calculate the missing times. Tap **Auto** to clear both fields and use location-based calculations, including the next day's sunrise.

Select waxing or waning Moon from your almanac. Moon horas are favorable during waxing and unfavorable during waning; without a selection they are marked mixed rather than assumed favorable. The selected phase applies to the whole displayed interval, so update it if the phase changes during the interval.

## Publish on GitHub Pages

The `Deploy Panchangam PWA to GitHub Pages` workflow publishes the root of `main` on every push. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions** if it is not already selected. After the workflow succeeds, GitHub Pages shows the site URL in the Pages settings and deployment.

## Calculation notes

Rahu Kalam, Yamagandam, and Gulika use the standard weekday segment numbers for dividing sunrise-to-sunset into eight equal parts. Durmuhurtham uses a common weekday-based daytime muhurta index divided across 15 parts; regional panchangams can use different conventions. Horas begin at sunrise in one-hour increments, with the last daytime interval shortened at sunset. At sunset the weekday's nighttime chart begins, also in one-hour increments, with its last interval shortened at next sunrise. The nighttime sequence starts at the 13th planet of the weekday's chart regardless of the number of daytime intervals.

Ghadiya uses fixed 24-minute intervals, restarting the selected weekday's 30-row table at sunset, as requested. If either cycle exceeds 12 hours the same table repeats from its first row; the last slot is shortened at sunset or next sunrise. The selected weekday is retained after midnight. This nighttime repetition is an app convention, not a separate supplied nighttime source table. Times after midnight are marked `+1 day`.

Results appear in Telugu alongside the user's original Romanized text (not an English translation). Telugu spellings of ambiguous source phrases should be verified. Good/bad ratings are inferred from the result text, with ambiguous phrases left neutral. A ghadiya row is red if it overlaps an avoid period or unfavorable hora, or has an unfavorable result. Mixed horas (Mercury and Mars) or an unspecified Moon phase make an otherwise favorable row amber. Green requires a favorable ghadiya result and favorable overlapping hora. Hora badges display their own rating independently of avoid periods.

Automatic sun times are retrieved online. The interface and app shell are cached for repeat visits; manual sunrise-and-sunset calculations work offline after the app has been cached. Automatic date/location calculations require a network connection. Place search uses OpenStreetMap Nominatim; please use it respectfully and avoid repeated rapid searches.

### Split ghadiya rows

The ghadiya card now stays neutral instead of inheriting the worst overlapping rating described above. Inside each card, colored rows split at every hora change and every avoid-period start/end. Only conditions active within that row affect its rating and badges. Bad ghadiya results, bad horas, or avoid periods make a row red; mixed or missing hora data and uncertain ghadiya results make it amber; otherwise it is green. Boundaries are computed without rounding; displayed times include seconds when needed and round to the nearest second. Thus a Rahu Kalam ending at 9:10 leaves 9:10–9:24 green when both ghadiya and hora are favorable. The separate hora overview retains its whole-hora overlap warnings.

Run the focused checks with `node --test app.test.cjs`.

### Updates and phone location

The service worker now requests current app files from the network without using the browser HTTP cache, saving successful responses for offline use. It falls back to the saved files only when the network fails. This means future file updates do not require a new cache version or incognito browsing. New workers activate immediately and never force-reload open tabs (forcing a reload during activation can leave the page loading forever). App registration bypasses cached worker scripts and checks for updates when the app returns to the foreground. An already-open tab may need a refresh after deployment.

On the first upgrade from the old cache-first worker, open the site online and refresh it once. If a browser still shows the old version, close all app tabs and reopen it; as a one-time recovery, clear this site's stored data in the browser settings (this also removes the saved location). Do not clear all browsing data.

Location requires the HTTPS site, permission for the site, and enabled device/browser Location Services. Open the link in Chrome or Safari rather than an embedded in-app browser. Permission denial, unavailable position and timeouts now show distinct recovery messages. The request allows 30 seconds and accepts a device location up to five minutes old; it does not bypass permission or substitute an IP-based location. Android users should check the site's Location permission and the browser's permission in phone Settings; iPhone users should check Settings → Privacy & Security → Location Services and the browser's location access. City search remains available if the device cannot return a position.

Run all focused checks with `node --test app.test.cjs sw.test.cjs`.
