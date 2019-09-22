importScripts("workbox-v4.3.1/workbox-sw.js");

workbox.setConfig({modulePathPrefix: 'workbox-v4.3.1/'})

const precacheManifest = [
  {
    "url": "192.png",
    "revision": "3cab3c16b6f9b122efff5bcaeaa7a030"
  },
  {
    "url": "512.png",
    "revision": "29d02d3f57d7efca224106933ff9f775"
  },
  {
    "url": "ads.txt",
    "revision": "619d557520dc6aebc777fe87af6b53a7"
  },
  {
    "url": "apple-touch-icon-180x180.png",
    "revision": "cf46f9449b69e7543503a97af6abc739"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "3cab3c16b6f9b122efff5bcaeaa7a030"
  },
  {
    "url": "arubapagebanner.JPG",
    "revision": "bdbc9a8627337e391d6a644530da5d81"
  },
  {
    "url": "asset-manifest.json",
    "revision": "ce5d40029118eab21f7ae479f7546ee2"
  },
  {
    "url": "favicon.ico",
    "revision": "0097483bdd9c2a3d47dc9460d6145b76"
  },
  {
    "url": "index.html",
    "revision": "4b1545d0214a0d3b9e3f8fde14d643cb"
  },
  {
    "url": "loader.css",
    "revision": "4d8e2609a82b9cc5dec53a8bb882eeed"
  },
  {
    "url": "manifest.json",
    "revision": "efc0b89a4245dbb5f5cf306057fced00"
  },
  {
    "url": "react-player.min.css",
    "revision": "6e97874136c5e80a7d0b5d1d29c41634"
  },
  {
    "url": "service-worker.js",
    "revision": "67919094bb699edacb3a9c4e3024d85b"
  },
  {
    "url": "static/css/main.ba17af96.css",
    "revision": "5fda1c1371c62286660ec6215b77bf9b"
  },
  {
    "url": "static/js/main.f32c41cc.js",
    "revision": "a4fdc9da57c8ea34b8954e0ab9371aa5"
  },
  {
    "url": "static/media/24ora.a7c8bf13.jpg",
    "revision": "a7c8bf13ab0b67bf9f9ef323433f0bd8"
  },
  {
    "url": "static/media/297sport.ac3557a3.JPG",
    "revision": "ac3557a3d9b69fa3b087fee6c8d9a3f8"
  },
  {
    "url": "static/media/aruba.0097483b.ico",
    "revision": "0097483bdd9c2a3d47dc9460d6145b76"
  },
  {
    "url": "static/media/arubaNative.0e65099c.PNG",
    "revision": "0e65099ce8c0158c5753cec30c336472"
  },
  {
    "url": "static/media/awe.257ac8ca.PNG",
    "revision": "257ac8cacdd4d5ab490e30be1497fb90"
  },
  {
    "url": "static/media/aweMainta.9b12ae89.PNG",
    "revision": "9b12ae8966c9ea3dc02bc1be35e9a306"
  },
  {
    "url": "static/media/batiBlekiHD.d4b9b083.PNG",
    "revision": "d4b9b083bcf5211d811a45ffc6b9ce61"
  },
  {
    "url": "static/media/boletinHD.26423561.jpg",
    "revision": "26423561bc77e3db5fd252ed49bc303f"
  },
  {
    "url": "static/media/bondia.25db4f13.PNG",
    "revision": "25db4f133011fb556d5c07b201336266"
  },
  {
    "url": "static/media/coolFm.47356cae.png",
    "revision": "47356cae650cd41f509a221ccbbef192"
  },
  {
    "url": "static/media/diario.f4a5deea.PNG",
    "revision": "f4a5deeae1c3780dea765c83fc77ee82"
  },
  {
    "url": "static/media/eArubiano.b4e35207.PNG",
    "revision": "b4e352075c539bdee451ff1b69e20c58"
  },
  {
    "url": "static/media/focus.66065183.PNG",
    "revision": "66065183f7b4f506a441a3d50bb4f911"
  },
  {
    "url": "static/media/masnoticia.ec232440.PNG",
    "revision": "ec232440a78fc4f833a0b29ffd39c005"
  },
  {
    "url": "static/media/noticiaCLa.aa9202e7.PNG",
    "revision": "aa9202e7e98b54056c2fc8563c9690c5"
  },
  {
    "url": "static/media/soloDefaultimg.5417e189.jpg",
    "revision": "5417e189832641c789b2961ca0991404"
  },
  {
    "url": "static/media/TeleArubaGrey.2389ed14.png",
    "revision": "2389ed1471999666f5a19724f47ac3a9"
  },
  {
    "url": "static/media/twitterPage.832d4675.PNG",
    "revision": "832d46752d45c17d6374f242772cca76"
  },
  {
    "url": "workbox-v4.3.1/workbox-background-sync.dev.js",
    "revision": "5446355eef3aa184b5b6eebfcd81f8d9"
  },
  {
    "url": "workbox-v4.3.1/workbox-background-sync.prod.js",
    "revision": "1ffcc362312a9e8ef4e28280ace2a1bd"
  },
  {
    "url": "workbox-v4.3.1/workbox-broadcast-update.dev.js",
    "revision": "0508d13784c9b0549663f40e3fe55d37"
  },
  {
    "url": "workbox-v4.3.1/workbox-broadcast-update.prod.js",
    "revision": "ee27c0fdc836f6a2dc656b25a680f9e4"
  },
  {
    "url": "workbox-v4.3.1/workbox-cacheable-response.dev.js",
    "revision": "ecba3679d285394f1c9e219681662721"
  },
  {
    "url": "workbox-v4.3.1/workbox-cacheable-response.prod.js",
    "revision": "a38e8afa80070ec9dff5dc2fb116f1c2"
  },
  {
    "url": "workbox-v4.3.1/workbox-core.dev.js",
    "revision": "2912182ccc99b017a8c36802cf9d983f"
  },
  {
    "url": "workbox-v4.3.1/workbox-core.prod.js",
    "revision": "5d14d8267f65030735589e4b664ee3bf"
  },
  {
    "url": "workbox-v4.3.1/workbox-expiration.dev.js",
    "revision": "43c236fe62480f042c35e8b898ca3367"
  },
  {
    "url": "workbox-v4.3.1/workbox-expiration.prod.js",
    "revision": "a767f3bbd2773a0bea34ff841b51ab64"
  },
  {
    "url": "workbox-v4.3.1/workbox-navigation-preload.dev.js",
    "revision": "a8f30e409f7037906053acec7d709beb"
  },
  {
    "url": "workbox-v4.3.1/workbox-navigation-preload.prod.js",
    "revision": "e2b19a3eda50f48ce7fc48640a523353"
  },
  {
    "url": "workbox-v4.3.1/workbox-offline-ga.dev.js",
    "revision": "3fba0947d12d42834b81499fafc76e82"
  },
  {
    "url": "workbox-v4.3.1/workbox-offline-ga.prod.js",
    "revision": "6af4fb51a5249c4e0ed7bc61ed59836d"
  },
  {
    "url": "workbox-v4.3.1/workbox-precaching.dev.js",
    "revision": "8fbbefcd70c998a3cd35f02e6a8ac4e7"
  },
  {
    "url": "workbox-v4.3.1/workbox-precaching.prod.js",
    "revision": "e8f5c57430ec7c448d30015ff4bd5896"
  },
  {
    "url": "workbox-v4.3.1/workbox-range-requests.dev.js",
    "revision": "0f15c57cf5c75cc72b6f23ad28a941d1"
  },
  {
    "url": "workbox-v4.3.1/workbox-range-requests.prod.js",
    "revision": "97c430406d13f4b91c805594ef351261"
  },
  {
    "url": "workbox-v4.3.1/workbox-routing.dev.js",
    "revision": "471b8e0f45e6e5e679d04f60c6466e7f"
  },
  {
    "url": "workbox-v4.3.1/workbox-routing.prod.js",
    "revision": "d3fa76a1c38649d596b1d2ffaf398128"
  },
  {
    "url": "workbox-v4.3.1/workbox-strategies.dev.js",
    "revision": "d1c19737e82e2f6bd567aaf384683174"
  },
  {
    "url": "workbox-v4.3.1/workbox-strategies.prod.js",
    "revision": "6033181992f0bc562ab1ef5f9ba34697"
  },
  {
    "url": "workbox-v4.3.1/workbox-streams.dev.js",
    "revision": "eed9eb6f7b0672c45db5408d05efe9b9"
  },
  {
    "url": "workbox-v4.3.1/workbox-streams.prod.js",
    "revision": "4407a13523f1fa1064f616e9047b6148"
  },
  {
    "url": "workbox-v4.3.1/workbox-sw.js",
    "revision": "6e1e47d706556eac8524f396e785d4bb"
  },
  {
    "url": "workbox-v4.3.1/workbox-window.dev.umd.js",
    "revision": "c17834573a1b48bb8cf33b12128bdae9"
  },
  {
    "url": "workbox-v4.3.1/workbox-window.prod.umd.js",
    "revision": "c65238721ed1187cf832e51a9e34724a"
  }
];

workbox.precaching.precacheAndRoute(precacheManifest);