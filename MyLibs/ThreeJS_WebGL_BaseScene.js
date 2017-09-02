var camera, scene, renderer, hemiLight;

function initWebGlScene(camZ) {

  var camAngle = 70;   //default: 70
  var camFar = 5000;
  
  camera = new THREE.PerspectiveCamera( camAngle, window.innerWidth / window.innerHeight, 1, camFar );
  camera.position.z = camZ;

  scene = new THREE.Scene();
  
  // LIGHTS

  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
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
 
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
