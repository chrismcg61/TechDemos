//////////////////////////////////////////////////////////////
// MODAL:
/////////////////////////////////////////////////////////////
function openMyModal(){
  myModal.style.display = "block";
}
function closeModal() {
  myModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == myModal) {
    closeModal();
  }
}
