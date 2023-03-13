// FUNCTIONS

function updateSettings(){
  const mapping_size = {'aspb': "1kg", 'aspv': "1kg", 'fraise': "500g"}
  // set unit price / lot size for each item
  for (key of ['aspb', 'aspv', 'fraise']) {
    elem = document.getElementById(key);
    settings[key] ? elem.enable() : elem.disable();
    elem.setPrice(settings[key + '_price']);
    elem.setSize(mapping_size[key]);
  }

  // add options in hour selectInput
  select = document.getElementById("hour")
  for (slot of settings['order_slots'].split('//;//')){
      var opt = document.createElement('option');
      opt.value = slot;
      opt.innerHTML = slot;
      select.appendChild(opt);
  }
}

function updateBasket() {
  // update the bill
  let price = computeBill({
    'aspb': document.getElementById("aspb").getTotalPrice(),
    'aspv': document.getElementById("aspv").getTotalPrice(),
    'fraise': document.getElementById("fraise").getTotalPrice(),
  })
  document.getElementById("price").innerText = price;

  // update quantities
  for(ipt of ["aspb", "aspv", "fraise"]){
    elem = document.getElementById(ipt);
    prev = document.getElementById("prev-"+ipt);
    prev.innerText = elem.getSize();
  }
}


// CONFIGURATION ON LOADING

// DISABLE FORM SUBMIT BY PRESSING ENTER
$(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        e.preventDefault();
        return false;
    }
});

// INIT BASKET FROM URL
const urlParamsPanier = new URLSearchParams(window.location.search);
for(ipt of ["aspb", "aspv", "fraise"]){
  elem = document.getElementById(ipt);
  elem.setValue(urlParamsPanier.get(ipt) ? urlParamsPanier.get(ipt) : 0);
  elem.onChange(updateBasket);
}

// MAKE QUERY TO ADD COMMAND
document.getElementById("order-form").onsubmit = function(event){
  ok = (document.getElementById("name").value.length > 0);
  ok = ok && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById("email").value));
  ok = ok && (document.getElementById("phone").value.length > 9);

  if(ok){
    let body = {'ghost': document.getElementById("ghooost").value};
    for(name of [
      "name", 'email', 'phone', 'aspb', 'aspv', 'fraise',
      "date", "hour", "place", "more"
    ]){
      body[name] = document.getElementById(name).value;
    }
    $.post("https://api.champ-ramard.fr/v2/public/order.php", body, function(data, status){
      //"success", "notmodified", "error", "timeout", or "parsererror"
      if(status == "success" && data["res"]=="ok"){
        window.location.replace(data["redirect"]);
      } else {
        document.getElementById("coffees").style.display = "none";
        document.getElementById("instrsuction").innerText = "Au moins une des informations que vous avez renseignées a été jugée illicite. Cela peut provenir de la présence de caractères spéciaux. Si le problème persiste, n'hésitez pas à passer la commande par téléphone au 0160671423.";
        document.getElementById("submit").style["border-color"] = "red";
        //console.log(JSON.stringify(data))
      }
    });
  }
  event.preventDefault();
  return false;
};
