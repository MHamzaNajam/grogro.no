function executeOnEcwidAvailable(intervalMs) {

  let pageLoadFound = false;
  let pageLoadedFound = false;
  
  function checkEcwidAvailability() {
    
    if (typeof window.Ecwid !== 'undefined') {
      
      if(Ecwid?.OnPageLoad && !pageLoadFound) {
        console.log('page load found, add handler for page Load');
        pageLoadFound = true;
      }
       if(Ecwid?.OnPageLoaded && !pageLoadedFound) {
        console.log('page loaded found, add handler for page Loaded');
        pageLoadedFound = true;
      }

    }
  }
  var intervalId = setInterval(checkEcwidAvailability, intervalMs);
  if(pageLoadFound  && pageLoadedFound) clearInterval(intervalId);    
}


executeOnEcwidAvailable(500); 
