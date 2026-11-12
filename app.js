const GHADIYA_ROWS = [
['Prayanakarya Siddhi','Karyahani','Dhana Labham','Dhurvarthalu','Dhana Labham','Karya Siddhi','Karyahani'],
['Vidya Jayam','Rajya Pujyatha','Rajya Pujyatha','Manah Kshobham','Mano Abheesta Siddhi','Karya Nasanamu','Soukhyamu'],
['Vudhyoga Kastam','Vahana Prapthi','Dhukhamu','Dhana Labham','Anarogyam','Dhana Labhamu','Vivaha Siddhi'],
['Sathru Vrudhi','Sthree Soukhyamu','Bhootha Bhayamu','Yatna Karya Siddhi','Vahana Prapthi','Rajanugraham','Mithrathvam'],
['Chora Bhayamu','Bhoo Labhamu','Vahana Prapthi','Karya Bhangamu','Vivaha Subham','Apajayam','Prayana Jayam'],
['Dhukhamu','Sthanabhramsamu','Paropakaramu','Maha Bhayamu','Sukhanasanamu','Karya Jayam','Vahana Labham'],
['Abheeshta Siddhi','Gupta Dhana Labhamu','Vasthra Prapthi','Manaschanchalyam','Vudhyoga Jayam','Dhukam Bhayam','Karya Jayam'],
['Soukhya Labham','Vyavahara Jayam','Prayana Nashtam','Upadravamulu','Swamy Dharshanam','Dhairyam','Raja Sanmanam'],
['Vivahadi Subhani','Vudhyogamu','Vivada Hani','Jaya Pradhamu','Prayana Bhangam','Kashta Nashtamulu','Karya Nashtam'],
['Mithra Vrudhi','Priya Bhojanam','Sathru Badha','Prayana Bhayamu','Karya Siddhi','Soukhyamu','Prayana Hani'],
['Mruthyu Bhayam','Sthree Labhamu','Sthree Labhamu','Raja Sanmanamu','Vyapara Jayam','Anukulam','Vasthra Sthree Labhalu'],
['Arogyam','Raja Dharshanam','Karya Nasanamu','Dhana Dhanya Vrudhi','Sathru Nasanam','Vasthu Vahana Prapthi','Manaschanchalyam'],
['Subha Karya Jayam','Karya Bhangam','Kashtamu','Vudhyoga Jayam','Vivaha Jayam','Kshemam Labham','Mithra Nashtam'],
['Prayatna Phalam','Roga Peeda','Janthu Bhayam','Labhamu','Roga Nasam','Karya Jayam','Mithra Prapthi'],
['Visha Bhayam','Karya Siddhi','Agni Badha','Prayatna Jayam','Kalaha Pradham','Sasthra Bhayam','Sthree Labham'],
['Vudhyogam','Sathru Nasanamu','Roga Peeda','Vasthra Labham','Vudhyoga Nashtam','Sathru Nasanam','Dhana Labhamu'],
['Jwara Prapthi','Go Labham','Puthra Labhamu','Santhosham','Kopa Theevratha','Athi Bhayamu','Prayana Jayam'],
['Raja Sanmanam','Karya Jayamu','Karya Jayamu','Kshemam','Karya Jayam','Vidya Siddhi','Prayana Nashtam'],
['Prayana Labhamu','Arogyam','Chikkulu','Swalpa Labham','Sthana Nasam','Roga Bhadhalu','Kshoomam'],
['Vivadhamu','Mithrathvam','Raja Sanmanamu','Kalahamu','Chora Bhayamu','Dhukhamu','Vahanayogam'],
['Mithrathvam','Soukhyamu','Ommu Aguta','Ishta Siddhi','Vivaha Kalahamu','Vahana Prapthi','Gnana Vrudhi'],
['Jwara Bhayamu','Karya Bhangamu','Karya Nashtamu','Puthra Labhamu','Vivada Jayamu','Sthree Labhamu','Vinodamu'],
['Dhana Labhamu','Vivaha Jayam','Apajayam','Vudhyoga Labham','Yathra Subham','Spotaka Peeda','Kalahamu'],
['Bandhanam','Karya Prapthi','Sathru Bhayamu','Prayana Jayam','Dhairya Hani','Visha Janthu Bhayam','Vudhyoga Nashtam'],
['Sthana Bhramsam','Dhana Labhamu','Vudhyoga Hani','Vyavahara Jayam','Karya Bhangam','Prayana Kastam','Prayatna Jayam'],
['Vidya Bhangamu','Vidya Labhamu','Jaya Pradhamu','Vivaha Subham','Prayana Kshemam','Sathru Bhayam','Manasthapam'],
['Sthree Bhogam','Sthira Karya Nasanamu','Karya Siddhi','Karya Jayam','Vivaha Subham','Karya Nashtam','Sathru Nasanam'],
['Prayana Jayam','Vudhyoga Jayam','Karya Labham','Manah Kleshamu','Kalaha Pradham','Prayana Soukhyam','Virodha Nasanam'],
['Prayana Nasanamu','Yathra Prapthi','Sukha Soukhyam','Bandhu Samagamamu','Jwara Sasthra Bhadha','Dhukhamu','Prayana Labham'],
['Bhoo Labhamu','Raja Bhayamu','Mithrathvam','Vahana Pramadhamu','Vidhya Vrudhi','Raja Sanmanam','Priya Varthalu']
];
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const PLANETS = [
  {name:'సూర్యుడు',en:'Sun',tone:'bad'}, {name:'శుక్రుడు',en:'Venus',tone:'good'}, {name:'బుధుడు',en:'Mercury',tone:'average'},
  {name:'చంద్రుడు',en:'Moon',tone:'good'}, {name:'శని',en:'Saturn',tone:'bad'}, {name:'గురుడు',en:'Jupiter',tone:'good'}, {name:'కుజుడు',en:'Mars',tone:'average'}
];
const WEEKDAY_START = [0,3,6,2,5,1,4];
const RAHU = [8,2,7,5,6,4,3], YAMA = [5,4,3,2,1,7,6], GULIKA = [7,6,5,4,3,2,1];
const DURMUHURTA = [14,9,4,8,6,4,1];
const BAD_WORDS = /hani|nasht|nasana|bhay|badha|bhadha|kast|kashta|dukh|dhuk|kshobha|bhang|anarogyam|roga peeda|roga bhadha|jwara|kalaha|kalah|vivadhamu|chora|apajayam|mruthyu|visha|bandhanam|chikkulu|klesha|peeda|pramadh|bhrams|nasam|upadravam|ommu aguta|manasthapam|kopa theevratha|dhurvarthalu|sathru vrudhi|chanchalyam|sthana nasam|sukhanasanamu/i;
const GOOD_WORDS = /siddhi|labham|labhamu|jaya|jayam|jayamu|vrudhi|soukhyamu|soukhy|kshemam|arogyam|santhosham|prapthi|subham|subhani|pujyatha|anugraham|sanmanam|priya bhojanam|paropakaramu|dhairyam|dharshanam|anukulam|yogam|gnana|vidya|yathra subham|ishta siddhi|prayatna phalam|vasthra labham|dhana dhanya vrudhi|vasthu vahana prapthi|priya varthalu|vahanayogam|mithra/i;
const $ = (id) => document.getElementById(id);
const dateInput = $('dateInput'), statusEl = $('status'), resultsEl = $('searchResults');
let place = null, installPrompt = null;

