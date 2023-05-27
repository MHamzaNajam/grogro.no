function isIndividualProductPage(url) {
  var parts = url.split('-');
  var lastPart = parts[parts.length - 1];
  return lastPart.startsWith('p');
}


function main()
{
  var url =  window.location.href;
  var isIndividualProductPage = isIndividualProductPage(url);
  if(!isIndividualProductPage) return;
  
  console.log("hello world");

}
main();
