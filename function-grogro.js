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
}
main();
window.onload = function() {
  main();
};
