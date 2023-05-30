function isIndividualProductPage(url) {
  var parts = url.split('-');
  var lastPart = parts[parts.length - 1];
  return lastPart.startsWith('p');
}

let currentURL = null;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getAddToCartButton() {
  var buttons = document.querySelectorAll('.form-control__button');

  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if (button.textContent.trim() === 'Legg i kurven' || button.textContent.trim() === 'Add to cart') {
      return button;
    }
  }

  return null; // If no matching button is found
}

function getCheckoutButton() {
  var buttons = document.querySelectorAll('.form-control__button');

  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if (button.textContent.trim() === 'Gå til kassen' || button.textContent.trim() === 'Go to checkout') {
      return button;
    }
  }

  return null; // If no matching button is found
}


function isSomethingInCart(){
   var somethingInCart = document.querySelectorAll('.details-product-purchase--add-more details-product-purchase--checkout');
   return (somethingInCart ? true : false);
}




function getDescription() {
  const id = 'productDescription';
  const element = document.getElementById(id);
  return element ? element : null;
}



async function main()
{
  // page load
  console.log('main called due to page load');
  var url =  window.location.href;
  currentURL = url;
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
  addToCartButton.style.display = "none";
  
  // 
  var checkoutButton = getCheckoutButton();
  if(isSomethingInCart() && checkoutButton) checkoutButton.style.marginTop = '20px';
  
  
  
  // if there is no add to cart button
  if(!addToCartButton) {
    console.log("can't be added to cart - no add button");
    return;
  }
  
  var buttonContainer = addToCartButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  
  var description = getDescription();
  
  if(!buttonContainer) {
    console.log("no button container");
    return;
  }
  
  console.log("button & container", addToCartButton, buttonContainer);
  
  // Create an input element
  var inputField = document.createElement('input');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('placeholder', 'Skriv postnummeret ditt');
  // Apply the desired styles
  inputField.style.textAlign = 'center';
  inputField.style.width = '100%';
  inputField.style.padding = '15px';
  inputField.style.marginTop = '15px';
  inputField.style.marginBottom = '15px';
  inputField.style.fontSize = '16px';
  inputField.style.outline = 'none';
  inputField.style.border = '1px solid black';
  inputField.style.color = 'white';
  inputField.style.backgroundColor = 'black';
  inputField.style.fontWeight = 'bold';
  inputField.id = 'darkInputFieldForZipCode';
  var styleElement = document.createElement("style");
  styleElement.innerHTML = "#darkInputFieldForZipCode::placeholder { color: white; }"; // Replace "myInput" with the ID of your input element
  document.head.appendChild(styleElement);
  



  var questionParagraph = document.createElement('p');
  questionParagraph = 'Kan dette produktet sendes til meg?';
  
  var warningParagraph = document.createElement('p');
  warningParagraph.textContent = '';
  
  
  const LinkButton = document.createElement('button');
  LinkButton.textContent = 'Finn en butikk';
  LinkButton.style.color = 'white';
  LinkButton.style.width = '100%';
  LinkButton.style.backgroundColor = '#191919';
  LinkButton.style.textAlign = 'center';
  LinkButton.style.paddingLeft = '15px';
  LinkButton.style.paddingRight = '15px';
  LinkButton.style.paddingTop = '15px';
  LinkButton.style.paddingBottom = '15px';
  LinkButton.style.marginTop = '15px';
  LinkButton.style.fontSize = '18px';
  LinkButton.style.fontWeight = 'bold';
  LinkButton.style.outline = 'none';
  LinkButton.style.border = 'none';
  LinkButton.style.cursor = 'pointer';
  LinkButton.style.display = "none";
  
  // Add event listener for mouseenter (hover)
  LinkButton.addEventListener('mouseenter', function() {
    LinkButton.style.backgroundColor = '#3F3F3F'; // Change to desired background color on hover
  });

  // Add event listener for mouseleave (hover off)
  LinkButton.addEventListener('mouseleave', function() {
    LinkButton.style.backgroundColor = '#191919'; // Revert to initial background color on hover off
  });


  
  LinkButton.addEventListener('click', function() {
    window.open('https://www.google.com/maps/d/u/0/viewer?mid=1bC6jk4HTcF2ka_d7SNR7EzQ4T0gNUiPl&ll=60.07401596188039%2C10.496927318361355&z=8', '_blank');
  });


  

  
  // Add event listener to allow only numbers
  inputField.addEventListener('keypress', function(event) {
    var key = event.which || event.keyCode;
    var valid = (key >= 48 && key <= 57) || key === 8 || key === 0;
    if (!valid) {
      event.preventDefault();
    }
  });
  
    // validate zipcode
  inputField.addEventListener('input', function(event) {
    let value = inputField.value;
    let isValidZipcode = checkZipCode(value);
    
    
  
    
    if(isValidZipcode) {
      warningParagraph.innerHTML = '';
      addToCartButton.style.display = "block";
      LinkButton.style.display = "none";
      if(isSomethingInCart() && checkoutButton) checkoutButton.style.marginTop = '0px';
    }
    else {
       warningParagraph.innerHTML = 'Vår leveringspartner kan ikke levere kjølevarer til din adresse helt enda. Men, sjekk ut våre   <a href="https://example.com">Råwbarer</a> som kan sendes til hele Norge!<br/><br/>Klikk på knappen under for å se hvor våre ferske varer er tilgjengelig i butikk.';
       addToCartButton.style.display = "none";
       LinkButton.style.display = "block";
      if(isSomethingInCart() && checkoutButton) checkoutButton.style.marginTop = '20px';
    }
    
      if((!value) || (value && value.length < 4)) {
        addToCartButton.style.display = "none";
        // if(isSomethingInCart() && checkoutButton)  addToCartButton.style.display = "block";
         console.log('really?', isSomethingInCart());
         console.log(document.querySelector('.details-product-purchase__checkout'));
         questionParagraph = 'Kan dette produktet sendes til meg?';
      }
    else {
       questionParagraph = '';
    }
    
    
    
    
    
    
  });


  
  // Append the input field to the button container
  buttonContainer.prepend(LinkButton); 
  buttonContainer.prepend(warningParagraph); 
  buttonContainer.prepend(inputField);  
  buttonContainer.prepend(questionParagraph); 


  
}


