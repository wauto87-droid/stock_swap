const CACHE_NAME = 'stock-swap-v1';
const ASSETS_TO_CACHE = [
    './index.html',
    './manifest.json',
    'https://drive.google.com/thumbnail?id=11Ei7yOCH9TszasGvai4aOBVRswfZTASf&sz=w192',
    'https://drive.google.com/thumbnail?id=11Ei7yOCH9TszasGvai4aOBVRswfZTASf&sz=w512'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
