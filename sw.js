var cacheName = 'my-pwa-1';
var filesToCache = [
    '/',
    '/index.html',
    '/css/site.css',
    '/js/main.js',
    '/notes/*',
    '/css/*'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });

/* Stale-while-revalidate */
// https://jakearchibald.com/2014/offline-cookbook/#stale-while-revalidate
self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(event.request);
    const networkResponsePromise = fetch(event.request);

    event.waitUntil(async function() {
      const networkResponse = await networkResponsePromise;
      await cache.put(event.request, networkResponse.clone());
    }());

    // Returned the cached response if we have one, otherwise return the network response.
    return cachedResponse || networkResponsePromise;
  }());
});

/* Network falling back to cache */
// https://jakearchibald.com/2014/offline-cookbook/#network-falling-back-to-cache
// self.addEventListener('fetch', (event) => {
//   event.respondWith(async function() {
//     try {
//       return await fetch(event.request);
//     } catch (err) {
//       return caches.match(event.request);
//     }
//   }());
// });
