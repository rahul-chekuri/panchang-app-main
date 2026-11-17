const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

function app(overrides = {}) {
  const elements = new Map();
  const context = {
    document: {
      getElementById(id) {
        if (!elements.has(id)) elements.set(id, { value: '', addEventListener() {} });
        return elements.get(id);
      }
    },
    window: { addEventListener() {} },
    navigator: {},
    localStorage: { getItem() { return null; }, setItem() {} },
    SunCalc: require('./vendor/suncalc.js'),
    Astronomy: require('./vendor/astronomy-engine.js'),
    tzlookup: require('./vendor/tz-lookup.js'),
    Intl, RangeError, console, setTimeout, clearTimeout, AbortController,
    Date,
    ...overrides
  };
  vm.createContext(context);
  vm.runInContext(readFileSync(join(__dirname, 'app.js'), 'utf8') +
    '\nglobalThis.app = { GHADIYA_ROWS, GHADIYA_TELUGU_ROWS, PLANETS, renderGhadiya, splitGhadiya, segmentTime, applySunrise, resolveSunTimes, makeHoras, loadChart, useMyLocation, locationErrorMessage, initializeLocation, getSunTimes, dateAtPlace, moonPhaseForDate, startLoading, fetchWithTimeout, makePeriods, makeVarjyam, siderealMoonLongitude, goodWindows };', context);
  return { ...context.app, elements };
}

function firstCard(horas, periods = []) {
  const instance = app();
  instance.renderGhadiya(0, 360, 1080, 360, horas.map(([start, end, index]) => {
    const planet = instance.PLANETS[index];
    return { start, end, planet, tone: planet.tone };
  }), periods);
  return instance.elements.get('ghadiyaList').innerHTML.split('</article>')[0];
}

test('every supplied weekday result has Telugu text and retains its Romanized source', () => {
  const instance = app();
  assert.equal(instance.GHADIYA_ROWS.length, 30);
  assert.equal(instance.GHADIYA_TELUGU_ROWS.length, 30);
  for (let day = 0; day < 7; day++) {
    instance.renderGhadiya(day, 360, 1080, 360, [], []);
    const html = instance.elements.get('ghadiyaList').innerHTML;
    for (let row = 0; row < 30; row++) {
      assert.equal(instance.GHADIYA_TELUGU_ROWS[row].length, 7);
      assert.match(instance.GHADIYA_TELUGU_ROWS[row][day], /[\u0c00-\u0c7f]/);
      assert.ok(html.includes(instance.GHADIYA_ROWS[row][day]));
      assert.ok(html.includes(instance.GHADIYA_TELUGU_ROWS[row][day]));
    }
  }
});

test('unfavorable and partially overlapping horas override a favorable ghadiya', () => {
  for (const index of [0, 4]) {
    const html = firstCard([[360, 370, 1], [370, 420, index]]);
    assert.ok(html.includes('slot-segment bad'));
    assert.ok(html.includes('hora-tag bad'));
    assert.ok(html.includes(`Avoid · ${index === 0 ? 'Sun' : 'Saturn'} hora`));
  }
});

test('mixed horas stay amber, favorable horas green, and exact endpoints do not overlap', () => {
  assert.ok(firstCard([[360, 420, 2]]).includes('slot-segment average'));
  assert.ok(firstCard([[360, 420, 1]]).includes('slot-segment good'));
  assert.ok(firstCard([[300, 360, 0], [360, 384, 1], [384, 420, 4]]).includes('slot-segment good'));
});

test('avoid periods override favorable horas while badges retain their own rating', () => {
  for (const name of ['Rahu Kalam', 'Yamagandam', 'Durmuhurtham', 'Gulika Kalam']) {
    const html = firstCard([[360, 420, 1]], [{ name, start: 370, end: 380 }]);
    assert.ok(html.includes('slot-segment bad'));
    assert.ok(html.includes(`Avoid · ${name}`));
    assert.ok(html.includes('hora-tag good'));
    assert.ok(html.includes('శుక్రుడు హోర'));
    assert.ok(html.includes('Venus hora'));
  }
});

