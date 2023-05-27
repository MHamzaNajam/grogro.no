function isIndividualProductPage(url) {
  var parts = url.split('-');
  var lastPart = parts[parts.length - 1];
  return lastPart.startsWith('p');
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function main()
{
  // page load
  console.log('main called due to page load');
  var url =  window.location.href;
  console.log('url', url);
  
  var isIndividual = isIndividualProductPage(url);
  if(!isIndividual) return;
  console.log("It is an individual product page!");
  
  // give time to load the dom
  await sleep(2000);
  
  //
  var skuMeta = document.querySelector('meta[itemprop="sku"]');
  console.log('found meta?', skuMeta);
  var skuValue = skuMeta ? skuMeta.getAttribute('content') : null;
  
  if(!skuValue) return;
  // print the sku for the product
  console.log('Individual Product SKU:', skuValue);
  
  // check if chilled or unchilled
  if(!skuValue.startsWith("2")){
    console.log("It's an unchilled product");
    return;
  }
  
  // if it is chilled
  // get all the buttons (add to cart button)
  // two probably - 1 for phone an 1 for pc let's see
  
  var buttons = document.querySelectorAll('.form-control__button');

  // print the buttons!
  buttons.forEach(function(button) {
    console.log(button);
  });

  
  

}

window.onload = function() {
    main();
};



