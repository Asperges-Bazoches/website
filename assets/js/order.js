// PRICE COMPUTATION
const queryString = window.location.search;
const urlParamsPanier = new URLSearchParams(queryString);
for(ipt of ["aspb", "aspv", "fraise"]){
  if(urlParamsPanier.get(ipt)){
    document.getElementById(ipt).value = urlParamsPanier.get(ipt);
  } else {
    document.getElementById(ipt).value = 0
  }
  document.getElementById(ipt).addEventListener('change', () => {
    for (ipt of ["aspb", "aspv", "fraise"]){
      document.getElementById(ipt).value = Number(document.getElementById(ipt).value);
      sum = sum + document.getElementById(ipt).value;
    }
  });
}

var price = 0;
computeBill = function(){
  price = 0;
  for(ipt of ["aspb", "aspv", "fraise"]){
    price += document.getElementById(ipt).value*8
  }
  document.getElementById("price").innerText = price
}
for (elem of ["aspb", "aspv", "fraise"]) {
  document.getElementById(elem).addEventListener('change', computeBill)
}
computeBill()

// DUMMY ANTI ROBOT TRICK #1
/*
displaySubmit = function(event){
  if (this.value==="horse") {
    document.getElementById("submit").style = "display:block;"
  } else {
    document.getElementById("submit").style = "display:none;"
  }
}
var radios = document.querySelectorAll('input[type=radio][name="optradio"]');
Array.prototype.forEach.call(radios, function(radio) {
   radio.addEventListener('change', displaySubmit);
});
*/

// DISABLE FORM SUBMIT BY PRESSING ENTER
$(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        e.preventDefault();
        return false;
    }
});

// DUMMY ANTI ROBOT TRICK #2
var cnt = 0
const sizes = ["30px", "40px", "60px", "70px", "60px", "50px", "30px"]
changeHorseSize = function(){
  cnt += 1
  document.getElementById("left-horse").style = "width:"+sizes[cnt%sizes.length]+";"
  if (sizes[cnt%sizes.length] === "60px") {
    document.getElementById("submit").style = "display:block; max-width:200px;"
    document.getElementById("ghooost").value = "e8fe4zr"
  } else {
    document.getElementById("submit").style = "display:none; max-width:200px;"
    document.getElementById("ghooost").value = ""
  }
}
document.getElementById("left-horse").addEventListener('click', changeHorseSize)


// MAKE QUERY TO ADD COMMAND
const validateForm = function(){
  ok = true;
  ok = ok && (document.getElementById("name").value.length > 0);
  ok = ok && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById("email").value));
  ok = ok && (document.getElementById("phone").value.length > 10);
  if(ok){
    addCommand();
  }
};

const callbackQuery = function(data,status){
  //"success", "notmodified", "error", "timeout", or "parsererror"
  if(status == "success"){
    window.location.replace(data["redirect"]);
  }
}

const addCommand = function(){
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
          }
  $.post("https://api.champ-ramard.fr/order.php", body, callbackQuery)
}

document.getElementById("submit").onclick = validateForm;
