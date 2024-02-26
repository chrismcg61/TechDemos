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
MY3D.initWebglRenderer = function(_THREE, _params){
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
  
  if(_params.AUTO_RESIZE){
    document.body.style.margin = 0;   document.body.style.overflow = "hidden"; 
    window.addEventListener( 'resize', myWindowResize );
  }
}
function myWindowResize(){
  MY3D.HH=window.innerHeight;  MY3D.WW=window.innerWidth;
  camera.aspect = MY3D.WW/MY3D.HH;
  camera.updateProjectionMatrix();
  renderer.setSize( MY3D.WW,MY3D.HH );
  //
  camera2.aspect = MY3D.WW/MY3D.HH;
  camera2.updateProjectionMatrix();
  // MY3D.composerInit( POSTFX, params );  composer.ssrPass.groundReflector.textureWidth = MY3D.WW;
}
//
MY3D.initSceneBackground = function(){
  camera = new THREE.PerspectiveCamera( 70, MY3D.WW/MY3D.HH, 0.01, 900 );  //camera.position.set( 0,0.5,3 )
  scene = new THREE.Scene();

  renderer.shadowMap.enabled = true;   //renderer.shadowMap.type = THREE.PCFSoftShadowMap; //default THREE.PCFShadowMap
  scene.add(camera)

  directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
  directionalLight.position.set( 1,1,1 );  
  scene.add( directionalLight );
  //
  ground = new THREE.Mesh( new THREE.PlaneGeometry(6,6, 90,90),  new THREE.MeshLambertMaterial( {displacementMap:waterBumpMap,displacementScale:0.2} )  );
  ground.position.y = -0.1;  ground.rotation.x = -Math.PI/2;  ground.receiveShadow = true;
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

// SCENE 2 :
MY3D.initScene2 = function(){
  camera2 = new THREE.PerspectiveCamera( 60, MY3D.WW/MY3D.HH, 0.01, 1000 );
  camera2.position.set( 0,0,1.7 )
  scene2 = new THREE.Scene();  
  scene2.testMesh = new THREE.Mesh( new THREE.BoxGeometry(),  new THREE.MeshBasicMaterial({})  );
  scene2.add( scene2.testMesh );
}

// COMPOSER - POSTFX :
MY3D.composerInit = function( _POSTFX, _params ){
  // console.log( window.devicePixelRatio )   // console.log( renderer.getPixelRatio() )
  composer = new _POSTFX.EffectComposer( renderer,  );   //myRenderTarget
  composer.setSize( MY3D.WW,MY3D.HH );
  composer.setPixelRatio( window.devicePixelRatio )
  composer.renderPass = new _POSTFX.RenderPass( scene, camera );
  //
  if(typeof _POSTFX.SSRPass!=='undefined'){
    composer.ssrPass = new _POSTFX.SSRPass( {
      renderer, scene, camera,
      width:MY3D.WW,height:MY3D.HH,
      selects:[],  // selects: params.groundReflector ? selects : null    
    } );  //composer.ssrPass.selects.push()
    composer.ssrPass.maxDistance = 1.9    
    composer.ssrPass.thickness = 0.01
    composer.ssrPass.opacity = 0.7  //composer.ssrPass.groundReflector.opacity =
    composer.ssrPass.distanceAttenuation = false
    composer.ssrPass.fresnel = false
    composer.ssrPass.blur = false
    composer.ssrPass.bouncing = false
  }
  if(typeof _POSTFX.RenderPixelatedPass!=='undefined'){
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
  }  
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
  composer.ssrPass.groundReflector.opacity = 0.7
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

// CUSTOM "PointsMaterial" - Dynamic Y Pos :
MY3D.customPointsMat_Dynamic = function(_pointsMat){
  _pointsMat.onBeforeCompile = function ( shader ) {
    shader.vertexShader = 'attribute vec3 color;\n' + shader.vertexShader; 
    shader.uniforms.time = { value: 0 };
    shader.uniforms.ratio = { value: 0.05 };
    shader.uniforms.deltaFactor = { value: 0.05 };
    shader.vertexShader = 'uniform float time;\n' + shader.vertexShader;       
    shader.vertexShader = 'uniform float ratio;\n' + shader.vertexShader;       
    shader.vertexShader = 'uniform float deltaFactor;\n' + shader.vertexShader;    
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
        vec3 transformed = vec3( position );
        //
        float deltaY = time * color.r;
        deltaY = mod(deltaY, deltaFactor);
        if(color.g > ratio) deltaY = 0.0;
        transformed.y += deltaY;
      `);
    _pointsMat.userData.shader = shader;    //console.log( shader.vertexShader )
  };
}

// CUSTOM "PointsMaterial" - PosTexture :
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

// Alpha-Lit Material :
MY3D.customMat_AlphaLit = function( _mat ){
  var myLightFragment = 
`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal;

#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif

#ifdef USE_IRIDESCENCE
  float dotNVi = saturate( dot( normal, geometryViewDir ) );
  if ( material.iridescenceThickness == 0.0 ) {
    material.iridescence = 0.0;
  } else {
    material.iridescence = saturate( material.iridescence );
  }

  if ( material.iridescence > 0.0 ) {
    material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
    // Iridescence F0 approximation
    material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
  }
#endif

IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
		PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		#ifdef USE_ALPHALIT
      		geometryNormal = pointLight.position - geometryPosition;
    	#endif
    
    RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
		SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		#ifdef USE_ALPHALIT
      		geometryNormal = spotLight.position - geometryPosition;
    	#endif
    
    RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
		DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
    
    RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];    
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif

#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif

#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif
`;          
  _mat.onBeforeCompile = function ( shader ) {
    shader.fragmentShader = '#define USE_ALPHALIT 1\n' + shader.fragmentShader;    
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <lights_fragment_begin>",
      myLightFragment
      );
    _mat.userData.shader = shader;    //console.log( shader.vertexShader )
  };
  return myLightFragment;
}