test('a Rahu ending or starting at 9:10 preserves the usable part of 9:00–9:24', () => {
  const { splitGhadiya } = app();
  const horas = [{ start: 540, end: 600, tone: 'good', planet: { en: 'Venus' } }];
  for (const [period, expected] of [
    [{ name: 'Rahu Kalam', start: 500, end: 550 }, ['bad', 'good']],
    [{ name: 'Rahu Kalam', start: 550, end: 600 }, ['good', 'bad']]
  ]) {
    const segments = splitGhadiya(540, 564, 'good', horas, [period]);
    assert.deepEqual(Array.from(segments, s => [s.start,s.end,s.tone]),
      [[540,550,expected[0]],[550,564,expected[1]]]);
  }
});

test('hora and multiple avoid boundaries give contiguous rows and all active causes', () => {
  const { splitGhadiya, segmentTime } = app();
  const horas = [
    { start: 500, end: 550.5, tone: 'good', planet: { en: 'Venus' } },
    { start: 550.5, end: 600, tone: 'bad', planet: { en: 'Sun' } }
  ];
  const periods = [
    { name: 'Rahu Kalam', start: 540, end: 550.5 },
    { name: 'Gulika Kalam', start: 545, end: 555 }
  ];
  const segments = splitGhadiya(540, 564, 'good', horas, periods);
  assert.deepEqual(Array.from(segments, s => [s.start,s.end]),
    [[540,545],[545,550.5],[550.5,555],[555,564]]);
  assert.match(segments[1].label, /Rahu Kalam, Gulika Kalam/);
  assert.match(segments[2].label, /Gulika Kalam, Sun hora/);
  assert.equal(segments[2].periods.length, 1);
  assert.equal(segmentTime(550.5), '9:10:30 AM');
});

test('bad ghadiya stays bad, mixed stays amber, and missing hora is never green', () => {
  const { splitGhadiya } = app();
  const horas = [{ start: 540, end: 564, tone: 'good', planet: { en: 'Venus' } }];
  assert.equal(splitGhadiya(540,564,'bad',horas,[])[0].tone,'bad');
  assert.equal(splitGhadiya(540,564,'average',horas,[])[0].tone,'average');
  assert.equal(splitGhadiya(540,564,'good',[],[])[0].tone,'average');
});

test('location errors distinguish blocked permission, unavailable position and timeout', () => {
  const { locationErrorMessage } = app();
  assert.match(locationErrorMessage({ code: 1 }), /permission is blocked/);
  assert.match(locationErrorMessage({ code: 2 }), /could not determine/);
  assert.match(locationErrorMessage({ code: 3 }), /timed out/);
});

test('GPS failures allow retry and give actionable messages instead of a generic error', () => {
  let success, failure, options;
  const instance = app({
    window: { isSecureContext: true, addEventListener() {} },
    navigator: { geolocation: { getCurrentPosition(ok, fail, settings) {
      success = ok; failure = fail; options = settings;
    } } }
  });
  instance.elements.get('status').classList = { toggle() {} };
  instance.useMyLocation();
  assert.equal(instance.elements.get('gpsButton').disabled, true);
  assert.equal(options.timeout, 30000);
  failure({ code: 1 });
  assert.equal(instance.elements.get('gpsButton').disabled, false);
  assert.match(instance.elements.get('status').textContent, /site settings/);
  instance.useMyLocation();
  success({ coords: { latitude: 0, longitude: 0 } });
  assert.equal(instance.elements.get('gpsButton').disabled, false);
  assert.equal(instance.elements.get('placeInput').value, 'Current location');
});

test('insecure pages explain the HTTPS requirement before requesting GPS', () => {
  let requested = false;
  const instance = app({
    window: { isSecureContext: false, addEventListener() {} },
    navigator: { geolocation: { getCurrentPosition() { requested = true; } } }
  });
  instance.elements.get('status').classList = { toggle() {} };
  instance.useMyLocation();
  assert.equal(requested, false);
  assert.match(instance.elements.get('status').textContent, /HTTPS/);
});

test('an entered sunrise replaces only the calculated sunrise and must precede sunset', () => {
  const { applySunrise } = app();
  const solar = { sunrise: 371, sunset: 1078, nextSunrise: 372, timezone: 'Asia/Kolkata' };
  assert.deepEqual({ ...applySunrise(solar, '') }, { ...solar, manual: false });
  assert.deepEqual({ ...applySunrise(solar, '06:05') }, { ...solar, sunrise: 365, manual: true });
  assert.throws(() => applySunrise(solar, '18:00'), /before sunset/);
});

