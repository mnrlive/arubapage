"use strict";var precacheConfig=[["/index.html","0ac544704d434aab05fdd5c9a1cc14a2"],["/static/css/main.ba17af96.css","5fda1c1371c62286660ec6215b77bf9b"],["/static/media/24ora.a7c8bf13.jpg","a7c8bf13ab0b67bf9f9ef323433f0bd8"],["/static/media/297sport.ac3557a3.JPG","ac3557a3d9b69fa3b087fee6c8d9a3f8"],["/static/media/TeleArubaGrey.2389ed14.png","2389ed1471999666f5a19724f47ac3a9"],["/static/media/aruba.0097483b.ico","0097483bdd9c2a3d47dc9460d6145b76"],["/static/media/arubaNative.0e65099c.PNG","0e65099ce8c0158c5753cec30c336472"],["/static/media/awe.257ac8ca.PNG","257ac8cacdd4d5ab490e30be1497fb90"],["/static/media/aweMainta.9b12ae89.PNG","9b12ae8966c9ea3dc02bc1be35e9a306"],["/static/media/batiBlekiHD.d4b9b083.PNG","d4b9b083bcf5211d811a45ffc6b9ce61"],["/static/media/boletinHD.26423561.jpg","26423561bc77e3db5fd252ed49bc303f"],["/static/media/bondia.25db4f13.PNG","25db4f133011fb556d5c07b201336266"],["/static/media/coolFm.47356cae.png","47356cae650cd41f509a221ccbbef192"],["/static/media/diario.f4a5deea.PNG","f4a5deeae1c3780dea765c83fc77ee82"],["/static/media/eArubiano.b4e35207.PNG","b4e352075c539bdee451ff1b69e20c58"],["/static/media/focus.66065183.PNG","66065183f7b4f506a441a3d50bb4f911"],["/static/media/masnoticia.ec232440.PNG","ec232440a78fc4f833a0b29ffd39c005"],["/static/media/noticiaCLa.aa9202e7.PNG","aa9202e7e98b54056c2fc8563c9690c5"],["/static/media/soloDefaultimg.5417e189.jpg","5417e189832641c789b2961ca0991404"],["/static/media/twitterPage.832d4675.PNG","832d46752d45c17d6374f242772cca76"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});