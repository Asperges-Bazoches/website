// Rename to register modal ?

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