test('manual sunrise and sunset bypass the network even with a saved location', async () => {
  const instance = app({ fetch() { throw new Error('Network must not be used'); } });
  for (const place of [null, { lat: 17, lon: 78, name: 'Hyderabad' }]) {
    const solar = await instance.resolveSunTimes('2026-11-12', place, '06:00', '17:40');
    assert.equal(solar.sunrise, 360);
    assert.equal(solar.sunset, 1060);
    assert.equal(solar.nextSunrise, 360);
    assert.equal(solar.estimatedNextSunrise, true);
  }
  await assert.rejects(instance.resolveSunTimes('2026-11-12', null, '06:00', ''), /both sunrise and sunset/);
  await assert.rejects(instance.resolveSunTimes('2026-11-12', null, '18:00', '18:00'), /before sunset/);
  await assert.rejects(instance.resolveSunTimes('2026-11-12', null, '25:00', '18:00'), /valid/);
});

test('manual chart renders day and night without a location', async () => {
  const instance = app({ fetch() { throw new Error('Network must not be used'); } });
  instance.elements.get('status').classList = { toggle() {} };
  instance.elements.get('sunriseInput').value = '06:00';
  instance.elements.get('sunsetInput').value = '17:40';
  await instance.loadChart();
  assert.equal(instance.elements.get('dailySummary').hidden, false);
  assert.match(instance.elements.get('dailySummary').innerHTML, /6:00 AM/);
  assert.match(instance.elements.get('status').textContent, /estimated as 6:00 AM/);
  assert.equal((instance.elements.get('horaList').innerHTML.match(/<article/g) || []).length, 25);
  assert.equal((instance.elements.get('ghadiyaList').innerHTML.match(/<article/g) || []).length, 61);
  assert.match(instance.elements.get('horaHelp').textContent, /estimated/);
});

test('hora cycles use chart weekdays and one-hour boundaries, truncating at sunset and next sunrise', () => {
  const { makeHoras } = app();
  const horas = makeHoras(0, 370, 1062, 370, 'waxing');
  assert.deepEqual(Array.from(horas.slice(0, 3), h => [h.start, h.end, h.planet.en]), [
    [370, 430, 'Sun'], [430, 490, 'Venus'], [490, 550, 'Mercury']
  ]);
  assert.deepEqual(Array.from(horas.slice(11, 13), h => [h.start, h.end, h.planet.en, h.cycle]), [
    [1030, 1062, 'Saturn', 'Day'], [1062, 1122, 'Jupiter', 'Night']
  ]);
  assert.equal(horas.at(-1).end, 1810);
  assert.equal(horas.at(-1).end - horas.at(-1).start, 28);
  for (let day = 0; day < 7; day++) {
    const h = makeHoras(day, 360, 1080, 360, 'waxing');
    assert.equal(h[12].planet.en, ['Jupiter','Venus','Saturn','Sun','Moon','Mars','Mercury'][day]);
  }
});

test('Moon hora is green when waxing, red when waning, and amber if unspecified', () => {
  const { makeHoras, splitGhadiya } = app();
  for (const [phase, tone] of [['waxing','good'], ['waning','bad'], ['', 'average']]) {
    const moon = makeHoras(1, 360, 1080, 360, phase)[0];
    assert.equal(moon.planet.en, 'Moon');
    assert.equal(moon.tone, tone);
    const segment = splitGhadiya(360, 384, 'good', [moon], [])[0];
    assert.equal(segment.tone, tone);
    if (!phase) assert.match(segment.label, /Select Moon phase/);
  }
});

test('ghadiya cycles restart at sunset, repeat after 30 rows, and stop at next sunrise', () => {
  const instance = app();
  instance.renderGhadiya(0, 360, 1100, 370, [], []);
  const html = instance.elements.get('ghadiyaList').innerHTML;
  const cards = html.split('<article class="ghadiya-card">').slice(1);
  assert.ok(cards[0].includes('Day · 6:00 AM–6:24 AM'));
  assert.ok(cards[30].includes('Day · 6:00 PM–6:20 PM'));
  assert.ok(cards[30].includes(instance.GHADIYA_ROWS[0][0]));
  assert.ok(cards[31].includes('Night · 6:20 PM–6:44 PM'));
  assert.ok(cards[31].includes(instance.GHADIYA_ROWS[0][0]));
  assert.ok(cards.at(-1).includes('6:10 AM (+1 day)'));
});

