var mouse = new THREE.Vector2();
var INTERSECTED, raycaster;

/*** INIT FUNCS ***/
function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  //console.log(mouse);
}
function initMousePicking(){
  raycaster = new THREE.Raycaster();
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );    

  container.onclick = function(){
    if(INTERSECTED  && INTERSECTED.onclick) INTERSECTED.onclick(); 
  };
}
function updateMousePicking( leaveObj, hoverObj ){
  raycaster.setFromCamera( mouse, camera );  
  var intersects = raycaster.intersectObjects( scene.children );
  //console.log(intersects);
  if ( intersects.length > 0 ) {
    var newIntersectObj = intersects[ 0 ].object;
    if ( INTERSECTED != newIntersectObj ) {
      if ( INTERSECTED ) leaveObj( INTERSECTED );
      
      INTERSECTED = newIntersectObj;
      
      hoverObj( INTERSECTED );      
    }
  } 
  else {
    if ( INTERSECTED ) leaveObj( INTERSECTED );
    INTERSECTED = null;
  }  
}
/***  ***/

/*** DEFAULT FUNCS ***/
function myLeaveObj( mesh ){
  if(!mesh.onclick) return;
  mesh.material.color.setHex( mesh.savedColor );
}
function myHoverObj( mesh ){
  if(!mesh.onclick) return;
  mesh.savedColor = mesh.material.color.getHex();
  mesh.material.color.setHex( 0xff0000 );
}
function getClickFunc(i) {
  return function() { alert(i) };
}
/***  ***/
