// Fetch settings from public API
//
// Variable settings is global and defined
//
function fetchSettings(){
  return (
      $.get("https://api.champ-ramard.fr/v2/public/settings.php", function(result){
        for(var k in result) {
          if(result[k]['STR_KEY']=='aspb' | result[k]['STR_KEY']=='aspv' | result[k]['STR_KEY']=='fraise'){
            if(result[k]['STR_VALUE']=='true'){
              settings[result[k]['STR_KEY']] = true;
            }else if(result[k]['STR_VALUE']=='false'){
              settings[result[k]['STR_KEY']] = false;
            }else{
              settings[result[k]['STR_KEY']] = result[k]['STR_VALUE'];
            }
          } else {
            settings[result[k]['STR_KEY']] = result[k]['STR_VALUE'];
          }
        }
    })
  )
}

// Compute bill from products components
//
// PARAMS:
//  - amount: amount for each product
//
// EXAMPLE:
// let price = computeBill({
//  'aspb': document.getElementById("aspb").getTotalPrice(),
//  'aspv': document.getElementById("aspv").getTotalPrice(),
//  'fraise': document.getElementById("fraise").getTotalPrice(),
// })
//
computeBill = function(amount){
  price = 0;
  for(ipt of ["aspb", "aspv", "fraise"]){
    price += Number(amount[ipt]);
  }
  if (isNaN(price)){
    return '... '
  } else {
    return parseFloat(price).toFixed(2);
  }
}

// Format JS Date
//
formatDate = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

// Create URL with query params
//
// qty = {'aspb':1, 'aspv':1, 'fraise':0}
// "commander.html?aspb=2&aspv=0&fraise=1"
//
createOrderURL = function(qty){
  let href = "commander.html";
  let sep = '?';
  for (const [key, value] of Object.entries(qty)) {
    href = href + sep + key + "=" + value;
    sep = "&";
  }
  return href;
}


// Returns a dict with id-cmd and date of order
//
loadLastOrdersSeen = function(){
  let lastOrders = localStorage.getItem('last-orders');
  if(lastOrders == null){
    lastOrders = {};
  } else {
    lastOrders = JSON.parse(lastOrders);
  }
  return lastOrders;
}


// Add a new order to the list saved in localStorage
//
appendNewOrder = function(idCmd, details){
  let lastOrders = loadLastOrdersSeen();
  lastOrders[idCmd] = details["day"];
  localStorage.setItem('last-orders', JSON.stringify(lastOrders));
}
