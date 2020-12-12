function openModal(one_modal) {
  one_modal.style.display = "block";
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  active_modal = one_modal;
}

function closeModal(one_modal) {
  one_modal.style.display = "none";
  document.documentElement.style["overflow-y"] = 'scroll';
  document.documentElement.style["overflow-x"] = 'hidden';
  document.body.scroll = "yes";
}

var active_modal = null;

var modal = document.getElementById("myModal");
var modal_credit = document.getElementById("credits");
var modal_ty = document.getElementById("tyModal");
var modal_ttable = document.getElementById("timetableModal");

for(link of document.getElementsByClassName('open-timetable')){link.onclick = function(){openModal(modal_ttable)}}
for(link of document.getElementsByClassName('open-credits')){link.onclick = function(){openModal(modal_credit)}}
for(sp of document.getElementsByClassName('close')){sp.onclick = function(){closeModal(active_modal)}}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal || event.target == modal_credit || event.target == modal_ty) {
    closeModal(event.target)
  }
}
