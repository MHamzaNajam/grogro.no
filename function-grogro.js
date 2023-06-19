function executeOnEcwidAvailable(intervalMs) {
  function checkEcwidAvailability() {
    //  && typeof 
    if (typeof window.Ecwid !== 'undefined') {
      //
      console.log('this is printed', Ecwid, Ecwid?.OnPageLoad);
      // Ecwid.OnPageLoaded.add(function(page) { console.log("hi") });
      // Ecwid.OnPageLoad.add(function(page) { console.log("hello!") });
    }
  }
  var intervalId = setInterval(checkEcwidAvailability, intervalMs);
  // clearInterval(intervalId);    
}


executeOnEcwidAvailable(500); 
