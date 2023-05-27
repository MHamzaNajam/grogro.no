function isIndividualProductPage(url) {
  var parts = url.split('-');
  var lastPart = parts[parts.length - 1];
  return lastPart.startsWith('p');
}


var url =  window.location.href;
var isIndividualProduct = isIndividualProductPage(url);

alert(isIndividualProduct);
