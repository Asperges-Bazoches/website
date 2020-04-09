// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//////////////////////////////////////

var link_credit = document.getElementById("open-credits");

// Get the button that opens the modal
var modal_credit = document.getElementById("credits");

// Get the <span> element that closes the modal
var span_credit = document.getElementById("close-credit");

// When the user clicks on the button, open the modal
link_credit.onclick = function() {
  modal_credit.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span_credit.onclick = function() {
  modal_credit.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal_credit) {
    modal_credit.style.display = "none";
  }
}
