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
