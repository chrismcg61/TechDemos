
var btnList = [];
var curBtnId = 0;

/*** INIT BTN LIST ***/
function initBtnList(btnGrp){
  btnList = [];
  curBtnId = 0;
  //
  btnList = btnGrp.getElementsByTagName("BUTTON");  
  //
  focusNextBtn(0);
}

/*** Btn FOCUS Mgt ***/
function focusNextBtn(i){
  var nextBtnId = curBtnId+i;
  if(nextBtnId >= btnList.length) nextBtnId=0;
  else if(nextBtnId < 0) nextBtnId = btnList.length-1;
  //
  curBtnId = nextBtnId;
  btnList[curBtnId].focus();
}

/*** Nav Key Events ***/
function onMenuKeyDown( evt ) {
  switch ( evt.keyCode ) {      
    case 98: // PAD-down
    case 102: // PAD-right
      focusNextBtn(1);
      break;
    case 100: // PAD-left    
    case 104: // PAD-up
      focusNextBtn(-1);
      break;          
  }
};
