const CACHE = 'tb-v4';
const STATIC = [
  '/', '/about', '/team', '/funding', '/contact', '/thank-you',
  '/topics', '/editorial-policy', '/corrections', '/ai-policy',
  '/privacy-policy', '/terms-of-service', '/cookies-policy',
  '/404', '/favicon.svg', '/og-image.png', '/feed.xml'
];
const API_CACHE = '/api/stories/published';

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(STATIC).catch(function(){}); }));
});

self.addEventListener('activate', function(e) {
  e.waitUntil(clients.claim().then(function() {
    caches.keys().then(function(keys) { keys.forEach(function(k) { if (k !== CACHE) caches.delete(k); }); });
  }));
});

self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);
  // Only handle same-origin requests — skip third-party (fonts.gstatic.com, supabase.co, etc.)
  // CSP blocks cross-origin fetch in SW, causing uncaught rejections
  if (url.origin !== location.origin) return;

  if (url.pathname.startsWith('/story/') || url.pathname.startsWith('/api/')) {
    e.respondWith(networkFirst(e.request));
    return;
  }
  if (STATIC.includes(url.pathname) || url.pathname.startsWith('/assets/')) {
    e.respondWith(cacheFirst(e.request));
    return;
  }
  e.respondWith(networkFirst(e.request));
});

function cacheFirst(req) {
  return caches.match(req).then(function(r) { return r || fetch(req).then(function(res) { var c = res.clone(); caches.open(CACHE).then(function(cache) { cache.put(req, c); }); return res; }); });
}

function networkFirst(req) {
  return fetch(req).then(function(res) {
    if (res.ok && req.method === 'GET') {
      try { var c = res.clone(); caches.open(CACHE).then(function(cache) { cache.put(req, c).catch(function(){}); }); } catch(e) {}
    }
    return res;
  }).catch(function() {
    return caches.match(req).then(function(m) { return m || new Response('', { status: 503 }); });
  });
}
