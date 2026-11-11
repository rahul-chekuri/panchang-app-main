const GHADIYA_ROWS = [
['ప్రయాణారోగ్యసిద్ధి','కార్యహాని','ధనలాభం','ధనలాభం','ధనలాభం','కార్యసిద్ధి','కార్యహాని'],
['విద్యాజయం','రాజభయభ్రష్ట','ప్రయాణజయం','మనఃక్షోభం','మనఃక్షోభసిద్ధి','కార్యనాశనము','సౌఖ్యము'],
['ఉద్యోగలాభం','వాహన ప్రాప్తి','దుఃఖము','ధనలాభం','అనారోగ్యం','ధనలాభము','వివాహసిద్ధి'],
['శత్రుబాధ','స్త్రీ సౌఖ్యము','భూతభయము','యత్నకార్యసిద్ధి','వాహనప్రాప్తి','రాజానుగ్రహం','మిత్రత్వం'],
['చోరభయం','భూలాభము','వాహనప్రాప్తి','కార్యభంగము','వివాహశుభం','అపజయం','ప్రయాణజయం'],
['దుఃఖము','స్నేహలాభము','పరోపకారము','ముఖవైభవము','సుభాషణం','కార్యజయం','వాహనలాభం'],
['ఆపద్సిద్ధి','గుప్తధనలాభము','వస్త్ర ప్రాప్తి','మనశ్చాంచల్యం','ఉద్యోగలాభం','దుఃఖం-భయం','కార్యజయం'],
['సౌఖ్య-లాభం','భూమివ్యవహారము','ప్రయాణకష్టం','ఉపద్రవములు','స్వామిసిద్ధ్యం','ధైర్యం','రాజస్నానం'],
['వివాహాది శుభాని','ఉద్యోగము','వివాదహాని','జయప్రదము','ప్రయాణభంగం','కష్ట-నష్టములు','కార్యకష్టం'],
['మిత్రవృద్ధి','ప్రియభోజనం','శత్రుబాధ','ప్రయాణభయము','కార్యసిద్ధి','సౌఖ్యము','ప్రయాణహాని'],
['మిత్రనాశనం','స్త్రీ లాభము','స్త్రీ లాభము','రాజసన్మానము','వివాహజయం','అనారోగ్యము','వస్త్ర-స్త్రీలాభాలు'],
['ఆరోగ్యం','రాజదర్శనం','కార్యనాశనము','ధననష్టసిద్ధి','వివాహజయం','మనఃవాంఛసిద్ధి','మనశ్చాంచల్యం'],
['శుభకార్యజయం','కార్యభంగం','కష్టము','ఉద్యోగము','రోగనాశం','క్షేమం - లాభం','మిత్రకష్టం'],
['ప్రయత్నఫలం','రోగపీడ','బంధుభయం','లాభము','కలహభయం','కార్యజయం','మిత్రప్రాప్తి'],
['విజయము','కార్యసిద్ధి','అగ్నిభాధ','ప్రయత్నజయం','ఉద్యోగ నష్టం','శత్రుభయం','స్త్రీ లాభం'],
['ఉద్యోగం','శత్రునాశము','రోగభయం','వస్త్రలాభం','కోర్టు పీడ','శత్రునాశనం','ధనలాభము'],
['జ్వరప్రాప్తి','గౌరవ లాభము','పుత్రలాభము','సంతోషం','కార్యజయం','అతిభయము','ప్రయాణజయం'],
['రాజస్నానం','కార్యజయము','కార్యజయము','క్షేమం','సౌఖ్యం','విద్యాసిద్ధి','ప్రయాణ నష్టం'],
['ప్రయాణలాభము','ఆరోగ్యం','చిక్కులు','స్వల్ప లాభం','భోజనం','రోగపీడలు','క్షేమం'],
['విద్యము','మిత్రలాభము','రాజసన్మానము','క్షేమం','వివాహకళహం','దుఃఖము','వాహనసౌఖ్యం'],
['మిత్రత్వము','సౌఖ్యము','ఒమ్ము అగుట','ఇష్టసిద్ధి','వివాదజయం','వాహనప్రాప్తి','జ్ఞానసిద్ధి'],
['జ్వరభయము','కార్యభంగము','కార్యక్రమము','పుత్రలాభము','యాత్రాశుభం','స్త్రీ లాభము','వినోదము'],
['ధనలాభము','వివాహజయం','అవజయం','ఉద్యోగలాభం','ధైర్యహాని','సౌఖ్యము','కలహము'],
['బంధనం','కార్యసిద్ధి','శత్రుభయము','ప్రయాణజయం','కార్యభంగం','వైటకవిడ','ఉద్యోగకష్టం'],
['స్నేహలాభము','ధనలాభము','ఉద్యోగసిద్ధి','వ్యవహారజయం','ప్రయాణక్షేమం','విజయంతభయము','ప్రయత్నజయం'],
['విద్యాభంగము','విద్యాలాభము','జయప్రదము','వివాహశుభం','వివాహశుభం','ప్రయాణకష్టం','మనస్తాపం'],
['స్త్రీ భోగం','స్థిరకార్యనాశము','కార్యసిద్ధి','కార్యజయం','కలహభయం','శత్రుభయము','శత్రునాశం'],
['కుటుంబ ఐక్యత','ఉద్యోగసిద్ధి','కార్యభంగం','మనఃక్లేశము','పుత్రకష్టబాధ','కార్యసిద్ధి','విరోధనాశనం'],
['ప్రయాణ నాశము','యాత్రా ప్రాప్తి','సుఖసౌఖ్యం','బంధుసమాగమము','విద్యాసిద్ధి','ప్రయాణశుభఫలము','ప్రయాణలాభం'],
['భూళాభము','రాజభయం','మిత్రత్వము','వాహనసుఖము','విద్యాసిద్ధి','దుఃఖము','ప్రయాణఫలము']
];
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const PLANETS = [
  {name:'సూర్యుడు',en:'Sun',tone:'bad'}, {name:'శుక్రుడు',en:'Venus',tone:'good'}, {name:'బుధుడు',en:'Mercury',tone:'average'},
  {name:'చంద్రుడు',en:'Moon',tone:'good'}, {name:'శని',en:'Saturn',tone:'bad'}, {name:'గురుడు',en:'Jupiter',tone:'good'}, {name:'కుజుడు',en:'Mars',tone:'average'}
];
const WEEKDAY_START = [0,3,6,2,5,1,4];
const RAHU = [8,2,7,5,6,4,3], YAMA = [5,4,3,2,1,7,6], GULIKA = [7,6,5,4,3,2,1];
const DURMUHURTA = [14,9,4,8,6,4,1];
const BAD_WORDS = /హాని|నష్టం|నష్ట|భయం|భయము|బాధ|కష్టం|కష్టము|క్లేశ|పీడ|క్షోభ|భంగం|నాశనం|నాశనము|అనారోగ్య|రోగ|జ్వరభయ|జ్వరప్రాప్తి|కలహ|చోర|అపజయం|అవజయం|దుఃఖ|అగ్నిభాధ|బంధనం|చిక్కులు|మనస్తాపం|ఉపద్రవ|ఒమ్ము అగుట/;
const GOOD_WORDS = /సిద్ధి|లాభ|జయం|జయము|విజయ|సౌఖ్య|క్షేమ|ఆరోగ్యం|సంతోషం|ప్రాప్తి|శుభ|గౌరవ|స్నేహ|మిత్ర|రాజానుగ్రహ|రాజసన్మాన|జ్ఞాన|విద్యాజయం|ధైర్యం|వైభవ|ప్రియభోజనం|పరోపకార|సుభాషణ|స్థిరకార్య|కుటుంబ ఐక్యత|బంధుసమాగమ|వినోద|వాహనసుఖ|వాహనలాభ|వాహనప్రాప్తి|వస్త్ర/;
const $ = (id) => document.getElementById(id);
const dateInput = $('dateInput'), statusEl = $('status'), resultsEl = $('searchResults');
let place = null, installPrompt = null;

