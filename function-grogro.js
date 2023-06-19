function executeOnEcwidAvailable(intervalMs) {
  var executed = false;
  function checkEcwidAvailability() {
    //  && typeof 
    if (typeof window.Ecwid !== 'undefined' && !executed) {
      executed = true;
      //
      window.Ecwid.OnPageLoaded.add(function(page) { console.log("hi") });
      window.Ecwid.OnPageLoad.add(function(page) { console.log("hello!") });
    }
  }
  var intervalId = setInterval(checkEcwidAvailability, intervalMs);
  // clearInterval(intervalId);    
}


executeOnEcwidAvailable(500); 
