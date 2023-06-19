function checkEcwidAvailability(callback) {
  var interval = setInterval(function() {
    if (typeof window.Ecwid !== 'undefined') {
      clearInterval(interval); // Stop the interval
      callback(); // Call the callback function
    }
  }, 100);
}

// Usage:
checkEcwidAvailability(function() {
  // This code will be executed when Ecwid becomes available
  window.Ecwid.OnPageLoaded.add(function(page) {
    if (page.type == "SITE") {
      // Do something with the Ecwid store page...
    }
  });
});
