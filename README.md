# Daily Telugu Panchangam

An installable, mobile-friendly static web app that combines a chosen date and location with the Shubhakruth Samvatsara ghadiya table you supplied.

## Features

- Search a place with OpenStreetMap or use device location.
- Fetches local sunrise and sunset for the selected date from Open-Meteo.
- Shows Rahu Kalam, Yamagandam, Gulika Kalam, and a weekday Durmuhurtham window.
- Computes the 24 planetary horas across local daytime and nighttime.
- Displays all 30 24-minute ghadiya results for the selected weekday and highlights overlapping periods.
- Responsive layout and installable PWA shell; the app files are cached after first visit.

## Publish on GitHub Pages

The `Deploy Panchangam PWA to GitHub Pages` workflow publishes the root of `main` on every push. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions** if it is not already selected. After the workflow succeeds, GitHub Pages shows the site URL in the Pages settings and deployment.

## Calculation notes

Rahu Kalam, Yamagandam, and Gulika use the standard weekday segment numbers for dividing sunrise-to-sunset into eight equal parts. Durmuhurtham uses a common weekday-based daytime muhurta index divided across 15 parts; regional panchangams can use different conventions. Planetary horas divide day and night separately into 12 equal parts. Ghadiya uses the fixed 24-minute intervals from the source table, starting at local sunrise. The updated table is displayed in the Romanized form supplied by the user; good/bad colors are inferred from the result text, with ambiguous phrases left neutral. Any ghadiya or hora interval overlapping Rahu Kalam, Yamagandam, Gulika Kalam, or Durmuhurtham is marked red and labeled with the overlapping period.

Sun times are retrieved online. The interface and app shell are cached for repeat visits, but calculating another date/location requires a network connection. Place search uses OpenStreetMap Nominatim; please use it respectfully and avoid repeated rapid searches.