test('today is selected and startup requests device location rather than using a saved place by default', async () => {
  let success;
  const instance = app({
    window: { isSecureContext: true, addEventListener() {} },
    navigator: { geolocation: { getCurrentPosition(ok) { success = ok; } } },
    localStorage: { getItem() { return '{"lat":0,"lon":0,"name":"Saved place"}'; }, setItem() {} }
  });
  const now = new Date();
  assert.equal(instance.elements.get('dateInput').value,
    `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`);
  instance.elements.get('status').classList = { toggle() {} };
  instance.initializeLocation();
  assert.equal(typeof success, 'function');
  assert.equal(instance.elements.get('loadingPanel').hidden, false);
  success({ coords: { latitude: 17.385, longitude: 78.4867 } });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(instance.elements.get('placeInput').value, 'Current location');
  assert.equal(instance.elements.get('dailySummary').hidden, false);
  assert.equal(instance.elements.get('loadingPanel').hidden, true);
});

test('denied automatic location explicitly falls back to a valid saved place including zero coordinates', async () => {
  let failure;
  const instance = app({
    window: { isSecureContext: true, addEventListener() {} },
    navigator: { geolocation: { getCurrentPosition(ok, fail) { failure = fail; } } },
    localStorage: { getItem() { return '{"lat":0,"lon":0,"name":"Saved place"}'; }, setItem() {} }
  });
  instance.elements.get('status').classList = { toggle() {} };
  instance.initializeLocation();
  failure({ code: 1 });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(instance.elements.get('dailySummary').hidden, false);
  assert.match(instance.elements.get('status').textContent, /permission is blocked.*Showing the saved location/);
  assert.equal(instance.elements.get('loadingPanel').hidden, true);
});

test('solar calculations do not fetch and use the selected place timezone across the date line', async () => {
  const instance = app({ fetch() { throw new Error('No network permitted'); } });
  for (const [lat,lon,zone] of [[17.385,78.4867,'Asia/Kolkata'],[40.71,-74,'America/New_York'],[-36.85,174.76,'Pacific/Auckland']]) {
    const solar = await instance.getSunTimes('2026-11-13', lat, lon);
    assert.equal(solar.timezone, zone);
    assert.ok(solar.sunrise >= 300 && solar.sunrise < 480);
    assert.ok(solar.sunset > solar.sunrise);
    const day = new Intl.DateTimeFormat('en-CA', { timeZone: zone, year:'numeric',month:'2-digit',day:'2-digit' })
      .format(instance.dateAtPlace('2026-11-13', zone));
    assert.equal(day, '2026-11-13');
  }
  await assert.rejects(instance.getSunTimes('2026-06-21', 89, 0), /does not occur/);
});

test('automatic Moon phase follows the selected date and manual selection overrides it', async () => {
  const instance = app();
  assert.equal(instance.moonPhaseForDate('2024-04-15', 'UTC'), 'waxing');
  assert.equal(instance.moonPhaseForDate('2024-04-30', 'UTC'), 'waning');
  instance.elements.get('status').classList = { toggle() {} };
  instance.elements.get('sunriseInput').value = '06:00';
  instance.elements.get('sunsetInput').value = '18:00';
  instance.elements.get('dateInput').value = '2024-04-15';
  await instance.loadChart();
  assert.match(instance.elements.get('moonPhaseHelp').textContent, /Auto estimate: Waxing/);
  const moon = html => html.split('<article').find(card => card.includes('<span>Moon</span>'));
  assert.match(moon(instance.elements.get('horaList').innerHTML), /hora-card good/);
  instance.elements.get('moonPhase').value = 'waning';
  await instance.loadChart();
  assert.match(moon(instance.elements.get('horaList').innerHTML), /hora-card bad/);
});

test('loading remains visible for concurrent work and clears after chart validation failures', async () => {
  const instance = app();
  const done1 = instance.startLoading('Location');
  const done2 = instance.startLoading('Chart');
  done1();
  assert.equal(instance.elements.get('loadingPanel').hidden, false);
  done2();
  assert.equal(instance.elements.get('loadingPanel').hidden, true);
  instance.elements.get('status').classList = { toggle() {} };
  instance.elements.get('sunriseInput').value = '18:00';
  instance.elements.get('sunsetInput').value = '06:00';
  await instance.loadChart();
  assert.equal(instance.elements.get('loadingPanel').hidden, true);
  assert.match(instance.elements.get('status').textContent, /before sunset/);
});

