var cacheName = 'pwaTeste+-v1.2';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',
    ]))
    );
  });
  
  self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
  });
  
  self.addEventListener('fetch', function (event) {
    //Atualizacao internet
    event.respondWith(async function () {
       try {
         return await fetch(event.request);
       } catch (err) {
         return caches.match(event.request);
       }
     }());

    });