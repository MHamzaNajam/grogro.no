function isIndividualProductPage(url) {
  var parts = url.split('-');
  var lastPart = parts[parts.length - 1];
  return lastPart.startsWith('p');
}


function main()
{
  console.log('main called due to page load');
  var url =  window.location.href;
  console.log('url', url);
  var isIndividual = isIndividualProductPage(url);
  if(!isIndividual) return;
  console.log("It is an individual product page!");
  
  var skuMeta = document.querySelector('meta[itemprop="sku"]');
  console.log('found meta?', skyMeta);
  var skuValue = skuMeta ? skuMeta.getAttribute('content') : null;
  
  if(!skuValue) return;
  console.log('Individual Product SKU:', skuValue);

}

window.onload = function() {
  main();
};

document.addEventListener("DOMContentLoaded", function() {
   // function body
  console.log('is this the real page load?');
});

