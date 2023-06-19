function executeOnEcwidAvailable(intervalMs) {
  function checkEcwidAvailability() {

    let pageLoadFound = false;
    let pageLoadedFound = false;
    if (typeof window.Ecwid !== 'undefined') {
      if(Ecwid?.OnPageLoad && !pageLoadFound) {
        console.log('hi');
        pageLoadFound = true;
      }
       if(Ecwid?.OnPageLoaded && !pageLoadedFound) {
        console.log('hello');
        pageLoadedFound = true;
      }

    }
  }
  var intervalId = setInterval(checkEcwidAvailability, intervalMs);
  if(pageLoadFound  && pageLoadedFound) clearInterval(intervalId);    
}


executeOnEcwidAvailable(500); 
