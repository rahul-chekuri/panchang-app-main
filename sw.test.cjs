const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

function worker() {
  const scope = 'https://example.com/panchang/';
  const handlers = {}, entries = new Map(), writes = [], deleted = [], navigated = [];
  let fetchError = false, response = new Response('fresh'), claimed = false, skipped = false;
  const cache = {
    async addAll(requests) {
      for (const request of requests) {
        assert.equal(request.cache, 'reload');
        entries.set(request.url, new Response('preloaded'));
      }
    },
    async match(request) {
      return entries.get(new URL(typeof request === 'string' ? request : request.url, scope).href)?.clone();
    },
    async put(request, value) {
      const key = typeof request === 'string' ? request : request.url;
      writes.push(key); entries.set(key, value);
    }
  };
  const context = {
    self: {
      registration: { scope },
      addEventListener(name, callback) { handlers[name] = callback; },
      async skipWaiting() { skipped = true; },
      clients: {
        async claim() { claimed = true; },
        async matchAll() {
          return ['https://example.com/panchang/', 'https://example.com/other/'].map(url => ({
            url, async navigate(target) { navigated.push(target); }
          }));
        }
      }
    },
    caches: {
      async open() { return cache; },
      async keys() { return ['panchang-app-v4', 'unrelated-app', 'panchang-app-v5-other-scope']; },
      async delete(key) { deleted.push(key); }
    },
    async fetch(request, options) {
      assert.equal(options.cache, 'no-store');
      if (fetchError) throw new TypeError('offline');
      return response.clone();
    },
    URL, Request, Response, console
  };
  vm.runInNewContext(readFileSync(join(__dirname, 'sw.js'), 'utf8'), context);
  return {
    entries, writes, deleted, navigated,
    setOffline() { fetchError = true; },
    setResponse(value) { response = value; },
    get claimed() { return claimed; }, get skipped() { return skipped; },
    async lifecycle(name) {
      let promise;
      handlers[name]({ waitUntil(value) { promise = value; } });
      await promise;
    },
    request(path, mode = 'cors', method = 'GET') {
      let promise;
      handlers.fetch({
        request: { url: new URL(path, scope).href, mode, method },
        respondWith(value) { promise = value; }
      });
      return promise;
    }
  };
}

test('latest online app files replace old cached copies, even without changing the worker', async () => {
  const sw = worker();
  sw.entries.set('https://example.com/panchang/app.js', new Response('stale'));
  assert.equal(await (await sw.request('app.js')).text(), 'fresh');
  assert.equal(await sw.entries.get('https://example.com/panchang/app.js').text(), 'fresh');
});

test('offline uses the saved app shell; missing files and HTTP errors are not disguised as success', async () => {
  const sw = worker();
  await sw.lifecycle('install');
  sw.setResponse(new Response('Not found', { status: 404 }));
  assert.equal((await sw.request('app.js')).status, 404);
  sw.setOffline();
  assert.equal(await (await sw.request('?date=today', 'navigate')).text(), 'preloaded');
  assert.equal(await (await sw.request('app.js')).text(), 'preloaded');
  sw.entries.delete('https://example.com/panchang/app.js');
  await assert.rejects(sw.request('app.js'), /offline/);
});

test('upgrading activates immediately, reloads old in-scope clients, and preserves unrelated caches', async () => {
  const sw = worker();
  await sw.lifecycle('install');
  await sw.lifecycle('activate');
  assert.equal(sw.skipped, true);
  assert.equal(sw.claimed, true);
  assert.deepEqual(sw.deleted, ['panchang-app-v4']);
  assert.deepEqual(sw.navigated, ['https://example.com/panchang/']);
});

test('non-GET, external and unrelated requests are not intercepted', () => {
  const sw = worker();
  assert.equal(sw.request('app.js', 'cors', 'POST'), undefined);
  assert.equal(sw.request('https://other.example/app.js'), undefined);
  assert.equal(sw.request('../other/app.js'), undefined);
  assert.equal(sw.request('custom-file.txt'), undefined);
});
