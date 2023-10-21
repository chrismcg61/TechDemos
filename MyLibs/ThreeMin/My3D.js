var THREE;
var MY3D = {};
MY3D.WW = window.innerWidth
MY3D.HH = window.innerHeight

let camera, scene, renderer;

var concreteMap, waterBumpMap, particleMap, noiseMap;
var directionalLight, camPLight, ground;
var composer;
var scene2, camera2;

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

// COMPOSER - POSTFX :
MY3D.initComposer = function( _POSTFX, _params){
  // console.log( window.devicePixelRatio )   // console.log( renderer.getPixelRatio() )
  composer = new _POSTFX.EffectComposer( renderer,  );   //myRenderTarget
  composer.setSize( MY3D.WW,MY3D.HH );
  composer.setPixelRatio( window.devicePixelRatio )
  composer.renderPass = new _POSTFX.RenderPass( scene, camera );
  //
  composer.renderPixelatedPass = new _POSTFX.RenderPixelatedPass( 4, scene, camera );
  composer.renderPixelatedPass.setPixelSize( 4 )  
  composer.renderPixelatedPass.normalEdgeStrength = 4
  composer.renderPixelatedPass.depthEdgeStrength = 4
  //    
  composer.colorCorrectionPass = new _POSTFX.ShaderPass( _POSTFX.ColorCorrectionShader );
  composer.gammaPass = new _POSTFX.ShaderPass( _POSTFX.GammaCorrectionShader );
  composer.outputPass = new _POSTFX.OutputPass();  // composer.outputPass.uniforms._toneMapping = 2    
  composer.filmPass = new _POSTFX.FilmPass( 0.6, true );
  composer.dotScreenPass = new _POSTFX.DotScreenPass( new THREE.Vector2( 0, 0 ), 0.5, 0.8 );
  //
  composer.bokehPass = new _POSTFX.BokehPass( scene, camera, { focus: 1.0, aperture: 0.025, maxblur: 0.01 } );
  // composer.bokehPass.uniforms[ 'maxblur' ].value =  params.fxStr  
  //
  composer.colorPass = new _POSTFX.ShaderPass( _POSTFX.ColorifyShader );
  composer.colorPass.uniforms[ 'color' ] = new THREE.Uniform( new THREE.Color( 0.1,0.5,0.9 ) );
  //
  composer.tonePass = new _POSTFX.ShaderPass( _POSTFX.ACESFilmicToneMappingShader );
  composer.tonePass.uniforms.exposure.value = 1.9
  //
  composer.bloomPass = new _POSTFX.UnrealBloomPass( new THREE.Vector2( MY3D.WW,MY3D.HH ),  );
  composer.bloomPass.strength = 1.1;
  composer.bloomPass.threshold = 0.1;
  composer.bloomPass.radius = 0.1;    
  //
  composer.vignettePass = new _POSTFX.ShaderPass( _POSTFX.VignetteShader );
  composer.vignettePass.uniforms[ 'offset' ].value = 0.95;
  composer.vignettePass.uniforms[ 'darkness' ].value = 1.6;    
  //
  composer.fxaaPass = new _POSTFX.ShaderPass( _POSTFX.FXAAShader );
  var pixelRatio = renderer.getPixelRatio();
  composer.fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( MY3D.WW * pixelRatio );
  composer.fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( MY3D.HH * pixelRatio );
  //
  composer.ssrPass = new _POSTFX.SSRPass( {
    renderer, scene, camera,
    width:MY3D.WW,height:MY3D.HH,
    selects:[],  // selects: params.groundReflector ? selects : null    
  } );  //composer.ssrPass.selects.push()
  composer.ssrPass.maxDistance = 0.9
  
  MY3D.composerAddPasses(_params);
}
MY3D.composerAddPasses = function( _params ){
  composer.addPass( composer.renderPass );  
  switch( _params.fxSelect ) {
    case 0:
      composer.addPass( composer.gammaPass );
      break;
    case 1:
      composer.addPass( composer.colorCorrectionPass );
      break;        
    case 2:
      composer.addPass( composer.tonePass );
      break;
    case 3:
      composer.addPass( composer.bloomPass );
      break;
    case 4:
      composer.addPass( composer.bokehPass );
      break;
    case 5:
      composer.addPass( composer.filmPass );
      break;
    case 6:
      composer.addPass( composer.dotScreenPass );
      break;
    case 7:
      composer.addPass( composer.colorPass );
      break;
    case 8:
      composer.addPass( composer.vignettePass );
      break;
    case 9:
      composer.addPass( composer.outputPass );
      break;
    case 10:
      // composer.addPass( composer.colorCorrectionPass );
      composer.addPass( composer.fxaaPass );
      break;
    case 11:
      composer.removePass( composer.renderPass );
      composer.addPass( composer.renderPixelatedPass );
      // composer.addPass( composer.outputPass );
      break;
    case 12:
      composer.addPass( composer.ssrPass );
      // composer.addPass( composer.bloomPass );
      // composer.addPass( composer.outputPass );
      break;
    default: //Only RenderPass
  }
}
MY3D.addSsrGroundReflector = function( _POSTFX ){
  var groundReflector = new _POSTFX.ReflectorForSSRPass( new THREE.PlaneGeometry( 90,90 ), {
    textureWidth: MY3D.WW,textureHeight: MY3D.HH,
    color: 0xffffff,  useDepthTexture: true,
    // clipBias: 0.0003,
  } );
  groundReflector.material.depthWrite = false;
  groundReflector.rotation.x = - Math.PI / 2;
  groundReflector.visible = false;
  groundReflector.position.y = 0.01
  scene.add( groundReflector );
  //
  composer.ssrPass.groundReflector = groundReflector   
  composer.ssrPass.groundReflector.maxDistance = 30
}

