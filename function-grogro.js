function isIndividualProductPage(url) {
  var parts = url.split('-');
  var lastPart = parts[parts.length - 1];
  return lastPart.startsWith('p');
}


function main()
{
  var url =  window.location.href;
  var isIndividual = isIndividualProductPage(url);
  if(!isIndividual) return;
  
  console.log("hello world");

}
main();


window.onload = function() {
  // Call your method here
  yourMethod();
};

function yourMethod() {
  // Perform your desired actions
  console.log('Page loaded!');
  // Add your custom logic here
}
