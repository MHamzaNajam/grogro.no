function executeOnEcwidAvailable(callback, intervalMs) {
  var executed = false;
  function checkEcwidAvailability() {
    if (typeof window.Ecwid !== 'undefined' && typeof window.Ecwid.OnPageLoadeded !== 'undefined' &&  typeof window.Ecwid.OnPageLoad !== 'undefined' && !executed) {
      executed = true; 
      callback();
    }
  }

  var intervalId = setInterval(checkEcwidAvailability, intervalMs);


  function stopInterval() {
    if (executed) {
      clearInterval(intervalId);
    }
  }

  // Stop the interval after a certain duration (optional)
  setTimeout(stopInterval, 10000); // Change 10000 to the desired duration in milliseconds
}


executeOnEcwidAvailable(function() {
  // page load
  window.Ecwid.OnPageLoadeded.add(function(page) {
    console.log('main should be run');
  });
  // page change
  window.Ecwid.OnPageLoad.add(function(page) {
    console.log('main should be run');
  });

}, 1000); 
