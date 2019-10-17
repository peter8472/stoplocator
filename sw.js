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
    "revision": "a0769442ecb7ced352c3e2a0725bb511"
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
    "revision": "a13325fe27034cee7f2dcf22d0903007"
  },
  {
    "url": "service-worker.js",
    "revision": "31d25ed0f06eaba3418b653b83f11803"
  },
  {
    "url": "workbox-config.js",
    "revision": "e7f165d15d23dbf31f8dc29ec40bc523"
  }
]);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}