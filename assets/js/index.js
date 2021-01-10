const retrieveOrderInfo = function(idCmd){
  if(idCmd != null){
    $.get("https://api.champ-ramard.fr/cmd.php?id_cmd="+idCmd, function(result){
      document.getElementById("res-panier").style = "display:block;";
      console.log(result);
      console.log(result["res"]);
      if(result["res"]=="ok"){
        if(urlParams.get("ty") !== null){
          document.getElementById("res-hello").innerText = "";
          document.getElementById("res-title").innerText = "Merci pour votre commande";
          document.getElementById("res-msg").innerText = result["name"] + ", votre commande a bien été enregistrée. Vous allez recevoir un premier mail récapitulatif, puis un second validant ou invalidant la commande. Si votre commande est invalidée, nous vous rappelerons rapidement afin de convenir d'un nouvel horaire. Veillez à garder un oeil sur les courriers indésirables (ou spams), il est possible que votre service de mail bloque le mail.";
        } else {
          document.getElementById("res-hello").innerText = "Bonjour " + result["name"] + ",";
          document.getElementById("res-title").innerText = "Détails de votre commande";
          if(result["status"] == "ACCEPTéE"){
            document.getElementById("res-sts").innerText = "Votre commande a été acceptée. Rendez-vous le " + result["day"] + ", " + result["hour"] + " à "+ result["place"];
          }else if(result["status"] == "REFUSéE"){
            document.getElementById("res-sts").innerText = "Votre commande a été refusée. Nous avons sûrement trop de commandes ou nous ne sommes pas disponible à cette date. Nous vous appelerons prochainement (si ce n'est pas déjà fait ;-) )";
          }else if(result["status"] == "ARCHIVED"){
            document.getElementById("res-title").innerText = "Commande archivée";
            document.getElementById("res-panier").style = "display:none;";
            document.getElementById("res-sts").innerText = "Votre commande a été archivée et fait partie du passé à présent. Vos informations personnelles seront anonymisées sous peu, en cohérence avec notre politique de confidentialité (disponible en bas à gauche de votre écran).";

          } else {
            document.getElementById("res-sts").innerText = "Votre commande pour le  " + result["day"] + ", " + result["hour"] + " à "+ result["place"] + " est en cours de validation.";
          }
        }
        for(info of ["aspb", "aspv", "fraise"]){
          document.getElementById("res-"+info).innerText = result[info];
        }
      } else {
        document.getElementById("res-title").innerText = "Commande introuvable";
        document.getElementById("res-panier").style = "display:none;";
        document.getElementById("res-sts").innerText = "Aucune commande correspondant à ce numéro n'a été trouvée. Veillez bien à respecter le format CHIFFRES-LETTRES.";
      }
      openModal(modal_ty)
    });
  }
};

const urlParams = new URLSearchParams(window.location.search);
idCmd = urlParams.get("id-cmd");
retrieveOrderInfo(idCmd);
document.getElementById("btn-id-cmd").onclick = function(){retrieveOrderInfo(document.getElementById("id-cmd").value)};

for (ipt of ["aspb", "aspv", "fraise"]){
  document.getElementById(ipt).addEventListener('change', () => {
    var price = 0;
    price += document.getElementById("aspb").value*8;
    price += document.getElementById("aspv").value*8;
    price += document.getElementById("fraise").value*3;
    for (ipt of ["aspb", "aspv", "fraise"]){document.getElementById(ipt).value = Number(document.getElementById(ipt).value);}
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

if(urlParams.get("error")!=null){
  document.getElementsByClassName("header-headline bold")[0].innerText = "Une erreur s'est produite";
  document.getElementsByClassName("header-running-text")[0].innerText = "La page que vous souhaitiez consulter n'existe peut-être pas (ou plus)...";
};
