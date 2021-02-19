// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/sw.js")
//     .then(serviceWorker => {
//       console.log("Service Worker registered: ", serviceWorker);
//     })
//     .catch(error => {
//       console.error("Error registering the Service Worker: ", error);
//     });
// }
window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/sw.js');
  }
}

// Test du cache https://web.dev/codelab-http-cache/
// const express = require('express');
// const app = express();
// app.use(express.static('public', {
//   etag: true, // Just being explicit about the default.
//   lastModified: true,  // Just being explicit about the default.
//   setHeaders: (res, path) => {
//     const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

//     if (path.endsWith('.html')) {
//       // All of the project's HTML files end in .html
//       res.setHeader('Cache-Control', 'no-cache');
//     } else if (hashRegExp.test(path)) {
//       // If the RegExp matched, then we have a versioned URL.
//       res.setHeader('Cache-Control', 'max-age=31536000');
//     }
//   },
// }));
