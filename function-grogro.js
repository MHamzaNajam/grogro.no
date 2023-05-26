//javascript file for Ecwid store "grogro.no"
//custom-app to add additional functionality related chilled and unchilled products delivery zones.
console.log("hello from github!");
var storeData = EcwidApp.getPayload();

var storeId = storeData.store_id;
var accessToken = storeData.access_token;

console.log(accessToken);
