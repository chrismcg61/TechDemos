var fpsVars = {
  lockControls:lockControls,
  jumpForce:210,
  maxFallSpeed:230,  
};
//
const CAM_FLOORZ = 1;
const MESH_SIZE = 5;
const COL_SIZE = MESH_SIZE*0.7;
const TRIG_SIZE = COL_SIZE*1.8;
const COL_FORCE = 0.05;
const CAM_MASS = 40.0;
// const MESH_DELTA = TRIG_SIZE*3;
//const JUMP_FORCE = vars.jumpForce; //300.0;
var camRaycaster;
var controls;
//
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
//
var camLastT = performance.now();
var camVelocity = new THREE.Vector3();
var camDir = new THREE.Vector3();
//
var colObjs = [];
var fpsCtrlFolder;
//
function activateTrigMesh(){ }
function closeTrigMesh(){ }
function lockControls(){ controls.lock(); }

/*** INIT FPS Ctrl ***/
setTimeout( initFpsGui ,  1);
function initFpsGui(){
  if(typeof(addGuiFolder) !== 'undefined'){
    fpsCtrlFolder = addGuiFolder(gui, "FPS CTRL", fpsVars, 1);
  }  
}
function initFpsCtrl(){
  camRaycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 5 );
  controls = new THREE.PointerLockControls( camera );
  scene.add( controls.getObject() );
  //controls.lock(); 
  initFpsListeners();  
}

/*** KEY Listener ***/
var onKeyDown = function ( event ) {
  console.log(event.keyCode);
  switch ( event.keyCode ) {
    case 38: // up
    case 90: // z
      moveForward = true;
      break;
    case 37: // left
    case 81: // q
      moveLeft = true; break;
    case 40: // down
    case 83: // s
      moveBackward = true;
      break;
    case 39: // right
    case 68: // d
      moveRight = true;
      break;
    case 32: // space
      if ( canJump === true ) camVelocity.y += fpsVars.jumpForce;
      canJump = false;
      break;
      
    case 69: // e
      activateTrigMesh();
      break;

    case 222: // ²
      closeTrigMesh();
      break;  
  }
  
  if(myOnKeyDown) myOnKeyDown(event); //onMenuKeyDown( event );
};
var onKeyUp = function ( event ) {
  switch( event.keyCode ) {
    case 38: // up
    case 90: // z
      moveForward = false;
      break;
    case 37: // left
    case 81: // q
      moveLeft = false;
      break;
    case 40: // down
    case 83: // s
      moveBackward = false;
      break;
    case 39: // right
    case 68: // d
      moveRight = false;
      break;
  }
};
function initFpsListeners(){
  // controls.addEventListener( 'lock', function() {
  //   blocker.style.display = 'none';
  // } );
  // controls.addEventListener( 'unlock', function() {
  //   blocker.style.display = 'block';
  // } );  
  // instructions.addEventListener( 'click', function ( event ) {
  //   lockControls();
  // }, false );
  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );  
}

/*** FPS Ctrl UPDATE ***/
function fpsCamAnim(){
  if ( controls.isLocked === true ){    
    camRaycaster.ray.origin.copy( controls.getObject().position );
    camRaycaster.ray.origin.y -= 0.5;
    var intersections = camRaycaster.intersectObjects( colObjs );
    var onObject = intersections.length > 0;
    var time = performance.now();
    var delta = ( time - camLastT ) / 1000;
    camVelocity.x -= camVelocity.x * 10.0 * delta;
    camVelocity.z -= camVelocity.z * 10.0 * delta;
    camVelocity.y -= 9.8 * CAM_MASS * delta; // 100.0 = mass
    camDir.z = Number( moveForward ) - Number( moveBackward );
    camDir.x = Number( moveLeft ) - Number( moveRight );
    camDir.normalize(); // this ensures consistent movements in all directions
    if ( moveForward || moveBackward ) camVelocity.z -= camDir.z * 400.0 * delta;
    if ( moveLeft || moveRight ) camVelocity.x -= camDir.x * 400.0 * delta;
    if ( onObject === true ) {
      camVelocity.y = Math.max( 0, camVelocity.y );
      canJump = true;
    }    
    
    /*** CHECK MESH COL : ***/
    // if(intersectionsH.length>0) 
    for ( var i=0; i<colObjs.length; i++ ) {
      var obj = colObjs[i];
      var distVect = new THREE.Vector3();  //obj.position);
      //distVect.sub( controls.getObject().position );
      distVect.subVectors ( controls.getObject().position,  obj.position);
      var distVal = distVect.length();
      //var distVectN = new THREE.Vector3(distVect);
      distVect.normalize();
      if( distVal < COL_SIZE)
      {
        console.log( distVect );
        distVal *= 0.01;
        camVelocity.x = 0;
        camVelocity.z = 0;
        //controls.getObject().position.x += COL_FORCE*delta * distVectN.x * 1/distVal;
        controls.getObject().position.x += COL_FORCE*distVect.x; // * 1/distVal;
        controls.getObject().position.z += COL_FORCE*distVect.z;
      }
    }
    
    //const maxVelY = 150;
    if(camVelocity.y<-fpsVars.maxFallSpeed) camVelocity.y=-fpsVars.maxFallSpeed;

    controls.getObject().translateX( camVelocity.x * delta );
    controls.getObject().translateY( camVelocity.y * delta );
    controls.getObject().translateZ( camVelocity.z * delta );
    if ( controls.getObject().position.y < CAM_FLOORZ ) {
      camVelocity.y = 0;
      controls.getObject().position.y = CAM_FLOORZ;
      canJump = true;
    }
    camLastT = time;
  }
}
