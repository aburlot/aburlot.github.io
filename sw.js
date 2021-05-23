var cacheName = 'mypwa1';
var filesToCache = [
    '/',
    '/index.html',
    '/404.html',
    '/about.html',
    '/sitemap.html',
    '/css/site.css',
    '/css/prism.css',
    '/css/fonts/firasans/fira.css',
    '/css/fonts/firasans/woff/FiraSans-LightItalic.woff',
    '/css/fonts/firasans/woff/FiraSans-BoldItalic.woff',
    '/css/fonts/firasans/woff/FiraSans-MediumItalic.woff',
    '/css/fonts/firasans/woff/FiraSans-Regular.woff',
    '/css/fonts/firasans/woff/FiraSans-RegularItalic.woff',
    '/css/fonts/firasans/woff/FiraSans-Light.woff',
    '/css/fonts/firasans/woff/FiraSans-Medium.woff',
    '/css/fonts/firasans/woff/FiraSans-Bold.woff',
    '/css/fonts/firasans/ttf/FiraSans-RegularItalic.ttf',
    '/css/fonts/firasans/ttf/FiraSans-LightItalic.ttf',
    '/css/fonts/firasans/ttf/FiraSans-MediumItalic.ttf',
    '/css/fonts/firasans/ttf/FiraSans-Regular.ttf',
    '/css/fonts/firasans/ttf/FiraSans-Bold.ttf',
    '/css/fonts/firasans/ttf/FiraSans-Medium.ttf',
    '/css/fonts/firasans/ttf/FiraSans-Light.ttf',
    '/css/fonts/firasans/ttf/FiraSans-BoldItalic.ttf',
    '/css/fonts/firasans/eot/FiraSans-BoldItalic.eot',
    '/css/fonts/firasans/eot/FiraSans-Light.eot',
    '/css/fonts/firasans/eot/FiraSans-Regular.eot',
    '/css/fonts/firasans/eot/FiraSans-Medium.eot',
    '/css/fonts/firasans/eot/FiraSans-RegularItalic.eot',
    '/css/fonts/firasans/eot/FiraSans-Bold.eot',
    '/css/fonts/firasans/eot/FiraSans-MediumItalic.eot',
    '/css/fonts/firasans/eot/FiraSans-LightItalic.eot',
    '/js/main.js',
    '/notes/index.html',
    '/notes/sciences.html',
    '/notes/rando.html',
    '/notes/informatique.html',
    '/notes/lecture.html',
    '/notes/musique.html',
    '/notes/glossaire.html'
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
