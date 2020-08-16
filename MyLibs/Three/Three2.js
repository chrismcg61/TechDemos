
var camera, scene, renderer;

/*** INIT ***/
function init() {
  /* DIV Display */
  document.body.style.margin = 0;
  document.body.style.overflow = "hidden"; 
  var container = document.createElement( 'div' );
  document.body.appendChild( container );

  /* CAM & SCENE & RENDERER */
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 90*1000 );
  camera.position.set(0, 0 ,1);
  //
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x03030f );
  //scene.fog = new THREE.Fog( 0x040306, 10, 300 ); 
  //
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );  
  
  container.appendChild( renderer.domElement );
  //
  window.addEventListener( 'resize', onWindowResize, false );
}

/*** Window RESIZE Evt ***/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
