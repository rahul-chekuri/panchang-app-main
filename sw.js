const CACHE_PREFIX='panchang-app-';
const CACHE=`${CACHE_PREFIX}v5-${encodeURIComponent(self.registration.scope)}`;
const CORE=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon.svg'];
const CORE_URLS=new Set(CORE.map(path=>new URL(path,self.registration.scope).href));

self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(CORE.map(path=>new Request(new URL(path,self.registration.scope),{cache:'reload'})));
  await self.skipWaiting();
})()));

self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const stale=(await caches.keys()).filter(key=>key!==CACHE&&
    (/^panchang-app-v[1-4]$/.test(key)||key.startsWith(CACHE_PREFIX)&&key.endsWith(`-${encodeURIComponent(self.registration.scope)}`)));
  await Promise.all(stale.map(key=>caches.delete(key)));
  await self.clients.claim();
  // Old app versions have no update listener, so refresh their open pages once.
  if(stale.length){
    const windows=await self.clients.matchAll({type:'window'});
    await Promise.all(windows.filter(client=>client.url.startsWith(self.registration.scope)).map(async client=>{
      try { await client.navigate(client.url); }
      catch(error) { console.warn('Could not refresh the app after updating.',error); }
    }));
  }
})()));

self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||!url.href.startsWith(self.registration.scope)) return;
  const navigation=request.mode==='navigate';
  if(!navigation&&!CORE_URLS.has(url.href)) return;
  event.respondWith((async()=>{
    let response;
    try { response=await fetch(request,{cache:'no-store'}); }
    catch(error) {
      const cache=await caches.open(CACHE);
      const cached=await cache.match(request)||(navigation?await cache.match('./index.html'):null);
      if(cached) return cached;
      throw error;
    }
    if(response.ok){
      try {
        const cache=await caches.open(CACHE);
        await cache.put(navigation?new URL('./index.html',self.registration.scope).href:request,response.clone());
      } catch(error) { console.warn('Could not save this app file for offline use.',error); }
    }
    return response;
  })());
});
