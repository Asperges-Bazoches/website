class ModalCopyright extends Modal {
  constructor() {
    // Always call parent constructor first
    super();

    // Get template content from DOM
    var modalContent = document.createElement("TEMPLATE");
      modalContent.innerHTML = `
      <div>
        <h3>Confidentialité</h3>
        <p>Contrairement à beaucoup d'autres, ce site ne contient aucun traqueur, ne dépose aucun cookie, et ne revend pas vos données pour du ciblage publicitaire. En d'autres termes, nous respectons votre vie privée à 100%. En guise de notre bonne foi, le code source de l'interface est public et <a href="https://github.com/Asperges-Bazoches/website">disponible sur GitHub.</a></p><br/>

        <p>Les seules données enregistrées dans notre base de données sont celles que vous nous avez explicitement fournies par le biais du formulaire de commande. Leur traitement se fera en conformité avec le <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees">Règlement Européen de Protection des Données</a>:</p>
        <ul>
         <li>Toutes les informations que nous vous demandons sont essentielles à la bonne gestion de votre commande.</li>
         <li>Nous avons mis en place des sécurités techniques et organisationnelles pour empécher des fuites de données.</li>
         <li>Nous anonymiserons vos données personnelles (nom, téléphone, email) après la commande (au plus tard à la fin de la saison).</li>
         <li>Le pré-remplissage du formulaire de commande se base sur des informations stockées dans votre navigateur internet.</li>
        </ul>

        <p>Et n'oubliez pas que jamais nous ne vous demanderons de payer en ligne votre commande ! </p>
        <p>Pour plus d'informations à ce sujet, vous pouvez nous contacter à l'adresse <a href="mailto:contact@champ-ramard.fr">contact@champ-ramard.fr</a></p>

        <br/>

        <div class="row" style="margin-bottom:50px">
          <div class="col-sm-8">
            <h3>Crédits</h3>
            <p>Le volet administration utilise le framework <a href="https://vuejs.org">VueJS</a></p>
            <p>Depuis un modèle libre de <a href="https://webscopeapp.com">Webscope</a></p>
            <p>Avec des icones libres de <a href="https://fontawesome.com/license">Front Awesome</a></p>
            <p>Avec une image libre de <a href="https://fr.freepik.com">Freepik</a></p>
          </div>
        </div>
      </div>
      `
    // Create new Shadow Root
    this.shadowRoot.querySelector('#modal-body').appendChild(
      modalContent.content.cloneNode(true)
    );

  }
}

customElements.define("modal-copyright", ModalCopyright);
