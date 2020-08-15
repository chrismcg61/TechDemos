// import * as THREE from 'https://cdn.rawgit.com/mrdoob/three.js/r119/build/three.module.js';
/////////////////////////////////////////////////////
// Global Vars :
/////////////////////////////////////////////////////
var gpuMode = 1;
var statsMode = 1;
var fogDist = 0;
var ambLightIntensity = 0;
var shadowMode = 0;
var aliasingMode = false;
var camParams = {fov:50, near:0.01, far:90*1000};
var backColor = 0x03030f;
//
var container,  camera, scene, renderer;
var stats;
var ambientLight;
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
  // DIV Display :
  document.body.style.margin = 0;
  document.body.style.overflow = "hidden"; 
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  
   // CAMERA
  camera = new THREE.PerspectiveCamera( camParams.fov, window.innerWidth / window.innerHeight, camParams.near, camParams.far );
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
    renderer = new THREE.WebGLRenderer( { antialias: aliasingMode } );
    //infoDiv.innerHTML = "Mode: GPU";
    if(shadowMode) renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  }
  else  {
    renderer = new THREE.CanvasRenderer();
    //infoDiv.innerHTML = "Mode: CPU";
  }

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  //renderer.gammaInput = true;
  //renderer.gammaOutput = true;
  
  container.appendChild( renderer.domElement );

  gpuMode = !gpuMode;
}
//
function initScene( callback ){
  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color( backColor );
  if(fogDist>0) scene.fog = new THREE.Fog( 0xffffff, 0, fogDist );
  
  if(ambLightIntensity>0){
    ambientLight = new THREE.AmbientLight( 0xffffff, ambLightIntensity );
    scene.add( ambientLight );
  }

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