function classify(text) {
  if (/శత్రునాశ|విరోధనాశ/.test(text)) return 'good';
  if (BAD_WORDS.test(text)) return 'bad';
  if (GOOD_WORDS.test(text)) return 'good';
  return 'average';
}
function weekday(dateString) { return new Date(`${dateString}T12:00:00`).getDay(); }
function toMinutes(iso) { const m = iso.match(/T(\d{2}):(\d{2})/); if (!m) throw new Error('Sunrise/sunset time was not returned in a recognizable format.'); return Number(m[1])*60+Number(m[2]); }
function fmt(minute, withPeriod=true) {
  const normalized = ((Math.round(minute)%1440)+1440)%1440, h=Math.floor(normalized/60), m=normalized%60;
  const hour12 = h%12 || 12;
  return `${hour12}:${String(m).padStart(2,'0')}${withPeriod ? ` ${h<12?'AM':'PM'}` : ''}`;
}
function datePlus(date, offset) { const d = new Date(`${date}T12:00:00`); d.setDate(d.getDate()+offset); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function intersects(a,b,c,d) { return a<d && c<b; }
function setStatus(message, error=false) { statusEl.textContent=message; statusEl.classList.toggle('error',error); }
function setPlace(lat,lon,name) { place={lat:Number(lat),lon:Number(lon),name}; localStorage.setItem('panchang-place',JSON.stringify(place)); $('placeInput').value=name; resultsEl.hidden=true; loadChart(); }

async function getSunTimes(date, lat, lon) {
  const tomorrow=datePlus(date,1), todayLocal=new Date();
  const dateIsPast = date < `${todayLocal.getFullYear()}-${String(todayLocal.getMonth()+1).padStart(2,'0')}-${String(todayLocal.getDate()).padStart(2,'0')}`;
  const endpoint=dateIsPast?'https://archive-api.open-meteo.com/v1/archive':'https://api.open-meteo.com/v1/forecast';
  const url=`${endpoint}?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&daily=sunrise,sunset&timezone=auto&start_date=${date}&end_date=${tomorrow}`;
  const response=await fetch(url); if(!response.ok) throw new Error('Could not fetch sunrise and sunset for that date. Check the date and try again.');
  const data=await response.json();
  if(!data.daily?.sunrise?.[0]||!data.daily?.sunset?.[0]||!data.daily?.sunrise?.[1]) throw new Error('No sunrise data was returned for this date and location.');
  return {sunrise:toMinutes(data.daily.sunrise[0]),sunset:toMinutes(data.daily.sunset[0]),nextSunrise:toMinutes(data.daily.sunrise[1]),timezone:data.timezone||'local'};
}
function makePeriods(dayIndex,sunrise,dayLength) {
  const eighth=dayLength/8, muhurta=dayLength/15;
  const slots=[['Rahu Kalam',RAHU[dayIndex]],['Yamagandam',YAMA[dayIndex]],['Gulika Kalam',GULIKA[dayIndex]]].map(([name,n])=>({name,start:sunrise+(n-1)*eighth,end:sunrise+n*eighth,detail:`Daylight part ${n} of 8`}));
  const n=DURMUHURTA[dayIndex]; slots.push({name:'Durmuhurtham',start:sunrise+(n-1)*muhurta,end:sunrise+n*muhurta,detail:`Daylight muhurta ${n} of 15`});
  return slots;
}
function makeHoras(dayIndex,sunrise,sunset,nextSunrise) {
  const dayLen=sunset-sunrise, nightLen=(nextSunrise+1440-sunset)%1440;
  return Array.from({length:24},(_,i)=>{
    const daytime=i<12, segment=daytime?i:i-12, len=daytime?dayLen/12:nightLen/12, start=daytime?sunrise+segment*len:sunset+segment*len;
    const p=PLANETS[(WEEKDAY_START[dayIndex]+i)%7];
    return {start,end:start+len,planet:p,tone:p.tone};
  });
}
function intersecting(items,start,end) { return items.filter(x=>intersects(start,end,x.start,x.end)); }
function renderSummary(sunrise,sunset,timezone,dayIndex) {
  $('dailySummary').innerHTML=`<div class="summary-card"><span>Sunrise · ${DAYS[dayIndex]}</span><strong>${fmt(sunrise)}</strong><small>${escapeHtml(place.name)}</small></div><div class="summary-card"><span>Sunset</span><strong>${fmt(sunset)}</strong><small>${escapeHtml(timezone)}</small></div><div class="summary-card"><span>Daylight</span><strong>${fmt(sunset-sunrise,false)} hrs</strong><small>Local solar day</small></div>`;
  $('dailySummary').hidden=false;
}
function renderPeriods(periods) {
  $('periodCount').textContent=`${periods.length} daily windows`;
  $('periodList').innerHTML=periods.map(p=>`<article class="period-card"><div class="period-name">${p.name}</div><div class="period-time">${fmt(p.start)} – ${fmt(p.end)}</div><div class="period-detail">${p.detail}</div></article>`).join('');
  $('periodSection').hidden=false;
}
function renderHoras(horas,periods) {
  $('horaList').innerHTML=horas.map((h,i)=>{
    const hit=intersecting(periods,h.start,h.end);
    const tags=hit.length?`<div class="tags">${hit.map(p=>`<span class="tag">${p.name}</span>`).join('')}</div>`:'';
    const rating=h.tone==='good'?'Favorable':h.tone==='bad'?'Avoid for new starts':'Mixed';
    return `<article class="hora-card ${h.tone}"><div class="hora-time">Hora ${String(i+1).padStart(2,'0')} · ${fmt(h.start)}–${fmt(h.end)}</div><div class="hora-planet"><strong>${h.planet.name}</strong><span>${h.planet.en}</span></div><div class="rating">${rating}</div>${tags}</article>`;
  }).join(''); $('horaSection').hidden=false;
}
function renderGhadiya(dayIndex,sunrise,horas,periods) {
  $('weekdayLabel').textContent=`${DAYS[dayIndex]} · Shubhakruth source table`;
  $('ghadiyaList').innerHTML=GHADIYA_ROWS.map((row,i)=>{
    const start=sunrise+i*24,end=start+24,text=row[dayIndex],tone=classify(text),hits=intersecting(periods,start,end),hora=intersecting(horas,start,end);
    const tags=[...hits.map(p=>`<span class="tag">${p.name}</span>`),...new Set(hora.map(h=>h.planet.en)).values()].map((x,j)=>typeof x==='string'&&j>=hits.length?`<span class="tag hora-tag">${x} hora</span>`:x).join('');
    const label=tone==='good'?'Favorable result':tone==='bad'?'Unfavorable result':'Mixed / verify';
    const timeLabel=`${fmt(start)}–${fmt(end)}`;
    return `<article class="ghadiya-card ${tone}"><div class="slot-time">${timeLabel}</div><div class="slot-content"><div class="slot-result" lang="te">${escapeHtml(text)}</div><div class="slot-rating">${label}</div>${tags?`<div class="tags">${tags}</div>`:''}</div></article>`;
  }).join(''); $('ghadiyaSection').hidden=false;
}
function escapeHtml(text) { return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
async function loadChart() {
  if(!place||!dateInput.value) return;
  setStatus(`Finding sunrise and sunset for ${place.name}…`);
  for(const id of ['dailySummary','periodSection','horaSection','ghadiyaSection']) $(id).hidden=true;
  try {
    const solar=await getSunTimes(dateInput.value,place.lat,place.lon), dayIndex=weekday(dateInput.value), dayLength=solar.sunset-solar.sunrise;
    if(dayLength<=0||dayLength>=1440) throw new Error('Sunrise/sunset values are not valid for this location and date.');
    const periods=makePeriods(dayIndex,solar.sunrise,dayLength), horas=makeHoras(dayIndex,solar.sunrise,solar.sunset,solar.nextSunrise);
    renderSummary(solar.sunrise,solar.sunset,solar.timezone,dayIndex); renderPeriods(periods); renderHoras(horas,periods); renderGhadiya(dayIndex,solar.sunrise,horas,periods);
    setStatus(`Showing ${DAYS[dayIndex]} in ${place.name}. Times are local to the selected place.`);
  } catch(error) { setStatus(error.message||'Unable to calculate this chart.',true); }
}
async function searchPlace() {
  const query=$('placeInput').value.trim(); if(query.length<2){setStatus('Enter at least two characters to search.',true);return;}
  setStatus('Searching places…'); resultsEl.hidden=true;
  try {
    const response=await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${encodeURIComponent(query)}`);
    if(!response.ok) throw new Error('Place search is unavailable right now.');
    const results=await response.json(); resultsEl.replaceChildren();
    if(!results.length){setStatus('No matching places found. Try a nearby city or a more specific name.');return;}
    for(const result of results){const button=document.createElement('button');button.type='button';button.className='result-button';button.textContent=result.display_name;button.addEventListener('click',()=>setPlace(result.lat,result.lon,result.display_name.split(',').slice(0,2).join(',')));resultsEl.append(button);}
    resultsEl.hidden=false; setStatus('Select a matching place from the results.');
  } catch(error){setStatus(error.message||'Place search failed.',true);}
}
$('searchButton').addEventListener('click',searchPlace);
$('placeInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();searchPlace();}});
$('gpsButton').addEventListener('click',()=>{
  if(!navigator.geolocation){setStatus('Location access is not available in this browser.',true);return;}
  setStatus('Requesting your location…');
  navigator.geolocation.getCurrentPosition(({coords})=>setPlace(coords.latitude,coords.longitude,'Current location'),()=>setStatus('Could not access location. Allow location permission or search for a city instead.',true),{enableHighAccuracy:false,timeout:12000});
});
dateInput.addEventListener('change',loadChart);
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;$('installButton').hidden=false;});
$('installButton').addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('installButton').hidden=true;});
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
const now=new Date(); dateInput.value=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
try {const saved=JSON.parse(localStorage.getItem('panchang-place'));if(saved?.lat&&saved?.lon){place=saved;$('placeInput').value=saved.name;loadChart();}} catch { localStorage.removeItem('panchang-place'); }
