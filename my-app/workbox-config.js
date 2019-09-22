module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{png,txt,JPG,json,ico,html,css,js,jpg,PNG}"
  ],
  "swDest": "build/sw.js",
  "swSrc": "src/sw.js",
  "injectionPointRegexp": /(const precacheManifest = )\[\](;)/,
  "maximumFileSizeToCacheInBytes": 4 * 1024 * 1024
};