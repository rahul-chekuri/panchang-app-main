# Daily Telugu Panchangam

An installable, mobile-friendly static web app that combines a chosen date and location with the Shubhakruth Samvatsara ghadiya table you supplied.

## Features

- Search a place with OpenStreetMap or use device location.
- Fetches local sunrise and sunset for the selected date from Open-Meteo.
- Shows Rahu Kalam, Yamagandam, Gulika Kalam, and a weekday Durmuhurtham window.
- Computes the 24 planetary horas across local daytime and nighttime.
- Displays all 30 24-minute ghadiya results for the selected weekday and highlights overlapping periods.
- Responsive layout and installable PWA shell; the app files are cached after first visit.


## Entering your own sunrise and sunset

Enter both **Sunrise (optional)** and **Sunset (optional)** with a date to calculate without a location or a solar-data network request. Use local clock times from your almanac; sunrise must precede sunset. Manual mode shows 12 daytime horas, all avoid periods, and all 30 ghadiya cards. Nighttime horas are omitted because the next day's sunrise is unknown; any ghadiya portion after sunset has unknown hora data and cannot be green. If only one time is entered, a location is required to calculate the missing times. Tap **Auto** to clear both fields and use location-based calculations, including nighttime horas.

## Publish on GitHub Pages

The `Deploy Panchangam PWA to GitHub Pages` workflow publishes the root of `main` on every push. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions** if it is not already selected. After the workflow succeeds, GitHub Pages shows the site URL in the Pages settings and deployment.

## Calculation notes

Rahu Kalam, Yamagandam, and Gulika use the standard weekday segment numbers for dividing sunrise-to-sunset into eight equal parts. Durmuhurtham uses a common weekday-based daytime muhurta index divided across 15 parts; regional panchangams can use different conventions. Planetary horas divide day and night separately into 12 equal parts. Ghadiya uses the fixed 24-minute intervals from the source table, starting at local sunrise. Results appear in Telugu alongside the user's original Romanized text (not an English translation). Telugu spellings of ambiguous source phrases should be verified. Good/bad ratings are inferred from the result text, with ambiguous phrases left neutral. Any ghadiya or hora interval overlapping Rahu Kalam, Yamagandam, Gulika Kalam, or Durmuhurtham is marked red and labeled with the overlapping period. A ghadiya card is also red if any overlapping hora is unfavorable (Sun or Saturn), even if its own result is favorable. Mixed horas (Mercury and Mars) make an otherwise favorable ghadiya amber. Green requires a favorable ghadiya result and favorable overlapping horas. Hora badges display their own rating, independently of the card. A red card can indicate a partial overlap, not necessarily an entirely inauspicious interval.

Automatic sun times are retrieved online. The interface and app shell are cached for repeat visits; manual sunrise-and-sunset calculations work offline after the app has been cached. Automatic date/location calculations require a network connection. Place search uses OpenStreetMap Nominatim; please use it respectfully and avoid repeated rapid searches.

### Split ghadiya rows

The ghadiya card now stays neutral instead of inheriting the worst overlapping rating described above. Inside each card, colored rows split at every hora change and every avoid-period start/end. Only conditions active within that row affect its rating and badges. Bad ghadiya results, bad horas, or avoid periods make a row red; mixed or missing hora data and uncertain ghadiya results make it amber; otherwise it is green. Boundaries are computed without rounding; displayed times include seconds when needed and round to the nearest second. Thus a Rahu Kalam ending at 9:10 leaves 9:10–9:24 green when both ghadiya and hora are favorable. The separate hora overview retains its whole-hora overlap warnings.

Run the focused checks with `node --test app.test.cjs`.

### Updates and phone location

The service worker now requests current app files from the network without using the browser HTTP cache, saving successful responses for offline use. It falls back to the saved files only when the network fails. This means future file updates do not require a new cache version or incognito browsing. New workers activate immediately and never force-reload open tabs (forcing a reload during activation can leave the page loading forever). App registration bypasses cached worker scripts and checks for updates when the app returns to the foreground. An already-open tab may need a refresh after deployment.

On the first upgrade from the old cache-first worker, open the site online and refresh it once. If a browser still shows the old version, close all app tabs and reopen it; as a one-time recovery, clear this site's stored data in the browser settings (this also removes the saved location). Do not clear all browsing data.

Location requires the HTTPS site, permission for the site, and enabled device/browser Location Services. Open the link in Chrome or Safari rather than an embedded in-app browser. Permission denial, unavailable position and timeouts now show distinct recovery messages. The request allows 30 seconds and accepts a device location up to five minutes old; it does not bypass permission or substitute an IP-based location. Android users should check the site's Location permission and the browser's permission in phone Settings; iPhone users should check Settings → Privacy & Security → Location Services and the browser's location access. City search remains available if the device cannot return a position.

Run all focused checks with `node --test app.test.cjs sw.test.cjs`.
