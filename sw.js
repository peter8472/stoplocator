console.log('Hello from service-worker.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
workbox.precaching.precacheAndRoute([
  {
    "url": "404.html",
    "revision": "cff29cb48a1d6bcb3cf1fb0f10426ca8"
  },
  {
    "url": "app.js",
    "revision": "97c21b82578fd4f289218bdbc6ebc51a"
  },
  {
    "url": "datastore.js",
    "revision": "5a74d67e2778e16ce89cc1c81cfa313b"
  },
  {
    "url": "demo.js",
    "revision": "1817e6922f90d7494165b1d72aa47f1d"
  },
  {
    "url": "elements.js",
    "revision": "25f6ff4fb61ff8bfb6ab6d047c640c39"
  },
  {
    "url": "haver.js",
    "revision": "2cbfe34ffe55ec4f245d05361f11b5c3"
  },
  {
    "url": "icons/icon128x128.png",
    "revision": "2c2c8369c70971e0b8347b354c7b5e5b"
  },
  {
    "url": "icons/icon16x16.png",
    "revision": "5964a461af33083dca3601de18f273ea"
  },
  {
    "url": "icons/icon48x48.png",
    "revision": "3b60aa4d3ce75a1afd021be0dd9a67bc"
  },
  {
    "url": "icons/icon60x60.png",
    "revision": "345fc3d03e2874cca9a2ee606865817c"
  },
  {
    "url": "index.html",
    "revision": "842beb6f304e16ca98a6ee3cf2053f8d"
  },
  {
    "url": "service-worker.js",
    "revision": "31d25ed0f06eaba3418b653b83f11803"
  },
  {
    "url": "stops.json",
    "revision": "46d36c562aaac990322e8bea1bbcf924"
  },
  {
    "url": "util.js",
    "revision": "d9e3281364d413e387c503b45e405d1c"
  },
  {
    "url": "workbox-config.js",
    "revision": "43cea9309a759cbc0437acd44c17f701"
  }
]);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}