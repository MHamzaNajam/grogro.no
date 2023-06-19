function executeOnEcwidAvailable(callback, intervalMs) {
  var executed = false; // Flag to track execution status

  function checkEcwidAvailability() {
    if (typeof window.Ecwid !== 'undefined' && !executed) {
      executed = true; // Set the flag to true
      callback(); // Call the callback function
    }
  }

  var intervalId = setInterval(checkEcwidAvailability, intervalMs); // Start checking Ecwid availability on the given interval

  // Stop the interval once Ecwid becomes available
  function stopInterval() {
    if (executed) {
      clearInterval(intervalId);
    }
  }

  // Stop the interval after a certain duration (optional)
  setTimeout(stopInterval, 10000); // Change 10000 to the desired duration in milliseconds
}

// Usage:
executeOnEcwidAvailable(function() {
  // This code will be executed whenever Ecwid becomes available
  window.Ecwid.OnPageLoaded.add(function(page) {
    if (page.type == "SITE") {
      // Do something with the Ecwid store page...
    }
  });
}, 1000); // Change 1000 to the desired interval duration in milliseconds
