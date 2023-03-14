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

      this.shadowRoot.querySelector('#close-btn').onclick = function(){
        closeModal(this.parentNode.parentNode.parentNode)
      }

  }

  open (){openModal(this.shadowRoot.querySelector('#modal'))}

  close (){closeModal(this.shadowRoot.querySelector('#modal'));}

}

customElements.define("modal-skeleton", Modal);

function openModal(one_modal) {
  one_modal.style.display = "block";
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
}

function closeModal(one_modal) {
  one_modal.style.display = "none";
  document.documentElement.style["overflow-y"] = 'scroll';
  document.documentElement.style["overflow-x"] = 'hidden';
  document.body.scroll = "yes";
}

/*
var active_modal = null;

var modal = document.getElementById("myModal");
var modal_warn = document.getElementById("warningModal");
var modal_credit = document.getElementById("credits");
var modal_ty = document.getElementById("tyModal");
var modal_ttable = document.getElementById("timetableModal");

for(link of document.getElementsByClassName('open-timetable')){
  link.onclick = function(){openModal(modal_ttable)}
}
for(link of document.getElementsByClassName('open-credits')){
  link.onclick = function(){openModal(modal_credit)}
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if ([modal, modal_credit, modal_ty].includes(event.target)) {
    closeModal(event.target)
  }
  if (event.target.className == 'close'){
    closeModal(active_modal);
  }
}
*/
