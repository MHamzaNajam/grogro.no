var interval = setInterval(function() {
  if (typeof window.Ecwid !== 'undefined') {
    // `window.Ecwid` exists
    console.log('Ecwid is available.');
    clearInterval(interval); // Stop the interval once `window.Ecwid` is found
  }
}, 100);
