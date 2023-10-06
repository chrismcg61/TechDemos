var MY3D = {};
MY3D.WW = window.innerWidth
MY3D.HH = window.innerHeight

let camera, scene, renderer;

const concreteMap = new THREE.TextureLoader().load("https://cdn.rawgit.com/chrismcg61/TechDemos/master/Media/Concrete.jpg")
const waterBumpMap = new THREE.TextureLoader().load("https://cdn.rawgit.com/mrdoob/three.js/r156/examples/textures/water/Water_1_M_Normal.jpg")
//waterBumpMap.repeat.set( 1,1 );  waterBumpMap.wrapS=waterBumpMap.wrapT=THREE.RepeatWrapping;  

MY3D.initWebglRenderer = function(){
  camera = new THREE.PerspectiveCamera( 70, MY3D.WW/MY3D.HH, 0.01, 900 );
  camera.position.set( 0,0.5,3 )
  scene = new THREE.Scene();  

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  document.body.appendChild( renderer.domElement );  
  renderer.setSize( MY3D.WW,MY3D.HH );
  // window.addEventListener( 'resize', onWindowResize );   //renderer.setPixelRatio( window.devicePixelRatio );
  
  scene.background = new THREE.Color( 0x000044 );
  {
    renderer.shadowMap.enabled = true;
    scene.add(camera)  

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
    directionalLight.position.set( 1,1,1 );  
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;   //directionalLight.shadow.camera.near=0.05;  //directionalLight.shadow.bias=-0.00005;
    scene.add( directionalLight );
    //
    var ground = new THREE.Mesh( new THREE.PlaneGeometry(6,6, 512,512),  new THREE.MeshPhysicalMaterial({displacementMap:myBumpMap,displacementScale:0.3,}) );
    ground.position.y = -0.1
    ground.rotation.x = -Math.PI/2;
    ground.receiveShadow = true;
    scene.add( ground );  
  }
}