main();
// if page has changed!
setInterval(function() {
  if(window.location.href !== currentURL) main();
}, 1000);







function checkZipCode(value) {
  if(value.length < 4) return true;
  var zipCodes = ['0010', '0015', '0026', '0037', '0050', '0139', '0150', '0151', '0152', '0153', '0154', '0155', '0157', '0158', '0159', '0160', '0161', '0162', '0164', '0165', '0166', '0167', '0168', '0169', '0170', '0171', '0172', '0173', '0174', '0175', '0176', '0177', '0178', '0179', '0180', '0181', '0182', '0183', '0184', '0185', '0186', '0187', '0188', '0190', '0191', '0192', '0193', '0194', '0195', '0196', '0198', '0250', '0251', '0252', '0253', '0254', '0255', '0256', '0257', '0258', '0259', '0260', '0262', '0263', '0264', '0265', '0266', '0267', '0268', '0270', '0271', '0272', '0273', '0274', '0275', '0276', '0277', '0278', '0279', '0280', '0281', '0282', '0283', '0284', '0286', '0287', '0340', '0349', '0350', '0351', '0352', '0353', '0354', '0355', '0356', '0357', '0358', '0359', '0360', '0361', '0362', '0363', '0364', '0365', '0366', '0367', '0368', '0369', '0370', '0371', '0372', '0373', '0374', '0375', '0376', '0377', '0378', '0379', '0380', '0381', '0382', '0383', '0445', '0450', '0451', '0452', '0454', '0455', '0456', '0457', '0458', '0459', '0460', '0461', '0462', '0463', '0464', '0465', '0467', '0468', '0469', '0470', '0472', '0473', '0474', '0475', '0476', '0477', '0478', '0479', '0480', '0481', '0482', '0483', '0484', '0485', '0486', '0487', '0488', '0489', '0490', '0491', '0492', '0493', '0494', '0495', '0496', '0550', '0551', '0552', '0553', '0554', '0555', '0556', '0557', '0558', '0559', '0560', '0561', '0562', '0563', '0564', '0565', '0566', '0567', '0568', '0569', '0570', '0571', '0572', '0573', '0574', '0575', '0576', '0577', '0578', '0579', '0580', '0581', '0582', '0583', '0584', '0585', '0586', '0587', '0588', '0589', '0590', '0591', '0592', '0593', '0594', '0595', '0596', '0597', '0598', '0650', '0651', '0652', '0653', '0654', '0655', '0656', '0657', '0658', '0659', '0660', '0661', '0662', '0663', '0664', '0665', '0666', '0667', '0668', '0669', '0670', '0671', '0672', '0673', '0674', '0675', '0676', '0677', '0678', '0679', '0680', '0681', '0682', '0683', '0684', '0685', '0686', '0687', '0688', '0689', '0690', '0691', '0692', '0693', '0694', '0750', '0751', '0752', '0753', '0754', '0755', '0756', '0757', '0758', '0760', '0763', '0764', '0765', '0766', '0767', '0768', '0770', '0771', '0772', '0773', '0774', '0775', '0776', '0777', '0778', '0779', '0781', '0782', '0783', '0784', '0785', '0786', '0787', '0788', '0789', '0790', '0791', '0850', '0851', '0852', '0853', '0854', '0855', '0856', '0857', '0858', '0860', '0861', '0862', '0863', '0864', '0870', '0871', '0872', '0873', '0874', '0875', '0876', '0877', '0880', '0881', '0882', '0883', '0884', '0890', '0891', '0950', '0951', '0952', '0953', '0954', '0955', '0956', '0957', '0958', '0959', '0960', '0962', '0963', '0964', '0968', '0969', '0970', '0971', '0972', '0973', '0975', '0976', '0977', '0978', '0979', '0980', '0981', '0982', '0983', '0984', '0985', '0986', '0987', '0988', '1051', '1052', '1053', '1054', '1055', '1056', '1061', '1062', '1063', '1064', '1065', '1067', '1068', '1069', '1071', '1081', '1083', '1084', '1086', '1087', '1088', '1089', '1150', '1151', '1152', '1153', '1154', '1155', '1156', '1157', '1158', '1160', '1161', '1162', '1163', '1164', '1165', '1166', '1167', '1168', '1169', '1170', '1172', '1176', '1177', '1178', '1179', '1181', '1182', '1184', '1185', '1187', '1188', '1189', '1250', '1251', '1252', '1253', '1254', '1255', '1256', '1257', '1258', '1259', '1262', '1263', '1266', '1270', '1271', '1272', '1273', '1274', '1275', '1278', '1279', '1281', '1283', '1284', '1285', '1286', '1290', '1291', '1294', '1295', '1311', '1336', '1337', '1338', '1339', '1340', '1341', '1344', '1346', '1348', '1349', '1350', '1351', '1352', '1353', '1354', '1356', '1357', '1358', '1359', '1360', '1361', '1362', '1363', '1364', '1365', '1366', '1367', '1368', '1369', '1383', '1384', '1385', '1386', '1387', '1388', '1389', '1390', '1391', '1392', '1394', '1395', '1396', '1397', '1400', '1404', '1405', '1406', '1407', '1408', '1409', '1410', '1412', '1413', '1414', '1415', '1420', '1423', '1424', '1425', '1430', '1433', '1434', '1435', '1440', '1443', '1444', '1445', '1446', '1447', '1448', '1449', '1450', '1452', '1453', '1454', '1455', '1456', '1458', '1459', '1461', '1462', '1463', '1464', '1465', '1466', '1467', '1470', '1472', '1473', '1474', '1475', '1476', '1479', '1480', '1481', '1482', '1484', '1487', '1488', '1511', '1512', '1513', '1514', '1515', '1516', '1517', '1518', '1519', '1523', '1524', '1525', '1526', '1528', '1529', '1530', '1531', '1532', '1533', '1534', '1535', '1536', '1537', '1538', '1539', '1540', '1542', '1543', '1544', '1545', '1550', '1555', '1560', '1570', '1580', '1591', '1592', '1593', '1596', '1597', '1598', '1599', '1604', '1605', '1606', '1607', '1608', '1610', '1613', '1614', '1615', '1617', '1618', '1619', '1621', '1622', '1623', '1624', '1626', '1628', '1630', '1632', '1633', '1634', '1636', '1637', '1639', '1640', '1642', '1643', '1651', '1653', '1654', '1655', '1657', '1658', '1659', '1661', '1663', '1664', '1665', '1666', '1667', '1671', '1672', '1673', '1675', '1676', '1678', '1679', '1706', '1707', '1708', '1709', '1710', '1711', '1712', '1714', '1715', '1718', '1719', '1721', '1722', '1723', '1724', '1725', '1726', '1727', '1730', '1734', '1735', '1738', '1739', '1743', '1746', '1747', '1763', '1764', '1765', '1766', '1767', '1768', '1769', '1771', '1772', '1776', '1777', '1778', '1779', '1781', '1782', '1783', '1784', '1785', '1786', '1788', '1789', '1791', '1792', '1793', '1794', '1796', '1798', '1807', '1808', '1809', '1811', '1812', '1813', '1814', '1815', '1816', '1820', '1821', '1823', '1825', '1827', '1830', '1831', '1832', '1850', '1852', '1859', '1860', '1866', '1870', '1875', '1878', '1880', '1890', '1892', '1894', '1900', '1903', '1910', '1911', '1912', '1914', '1920', '1923', '1925', '1927', '1929', '1930', '1940', '1950', '1954', '1960', '1963', '1970', '2000', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2013', '2014', '2015', '2016', '2019', '2020', '2022', '2030', '2032', '2033', '2034', '2040', '2050', '2052', '2053', '2054', '2055', '2056', '2058', '2060', '2063', '2066', '2067', '2068', '2069', '2070', '2072', '2073', '2074', '2080', '2090', '2092', '2093', '2100', '2110', '2114', '2116', '2120', '2123', '2130', '2133', '2134', '2150', '2160', '2162', '2164', '2165', '2166', '2170', '2208', '2209', '2210', '2211', '2212', '2213', '2214', '2216', '2217', '2219', '2220', '2223', '2230', '2232', '2233', '2235', '2240', '2260', '2264', '2265', '2266', '2270', '2280', '2312', '2315', '2316', '2317', '2318', '2319', '2320', '2321', '2322', '2323', '2324', '2330', '2332', '2334', '2335', '2337', '2338', '2340', '2344', '2345', '2350', '2353', '2355', '2360', '2364', '2365', '2372', '2380', '2383', '2384', '2385', '2386', '2387', '2388', '2390', '2406', '2407', '2408', '2409', '2410', '2411', '2412', '2413', '2414', '2415', '2416', '2435', '2436', '2437', '2450', '2607', '2608', '2609', '2610', '2611', '2612', '2613', '2614', '2615', '2616', '2618', '2619', '2624', '2625', '2635', '2636', '2651', '2652', '2656', '2720', '2730', '2740', '2742', '2743', '2750', '2760', '2770', '2815', '2816', '2817', '2818', '2819', '2820', '2821', '2822', '2825', '2827', '2830', '2833', '2834', '2835', '2836', '2837', '2838', '2839', '2840', '2843', '2846', '2847', '2848', '2849', '2850', '2860', '2861', '2862', '2864', '2866', '2870', '2879', '3004', '3011', '3012', '3013', '3014', '3015', '3016', '3017', '3018', '3019', '3021', '3022', '3023', '3024', '3025', '3026', '3027', '3028', '3029', '3030', '3031', '3032', '3033', '3034', '3035', '3036', '3037', '3038', '3039', '3040', '3041', '3042', '3043', '3044', '3045', '3046', '3047', '3048', '3050', '3053', '3055', '3057', '3058', '3060', '3070', '3072', '3073', '3074', '3075', '3076', '3077', '3080', '3083', '3084', '3085', '3086', '3089', '3090', '3092', '3095', '3110', '3111', '3112', '3113', '3114', '3115', '3116', '3117', '3118', '3120', '3121', '3122', '3123', '3124', '3125', '3126', '3127', '3128', '3132', '3133', '3135', '3138', '3140', '3142', '3143', '3144', '3145', '3148', '3150', '3151', '3152', '3153', '3154', '3157', '3158', '3159', '3160', '3170', '3171', '3172', '3173', '3174', '3175', '3176', '3178', '3179', '3180', '3181', '3182', '3183', '3184', '3185', '3186', '3187', '3188', '3189', '3208', '3209', '3210', '3211', '3212', '3213', '3214', '3215', '3216', '3217', '3218', '3219', '3220', '3221', '3222', '3223', '3224', '3225', '3226', '3227', '3228', '3229', '3230', '3231', '3232', '3233', '3234', '3235', '3236', '3237', '3238', '3239', '3241', '3242', '3243', '3244', '3256', '3257', '3258', '3259', '3260', '3261', '3262', '3263', '3264', '3265', '3267', '3268', '3269', '3270', '3271', '3274', '3275', '3277', '3280', '3282', '3290', '3292', '3294', '3295', '3296', '3300', '3302', '3303', '3320', '3322', '3330', '3340', '3350', '3355', '3358', '3359', '3360', '3370', '3402', '3403', '3404', '3405', '3406', '3408', '3409', '3410', '3413', '3414', '3420', '3425', '3426', '3427', '3430', '3440', '3442', '3470', '3472', '3474', '3475', '3477', '3478', '3480', '3482', '3483', '3484', '3490', '3510', '3511', '3512', '3513', '3514', '3515', '3516', '3517', '3518', '3519', '3520', '3522', '3524', '3525', '3528', '3530', '3531', '3533', '3534', '3535', '3536', '3538', '3539', '3610', '3611', '3612', '3613', '3614', '3615', '3616', '3617', '3618', '3619', '3620', '3622', '3623', '3624', '3647', '3648', '3674', '3675', '3676', '3677', '3678', '3679', '3680', '3681', '3683', '3684', '3710', '3711', '3712', '3713', '3714', '3715', '3716', '3717', '3718', '3719', '3720', '3722', '3723', '3724', '3725', '3726', '3727', '3728', '3730', '3731', '3732', '3733', '3734', '3735', '3736', '3737', '3738', '3740', '3741', '3742', '3743', '3744', '3746', '3747', '3748', '3910', '3911', '3912', '3913', '3914', '3915', '3916', '3917', '3918', '3919', '3920', '3921', '3922', '3924', '3925', '3928', '3929', '3930', '3931', '3933', '3936', '3937', '3940', '3941', '3942', '3943', '3944', '3946', '3947', '3948', '3949', '3950', '5003', '5004', '5005', '5006', '5007', '5008', '5009', '5010', '5011', '5012', '5013', '5014', '5015', '5016', '5017', '5018', '5019', '5021', '5022', '5031', '5032', '5033', '5034', '5035', '5036', '5037', '5038', '5039', '5041', '5042', '5043', '5045', '5052', '5053', '5054', '5055', '5056', '5057', '5058', '5059', '5063', '5067', '5068', '5072', '5073', '5075', '5081', '5082', '5089', '5093', '5094', '5096', '5097', '5098', '5099', '5101', '5104', '5105', '5106', '5107', '5108', '5109', '5111', '5113', '5114', '5115', '5116', '5117', '5118', '5119', '5121', '5122', '5124', '5130', '5131', '5132', '5134', '5135', '5136', '5137', '5141', '5142', '5143', '5144', '5145', '5146', '5147', '5148', '5151', '5152', '5153', '5154', '5155', '5160', '5161', '5162', '5163', '5164', '5165', '5170', '5171', '5172', '5173', '5174', '5176', '5177', '5178', '5179', '5183', '5184', '5200', '5208', '5209', '5210', '5211', '5212', '5215', '5217', '5221', '5222', '5223', '5224', '5225', '5226', '5227', '5228', '5229', '5230', '5231', '5232', '5235', '5236', '5237', '5238', '5239', '5243', '5244', '5251', '5252', '5253', '5254', '5257', '5258', '5259', '5260', '5261', '5262', '5263', '5264', '5265', '5267', '5268', '5281', '5286', '5300', '5301', '5302', '5303', '5304', '5305', '5306', '5307', '5308', '5309', '5310', '5347', '5350', '5353', '5354', '5355', '5357', '5360', '5363', '5378', '5379', '5380', '5381', '5382', '5640', '5641', '5642', '5650', '5652', '5911', '5913', '5914', '5915', '5916', '5917', '5918', '5919', '5936', '5937'];
  // Check if the value exists in the zip code array
  if (zipCodes.includes(value)) {
    return true; // Value found in the array
  } else {
    return false; // Value not found in the array
  }
}
