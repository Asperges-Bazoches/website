var cacheName = 'ChampRamard-v1.1';
var appShellFiles = [
  'index.html',
  'timetable.html',
  'commander.html',
  'assets/css/style.css',
  'assets/css/resonsive.css',
  'assets/css/timetable/style.css',
  'assets/js/index.js',
  'assets/js/modal.js',
  'assets/js/order.js',
  'assets/js/script.js',
  'assets/js/timetable/main.js',
  'assets/js/timetable/utils.js',
  'assets/images/apserges_blanches.jpg',
  'assets/images/apserges_verte.jpg',
  'assets/images/angle-double-down-solid.svg',
  'assets/images/angle-double-down-solid-whie.svg',
  'assets/images/coffee-solid.svg',
  'assets/images/cash-register-solid.svg',
  'assets/images/envelope-solid.svg',
  'assets/images/facebook.svg',
  'assets/images/logo.svg',
  'assets/images/strawberry.svg',
  'assets/images/users-solid.svg',
  'assets/images/tractor-solid.svg',
  'assets/images/money-bill-wave-solid.svg',
  'assets/images/utensils-solid.svg',
  'assets/images/walking-solid.svg',
  'assets/images/labelbio-tampon.png',
  'assets/images/strawberry-pixabay.jpg',
  'assets/logo/logo.svg',
  'assets/logo/logo_192.png',
  'assets/logo/logo_256.png',
  'assets/logo/logo_512.png',
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
        if(key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});
