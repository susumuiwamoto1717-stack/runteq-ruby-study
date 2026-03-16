const CACHE_NAME = 'ruby-study-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './img/ch01.png',
  './img/ch02.png',
  './img/ch03.png',
  './img/ch04.png',
  './img/ch05.png',
  './img/ch06.png',
  './img/ch07.png',
  './img/ch08.png',
  './img/ch09.png',
  './img/ch10.png',
  './img/ch11.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      const clone = resp.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      return resp;
    }))
  );
});
