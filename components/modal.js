class Modal extends HTMLElement {
  constructor() {
    // Always call parent constructor first
    super();

    // Get template content from DOM
    var template = document.createElement("TEMPLATE");
      template.innerHTML = `
      <link rel="stylesheet" href="assets/css/styles.pure.css"/>
      <div id="modal" class="modal" style="display: none;">
        <div class="modal-content">
         <div class="modal-header">
           <span id="close-btn" class="close">&times;</span>
           <h3 id="modal-title"></h3>
         </div>
         <div id="modal-body" class="modal-body"></div>
        </div>
      </div>
      `
    // Create new Shadow Root
    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );

  }

  connectedCallback() {

      let title = this.getAttribute('title') || '';
      if(title){
        this.shadowRoot.querySelector('#modal-title').innerText = title;
      }

      this.shadowRoot.querySelector('#close-btn').onclick = function(){
          this.parentNode.parentNode.parentNode.style.display = "none";
          document.documentElement.style["overflow-y"] = 'scroll';
          document.documentElement.style["overflow-x"] = 'hidden';
          document.body.scroll = "yes";
      }

  }

  open (){
    this.shadowRoot.querySelector('#modal').style.display = "block";
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
  }

  close (){
    this.shadowRoot.querySelector('#modal').style.display = "none";
    document.documentElement.style["overflow-y"] = 'scroll';
    document.documentElement.style["overflow-x"] = 'hidden';
    document.body.scroll = "yes";
  }

}

customElements.define("modal-skeleton", Modal);
