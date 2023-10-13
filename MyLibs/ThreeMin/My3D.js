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
  noiseMap.repeat.set( 1,1 );  noiseMap.wrapS=noiseMap.wrapT=THREE.RepeatWrapping;
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
  camPLight = new THREE.PointLight( 0xff8800, 5, 5 );  //camPLight.position.z = -0.6
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
    else if(key.includes('Pos'))     folder.add(_params, key,   -30,30,0.01 );  
    else if(key.includes('Select'))  folder.add(_params, key,  _selectObj);  
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
    shader.vertexShader = shader.vertexShader.replace(
      'gl_PointSize = size;',
      `
        gl_PointSize = size * posTemp.w;
      `); 
    //
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <colorspace_fragment>',
      `
      gl_FragColor = linearToOutputTexel( gl_FragColor );
      if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) )  >  0.5 )   discard;
      `);
    _pointsMat.userData.shader = shader;    //console.log( shader.vertexShader )
  };
}

// COMPOSER - POSTFX :
MY3D.initComposer = function(){
  // console.log( window.devicePixelRatio )   // console.log( renderer.getPixelRatio() )
  composer = new EffectComposer( renderer,  );   //myRenderTarget
  composer.setSize( MY3D.WW,MY3D.HH );
  composer.setPixelRatio( window.devicePixelRatio )
  renderPass = new RenderPass( scene, camera );
  //
  renderPixelatedPass = new RenderPixelatedPass( 4, scene, camera );
  renderPixelatedPass.setPixelSize( 4 )  
  renderPixelatedPass.normalEdgeStrength = 4
  renderPixelatedPass.depthEdgeStrength = 4
  //    
  colorCorrectionPass = new ShaderPass( ColorCorrectionShader );
  gammaPass = new ShaderPass( GammaCorrectionShader );
  outputPass = new OutputPass();  // outputPass.uniforms._toneMapping = 2    
  filmPass = new FilmPass( 0.6, true );
  dotScreenPass = new DotScreenPass( new THREE.Vector2( 0, 0 ), 0.5, 0.8 );
  //
  bokehPass = new BokehPass( scene, camera, { focus: 1.0, aperture: 0.025, maxblur: 0.01 } );
  // bokehPass.uniforms[ 'maxblur' ].value =  params.fxStr  
  //
  colorPass = new ShaderPass( ColorifyShader );
  colorPass.uniforms[ 'color' ] = new THREE.Uniform( new THREE.Color( 0.1,0.5,0.9 ) );
  //
  tonePass = new ShaderPass( ACESFilmicToneMappingShader );
  tonePass.uniforms.exposure.value = 1.9
  //
  bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ),  );
  bloomPass.strength = 1.1;
  bloomPass.threshold = 0.1;
  bloomPass.radius = 0.1;    
  //
  vignettePass = new ShaderPass( VignetteShader );
  vignettePass.uniforms[ 'offset' ].value = 0.95;
  vignettePass.uniforms[ 'darkness' ].value = 1.6;    
  //
  fxaaPass = new ShaderPass( FXAAShader );
  var pixelRatio = renderer.getPixelRatio();
  fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( MY3D.WW * pixelRatio );
  fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( MY3D.HH * pixelRatio );
  //
  ssrPass = new SSRPass( {
    renderer, scene, camera,
    width:MY3D.WW,height:MY3D.HH,
    selects:[],  // selects: params.groundReflector ? selects : null    
  } );
  ssrPass.maxDistance = 0.9

  composer.addPass( renderPass );  
  switch( params.fxSelect ) {
    case 0:
      composer.addPass( gammaPass );
      break;
    case 1:
      composer.addPass( colorCorrectionPass );
      break;        
    case 2:
      composer.addPass( tonePass );
      break;
    case 3:
      composer.addPass( bloomPass );
      break;
    case 4:
      composer.addPass( bokehPass );
      break;
    case 5:
      composer.addPass( filmPass );
      break;
    case 6:
      composer.addPass( dotScreenPass );
      break;
    case 7:
      composer.addPass( colorPass );
      break;
    case 8:
      composer.addPass( vignettePass );
      break;
    case 9:
      composer.addPass( outputPass );
      break;
    case 10:
      // composer.addPass( colorCorrectionPass );
      composer.addPass( fxaaPass );
      break;
    case 11:
      composer.removePass( renderPass );
      composer.addPass( renderPixelatedPass );
      // composer.addPass( outputPass );
      break;
    case 12:
      composer.addPass( ssrPass );
      // composer.addPass( bloomPass );
      // composer.addPass( outputPass );
      break;
    default: //Only RenderPass
  }
}
MY3D.addSsrGroundReflector = function(){
  var groundReflector = new ReflectorForSSRPass( new THREE.PlaneGeometry( 10,10 ), {
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
  ssrPass.groundReflector = groundReflector   
  ssrPass.groundReflector.maxDistance = 30
}

// CUSTOM RENDER LOOP :
MY3D.myRender_Advanced = function(){
  {
    renderer.setRenderTarget(null)
    renderer.setScissorTest( true );  
    renderer.setClearColor( 0x000066 );      
  }
  if(params.Scene1Factor>0){
    renderer.setViewport( 0,0, MY3D.WW*params.Scene1Factor,MY3D.HH*params.Scene1Factor );
    renderer.setScissor( 0,0, MY3D.WW*params.Scene1Factor,MY3D.HH*params.Scene1Factor );
    if(params.RENDER_FX) composer.render();
    else  renderer.render( scene, camera );
  }  //
  if(params.Scene2Factor>0){
    renderer.setViewport( 0,0, MY3D.WW*params.Scene2Factor,MY3D.HH*params.Scene2Factor );
    renderer.setScissor( 0,0, MY3D.WW*params.Scene2Factor,MY3D.HH*params.Scene2Factor );
    renderer.render( scene2, camera2 );
  }
  // RESET Viewport :
  renderer.setViewport( 0,0, MY3D.WW*params.Scene1Factor,MY3D.HH*params.Scene1Factor );
  renderer.setScissor( 0,0, MY3D.WW*params.Scene1Factor,MY3D.HH*params.Scene1Factor );
}