// CUSTOM RENDER LOOP :
MY3D.myRender_Advanced = function(_params){
  {
    renderer.setRenderTarget(null)
    renderer.setScissorTest( true );  
    renderer.setClearColor( 0x000066 );      
  }
  if(_params.Scene1Factor>0){
    renderer.setViewport( 0,0, MY3D.WW*_params.Scene1Factor,MY3D.HH*_params.Scene1Factor );
    renderer.setScissor( 0,0, MY3D.WW*_params.Scene1Factor,MY3D.HH*_params.Scene1Factor );
    if(_params.RENDER_FX) composer.render();
    else  renderer.render( scene, camera );
  }
  if(_params.Scene2Factor>0){
    renderer.setViewport( 0,0, MY3D.WW*_params.Scene2Factor,MY3D.HH*_params.Scene2Factor );
    renderer.setScissor( 0,0, MY3D.WW*_params.Scene2Factor,MY3D.HH*_params.Scene2Factor );
    renderer.render( scene2, camera2 );
  }
  // RESET Viewport :
  renderer.setViewport( 0,0, MY3D.WW*_params.Scene1Factor,MY3D.HH*_params.Scene1Factor );
  renderer.setScissor( 0,0, MY3D.WW*_params.Scene1Factor,MY3D.HH*_params.Scene1Factor );
}



// CUSTOM GEOMETRY :
MY3D.addGeoAttributes = function(_geo){
  const positionAttribute = _geo.getAttribute( 'position' );  //positionAttribute.array
  // for ( let i = 0; i < positionAttribute.count; i ++ ) positionAttribute.setXYZ( i, x, y, z );  
  var colors = [];
  var sizes = [];
  for( var ii=0; ii<positionAttribute.count; ii++) {
    // const myCol = new THREE.Color().setHSL( rand(1),1,0.5 )
    colors.push( rand(1),rand(1),rand(1) );
    sizes.push( 1 );
  }
  _geo.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
  _geo.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ) );
}

// CUSTOM "PointsMaterial" :
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
  attribute float size;
  attribute vec3 color;
  //
  varying vec2 vUv;
  varying vec3 vColor;
  varying vec4 vPos;
  uniform sampler2D texturePosition;
  void main(){
   vUv = uv; 
   vColor = color; 
   vec4 posTemp = vec4( position, 1.0 );
   #if defined( USE_TEX_POS )
    posTemp = texture2D( texturePosition, uv );
   #endif
   vec4 mvPosition = modelViewMatrix * vec4( posTemp.xyz, 1.0 );   

   gl_Position = projectionMatrix * mvPosition;
   vPos = modelMatrix * posTemp;            //*instanceMatrix

   // POINTS :
   gl_PointSize = 1.0 / -mvPosition.z;   //*size
   #if defined( USE_TEX_POS )
     gl_PointSize *= posTemp.w;
   #endif
  }`;
  fShader = 
  `
  varying vec2 vUv;
  varying vec3 vColor;
  varying vec4 vPos;
  //
  uniform float time;
  uniform float opacity;
  uniform float noiseScale;
  uniform sampler2D noiseMap;
  uniform sampler2D diffuseMap;
  uniform sampler2D particleMap;  
  void main()	{
   vec4 colDiffuse = texture2D(diffuseMap,  vUv);
   vec4 colNoise = texture2D(noiseMap,  noiseScale*vPos.xz);
   
   gl_FragColor = vec4( 1.0,1.0,1.0,  opacity );
   #if defined( USE_VERTEX_COL )
    gl_FragColor.rgb *= vColor;
   #endif
   #if defined( USE_DIFFUSE_MAP )
    gl_FragColor.rgb *= colDiffuse.rgb;
   #endif
   
   if(noiseScale > 0.0) gl_FragColor.rgb *= colNoise.rgb;

   // POINTS :
   #if defined( USE_PARTICLE_MAP )
    gl_FragColor *= texture2D( particleMap, gl_PointCoord );
   #else
    if( length(gl_PointCoord - vec2(0.5,0.5)) > 0.5 )  discard;
   #endif
  }`;
  }
  var myUniforms = {
    opacity: { value: 0.7 },
    texturePosition: { value: null },
    noiseScale: { value: 0.01 },
    noiseMap: { value: noiseMap },
    time: { value: 0 },
    diffuseMap: { value: concreteMap },
    particleMap: { value: particleMap },
  };
  var defines = { 
    USE_TEX_POS: false, 
    USE_PARTICLE_MAP: false, 
    USE_VERTEX_COL: false, 
    USE_DIFFUSE_MAP: false, 
  }
  var defaultAttributeValues = { 
    // 'myColor': [ 1, 1, 1 ],
    // 'size': 1,
  }
  var newShaderMaterial = new THREE.ShaderMaterial( {
    uniforms:myUniforms,defines:defines,defaultAttributeValues:defaultAttributeValues, vertexShader:vShader,fragmentShader:fShader,
    transparent:true,blending:THREE.AdditiveBlending, //depthTest:true,depthWrite:true,opacity:0.9,
  } );
  return newShaderMaterial;
}
