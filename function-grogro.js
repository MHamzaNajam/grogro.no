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


function checkZipCode(value) {
  var zipCodes = ["12345", "67890", "54321", "98765"]; // Array of zip codes
  
  // Check if the value exists in the zip code array
  if (zipCodes.includes(value)) {
    return true; // Value found in the array
  } else {
    return false; // Value not found in the array
  }
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
  
  var warningParagraph = document.createElement('p');
  warningParagraph.textContent = '';
  warningParagraph.style.color = 'red';
  
  inputField.style.textAlign = 'center';
  
  // Add event listener to allow only numbers
  inputField.addEventListener('keypress', function(event) {
    var key = event.which || event.keyCode;
    var valid = (key >= 48 && key <= 57) || key === 8 || key === 0;
    if (!valid) {
      event.preventDefault();
    }
    
    let isValidZipcode = checkZipCode(inputField.value);
    if(isValidZipcode) {
      warningParagraph.textContent = '';
    }
    else {
       warningParagraph.textContent = 'The zipcode you entered is not valid!';
    }
    
  });



  
  // Append the input field to the button container
  buttonContainer.prepend(warningParagraph); 
  buttonContainer.prepend(inputField);  
  
}

window.onload = function() {
    main();
};



