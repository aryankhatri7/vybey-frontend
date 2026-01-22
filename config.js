// ===== BACKEND URL (ONLY CHANGE THIS IN FUTURE) =====
window.API_BASE_URL = "https://vybey-backened.onrender.com";

// ===== AUTO FIX FOR ALL localhost CALLS =====
(function () {
  const originalFetch = window.fetch;

  window.fetch = function (url, options) {
    if (typeof url === "string" && url.includes("localhost:5000")) {
      url = url.replace("http://localhost:5000", window.API_BASE_URL);
    }
    return originalFetch(url, options);
  };
})();
