/////////////////////////////////////////////////////
// Global Vars :
/////////////////////////////////////////////////////
var gpuMode = 1;
var statsMode = 1;
var container,  camera, scene, renderer;
var stats;
//var infoDiv, stats;
/////////////////////////////////////////////////////
// First Time Inits :
/////////////////////////////////////////////////////
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function initMain() {
  //if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
  document.body.style.margin = 0;
  document.body.style.overflow = "hidden"; 
  
  // 3D Container :
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  
   // CAMERA
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
  //camera.position.set( 2, 0, 2 );
  //camera.lookAt( new THREE.Vector3() );

  // Window Events:
  window.addEventListener( 'resize', onWindowResize, false );
  
  // STATS
  stats = new Stats();
  if(statsMode) container.appendChild( stats.dom );
}
/////////////////////////////////////////////////////
// Renderer & Scene Inits :
/////////////////////////////////////////////////////
function initRenderer() {
  if(renderer) container.removeChild( renderer.domElement );

  if(gpuMode)   {
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    //infoDiv.innerHTML = "Mode: GPU";
  }
  else  {
    renderer = new THREE.CanvasRenderer();
    //infoDiv.innerHTML = "Mode: CPU";
  }

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  //renderer.gammaInput = true;
  //renderer.gammaOutput = true;

  //
  container.appendChild( renderer.domElement );

  gpuMode = !gpuMode;
}
//
function initScene( callback ){
  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x03030f );
  //scene.fog = new THREE.Fog( 0x040306, 10, 300 ); 

  callback(); 
  //setTimeout(callback, 1);
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
////////////////////////////////////////
// DEFAULT Init Func :
////////////////////////////////////////
function initDefault( myInitScene, myAnimScene,  _gpuMode, _statsMode ){
  gpuMode = _gpuMode;
  statsMode = _statsMode;
  initMain();
  initRenderer();
  initScene( myInitScene );
  render( myAnimScene );  
}
