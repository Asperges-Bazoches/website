
function updateSettings() {
  const mapping_size = {'aspb': "1kg", 'aspv': "1kg", 'fraise': "500g"}

  for (key of ['aspb', 'aspv', 'aspb-pte', 'aspv-pte', 'fraise']) {
    elem = document.getElementById(key)
    settings[key] ? elem.enable() : elem.disable();
    elem.setUnitPrice(settings[key + '_price']);
    elem.setUnitSize(mapping_size[key]);
  }
  for (key in settings){
    if (key == 'website_title'){
      document.getElementsByClassName("header-headline")[0].innerText = settings[key];
    }
    if (key == 'website_subtitle'){
      document.getElementsByClassName("header-running-text")[0].innerText = settings[key];
    }
  }
}

// Add behaviour when change size of each product
for (ipt of ["aspb", "aspv", 'aspb-pte', 'aspv-pte', "fraise"]){
  document.getElementById(ipt).onChange(() => {
    let price = computeBill({
      'aspb': document.getElementById("aspb").getTotalPrice(),
      'aspv': document.getElementById("aspv").getTotalPrice(),
      'aspb-pte': document.getElementById("aspb-pte").getTotalPrice(),
      'aspv-pte': document.getElementById("aspv-pte").getTotalPrice(),
      'fraise': document.getElementById("fraise").getTotalPrice(),
    })

    if(price > 0){
      document.getElementById("consigne-order").style = "display:none;"
      document.getElementById("continue-order").style = "display:block;"
      document.getElementById("continue-order").innerHTML = "<h5>Poursuivre la commande ("+price+"€)</h5>"
    }else{
      document.getElementById("consigne-order").style = "display:block;"
      document.getElementById("continue-order").style = "display:none;"
    }
  });
}
