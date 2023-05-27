function isIndividualProductPage(url) {
  var parts = url.split('-');
  var lastPart = parts[parts.length - 1];
  return lastPart.startsWith('p');
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getAddToCartButton() {
  var buttons = document.querySelectorAll('.form-control__button');

  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if (button.textContent.trim() === 'Legg i kurven') {
      return button;
    }
  }

  return null; // If no matching button is found
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
  await sleep(5000);
  
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
  
  var addToCartButton = getAddToCartButton();
  
  
  // if there is no add to cart button
  if(!addToCartButton) {
    console.log("can't be added to cart - no add button");
    return;
  }
  
  var buttonContainer = addToCartButton.parentNode.parentNode.parentNode;
  
  if(!buttonContainer) {
    console.log("no button container");
    return;
  }
  
  console.log("button & container", addToCartButton, buttonContainer);
  
  
  // Create an input element
  var inputField = document.createElement('input');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('placeholder', 'Enter ZipCode!');
  
  // Apply styles to the input field
  inputField.style.marginTop = '10px';
  inputField.style.marginBottom = '10px';
  inputField.style.padding = '5px';
  inputField.style.textAlign = 'center';

  
  // Prevent default behavior when clicking on the input field
  inputField.addEventListener('click', function(event) {
    event.preventDefault();
  });


  
  // Append the input field to the button container
  buttonContainer.prepend(inputField);  
  
}

window.onload = function() {
    main();
};



