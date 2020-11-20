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

// Warning modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
// Credit modal
var link_credit = document.getElementById("open-credits");
var modal_credit = document.getElementById("credits");
var span_credit = document.getElementById("close-credit");
// thank you modal
var modal_ty = document.getElementById("tyModal");
var span_ty = document.getElementById("close-tymodal");
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
for(sp of [span, span_ty, span_credit, span_ttable]){
  sp.onclick = function(){closeModal(active_modal)}
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal || event.target == modal_credit || event.target == modal_ty) {
    closeModal(event.target)
  }
}

// check in query params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
aspb = urlParams.get("aspb");
if(aspb != null){
  for(info of ["aspb", "aspv", "fraise", "date", "hour", "place"]){
    document.getElementById("res-"+info).innerText = urlParams.get(info);
  }
  openModal(modal_ty)
}
