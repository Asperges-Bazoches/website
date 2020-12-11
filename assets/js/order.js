// MODALS
var link_credit = document.getElementById("open-credits");
var modal_credit = document.getElementById("credits");
var span_credit = document.getElementById("close-credit");
var link_ttable = document.getElementById("btn-timetable");
var modal_ttable = document.getElementById("timetableModal");
var span_ttable = document.getElementById("close-ttable");
// setup actions
link_ttable.onclick = function(){openModal(modal_ttable)}
link_credit.onclick = function(){openModal(modal_credit)}
span_ttable.onclick = function(){closeModal(modal_ttable)}
span_credit.onclick = function(){closeModal(modal_credit)}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal_ttable || event.target == modal_credit) {
    closeModal(event.target)
  }
}

// DISABLE FORM SUBMIT BY PRESSING ENTER
$(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        e.preventDefault();
        return false;
    }
});


// PRICE COMPUTATION
var price = 0;
computeBill = function(){
  price = 0;
  price += document.getElementById("aspb").value*8;
  price += document.getElementById("aspv").value*8;
  price += document.getElementById("fraise").value*3;
  document.getElementById("price").innerText = price
}
const urlParamsPanier = new URLSearchParams(window.location.search);
for(ipt of ["aspb", "aspv", "fraise"]){
  document.getElementById("prev-"+ipt).innerText = ((urlParamsPanier.get(ipt)) ? urlParamsPanier.get(ipt) : 0);
  document.getElementById(ipt).value = ((urlParamsPanier.get(ipt)) ? urlParamsPanier.get(ipt) : 0);
  document.getElementById(ipt).addEventListener('change', () => {
    computeBill()
    for (ipt of ["aspb", "aspv", "fraise"]){document.getElementById(ipt).value = Number(document.getElementById(ipt).value);}
  });
}
computeBill()
document.getElementById("prev-fraise").innerText = document.getElementById("prev-fraise").innerText*250;


// BASKET EDITION
document.getElementById("edit-basket").onclick = function(){
  document.getElementById("basket-edition").style.display = "block";
  document.getElementById("basket-summary").style.display = "none";
}


// DUMMY ANTI ROBOT TRICK #2
var cnt = 0
const sizes = ["30px", "40px", "60px", "70px", "60px", "50px", "30px"]
document.getElementById("left-horse").addEventListener('click', function(){
  cnt += 1;
  cond = (sizes[cnt%sizes.length] === "60px");
  document.getElementById("left-horse").style = "width:"+sizes[cnt%sizes.length]+";";
  document.getElementById("submit").style = (cond ? "display:block; max-width:200px;" : "display:none; max-width:200px;");
  document.getElementById("ghooost").value = (cond ? "e8fe4zr" : "");
});


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
    $.post("https://api.champ-ramard.fr/order.php", body, function(data,status){
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
