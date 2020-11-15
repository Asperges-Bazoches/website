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

// Warning modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
// Credit modal
var link_credit = document.getElementById("open-credits");
var modal_credit = document.getElementById("credits");
var span_credit = document.getElementById("close-credit");
// Timetable modal
var link_ttable = document.getElementById("btn-timetable");
var link_ttable_2 = document.getElementById("btn-timetable-2");
var link_ttable_3 = document.getElementById("btn-timetable-3");
var modal_ttable = document.getElementById("timetableModal");
var span_ttable = document.getElementById("close-ttable");

// setup actions
for(link of [link_ttable, link_ttable_2, link_ttable_3]){
  if (link != null){
    link.onclick = function(){openModal(modal_ttable)}
  }
}
link_credit.onclick = function(){openModal(modal_credit)}
span.onclick = function(){closeModal(modal)}
span_credit.onclick = function(){closeModal(modal_credit)}
span_ttable.onclick = function(){closeModal(modal_ttable)}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal || event.target == modal_credit) {
    closeModal(event.target)
  }
}
