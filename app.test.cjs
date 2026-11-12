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
    Date,
    ...overrides
  };
  vm.createContext(context);
  vm.runInContext(readFileSync(join(__dirname, 'app.js'), 'utf8') +
    '\nglobalThis.app = { GHADIYA_ROWS, GHADIYA_TELUGU_ROWS, PLANETS, renderGhadiya, splitGhadiya, segmentTime, useMyLocation, locationErrorMessage };', context);
  return { ...context.app, elements };
}

function firstCard(horas, periods = []) {
  const instance = app();
  instance.renderGhadiya(0, 360, horas.map(([start, end, index]) => {
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
    instance.renderGhadiya(day, 360, [], []);
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
