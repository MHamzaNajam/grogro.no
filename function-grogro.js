function executeOnEcwidAvailable(intervalMs) {

  let pageLoadFound = false;
  let pageLoadedFound = false;
  
  function checkEcwidAvailability() {
    
    if (typeof window.Ecwid !== 'undefined') {
      
      if(Ecwid?.OnPageLoad && !pageLoadFound) {
        console.log('page load found, add handler for page Load');
        Ecwid.OnPageLoad.add(function () { console.log('load') });
        pageLoadFound = true;
      }
       if(Ecwid?.OnPageLoaded && !pageLoadedFound) {
        console.log('page loaded found, add handler for page Loaded');
        Ecwid.OnPageLoaded.add(function () { console.log('loaded') });
        pageLoadedFound = true;
      }

    }
  }
  var intervalId = setInterval(checkEcwidAvailability, intervalMs);
  if(pageLoadFound  && pageLoadedFound) clearInterval(intervalId);    
}


executeOnEcwidAvailable(500); 
