const STR_INTERACT = "(E) : Interact";
const STR_CLOSE = "(E, ²) : CLOSE";

var trigMesh = null;
//
function initFpsUi(){
  initMenuDivs();
  startInfoDiv();
  
  if(startInfo){
    startInfo.addEventListener( 'click', function ( event ) {
      lockControls();
      closeTrigMesh();
    }, false );  
  }
}
//
function camTriggers(){
  hudDiv.style.display = 'none';
  trigMesh = null;
  for ( var i=0; i<colObjs.length; i++ ) {
      var obj = colObjs[i];
      var distVect = new THREE.Vector3();
      distVect.subVectors ( controls.getObject().position,  obj.position);
      var distVal = distVect.length();  //distVect.normalize();
      if( distVal < TRIG_SIZE  &&  obj.name)
      {
        hudDiv.style.display = 'block';
        trigMesh = obj;
        hudText.innerHTML = STR_INTERACT +" - "+ trigMesh.name;
        break;
      }
  }  
}
//
// startInfoDiv();
function initMenuDivs(){
  var hudDiv = addElt(document.body, "DIV", "hudDiv", "");
  hudDiv.style.display = "none";
  hudDiv.classList.add("backDiv");
  var subDiv = addElt(hudDiv, "DIV", "", "");
  subDiv.classList.add("infoDiv");
  subDiv.classList.add("infoDivCenter");
  var sub2Div = addElt(subDiv, "DIV", "", "");
  var sub3Div1 = addElt(sub2Div, "DIV", "", "_");
  sub3Div1.style.padding = "220px 0 0 0";
  var sub3Div2 = addElt(sub2Div, "DIV", "hudText", STR_INTERACT);
  //
  var menuDiv = addElt(document.body, "DIV", "menuDiv", "");
  menuDiv.classList.add("backDiv");
  menuDiv.classList.add("menuDiv");
  var subDiv = addElt(menuDiv, "DIV", "", "");
  subDiv.classList.add("infoDiv");
  var sub2Div1 = addElt(subDiv, "DIV", "menuTitle", "");
  var sub2Div2 = addElt(subDiv, "DIV", "menuContent", "");
  var sub2Div3 = addElt(subDiv, "DIV", "", "_");
  sub2Div3.style.padding = "8px 0 0 0";
  var sub2Div4 = addElt(subDiv, "DIV", "",   STR_CLOSE);  
}
function startInfoDiv(){
  var newDiv = addElt(menuContent, "DIV", "startInfo", "");
  newDiv.style.cursor = "pointer";
  newDiv.style.padding = "100px 0 100px 0";
  //
  var subDiv1 = addElt(newDiv, "DIV", "", "Click to Play");
  subDiv1.style.fontSize = "120px";
  //
  var subDiv2 = addElt(newDiv, "DIV", "", "Arrows/Q,Z,S,D = Move, SPACE = Jump, MOUSE = Look around");
  subDiv2.style.fontSize = "20px";
}
function addElt(parent, tag, id, innerHTML){
  var newElt = document.createElement(tag);  
  newElt.id = id;
  newElt.innerHTML = innerHTML;
  parent.appendChild( newElt );  
  return newElt;
}
function activateTrigMesh(){
  if(menuDiv.style.display == 'block') closeTrigMesh();
  else if(trigMesh && trigMesh.content) {
    menuDiv.style.display = 'block';
    menuTitle.innerHTML = "MENU -- " + trigMesh.name;
    menuContent.innerHTML = "";
    menuContent.appendChild(trigMesh.content);
    if(trigMesh.content.onload) trigMesh.content.onload();    
  }
}
function closeTrigMesh(){
  menuDiv.style.display = 'none';
}
