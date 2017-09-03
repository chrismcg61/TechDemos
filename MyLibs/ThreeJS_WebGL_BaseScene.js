var camera, scene, renderer, hemiLight;
var stats,  gui, guiFolder1;

function initWebGlScene(camZ, statsIsActive, guiIsActive) {
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";

  var camAngle = 70;   //default: 70
  var camFar = 5000;
  
  camera = new THREE.PerspectiveCamera( camAngle, window.innerWidth / window.innerHeight, 1, camFar );
  camera.position.z = camZ;

  scene = new THREE.Scene();
  
  // LIGHTS

  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.99, 0.99, 0.99 );
  hemiLight.groundColor.setHSL( 0.7, 0.7, 0.7 );
  hemiLight.position.set( 0, 400, 0 );
  scene.add( hemiLight );

  hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
  scene.add( hemiLightHelper );

  
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //

  window.addEventListener( 'resize', onWindowResize, false );

  
  //Stats:
  if(statsIsActive)
  {
    stats = new Stats();
    document.body.appendChild( stats.dom );
  }
  
  //GUI:
  if(guiIsActive)
  {
    gui = new dat.GUI();
    guiFolder1 = gui.addFolder('Global Params');
  }
 
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
