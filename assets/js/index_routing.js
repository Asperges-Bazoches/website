
const retrieveOrderInfo = function(idCmd){
  if(idCmd != null){
    $.get("https://api.champ-ramard.fr/v2/public/status.php?id_cmd="+idCmd, function(result){
      let modal = document.getElementsByTagName('modal-order')[0]
      if(result["res"]=="ok"){

        appendNewOrder(idCmd, result)
        modal.addCommandDetails(result);

        if(urlParams.get("ty") !== null){
          modal.tagAsRegistered();
        } else if(result["status"].replace('é', 'E') == "ACCEPTEE"){
          modal.tagAsAccepted();
        }else if(result["status"].replace('é', 'E') == "REFUSEE"){
          modal.tagAsRefused();
        }else if(result["status"] == "ARCHIVED"){
          modal.tagAsArchived();
        } else {
          modal.tagAsPending();
        }

      } else {
        modal.commandNotFound();
      }

      modal.open()
    });
  }
};


// REDIRECT TO THANK YOU PAGE
const urlParams = new URLSearchParams(window.location.search);
let idCmd = urlParams.get("id-cmd");
retrieveOrderInfo(idCmd);
document.getElementById("btn-id-cmd").onclick = function(){
  retrieveOrderInfo(document.getElementById("id-cmd").value)
};

// REDIRECT TO ERROR PAGE
if(urlParams.get("error")!=null){
  document.getElementsByClassName("header-headline bold")[0].innerText = "Une erreur s'est produite";
  document.getElementsByClassName("header-running-text")[0].innerText = "La page que vous souhaitiez consulter n'existe peut-être pas (ou plus)...";
};
