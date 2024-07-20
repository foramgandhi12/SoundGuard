const cacheName = 'cache-site'
const assetsToCache = [
  '/index.html',
  '/style.css',
  '/firebaseConfig.js',
  '/audioControl_d3_v3.js',
  '/auth.js',
  '/authProcess.js'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(assetsToCache)
      })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request)
      })
  )
})