function classify(text) {
  const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();
  if (/sathru nasan|virodha nasan|roga nasam/.test(normalized)) return 'good';
  if (BAD_WORDS.test(normalized)) return 'bad';
  if (GOOD_WORDS.test(normalized)) return 'good';
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
    const tone=hit.length?'bad':h.tone;
    const rating=hit.length?`Avoid where overlapping · ${hit.map(p=>p.name).join(', ')}`:h.tone==='good'?'Favorable':h.tone==='bad'?'Avoid for new starts':'Mixed';
    return `<article class="hora-card ${tone}"><div class="hora-time">Hora ${String(i+1).padStart(2,'0')} · ${fmt(h.start)}–${fmt(h.end)}</div><div class="hora-planet"><strong>${h.planet.name}</strong><span>${h.planet.en}</span></div><div class="rating">${rating}</div>${tags}</article>`;
  }).join(''); $('horaSection').hidden=false;
}
function renderGhadiya(dayIndex,sunrise,horas,periods) {
  $('weekdayLabel').textContent=`${DAYS[dayIndex]} · Shubhakruth source table`;
  $('ghadiyaList').innerHTML=GHADIYA_ROWS.map((row,i)=>{
    const start=sunrise+i*24,end=start+24,text=row[dayIndex],tone=classify(text),hits=intersecting(periods,start,end),hora=intersecting(horas,start,end);
    const tags=[...hits.map(p=>`<span class="tag">${p.name}</span>`),...new Set(hora.map(h=>h.planet.en)).values()].map((x,j)=>typeof x==='string'&&j>=hits.length?`<span class="tag hora-tag">${x} hora</span>`:x).join('');
    const effectiveTone=hits.length?'bad':tone;
    const label=hits.length?`Avoid · overlaps ${hits.map(p=>p.name).join(', ')}`:tone==='good'?'Favorable result':tone==='bad'?'Unfavorable result':'Mixed / verify';
    const timeLabel=`${fmt(start)}–${fmt(end)}`;
    return `<article class="ghadiya-card ${effectiveTone}"><div class="slot-time">${timeLabel}</div><div class="slot-content"><div class="slot-result">${escapeHtml(text)}</div><div class="slot-rating">${label}</div>${tags?`<div class="tags">${tags}</div>`:''}</div></article>`;
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
