class Product extends HTMLElement {
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

  onChange(func){
    this.shadowRoot.querySelector('#value').addEventListener("change",  () => {
      let elem = this.shadowRoot.querySelector('#value');
      elem.value = Number(elem.value);
      this.value = elem.value;
      func()
    });
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

  setNumberOfItems(value) {
    console.log(value);
    this.shadowRoot.querySelector('#value').value = Number(value);
  }

  setUnitSize(size){
    this.size = size;
    if(size){
      this.shadowRoot.querySelector('#portion').innerText = "1 portion = " + size;
    }
  }

  setUnitPrice(price){
    this.unitPrice = parseFloat(price).toFixed(2);
    this.shadowRoot.querySelector('#price').innerText = this.unitPrice;
  }

  enable() {
    this.shadowRoot.querySelector('#value').style.display = '';
    this.shadowRoot.querySelector('#unit').style.display = '';
    this.shadowRoot.querySelector('#disabled').style.display = 'none';
  }

  disable() {
    this.shadowRoot.querySelector('#value').style.display = 'none';
    this.shadowRoot.querySelector('#unit').style.display = 'none';
    this.shadowRoot.querySelector('#disabled').style.display = 'block';
  }

  getUnitPrice() {
    return this.unitPrice;
  }


  getNumberOfItems(){
    return this.shadowRoot.querySelector('#value').value;
  }

  getTotalSize() {
    // returns in kg !
    if(this.size.endsWith('kg')){
      return this.getNumberOfItems();
    } else if(this.size.endsWith('g')){
      let size = Number(this.size.slice(0, -1));
      return this.getNumberOfItems() * size / 1000;
    } else {
      return NaN
    }
  }

  getTotalPrice() {
    return this.unitPrice * this.getTotalSize();
  }

}

customElements.define("div-product", Product);
