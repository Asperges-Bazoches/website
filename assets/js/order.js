// DISABLE FORM SUBMIT BY PRESSING ENTER
$(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        e.preventDefault();
        return false;
    }
});


var price = 0;
var qty = {
  "aspb" : 0,
  "aspv" : 0,
  "fraise" : 0
};

const urlParamsPanier = new URLSearchParams(window.location.search);
for(ipt of ["aspb", "aspv", "fraise"]){
  qty[ipt] = (urlParamsPanier.get(ipt) ? urlParamsPanier.get(ipt) : 0);
  document.getElementById(ipt).addEventListener('change', () => {
    document.getElementById("price").innerText = computeBill(qty);
  });
  document.getElementById("prev-"+ipt).innerText = Number(qty[ipt]);
  document.getElementById(ipt).value = Number(qty[ipt]);
}
document.getElementById("price").innerText = computeBill(qty);
document.getElementById("prev-fraise").innerText = document.getElementById("prev-fraise").innerText*250;


// PRICE COMPUTATION
function updateSettings(){
  for (key in settings){
    if (key.endsWith('_price')){
      document.getElementById(key).innerText = parseFloat(settings[key]).toFixed(2);
    }
  }
}

// TRY PREFILL FIELD
for(let field of ["name", "email", "phone"]){
    if(localStorage.getItem("order-"+field) != undefined){
      document.getElementById(field).value = localStorage.getItem("order-"+field)
    }
    document.getElementById(field).onchange = function(){
      localStorage.setItem("order-"+field, document.getElementById(field).value)
    }
}

// MAKE QUERY TO ADD COMMAND
document.getElementById("order-form").onsubmit = function(event){
  ok = (document.getElementById("name").value.length > 0);
  ok = ok && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById("email").value));
  ok = ok && (document.getElementById("phone").value.length > 9);
  if(ok){
    body = { name: document.getElementById("name").value,
             email: document.getElementById("email").value,
             phone: document.getElementById("phone").value,
             aspb: document.getElementById("aspb").value,
             aspv: document.getElementById("aspv").value,
             fraise: document.getElementById("fraise").value,
             date: document.getElementById("date").value,
             hour: document.getElementById("hour").value,
             place: document.getElementById("place").value,
             ghost: document.getElementById("ghooost").value,
             more: document.getElementById("more").value
           };
    $.post("https://api.champ-ramard.fr/v2/public/order.php", body, function(data, status){
      //"success", "notmodified", "error", "timeout", or "parsererror"
      if(status == "success" && data["res"]=="ok"){
        window.location.replace(data["redirect"]);
      }else{
        document.getElementById("coffees").style.display = "none";
        document.getElementById("instruction").innerText = "Au moins une des informations que vous avez renseignées a été jugée illicite. Cela peut provenir de la présence de caractères spéciaux. Si le problème persiste, n'hésitez pas à passer la commande par téléphone au 0160671423.";
        document.getElementById("submit").style["border-color"] = "red";
        //console.log(JSON.stringify(data))
      }
    });
  }
  event.preventDefault();
  return false;
};
