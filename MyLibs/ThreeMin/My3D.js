var THREE;
var MY3D = {};
MY3D.WW = window.innerWidth
MY3D.HH = window.innerHeight

let camera, scene, renderer;

var concreteMap, waterBumpMap, particleMap, noiseMap;
var directionalLight, camPLight, ground;
function rand(_x){ return Math.random()*_x; }
function sRand(_x){ return (Math.random()-0.5)*_x; }
//
MY3D.initWebglRenderer = function(_THREE){
  THREE = _THREE
  particleMap = new THREE.TextureLoader().load("https://cdn.rawgit.com/chrismcg61/TechDemos/master/Media/CloudParticle.jpg")
  concreteMap = new THREE.TextureLoader().load("https://cdn.rawgit.com/chrismcg61/TechDemos/master/Media/Concrete.jpg")
  waterBumpMap = new THREE.TextureLoader().load("https://cdn.rawgit.com/mrdoob/three.js/r156/examples/textures/water/Water_1_M_Normal.jpg")
  noiseMap = new THREE.TextureLoader().load("https://cdn.rawgit.com/chrismcg61/TechDemos/master/Media/Noise.png")
  noiseMap.repeat.set( 1,1 );  noiseMap.wrapS=noiseMap.wrapT=THREE.RepeatWrapping; noiseMap.minFilter=noiseMap.magFilter=THREE.NearestFilter;
  concreteMap.repeat.set( 1,1 );  concreteMap.wrapS=concreteMap.wrapT=THREE.RepeatWrapping; 
  waterBumpMap.repeat.set( 1,1 );  waterBumpMap.wrapS=waterBumpMap.wrapT=THREE.RepeatWrapping; 

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  document.body.appendChild( renderer.domElement );  
  renderer.setSize( MY3D.WW,MY3D.HH );
  renderer.setPixelRatio( window.devicePixelRatio )
  // window.addEventListener( 'resize', onWindowResize );
}
MY3D.initSceneBackground = function(){
  camera = new THREE.PerspectiveCamera( 70, MY3D.WW/MY3D.HH, 0.01, 900 );  //camera.position.set( 0,0.5,3 )
  scene = new THREE.Scene();

  renderer.shadowMap.enabled = true;   //renderer.shadowMap.type = THREE.PCFSoftShadowMap; //default THREE.PCFShadowMap
  scene.add(camera)

  directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
  directionalLight.position.set( 1,1,1 );  
  scene.add( directionalLight );
  //
  ground = new THREE.Mesh( new THREE.PlaneGeometry(6,6, 1,1),  new THREE.MeshLambertMaterial( {displacementMap:waterBumpMap,displacementScale:0.1} )  );
  ground.position.y = -0.01;  ground.rotation.x = -Math.PI/2;  ground.receiveShadow = true;
  scene.add( ground );
  //
  camPLight = new THREE.PointLight( 0xff8800, 5, 8, 0.9 );  //camPLight.position.z = -0.6  
  camPLight.shadow.camera.near = 0.01;
  camera.add( camPLight );
  //
  camPLight.myTorus = new THREE.Mesh( new THREE.TorusGeometry( 0.15,0.03, 5,8 ),  new THREE.MeshLambertMaterial()  );
  camPLight.add( camPLight.myTorus );
  camPLight.myTorus.castShadow = true;
}

// GUI :
MY3D.initGui = function(_params, _gui, _selectObj){
  var folder = _gui
  for(var key in _params){  
    if(key.includes('folder')){ folder=_gui.addFolder(_params[key]);  continue; }
    // if( !key.includes('open') ) folder.close();
    if(key.includes('Col'))  folder.addColor(_params, key,  );  
    else if(key.includes('Factor'))  folder.add(_params, key,   0,1,0.01 );  
    else if(key.includes('Pos'))     folder.add(_params, key,   -90,90,0.01 );  
    else if(key.includes('Select'))  folder.add(_params, key,  _selectObj);  
    else folder.add(_params, key,  ); 
  }
}

// CUSTOM PARTICLES MATERIAL :
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
    _pointsMat.userData.shader = shader;    //console.log( shader.vertexShader )
  };
}

// MY BASIC SHADER MATERIAL (MESH / POINTS) :
MY3D.newShaderMaterial = function(){
  var vShader,fShader;
  {
  vShader = 
  `
  varying vec2 vUv;
  varying vec4 vPos;
  uniform float texPosMode;
  uniform sampler2D texturePosition;
  void main(){
   vUv = uv; 
   vec4 posTemp = vec4( position, 1.0 );
   if(texPosMode > 0.0)  posTemp = texture2D( texturePosition, uv );
   vec4 mvPosition = modelViewMatrix * vec4( posTemp.xyz, 1.0 );   

   gl_Position = projectionMatrix * mvPosition;
   vPos = modelMatrix * posTemp;   //instanceMatrix

   // POINTS :
   // gl_PointSize = size / -mvPosition.z;
   gl_PointSize = 2.0 / -mvPosition.z;
   if(texPosMode > 0.0)  gl_PointSize *= posTemp.w;
  }`;
  fShader = 
  `
  varying vec2 vUv;
  varying vec4 vPos;
  uniform float time;
  uniform float noiseScale;
  uniform sampler2D noiseMap;
  uniform sampler2D diffuseMap;
  uniform sampler2D particleMap;  
  void main()	{
   vec4 colDiffuse = texture2D(diffuseMap,  vUv);
   vec4 colNoise = texture2D(noiseMap,  noiseScale*vPos.xz);
   
   gl_FragColor = vec4( colDiffuse.rgb,  0.7 );
   
   if(noiseScale > 0.0) gl_FragColor *= colNoise;

   // POINTS :
   // gl_FragColor *= texture2D( particleMap, gl_PointCoord );
   if( length(gl_PointCoord - vec2(0.5,0.5)) > 0.5 )  discard;
  }`;
  }
  var myUniforms = {
    texPosMode: { value: 0 },
    texturePosition: { value: null },
    noiseScale: { value: 0.01 },
    noiseMap: { value: noiseMap },
    time: { value: 0 },
    diffuseMap: { value: concreteMap },
    particleMap: { value: particleMap },
  };
  var newShaderMaterial = new THREE.ShaderMaterial( {
    uniforms:myUniforms, vertexShader:vShader, fragmentShader:fShader,
    transparent:true,opacity:0.9,blending:THREE.AdditiveBlending, //depthTest:true,depthWrite:true,
  } );
  return newShaderMaterial;
}
