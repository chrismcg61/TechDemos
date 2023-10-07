var THREE;
var MY3D = {};
MY3D.WW = window.innerWidth
MY3D.HH = window.innerHeight

let camera, scene, renderer;

var concreteMap, waterBumpMap, particleMap;
var directionalLight, ground;
function rand(_x){ return Math.random()*_x; }
function sRand(_x){ return (Math.random()-0.5)*_x; }
//
MY3D.initWebglRenderer = function(_THREE){
  THREE = _THREE
  particleMap = new THREE.TextureLoader().load("https://cdn.rawgit.com/chrismcg61/TechDemos/master/Media/CloudParticle.jpg")
  concreteMap = new THREE.TextureLoader().load("https://cdn.rawgit.com/chrismcg61/TechDemos/master/Media/Concrete.jpg")
  waterBumpMap = new THREE.TextureLoader().load("https://cdn.rawgit.com/mrdoob/three.js/r156/examples/textures/water/Water_1_M_Normal.jpg")
  concreteMap.repeat.set( 1,1 );  concreteMap.wrapS=concreteMap.wrapT=THREE.RepeatWrapping; 
  waterBumpMap.repeat.set( 1,1 );  waterBumpMap.wrapS=waterBumpMap.wrapT=THREE.RepeatWrapping; 
  
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  document.body.appendChild( renderer.domElement );  
  renderer.setSize( MY3D.WW,MY3D.HH );
  // window.addEventListener( 'resize', onWindowResize );   //renderer.setPixelRatio( window.devicePixelRatio );  
}
//
MY3D.initSceneBackground = function(){
  camera = new THREE.PerspectiveCamera( 70, MY3D.WW/MY3D.HH, 0.01, 900 );
  camera.position.set( 0,0.5,3 )
  scene = new THREE.Scene();  
  
  scene.background = new THREE.Color( 0x000044 );
  {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    scene.add(camera)  

    directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
    directionalLight.position.set( 1,1,1 );  
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;   //directionalLight.shadow.camera.near=0.05;  //directionalLight.shadow.bias=-0.00005;
    scene.add( directionalLight );
    //
    ground = new THREE.Mesh( new THREE.PlaneGeometry(6,6, 512,512),  new THREE.MeshPhysicalMaterial({displacementMap:waterBumpMap,displacementScale:0.3,}) );
    ground.position.y = -0.1
    ground.rotation.x = -Math.PI/2;
    ground.receiveShadow = true;
    scene.add( ground );  
  }
}
//
MY3D.initGui = function(_params, _gui){
  // var gui = new GUI();  
  var folder = _gui
  for(var key in _params){  
    if( key.includes('folder') ){
      folder = _gui.addFolder(_params[key]); 
      if( !key.includes('open') ) folder.close();
      continue; 
    }
    //
    if(key.includes('Col'))  folder.addColor(_params, key,  );  
    else if(key.includes('Factor'))  folder.add(_params, key,   0,1,0.01 );  
    else if(key.includes('Pos'))     folder.add(_params, key,   -30,30,0.01 );  
    else if(key.includes('Select'))  folder.add(_params, key,  {Mode0:0,Mode1:1,Mode2:2,Mode3:3,Mode4:4,Mode5:5,} );  
    else folder.add(_params, key,  ); 
  }
}

//  CUSTOM PARTICLES MATERIAL :
MY3D.customPointsMat_TexPos = function(_pointsMat){
  _pointsMat.onBeforeCompile = function ( shader ) {
    shader.uniforms.texturePosition = { value: null };
    shader.vertexShader = 'uniform sampler2D texturePosition;\n' + shader.vertexShader;  
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      vec4 posTemp = texture2D( texturePosition, uv );
      vec3 transformed = posTemp.xyz;       // transformed = vec3( position );      
      `);
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <colorspace_fragment>',
      `
      gl_FragColor = linearToOutputTexel( gl_FragColor );
      if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) )  >  0.5 )   discard;
      `);
    _pointsMat.userData.shader = shader;
    // console.log( shader.vertexShader )
  };
}
