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
        <p id="res-details"><b>Détails de la commande <span id='idCmd'></span></b></p>
        <ul id="res-panier" style="display:block;">
          <li><b>Asperges blanches : </b><span id="res-aspb">?</span> portion(s)</li>
          <li><b>Asperges vertes : </b><span id="res-aspv">?</span> portion(s)</li>
          <li><b>Fraises : </b><span id="res-fraise">?</span> portion(s)</li>
        </ul>
        <p id="warning-spam" style='display: none;'><b>Attention :</b> Pour vous protéger des arnaques, certaines boites mails semblent avoir durci leur politique anti courrier indésirable. \
        Le plus souvent, les mails détectés indésirables vont dans le dossier "SPAM" ou "Courrier indésirable", mais il est aussi possible que vous ne receviez pas les mails automatiques que nous vous envoyons. \
        Si vous ne recevez pas les mails, vous pouvez toujours suivre l'état de votre commande depuis champ-ramard.fr \
        en utilisant votre numéro de commande (<span id='idCmd2'></span>).</p><br/>
        <p>Merci encore et à très bientôt !</p>
      </div>
      `
    // Create new Shadow Root
    this.shadowRoot.querySelector('#modal-body').appendChild(
      modalContent.content.cloneNode(true)
    );

    this.details = {}

  }

  getElem(id){
    return this.shadowRoot.querySelector('#' + id)
  }

  addCommandDetails(idCmd, details){
    this.details = details
    for(let info of ["aspb", "aspv", "fraise"]){
      this.getElem("res-"+info).innerText = details[info];
    }
    this.idCmd = idCmd;
    this.getElem("idCmd").innerText = idCmd;
    this.getElem("idCmd2").innerText = idCmd;
  }

  commandNotFound() {
    this.getElem("modal-title").innerText = "Commande introuvable";
    this.getElem("res-panier").style = "display:none;";
    this.getElem("res-sts").innerText = `
    Aucune commande correspondant à ce numéro n'a été trouvée.
    Veillez bien à respecter le format CHIFFRES-LETTRES.`;
  }

  tagAsRegistered() {
    this.getElem("res-hello").innerText = "";
    this.getElem("modal-title").innerText = "Merci pour votre commande";
    this.getElem('warning-spam').style.display = "block";
    this.getElem("res-msg").innerText = 'Bonjour ' + this.details["name"] + ', votre commande ' + this.idCmd + ` a bien été enregistrée.

      Vous allez recevoir un premier mail récapitulatif, puis un second validant ou invalidant la commande.\
      Si votre commande est invalidée, nous vous rappelerons rapidement afin de convenir d'un nouvel horaire.`;
  }

  tagAsAccepted() {
    this.getElem("res-hello").innerText = "Bonjour " + this.details["name"] + ",";
    this.getElem("modal-title").innerText = "Détails de votre commande";
    this.getElem("res-sts").innerText = "Votre commande a été acceptée. Rendez-vous le " + this.details["day"] + ", entre " + this.details["hour"] + " à "+ this.details["place"];
  }

  tagAsArchived() {
    this.getElem("res-hello").innerText = "Bonjour " + this.details["name"] + ",";
    this.getElem("modal-title").innerText = "Commande archivée";
    this.getElem("res-panier").style = "display:none;";
    this.getElem("res-sts").innerText = `\
    Votre commande a été archivée et fait partie du passé à présent.\

    Vos informations personnelles seront anonymisées sous peu,\
    en cohérence avec notre politique de confidentialité (disponible en bas à gauche de votre écran).`;
  }

  tagAsRefused() {
    this.getElem("res-hello").innerText = "Bonjour " + this.details["name"] + ",";
    this.getElem("modal-title").innerText = "Détails de votre commande";
    this.getElem("res-sts").innerText = `\
    Votre commande a été refusée. Nous avons sûrement trop de commandes ou nous\
    ne sommes pas disponible à cette date. Nous vous appelerons prochainement\
    (si ce n'est pas déjà fait ;-) )`;
  }

  tagAsPending() {
    this.getElem("res-hello").innerText = "Bonjour " + this.details["name"] + ",";
    this.getElem("modal-title").innerText = "Détails de votre commande";
    this.getElem("res-sts").innerText = "Votre commande pour le  " + this.details["day"] + ", " + this.details["hour"] + " à "+ this.details["place"] + " est en cours de validation.";
  }

}

customElements.define("modal-order", OrderInfoModal);
