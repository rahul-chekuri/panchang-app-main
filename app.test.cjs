const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

function app() {
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
    localStorage: { getItem() { return null; } },
    Date
  };
  vm.createContext(context);
  vm.runInContext(readFileSync(join(__dirname, 'app.js'), 'utf8') +
    '\nglobalThis.app = { GHADIYA_ROWS, GHADIYA_TELUGU_ROWS, PLANETS, renderGhadiya };', context);
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
    assert.ok(html.includes('ghadiya-card bad'));
    assert.ok(html.includes('hora-tag bad'));
    assert.ok(html.includes(`Avoid · overlaps ${index === 0 ? 'Sun' : 'Saturn'} hora`));
  }
});

test('mixed horas stay amber, favorable horas green, and exact endpoints do not overlap', () => {
  assert.ok(firstCard([[360, 420, 2]]).includes('ghadiya-card average'));
  assert.ok(firstCard([[360, 420, 1]]).includes('ghadiya-card good'));
  assert.ok(firstCard([[300, 360, 0], [360, 384, 1], [384, 420, 4]]).includes('ghadiya-card good'));
});

test('avoid periods override favorable horas while badges retain their own rating', () => {
  for (const name of ['Rahu Kalam', 'Yamagandam', 'Durmuhurtham', 'Gulika Kalam']) {
    const html = firstCard([[360, 420, 1]], [{ name, start: 370, end: 380 }]);
    assert.ok(html.includes('ghadiya-card bad'));
    assert.ok(html.includes(`Avoid · overlaps ${name}`));
    assert.ok(html.includes('hora-tag good'));
    assert.ok(html.includes('శుక్రుడు హోర'));
    assert.ok(html.includes('Venus hora'));
  }
});
