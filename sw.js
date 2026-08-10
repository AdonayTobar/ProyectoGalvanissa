// sw.js
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Fuerza la activación inmediata
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return caches.delete(cacheName); // Borra toda la basqueda guardada
                })
            );
        }).then(() => {
            return self.clients.claim(); // Toma el control de la app de inmediato
        }).then(() => {
            return self.registration.unregister(); // Se desinstala a sí mismo
        })
    );
});

// Bloquea la lectura de cualquier archivo viejo
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => new Response('La aplicación ha sido descontinuada.'))
    );
});







