function executeOnEcwidAvailable(intervalMs) {
  var executed = false;
  function checkEcwidAvailability() {
    if (typeof window.Ecwid !== 'undefined') {
      console.log('oh yee?', window.Ecwid);
    }
  }
  var intervalId = setInterval(checkEcwidAvailability, intervalMs);
  // clearInterval(intervalId);
}


executeOnEcwidAvailable(100); 
