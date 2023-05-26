//javascript file for Ecwid store "grogro.no"
//custom-app to add additional functionality related chilled and unchilled products delivery zones.

/*
// Retrieve the SKU of the current product
var currentProductSku = ecwidProduct.productId.toString();

// Check if the product is a chilled product (SKU starts with "2")
if (currentProductSku.startsWith('2')) {
  // Create the "Enter Your Zipcode" input field
  var zipcodeInput = document.createElement('input');
  zipcodeInput.type = 'text';
  zipcodeInput.id = 'zipcodeInput';
  zipcodeInput.placeholder = 'Enter Your Zipcode';

  // Create the error message element
  var errorMessage = document.createElement('p');
  errorMessage.style.display = 'none';
  errorMessage.id = 'errorMessage';

  // Create the "Check Pickup Points" button
  var checkPickupButton = document.createElement('a');
  checkPickupButton.href = 'LINK_TO_PICKUP_POINTS_PAGE';
  checkPickupButton.innerHTML = 'Check Local Pickup Points';

  // Retrieve the "Add to Cart" button element
  var addToCartButton = document.querySelector('.ecwid-productBrowser-addToCart');

  // Add the "Enter Your Zipcode" input field, error message, and "Check Pickup Points" button above the "Add to Cart" button
  addToCartButton.parentNode.insertBefore(zipcodeInput, addToCartButton);
  addToCartButton.parentNode.insertBefore(errorMessage, addToCartButton);
  addToCartButton.parentNode.insertBefore(checkPickupButton, addToCartButton);

  // Add a click event listener to the "Add to Cart" button
  addToCartButton.addEventListener('click', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve the zipcode input field value
    var enteredZipcode = document.getElementById('zipcodeInput').value;

    // Define the delivery zone for chilled products (add your desired zipcodes here)
    var deliveryZone = ['ZIPCODE_1', 'ZIPCODE_2', 'ZIPCODE_3'];

    // Perform validation on the entered zipcode
    if (deliveryZone.includes(enteredZipcode)) {
      // If the entered zipcode is in the delivery zone, allow the default "Add to Cart" behavior to proceed
      event.target.form.submit();
    } else {
      // If the entered zipcode is not in the delivery zone, show the error message and disable the "Add to Cart" button
      errorMessage.innerHTML = 'Sorry, we don\'t deliver in your area right now. Click the button below to check the local pickup points.';
      errorMessage.style.display = 'block';
      addToCartButton.disabled = true;
    }
  });

  // Automatically fill the checkout zipcode field with the entered zipcode
  document.querySelector('.ec-cart__shipping-zip').value = document.getElementById('zipcodeInput').value;
}
*/
