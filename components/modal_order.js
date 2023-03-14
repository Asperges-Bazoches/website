class OrderInfoModal extends Modal {
  constructor() {
    // Always call parent constructor first
    super();

    // Get template content from DOM
    var modalContent = document.createElement("TEMPLATE");
      modalContent.innerHTML = `
      <div>
        <br/>
        <p id="res-hello"></p>
        <p id="res-msg"></p>
        <p id="res-sts"></p>
        <ul id="res-panier" style="display:block;">
          <li><b>Asperges blanches : </b><span id="res-aspb">?</span> portion(s)</li>
          <li><b>Asperges vertes : </b><span id="res-aspv">?</span> portion(s)</li>
          <li><b>Fraises : </b><span id="res-fraise">?</span> portion(s)</li>
        </ul>
        <p>Merci encore et à très bientôt !</p>
      </div>
      `
    // Create new Shadow Root
    this.shadowRoot.querySelector('#modal-body').appendChild(
      modalContent.content.cloneNode(true)
    );

  }

  connectedCallback() {

    // ex: close button behaviour
    super()

    // for more

  }

  addCommandDetails(details){
    for(info of ["aspb", "aspv", "fraise"]){
      document.getElementById("res-"+info).innerText = details[info];
    }
  }

  commandNotFound() {
    document.getElementById("res-title").innerText = "Commande introuvable";
    document.getElementById("res-panier").style = "display:none;";
    document.getElementById("res-sts").innerText = "Aucune commande correspondant à ce numéro n'a été trouvée. Veillez bien à respecter le format CHIFFRES-LETTRES.";
  }

  tagAsRegistered() {
    document.getElementById("res-hello").innerText = "";
    document.getElementById("res-title").innerText = "Merci pour votre commande";
    document.getElementById("res-msg").innerText = result["name"] + ", votre commande a bien été enregistrée. Vous allez recevoir un premier mail récapitulatif, puis un second validant ou invalidant la commande. Si votre commande est invalidée, nous vous rappelerons rapidement afin de convenir d'un nouvel horaire. Veillez à garder un oeil sur les courriers indésirables (ou spams), il est possible que votre service de mail bloque le mail.";
  }

  tagAsAccepted() {
    document.getElementById("res-hello").innerText = "Bonjour " + result["name"] + ",";
    document.getElementById("res-title").innerText = "Détails de votre commande";
    document.getElementById("res-sts").innerText = "Votre commande a été acceptée. Rendez-vous le " + result["day"] + ", " + result["hour"] + " à "+ result["place"];
  }

  tagAsArchived() {
    document.getElementById("res-hello").innerText = "Bonjour " + result["name"] + ",";
    document.getElementById("res-title").innerText = "Détails de votre commande";
    document.getElementById("res-title").innerText = "Commande archivée";
    document.getElementById("res-panier").style = "display:none;";
    document.getElementById("res-sts").innerText = "Votre commande a été archivée et fait partie du passé à présent. Vos informations personnelles seront anonymisées sous peu, en cohérence avec notre politique de confidentialité (disponible en bas à gauche de votre écran).";
  }

  tagAsRefused() {
    document.getElementById("res-hello").innerText = "Bonjour " + result["name"] + ",";
    document.getElementById("res-title").innerText = "Détails de votre commande";
    document.getElementById("res-sts").innerText = "Votre commande a été refusée. Nous avons sûrement trop de commandes ou nous ne sommes pas disponible à cette date. Nous vous appelerons prochainement (si ce n'est pas déjà fait ;-) )";
  }

  tagAsPending() {
    document.getElementById("res-hello").innerText = "Bonjour " + result["name"] + ",";
    document.getElementById("res-title").innerText = "Détails de votre commande";
    document.getElementById("res-sts").innerText = "Votre commande pour le  " + result["day"] + ", " + result["hour"] + " à "+ result["place"] + " est en cours de validation.";
  }

}

customElements.define("modal-order", OrderInfoModal);
