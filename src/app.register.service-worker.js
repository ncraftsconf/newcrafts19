// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

// Check compatibility for the browser we're running this in
if ("serviceWorker" in navigator) {
  if (!navigator.serviceWorker.controller) {
    // Register the service worker
    navigator.serviceWorker
      .register("service-worker.js", {
        scope: "./"
      })
      .then(function (reg) {
        console.log("Service worker has been registered for scope: " + reg.scope);
      });
  }
}
