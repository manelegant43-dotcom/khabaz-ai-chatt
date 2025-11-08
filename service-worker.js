// Service Worker för offline-stöd
const CACHE_NAME = 'khabaz-ai-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/knowledge.js',
    '/chatUI.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// Installera Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installerad');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Cachade filer');
                return cache.addAll(urlsToCache);
            })
    );
});

// Hantera förfrågningar
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Returnera cachad fil eller hämta från nätverk
                return response || fetch(event.request);
            })
    );
});

// Uppdatera cache när ny Service Worker aktiveras
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Aktiverad');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Rensar gammal cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
