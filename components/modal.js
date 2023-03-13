class Modal extends HTMLElement {
  constructor() {
    // Always call parent constructor first
    super();

    // Get template content from DOM
    var template = document.createElement("TEMPLATE");
      template.innerHTML = `
      <link rel="stylesheet" href="assets/css/styles.pure.css"/>
      <div class="col-sm-4">
        <div id="box" class="mid-plan">
          <center><img id="img" src=""  width="190px" /></center>
          <h3 id='label' class="plan-title light"></h3>
          <h4 id="price" class="plan-cost bold"></h4>
          <h5 id="portion" class="monthly"></h5>
          <input id="value" name="value" type="number" min="0" max="50" step="1" value="0" style="width:50%">
          <span id='unit'>portions</span>
          <b id='disabled' style="display:none">Non disponible</b>
        </div>
      </div>
      `
    // Create new Shadow Root
    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );

  }

  connectedCallback() {

      let label = this.getAttribute('name') || '';
      if(label){
        this.shadowRoot.querySelector('#label').innerText = label;
      }

      let img = this.getAttribute('img') || '';
      if(img){
        this.shadowRoot.querySelector('#img').src = img;
      } else {
        this.shadowRoot.querySelector('#box').style.height = "300px";
      }

  }

  open (){
    one_modal.style.display = "block";
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
    active_modal = one_modal;
  }

  close (){
    one_modal.style.display = "none";
    document.documentElement.style["overflow-y"] = 'scroll';
    document.documentElement.style["overflow-x"] = 'hidden';
    document.body.scroll = "yes";
  }

}

customElements.define("modal-skeleton", Modal);