test('place search has a bounded timeout instead of hanging indefinitely', async () => {
  let abort;
  const instance = app({
    setTimeout(callback) { abort = callback; return 1; },
    clearTimeout() {},
    fetch(url, options) {
      return new Promise((resolve, reject) => options.signal.addEventListener('abort', () => reject(new Error('aborted'))));
    }
  });

  const search = instance.fetchWithTimeout('https://example.com/search');
  abort();
  await assert.rejects(search, /timed out/);
});

test('GPS safety cutoff clears loading and ignores a late result', () => {
  let cutoff, success;
  const instance = app({
    window: { isSecureContext: true, addEventListener() {} },
    navigator: { geolocation: { getCurrentPosition(ok) { success = ok; } } },
    setTimeout(callback) { cutoff = callback; return 1; },
    clearTimeout() {}
  });
  instance.elements.get('status').classList = { toggle() {} };
  instance.useMyLocation();
  cutoff();
  assert.equal(instance.elements.get('gpsButton').disabled, false);
  assert.equal(instance.elements.get('loadingPanel').hidden, true);
  assert.match(instance.elements.get('status').textContent, /timed out/);
  success({ coords: { latitude: 17, longitude: 78 } });
  assert.equal(instance.elements.get('placeInput').value, '');
});

test('all weekday Durmuhurtham windows are included, with Tuesday night and consecutive Saturday windows', () => {
  const { makePeriods } = app();
  const expected = [
    [[984,1032]], [[744,792],[888,936]], [[504,552],[1368,1416]],
    [[696,744]], [[600,648],[888,936]], [[504,552],[744,792]],
    [[360,408],[408,456]]
  ];
  for (let day = 0; day < 7; day++) {
    const windows = makePeriods(day,360,720,360).filter(p => p.name === 'Durmuhurtham');
    assert.deepEqual(Array.from(windows, p => [p.start,p.end]), expected[day]);
  }
  const night = makePeriods(2,370,692,371).find(p => p.detail.startsWith('Night'));
  assert.ok(Math.abs(night.start - (1062 + 749 * 6 / 15)) < 1e-8);
  assert.ok(Math.abs(night.end - (1062 + 749 * 7 / 15)) < 1e-8);
});

test('Varjyam agrees with independent Swiss Ephemeris Lahiri fixtures within three minutes', () => {
  const { makeVarjyam } = app();
  // Swiss Ephemeris 2.10.03 (Moshier, Lahiri), solved nakshatra entry/exit;
  // each offset and the 4-ghati duration are scaled by the actual nakshatra span.
  const cases = [
    ['1900-01-01','Asia/Kolkata',[[570.4667,660.3333],[1189.1833,1277.3333]]],
    ['2026-11-12','America/New_York',[[768.6833,876.5667],[1739.5833,1800]]],
    ['2026-11-15','Asia/Kolkata',[[360,434.4],[1677.1167,1784.3167]]],
    ['2026-11-16','Asia/Kolkata',[]],
    ['2026-11-17','Asia/Kolkata',[[400.1167,505.3]]],
    ['2026-11-17','Pacific/Auckland',[[850.1167,955.3]]],
    ['2026-11-22','America/Los_Angeles',[[662.4333,751.8167],[1408.4667,1495.5667]]],
    ['2100-01-01','Asia/Kolkata',[[906.4167,997.6]]]
  ];
  for (const [date,zone,expected] of cases) {
    const actual = makeVarjyam(date,zone,360,360);
    assert.equal(actual.length,expected.length,`${date} ${zone}`);
    actual.forEach((window,i) => {
      assert.ok(Math.abs(window.start-expected[i][0])<3,`${date} ${zone} start`);
      assert.ok(Math.abs(window.end-expected[i][1])<3,`${date} ${zone} end`);
      assert.ok(window.start>=360 && window.end<=1800 && window.end>window.start);
    });
  }
  const mula = makeVarjyam('2026-11-12','America/New_York',360,360);
  assert.ok(mula.every(p => p.detail.startsWith('Mula')));
});

test('Varjyam splits otherwise good rows at its boundaries and combines active causes', () => {
  const { splitGhadiya } = app();
  const horas = [{start:540,end:600,tone:'good',planet:{en:'Venus'}}];
  const periods = [
    {name:'Varjyam',start:550,end:560},
    {name:'Durmuhurtham',start:555,end:565}
  ];
  const segments = splitGhadiya(540,570,'good',horas,periods);
  assert.deepEqual(Array.from(segments,s => [s.start,s.end,s.tone]),[
    [540,550,'good'],[550,555,'bad'],[555,560,'bad'],[560,565,'bad'],[565,570,'good']
  ]);
  assert.match(segments[2].label,/Varjyam, Durmuhurtham/);
});

