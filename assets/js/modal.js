function openModal(one_modal) {
  one_modal.style.display = "block";
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
}

function closeModal(one_modal) {
  one_modal.style.display = "none";
  document.documentElement.style.overflow = 'scroll';
  document.body.scroll = "yes";
}

// Warning modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
// Credit modal
var link_credit = document.getElementById("open-credits");
var modal_credit = document.getElementById("credits");
var span_credit = document.getElementById("close-credit");

// setup actions
link_credit.onclick = function(){openModal(modal_credit)}
span.onclick = function(){closeModal(modal)}
span_credit.onclick = function(){closeModal(modal_credit)}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal || event.target == modal_credit) {
    closeModal(event.target)
  }
}
