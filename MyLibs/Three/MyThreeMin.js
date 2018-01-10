/////////////////////////////////////////////////////
// User Vars :
/////////////////////////////////////////////////////
var gpuMode = 0;
var staticParamFolders = {
  ReInitRenderer:
  {
    Title:"ReInit Renderer",
    Params:{
      ReinitRender: initRenderer,
    }
  },

};
var dynParamFolders = {  }

/////////////////////////////////////////////////////
// Global Vars :
/////////////////////////////////////////////////////
var container, infoDiv;
var camera, scene, renderer;
var stats;

/////////////////////////////////////////////////////
// First Time Inits :
/////////////////////////////////////////////////////
function initDivs() {
  // 3D Container :
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // Info Div:
  infoDiv = document.createElement( 'div' );
  document.body.appendChild( infoDiv );

  //Styles:
  infoDiv.style.position = "absolute";
  infoDiv.style.top = 0;
  infoDiv.style.left = "33%";
  infoDiv.style.width = "33%";
  infoDiv.style.textAlign = "center";
  infoDiv.style.color = "#ffffff";
  infoDiv.style.backgroundColor = "rgba(0,0,0, 0.8)";

  document.body.style.margin = 0;
  document.body.style.overflow = "hidden"; 

}
//
function initGUI( updateCallback ) {    
  var gui = new dat.GUI();
  gui.open();  

  var staticFolder = gui.addFolder("Static Params");
  staticFolder.open();  
  //for ( var i = 0; i < staticParamFolders.length; i ++ ) {  
  for(var folderKey in staticParamFolders){
    var newFolder = staticFolder.addFolder(staticParamFolders[folderKey].Title);
    newFolder.open();
    for(var key in staticParamFolders[folderKey].Params){
      newFolder.add( staticParamFolders[folderKey].Params, key);    
    } 
  }

  var dynFolder = gui.addFolder("Dynamic Params");
  dynFolder.open();  
  for(var folderKey in dynParamFolders){
    var newFolder = dynFolder.addFolder(dynParamFolders[folderKey].Title);
    newFolder.open();
    for(var key in dynParamFolders[folderKey].Params){
      newFolder.add( dynParamFolders[folderKey].Params, key).onChange( updateCallback );    
    } 
  }

}
//
function initGeneric() {
  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  // CAMERA
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set( 2, 0, 2 );
  camera.lookAt( new THREE.Vector3() );

  // Window Events:
  window.addEventListener( 'resize', onWindowResize, false );

  // STATS
  stats = new Stats();
  container.appendChild( stats.dom );
}

/////////////////////////////////////////////////////
// Renderer & Scene Inits :
/////////////////////////////////////////////////////
function initRenderer() {
  if(renderer) container.removeChild( renderer.domElement );

  if(gpuMode)   {
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    infoDiv.innerHTML = "Mode: GPU";
  }
  else  {
    renderer = new THREE.CanvasRenderer();
    infoDiv.innerHTML = "Mode: CPU";
  }

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  //renderer.gammaInput = true;
  //renderer.gammaOutput = true;

  //
  container.appendChild( renderer.domElement );

  gpuMode = !gpuMode;
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function initScene( callback ){
  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x03030f );
  //scene.fog = new THREE.Fog( 0x040306, 10, 300 ); 

  callback(); 
}

////////////////////////////////////////
// ANIMATE & RENDER :
////////////////////////////////////////
function render( animateCallback ) {
  stats.update();

  animateCallback();
  renderer.render( scene, camera );

  requestAnimationFrame( function(){render(animateCallback);} );
}

