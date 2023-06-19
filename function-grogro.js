function executeOnEcwidAvailable(intervalMs) {
  var executed = false;
  function checkEcwidAvailability() {
    //  && typeof 
    if (typeof window.Ecwid !== 'undefined' && !executed) {
      executed = true;
      //
      console.log('oh yee?', window.Ecwid);
      console.log('on page link change : ',  window.Ecwid.OnPageLoad);
      console.log('on page load : ',  window.Ecwid.OnPageLoaded);
    }
  }
  var intervalId = setInterval(checkEcwidAvailability, intervalMs);
  // clearInterval(intervalId);    
}


executeOnEcwidAvailable(500); 
