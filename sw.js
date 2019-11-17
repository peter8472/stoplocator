/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "cff29cb48a1d6bcb3cf1fb0f10426ca8"
  },
  {
    "url": "app.js",
    "revision": "3e015c22af7cc406170f2fc81fd994e5"
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
    "revision": "2f675b347a51df778173154fdbaeb388"
  },
  {
    "url": "predictions.js",
    "revision": "16f94b98877b11bb57dd6a5f40c96a68"
  },
  {
    "url": "signup.html",
    "revision": "622c6141f6f6531688dc99afbf3c198e"
  },
  {
    "url": "stops.json",
    "revision": "46d36c562aaac990322e8bea1bbcf924"
  },
  {
    "url": "unitrans.html",
    "revision": "29640cc1546dbc6cdd9b14e7467b7604"
  },
  {
    "url": "util.js",
    "revision": "d9e3281364d413e387c503b45e405d1c"
  },
  {
    "url": "workbox-config.js",
    "revision": "538a69d60b768de9760cc57f659ab68c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
