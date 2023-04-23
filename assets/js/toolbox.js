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


// Create an order summary
//
// https://artskydj.github.io/jsPDF/docs/jsPDF.html
function generateInvoice(idCmd, details, settings){
  var doc = new jspdf.jsPDF({
   orientation: 'p',
   unit: 'pt',
   format: 'a4',
   putOnlyUsedFonts:true
  });
  var elementHandler = {
    '#ignorePDF': function (element, renderer) {
      return true;
    }
  };

  var source = document.createElement("div");
    source.innerHTML = `
    <div style="font-size:11px; padding: 5px 15px; width:600px;">
      <p>
        Commande réalisée le <span id="invoice-dt-order"></span>.
        Reçu généré le <span id="invoice-dt"></span>.
      </p>
      <h3>EARL Champ-Ramard</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li>+33160671423</li>
        <li>contact@champ-ramard.fr</li>
        <li>https://champ-ramard.fr</li>
        <li>9 grande rue, 77118 Bazoches-Lès-Bray</li>
      </ul>
      <br/>
      <h4>Reçu de commande</h4>
      <p>Détails de la commande <span id="invoice-idcmd">?</span></p>
      <ul>
        <li><b>Asperges blanches : </b><span id="invoice-aspb">?</span> portion(s)</li>
        <li><b>Asperges vertes : </b><span id="invoice-aspv">?</span> portion(s)</li>
        <li><b>Fraises : </b><span id="invoice-fraise">?</span> portion(s)</li>
      </ul>
      <p>Suivre ma commande à l'adresse: <a id="invoice-link" href="https://champ-ramard.fr?id-cmd=">https://champ-ramard.fr?id-cmd=</a>
      <p>Montant à payer sur place (chèque ou espèce): <span id="invoice-price"></span></p>
      <br/><br/><hr/>
      <h4>Rappel des différentes étapes :</h4>
      <ol>
        <li>Je réalise ma commande sur champ-ramard.fr;</li>
        <li>Un mail m'est envoyé sur ma boite mail (potentiellement dans le dossier SPAM / Courriers indésirables);</li>
        <li>La commande sera acceptée ou refusée en fonction de la disponibilité des produits;</li>
        <li>Un mail me sera envoyé une fois ma commande traitée;</li>
        <li>A tout moment, je peux suivre ma commande sur champ-ramard.fr;</li>
        <li>Je paye ma commande sur place, en espèce ou chèque, au moment de récupérer mes produits.</li>
      </ol><hr/>


    </div>
    `

    for(let info of ["aspb", "aspv", "fraise"]){
      source.querySelector("#invoice-"+info).innerText = details[info];
    }
    source.querySelector("#invoice-idcmd").innerText = idCmd;
    source.querySelector("#invoice-link").href = source.querySelector("#invoice-link").href + idCmd;
    source.querySelector("#invoice-link").innerText = source.querySelector("#invoice-link").innerText + idCmd;
    source.querySelector("#invoice-price").innerText = computeBill2(details, settings) + "€";
    source.querySelector("#invoice-dt-order").innerText = details['dt_order'];
    source.querySelector("#invoice-dt").innerText = new Date().toISOString().slice(0, 19).replace('T', ' ');

  doc.html(source, {
    callback: function (doc) {
      var blobPdf = new Blob([doc.output('blob')], {type: 'application/pdf'});
      var blobUrl = URL.createObjectURL(blobPdf);
      window.open(blobUrl);
    }
  });

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

// Compute bill from products components
//
// PARAMS:
//  - quantities: quantities for each product
//  - settings: settings with prices
//
computeBill2 = function(quantities, settings){
  price = 0;
  for(ipt of ["aspb", "aspv", "fraise"]){
    price += Number(quantities[ipt]) * Number(settings[ipt + "_price"]);
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
