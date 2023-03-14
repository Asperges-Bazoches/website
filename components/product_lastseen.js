newChip = function(id_cmd, date){
  let out = document.createElement("DIV");
  out.classList.add('chip')
  out.innerHTML = out.innerHTML + '<img src="assets/images/logo.svg" alt="Order" width="96" height="96">'
  out.innerHTML = out.innerHTML + '<a id="link"> ' + id_cmd + '</a> - <span style="font-size:10pt;font-style:italic;">' +  date + '</span>'
  out.children[1].href = "index.html?id-cmd=" + id_cmd
  return out;
}

class ProductLastSeen extends HTMLElement {
  constructor() {
    // Always call parent constructor first
    super();

    // Get template content from DOM
    var template = document.createElement("TEMPLATE");
      template.innerHTML = `
      <link rel="stylesheet" href="assets/css/styles.pure.css"/>
      <style>
        .chip {
          display: inline-block;
          padding: 0 25px;
          height: 50px;
          font-size: 16px;
          line-height: 50px;
          border-radius: 25px;
          background-color: #f1f1f1;
          margin: 5px;
        }

        .chip img {
          float: left;
          margin: 0 10px 0 -25px;
          height: 50px;
          width: 50px;
          border-radius: 50%;
        }

        .clean {
          background-color: #E57373;
          color: #FFFFFF;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        .clean:hover {
          background-color: #E53935;
        }

      </style>
      <div style="margin: 10px 10% 0% 10%;">
        <div id="chips-bag" style="display: inline;"></div>
      </div>
      `
    // Create new Shadow Root
    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );

  }

  connectedCallback() {
      let lastOrders = loadLastOrdersSeen();
      let chipsBag = this.shadowRoot.querySelector("#chips-bag");
      for (const [id_cmd, date] of Object.entries(lastOrders)) {
        chipsBag.appendChild(newChip(id_cmd, date));
      }
      if(Object.keys(lastOrders).length > 0){
        chipsBag.innerHTML = chipsBag.innerHTML + `<div id="clean" class="chip clean">
         Effacer l'historique
        </div>`;

        this.shadowRoot.querySelector("#clean").onclick = function(){
            localStorage.removeItem('last-orders');
            this.parentNode.parentNode.querySelector("#chips-bag").innerHTML = "";
        }

      }
  }

}

customElements.define("div-products-lastseen", ProductLastSeen);