test('manual Varjyam uses the explicit timezone and rejects invalid input without hanging', async () => {
  const instance = app();
  assert.equal(instance.elements.get('manualTimezone').value,'Asia/Kolkata');
  instance.elements.get('status').classList = { toggle() {} };
  instance.elements.get('dateInput').value = '2026-11-17';
  instance.elements.get('sunriseInput').value = '06:00';
  instance.elements.get('sunsetInput').value = '18:00';
  instance.elements.get('manualTimezone').value = 'Asia/Kolkata';
  await instance.loadChart();
  assert.match(instance.elements.get('periodList').innerHTML,/Varjyam/);
  assert.match(instance.elements.get('varjyamHelp').textContent,/Asia\/Kolkata/);
  instance.elements.get('manualTimezone').value = 'Not/A_Timezone';
  await instance.loadChart();
  assert.match(instance.elements.get('status').textContent,/valid timezone/);
  assert.equal(instance.elements.get('loadingPanel').hidden,true);
  assert.equal(instance.elements.get('periodSection').hidden,true);
  assert.throws(() => instance.makeVarjyam('1800-01-01','UTC',360,360),/1900 to 2100/);
  assert.throws(() => instance.makeVarjyam('2026-03-07','America/New_York',360,360),/clock change/);
});

test('good summary clips to 4 AM–10 PM, merges green portions, and preserves avoid gaps', () => {
  const { goodWindows } = app();
  const cycle = {
    dayIndex: 0, shift: 0, solar: {sunrise:240,sunset:960,nextSunrise:240},
    horas: [{start:200,end:1600,tone:'good',planet:{en:'Venus'}}],
    periods: [{name:'Varjyam',start:250,end:260}]
  };
  const windows = goodWindows([cycle]);
  // Sunday starts with two favorable source rows, then unfavorable rows.
  assert.deepEqual(Array.from(windows.slice(0,3),w=>[w.start,w.end]),[[240,250],[260,288],[384,432]]);
  assert.ok(windows.every(w=>w.start>=240 && w.end<=1320));
  assert.ok(goodWindows([cycle],240,1270).some(w=>w.end===1270));
  const bad = {...cycle,horas:[{...cycle.horas[0],tone:'bad'}]};
  assert.equal(goodWindows([bad]).length,0);
});

test('before-sunrise summary uses the previous weekday night cycle without gaps at sunrise', () => {
  const { goodWindows } = app();
  const previous = {
    dayIndex:0,shift:-1440,solar:{sunrise:360,sunset:1080,nextSunrise:360},
    horas:[{start:0,end:1800,tone:'good',planet:{en:'Venus'}}],periods:[]
  };
  const current = {
    dayIndex:1,shift:0,solar:{sunrise:360,sunset:1080,nextSunrise:360},
    horas:[{start:0,end:1800,tone:'good',planet:{en:'Venus'}}],periods:[]
  };
  const previousOnly = goodWindows([previous]);
  assert.ok(previousOnly.length>0);
  assert.ok(previousOnly.every(w=>w.start>=240 && w.end<=360));
  const combined = goodWindows([previous,current]);
  assert.deepEqual(Array.from(combined.filter(w=>w.end<=360),w=>[w.start,w.end]),
    Array.from(previousOnly,w=>[w.start,w.end]));
  assert.ok(combined.some(w=>w.start>=360));
});

test('loading a manual chart adds a good-time summary and preserves the detailed charts', async () => {
  const instance = app();
  instance.elements.get('status').classList = { toggle() {} };
  instance.elements.get('dateInput').value = '2026-11-17';
  instance.elements.get('sunriseInput').value = '06:00';
  instance.elements.get('sunsetInput').value = '18:00';
  await instance.loadChart();
  assert.equal(instance.elements.get('goodTimesSection').hidden,false);
  assert.match(instance.elements.get('goodTimesNote').textContent,/Previous solar times are estimated/);
  for (const id of ['periodSection','horaSection','ghadiyaSection']) {
    assert.equal(instance.elements.get(id).hidden,false);
  }
  instance.elements.get('sunsetInput').value = '05:00';
  await instance.loadChart();
  assert.equal(instance.elements.get('goodTimesSection').hidden,true);
});
