function executeOnEcwidAvailable(intervalMs) {
  var executed = false;
  function checkEcwidAvailability() {
    if (typeof window.Ecwid !== 'undefined' && typeof window.Ecwid.onPageLoad !== 'undefined' && typeof window.Ecwid.onPageLoaded !== 'undefined'&& !executed) {
      executed = true;
      //
      console.log('oh yee?', window.Ecwid);
      console.log('on page link change : ', window.Ecwid.onPageLoad);
      console.log('on page load : ', window.Ecwid.onPageLoaded);
    }
  }
  var intervalId = setInterval(checkEcwidAvailability, intervalMs);
  // clearInterval(intervalId);
}


executeOnEcwidAvailable(500); 
