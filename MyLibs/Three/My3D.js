const SHADOW_ARRAY_SIZE = 32;
var THREE;
var MY3D = {};
MY3D.camFov = 50;
MY3D.camFar = 900000;
//
var now, camera, scene, renderer, composer;
var enableShadows = true;
const concreteMap = new THREE.TextureLoader().load("https://cdn.rawgit.com/chrismcg61/TechDemos/master/Media/Concrete.jpg");
//
var scene0, composerScene0;
var sceneOrtho, sceneOrtho_BG, cameraOrtho, composerOrtho;
var scene2, camera2, composerScene2;
var sceneNoPostFx, cameraNoPostFx;
var dirLight_Scene1, dirLight_Scene2;
//
var ssrPass, ssrGroundReflector;
var ssrMeshes = [];
var filmBW = false;
var effectVignette, unrealBloomPass, effectBloom, effectTM;
//
const TEX_WW = 512;
var physicalParticles;


function rand(max){
  return Math.random()*max;
}
function sRand(max){
  return -max+2*Math.random()*max;
}

MY3D.reinitScene = function(){
  scene0 = new THREE.Scene();
  //
  scene = new THREE.Scene();
  scene.add(camera);
  scene2 = new THREE.Scene();
  //
  dirLight_Scene1 = new THREE.DirectionalLight( 0x0, 1.9 );
  dirLight_Scene1.position.set(1,1,0);
  scene.add( dirLight_Scene1 );
  dirLight_Scene2 = dirLight_Scene1.clone();
  scene2.add( dirLight_Scene2 );
}
MY3D.ReInit0 = function(){
  MY3D.reinitScene();
  // rtTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
  MY3D.myInitPostFx();
  MY3D.onWindowResize();
  //
  MY3D.initNoPostFxScene();  
}
MY3D.initNoPostFxScene = function(){
  var screenNoPostFx1 = new THREE.Mesh( new THREE.PlaneGeometry( 2,1 ),   new THREE.MeshBasicMaterial( { map:composer.renderTarget2.texture,  } )   ); //composer.writeBuffer.texture
  screenNoPostFx1.position.set(-1.3,0,1.5);
  sceneNoPostFx.add( screenNoPostFx1 );
  // screenNoPostFx1.scale.set( window.innerWidth, window.innerHeight, 1 ); 
  var screenNoPostFx2 = new THREE.Mesh( new THREE.PlaneGeometry( 2,1 ),   new THREE.MeshBasicMaterial( { map:composer.readBuffer.texture,  } )   );
  screenNoPostFx2.position.set(1.3,0,1.5);
  sceneNoPostFx.add( screenNoPostFx2 );
  screenNoPostFx2.material = MY3D.initShaderMaterial();
  screenNoPostFx2.material.uniforms.tex1.value = composer.readBuffer.texture;  
}

MY3D.onWindowResize = function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  //
  camera2.aspect = window.innerWidth / window.innerHeight;
  camera2.updateProjectionMatrix();
  //  
  cameraNoPostFx.aspect = window.innerWidth / window.innerHeight;
  cameraNoPostFx.updateProjectionMatrix();
  //
  cameraOrtho.left = -window.innerWidth/2;
  cameraOrtho.right = window.innerWidth/2;
  cameraOrtho.top = window.innerHeight/2;
  cameraOrtho.bottom = -window.innerHeight/2;
  cameraOrtho.updateProjectionMatrix();
  sceneOrtho_BG.scale.set( window.innerWidth, window.innerHeight, 1 );
  //
  ssrGroundReflector.getRenderTarget().setSize( window.innerWidth, window.innerHeight );
  ssrGroundReflector.resolution.set( window.innerWidth, window.innerHeight );
}
MY3D.preInit = function(_THREE) {
  THREE=_THREE;
  //
  document.body.style.margin = 0; 
  document.body.style.overflow = "hidden"; 
  //
  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.autoClear = false;
  renderer.setScissorTest( true );    
  document.body.appendChild( renderer.domElement );
  //
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;   //PCFSoftShadowMap   //BasicShadowMap
  if(enableShadows) renderer.shadowMap.enabled = true;
  else  renderer.shadowMap.enabled = false;
  //
  camera = new THREE.PerspectiveCamera( MY3D.camFov, window.innerWidth/window.innerHeight, 0.01, MY3D.camFar );
  camera.position.z = 4;
  camera2 = new THREE.PerspectiveCamera( MY3D.camFov, window.innerWidth/window.innerHeight, 0.01, MY3D.camFar );
  camera2.position.z = 4;
  //
  sceneNoPostFx = new THREE.Scene();
  cameraNoPostFx = new THREE.PerspectiveCamera( MY3D.camFov, window.innerWidth/window.innerHeight, 0.01, MY3D.camFar );
  cameraNoPostFx.position.z = 3;
  //
  // scene0 = new THREE.Scene();  scene = new THREE.Scene();  scene.add(camera);
  MY3D.reinitScene();
  //
  sceneOrtho = new THREE.Scene();
  sceneOrtho_BG = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), new THREE.MeshBasicMaterial( {map:concreteMap} ) );
  sceneOrtho_BG.position.z = - 500;
  sceneOrtho_BG.scale.set( window.innerWidth, window.innerHeight, 1 );    
  sceneOrtho.add( sceneOrtho_BG );
  cameraOrtho = new THREE.OrthographicCamera( -window.innerWidth,window.innerWidth,window.innerHeight,-window.innerHeight, -10000, 10000 );
  cameraOrtho.position.z = 100;  
  //
  // MY3D.onWindowResize();
  window.addEventListener( 'resize', MY3D.onWindowResize, false );
}


/*** PostFX ***/
MY3D.myInitPostFx = function(){
  var renderPass = new THREE.RenderPass( scene, camera );
  renderPass.renderToScreen = false;
  var renderPassScene0 = new THREE.RenderPass( scene0, camera );
  // var renderPassOrtho = new THREE.RenderPass( sceneOrtho, cameraOrtho );
  //
  unrealBloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), bloomParams.intensity, bloomParams.radius, bloomParams.threshold );
  unrealBloomPass.renderToScreen = false;
  //
  effectBloom = new THREE.BloomPass( 1.9, 1.5, 0.1, 512 );
  effectBloom.combineUniforms[ 'strength' ].value = 1.3;
  effectBloom.convolutionUniforms[ 'cKernel' ].value = THREE.ConvolutionShader.buildKernel( 0.1 );
  effectBloom.materialConvolution.defines = {
    'KERNEL_SIZE_FLOAT': (1.5).toFixed( 1 ),
    'KERNEL_SIZE_INT': (1.5).toFixed( 0 )
  };
  //
  effectVignette = new THREE.ShaderPass( THREE.VignetteShader )
  effectVignette.renderToScreen = false;
  effectVignette.uniforms[ 'offset' ].value = 1.2;
  effectVignette.uniforms[ 'darkness' ].value = 1.2;
  //
  initSsr();  
  //
  const rtParameters = {
    format: THREE.RGBAFormat,    
    // type:THREE.FloatType, encoding:THREE.sRGBEncoding, stencilBuffer:true, magFilter:THREE.NearestFilter,minFilter:THREE.NearestFilter,
  };
  composer = new THREE.EffectComposer( renderer, new THREE.WebGLRenderTarget( window.innerWidth,window.innerHeight, rtParameters ) );
  composer.renderToScreen = false;
  composer.setSize( window.innerWidth, window.innerHeight );
  composer.addPass( renderPass );
  if(fxParams.ssr) {composer.addPass( ssrPass );  scene.add( ssrGroundReflector ); }
  setCommonPasses(composer);
  //
  composerScene0 = new THREE.EffectComposer( renderer );
  composerScene0.renderToScreen = false;
  composerScene0.setSize( window.innerWidth, window.innerHeight );
  composerScene0.addPass( renderPassScene0 );
  //
  // composerOrtho = new THREE.EffectComposer( renderer );
  // composerOrtho.setSize( window.innerWidth, window.innerHeight );
  // composerOrtho.addPass( renderPassOrtho );
  //
  var renderPassScene2 = new THREE.RenderPass( scene2, camera2 );
  composerScene2 = new THREE.EffectComposer( renderer );
  composerScene2.renderToScreen = false;
  composerScene2.setSize( window.innerWidth, window.innerHeight );
  composerScene2.addPass( renderPassScene2 );
  setCommonPasses(composerScene2);
}
function setCommonPasses(_composer){
  if(fxParams.sepia) _composer.addPass( new THREE.ShaderPass( THREE.SepiaShader ) );
  if(fxParams.film) _composer.addPass( new THREE.FilmPass( 0.4, 0.05, 256, filmBW ) );
  if(fxParams.dotScreen) _composer.addPass( new THREE.DotScreenPass( new THREE.Vector2( 0, 0 ), 0.5, 0.8 ) );
  if(fxParams.vignette) _composer.addPass( effectVignette );
  if(fxParams.afterImage) _composer.addPass( new THREE.AfterimagePass() );
  if(fxParams.hblur) _composer.addPass( new THREE.ShaderPass( THREE.HorizontalBlurShader ) );
  if(fxParams.fxaa) _composer.addPass( new THREE.ShaderPass( THREE.FXAAShader ) );
  // _composer.addPass( new THREE.MaskPass( scene, camera ) );  //ClearMaskPass()
  if(fxParams.bloom) _composer.addPass( unrealBloomPass );
  // if(fxParams.bloom) _composer.addPass( effectBloom );
  //
  effectTM = new THREE.ShaderPass( THREE.ACESFilmicToneMappingShader );  //AdaptiveToneMappingPass
  effectTM.uniforms.exposure.value = gParams.exposeFactor*10;
  if(fxParams.toneMap) _composer.addPass( effectTM );
  //
  var gammaPass = new THREE.ShaderPass( THREE.GammaCorrectionShader );
  gammaPass.renderToScreen = false;
  if(fxParams.gamma) _composer.addPass( gammaPass );
}

function initSsr(){
  ssrGroundReflector = new THREE.ReflectorForSSRPass( new THREE.PlaneGeometry( 10, 10 ), {
    clipBias: 0.0003,
    textureWidth: window.innerWidth,
    textureHeight: window.innerHeight,
    color: 0x888888,
    useDepthTexture: true,
  } );
  ssrGroundReflector.material.depthWrite = false;
  ssrGroundReflector.rotation.x = - Math.PI / 2;
  ssrGroundReflector.visible = false;
  initSsrParams(ssrGroundReflector);
  //
  ssrMeshes = [];
  ssrPass = new THREE.SSRPass( { renderer,scene,camera, width:window.innerWidth,height:window.innerHeight,
    groundReflector:ssrGroundReflector,  selects:ssrMeshes, } );
  ssrPass.renderToScreen = false;
  initSsrParams(ssrPass);
}
function initSsrParams(_ssrObj){
  _ssrObj.maxDistance = 3;
  _ssrObj.thickness = 0.9;
  _ssrObj.distanceAttenuation = true;
  _ssrObj.fresnel = true;
  _ssrObj.opacity = 0.9;  
}

MY3D.addSsrMesh = function(){
  const mesh = new THREE.Mesh( new THREE.SphereGeometry( 0.5, 8,8 ),  new THREE.MeshStandardMaterial({roughness:0.5,metlaness:0.5})  );
  mesh.position.set(rand(2),0.5,rand(1))
  scene.add( mesh );
  ssrMeshes.push( mesh );    // ssrPass.selects
}

MY3D.addMirrorSimplePlane = function(){
  var mirror = new THREE.Reflector( new THREE.PlaneGeometry( 90,90 ),  {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x222222
  } );
  mirror.rotation.x = -Math.PI/2;
  scene.add( mirror );  
}


/*** RENDER ***/
MY3D.render = function(){
  renderer.clear();
  renderer.setViewport( 0,0,  window.innerWidth,window.innerHeight );
  renderer.setScissor( 0,0,   window.innerWidth,window.innerHeight );
  
  composer.renderToScreen = false;
  composerScene2.renderToScreen = false;
  
  if(gParams.RenderModes == RenderModes.NoPostFx)   renderer.render( scene, camera );
  else if(gParams.RenderModes == RenderModes.PostFx)  {
    composer.renderToScreen = true;  
    composer.render();
  }
  else if(gParams.RenderModes == RenderModes.SplitScreen) {
    var scissorPosX = window.innerWidth/2;
    renderer.setScissor( 0,0, scissorPosX,window.innerHeight );
    renderer.render( scene, camera );
    //
    renderer.setScissor( scissorPosX,0, window.innerWidth,window.innerHeight );
    composer.renderToScreen = true;  
    composer.render();
  }
  else if(gParams.RenderModes == RenderModes.PiP) {
    composer.renderToScreen = true;  
    composer.render();
    //
    renderer.setViewport( 0,0,  window.innerWidth/4,window.innerHeight/2 );
    renderer.setScissor( 0,0,   window.innerWidth/4,window.innerHeight/2 );
    renderer.render( scene, camera );
  }
  else if(gParams.RenderModes == RenderModes.OrthoSceneStatic) {
    composerScene2.render();  
    // composerOrtho.render();
    renderer.render( sceneOrtho, cameraOrtho );
  }
  else if(gParams.RenderModes == RenderModes.OrthoScene) {
    composer.render();
    composerScene2.render();  
    // composerOrtho.render();
    renderer.render( sceneOrtho, cameraOrtho );
  }
  else if(gParams.RenderModes == RenderModes.SceneComposite) {
    composer.render();
    // renderer.toneMappingExposure = 1.0;
    renderer.render( sceneNoPostFx, cameraNoPostFx );  //cameraNoPostFx_Ortho
    // renderer.render( sceneOrtho, cameraOrtho );
  }
  else if(gParams.RenderModes == RenderModes.Scene2) {
    composerScene2.renderToScreen = true;  
    composerScene2.render();  
  }
}
MY3D.updateSceneCommon = function(){
  now = Date.now()*0.001;
  camera.position.set(params.camPosX,params.camPosY,params.camPosZ);
  camera.rotation.x = params.camRotX;
  dirLight_Scene1.color = new THREE.Color( params.dirLightCol );
  dirLight_Scene2.color = new THREE.Color( params.dirLightCol );
  renderer.toneMappingExposure = Math.pow( gParams.exposeFactor*10, 4.0 );
  unrealBloomPass.threshold = bloomParams.threshold;
  unrealBloomPass.strength = bloomParams.intensity;
  unrealBloomPass.radius = bloomParams.radius;
  {
    scene.background = new THREE.Color( params.fogCol );
    scene.fog = new THREE.FogExp2( params.fogCol, params.fogDensity*0.01 );
  }
  {
    scene2.background = new THREE.Color( params.fogCol );
    scene2.fog = new THREE.FogExp2( params.fogCol, params.fogDensity*0.01 );
  }
  for ( i=0; i<shaderUniformList.length; i++ ) {
    shaderUniformList[i].time.value += 1.0;
    if(shaderUniformList[i].fogColor){      
      shaderUniformList[i].fogColor.value = new THREE.Color( params.fogCol );
      shaderUniformList[i].fogDensity.value = params.fogDensity;      
    }
  }
}



/*** GUI ***/
function onGuiChange(){
  //init();  
}
MY3D.addGuiParams = function(_folder, _params, _open, _max, _delta){
  for(var key in _params){
    var param = _params[key];
    // var max = 10.0;
    // if(param>=1)  max = 100*param;
    if( typeof(param) === 'object') {
      if(key.includes('Modes'))  _folder.add( _params, key, param ).onChange(onGuiChange).listen();
      else{
        var subFolder = _folder.addFolder(key);
        if(_open) subFolder.open();
        MY3D.addGuiParams(subFolder, param, _open, _max, _delta);
      }
    }
    else if(param>0xffff) _folder.addColor( _params, key ).onChange(onGuiChange).listen();
    else if(_max>0 && key.includes('Pos')) _folder.add( _params, key, -_max,_max,_delta).onChange(onGuiChange).listen();
    else if(key.includes('Factor')) _folder.add( _params, key, 0,1,_delta).onChange(onGuiChange); //.listen();
    else _folder.add( _params, key ).onChange(onGuiChange);  //.listen();
  }
}




/*** Default Shader Material ***/
{
  MY3D.vShader = `  
        varying vec2 vUv;
        varying vec3 vPos;
        varying float vFogDepth;
        void main()
        {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          #ifdef USE_INSTANCING
            mvPosition = viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
          #endif
          vPos = mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;          
          vFogDepth = - mvPosition.z;
        }
    `;
  MY3D.fShader = `
    uniform float time;
    uniform float speed;
    uniform float amplitude;
    uniform float deltaFactor;
    uniform vec4 uColor;
    uniform sampler2D tex0;
    uniform sampler2D tex1;
    uniform sampler2D texA;
    //
    uniform float useNoise;
    uniform sampler2D texNoise;
    uniform float scaleNoise;
    uniform float strNoise;
    uniform sampler2D texXZ;
    uniform float scaleXZ;
    uniform float alphaXZ;
    //
    varying vec2 vUv;
    varying vec3 vPos;
    varying float vFogDepth;
    uniform vec3 fogColor;
    uniform float fogDensity;
    void main(void)
    {
        vec4 vColor0 = texture2D(tex0, vUv);
        vec4 vColor1 = texture2D(tex1, vUv);
        vec4 vColorA = texture2D(texA, vUv);
        //
        float aa = 0.5; 
        float delta = 0.5 - vColorA.x;
        aa = 0.5 + deltaFactor*delta + amplitude*sin(time*speed);
        if(aa>1.0) aa=1.0;
        if(aa<0.0) aa=0.0;
        //
        gl_FragColor = vec4( (1.0-aa)*vColor0.xyz + aa*vColor1.xyz,    1.0 );
        gl_FragColor = gl_FragColor*uColor;
        
        if(useNoise>0.0){
          vec2 vUvPos = vec2(0.5,0.5) + vPos.xy/scaleXZ;        
          vec4 vColorXZ = texture2D(texXZ,  vUvPos);
          vUvPos = vec2(0.5,0.5) + vPos.xy/scaleNoise;
          vUvPos = mod( vUvPos,   vec2(1.0,1.0) );
          vec4 vColorNoise = texture2D(texNoise,  vUvPos);
          float noise = 0.9 + strNoise*cos(time*speed * vColorNoise.r);
          //
          gl_FragColor = gl_FragColor * noise;
          gl_FragColor = gl_FragColor * ( (1.0-alphaXZ)*vec4(1.0) + alphaXZ*vColorXZ);
          //
          float fogDensityBis = fogDensity*0.1;
          float fogFactor = 1.0 - exp( - fogDensityBis*fogDensityBis * vFogDepth*vFogDepth );	
          gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
        }
    }`;
}
MY3D.initShaderMaterial = function(){
  var shaderUniforms = {
    time: { value: 0.0 },
    speed: { value: 0.007  },
    amplitude: { value: 2 },
    deltaFactor: { value: 3 },
    uColor: { value: new THREE.Vector4(1,1,1, 1) },
    tex0: { value: composer.readBuffer.texture },
    tex1: { value: composerScene2.readBuffer.texture },
    texA: { value: concreteMap },
    //
    useNoise: { value: 0 },
    texXZ: { value: concreteMap },
    scaleXZ: { value: 4.0 },
    alphaXZ: { value: 1.0 },
    texNoise: { value: concreteMap },    
    scaleNoise: { value: 4.0 },
    strNoise: { value: 0.9 },
    fogColor: {value:new THREE.Color( params.fogCol )},
    fogDensity: {value:params.fogDensity},
  };
  var shaderMaterial = new THREE.ShaderMaterial( { 
    side:THREE.DoubleSide, 
    uniforms:shaderUniforms, vertexShader:MY3D.vShader, fragmentShader:MY3D.fShader,
  } );
  shaderUniformList.push( shaderUniforms );  
  return shaderMaterial;
}




/*** Texture Canvas (Font) ***/
MY3D.addTexture = function(_ww){
  var texCanvas = document.createElement( 'canvas' );
  texCanvas.width = texCanvas.height = _ww; 
  var newTexture = new THREE.Texture( texCanvas );
  newTexture.texCanvas = texCanvas;
  newTexture.anisotropy = 8;
  //newTexture.magFilter = THREE.NearestFilter;
  // newTexture.wrapS = newTexture.wrapT = THREE.RepeatWrapping;
  // newTexture.repeat.set( 1, 1 );
  // newTexture.offset.set( 0, 0 );
  MY3D.initTexture_Text(newTexture, _ww*0.1, 'rgba(0,0,0, 0.1)', 'rgba(255,255,255, 1)',
    "TITLE_TITLE",  ["A","B","C","D","E","F","g","H","I","j", ] );
  return newTexture;
}
MY3D.initTexture_Text = function(texture, _fontSize, col0, col1, title, txtLines){
  var ctx = texture.texCanvas.getContext( '2d' );
  var ww = texture.texCanvas.width;
  ctx.clearRect( 0, 0, ww,ww );  
  ctx.fillStyle = col0;
  ctx.fillRect( 0, 0, ww,ww );  
  ctx.fillStyle = col1;
  ctx.textAlign = "center";
  var titleSize = _fontSize*1.5;
  var yPos = titleSize;
  ctx.font = "bold "+ (titleSize) +"px Verdana";
  ctx.fillText(title, ww*0.5,yPos);  
  // ctx.lineWidth = 8;  
  ctx.font = "bold "+ (_fontSize) +"px Verdana";
  yPos += _fontSize*0.5;
  for ( var i=0; i<txtLines.length; i++ ) {
    yPos += _fontSize;
    var txt = txtLines[i];
    ctx.fillText(txt, ww*0.5, yPos );          
  }  
  // ctx.strokeText("A", ww*0.5,ww*0.35);  
  texture.needsUpdate = true;
}




/*** PARTICLE Shaders ***/
var sprite0;  //shaderUniforms0, shaderMaterial0, vShader0,fShader0;
{
  MY3D.vShaderParticles = `
      uniform float useSinePos;
      uniform float velocityLightFactor;
      uniform float useTexturePosition;
      uniform sampler2D texturePosition;
      uniform sampler2D textureVel;
      //
      uniform float size;
      uniform float time;
      uniform float speed;
      uniform vec2 minMaxY;
      //
      // uniform vec3 vPosShadow;
      uniform float shadowSize;
      uniform vec3 vPosLight;
      uniform float shadowArraySize;
      uniform sampler2D shadowPosArray;
      //
      attribute vec3 color;
      varying vec3 vColor;
      //
      varying vec3 viewPos;
      varying vec3 worldPos;
      void main() {
        vColor = color;
        vec3 tmpPos = position;
        tmpPos.y = tmpPos.y + time*speed;
        tmpPos.y = minMaxY.x + mod(tmpPos.y, minMaxY.y);
        //
        if(useSinePos>0.0) tmpPos = position * (1.0 + sin(time*speed));
        if(useTexturePosition>0.0) tmpPos = texture2D( texturePosition, uv ).xyz;
        vec4 mvPosition = modelViewMatrix * vec4( tmpPos, 1.0 );
        //
        gl_PointSize = ( size / -mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
        
        viewPos = mvPosition.xyz;
        worldPos = tmpPos;
        //
        for ( float y = 0.0; y < shadowArraySize; y++ ) {
          for ( float x = 0.0; x < shadowArraySize; x++ ) {
            vec2 uv = vec2(x/shadowArraySize, y/shadowArraySize);
            vec4 newShadowPos = texture2D( shadowPosArray, uv );
            if(newShadowPos.w>0.0) {
              vec3 dirLightShadow = normalize( vPosLight - newShadowPos.xyz );
              vec3 dirShadowVertex = normalize(  newShadowPos.xyz - worldPos );
              if( distance( dirShadowVertex, dirLightShadow) < shadowSize )  vColor = 0.0*vColor;            
            }
          }
        }
        //
        if(velocityLightFactor > 0.0){
          vec3 tmpVel = texture2D( textureVel, uv ).xyz;
          vec3 dirVel = normalize( tmpVel );
          float dirVelViewDist = distance( dirVel, vec3(0.0,0.0,1.0) );
          vColor *=  (1.0 - velocityLightFactor*dirVelViewDist);               
        }
      }
      `;
  MY3D.fShaderParticles = `
      uniform sampler2D pointTexture;
      uniform float alpha;
      //
      uniform float useTexXZ;
      uniform float useNegative;
      uniform sampler2D texXZ;
      uniform float scaleXZ;
      uniform float alphaXZ;
      //
      varying vec3 vColor;
      varying vec3 viewPos;
      varying vec3 worldPos;
      void main() {
        vec2 vUvPos = vec2(0.5,0.5) + viewPos.xy/scaleXZ;
        vUvPos = vec2(0.5,0.5) + worldPos.xy/scaleXZ;
        vec4 vColorXZ = texture2D(texXZ,  vUvPos);
        if(useNegative>0.0) vColorXZ.xyz = 1.0 - vec3( vColorXZ.x );  // 1.0 - vColorXZ.xyz
        //
        vec4 texCol = texture2D( pointTexture, gl_PointCoord );
        float aa = texCol.x + texCol.y + texCol.z;
        //
        if(aa<0.1) discard;
        gl_FragColor = texCol;
        gl_FragColor = gl_FragColor * vec4( vColor,  alpha );
        if(useTexXZ>0.0) {
          gl_FragColor = gl_FragColor * ( (1.0-alphaXZ)*vec4(1.0) + alphaXZ*vColorXZ);
        }
      }
      `;
}
// function initShader0(){
MY3D.initShaderParticles = function(){
  sprite0 = new THREE.TextureLoader().load("https://cdn.rawgit.com/mrdoob/three.js/r138/examples/textures/sprites/disc.png");
    
  var newShaderUniformsParticles = {
    time: {value:0},
    speed: {value:0.005},
    minMaxY: {value: new THREE.Vector2(-1,1)},
    alpha: {value:0.99},
    size: {value:3},
    pointTexture: { value:sprite0 },
    useSinePos: {value:0},
    velocityLightFactor: {value:0},
    //
    useTexturePosition: {value:0},
    texturePosition: {value:null},
    textureVel: {value:null},
    //
    useTexXZ: {value:0},
    useNegative: {value:0},
    texXZ: { value: concreteMap },
    scaleXZ: { value: 4.0 },
    alphaXZ: { value: 1.0 },
    //
    // vPosShadow: {value: new THREE.Vector3(-1,0,0)},
    shadowArraySize: { value: 0 }, //SHADOW_ARRAY_SIZE
    shadowSize: { value: 0.03 },
    vPosLight: {value: new THREE.Vector3(-2,0,0)},    
    shadowPosArray: {value: new THREE.DataTexture( new Float32Array( SHADOW_ARRAY_SIZE*SHADOW_ARRAY_SIZE * 4 ),  SHADOW_ARRAY_SIZE,SHADOW_ARRAY_SIZE, THREE.RGBAFormat, THREE.FloatType ) },
  };  
  var newShaderMaterialParticles = new THREE.ShaderMaterial( {
    uniforms:newShaderUniformsParticles,  vertexShader:MY3D.vShaderParticles, fragmentShader:MY3D.fShaderParticles,
    transparent:true,  //alphaTest: 0.9,
    depthTest:true,  depthWrite:false,
    blending:THREE.AdditiveBlending,
  } );
  return newShaderMaterialParticles;
}
MY3D.initParticleObj = function(_NB, _pos, _size, _col){
  var positions = [];  var colors = [];  var uvs = [];
  for ( var i = 0, l = _NB; i < l; i ++ ) {    
    positions.push( _pos.x-_size.x/2+rand(_size.x), _pos.y-_size.y/2+rand(_size.y), _pos.z-_size.z/2+rand(_size.z) );
    var aa = _col.w;
    colors.push( _col.x+rand(aa), _col.y+rand(aa), _col.z+rand(aa) );
    var uv = new THREE.Vector2( i%TEX_WW, Math.floor(i/TEX_WW) );    //uv.multiplyScalar( 1/TEX_WW );
    uvs.push( uv.x/TEX_WW, uv.y/TEX_WW );
  }
  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
  geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
  geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
  //
  var newShaderMaterialParticles = MY3D.initShaderParticles();
  // shaderMaterialParticles0.depthTest = true;
  // shaderUniformsParticles0.pointTexture.value = new THREE.TextureLoader().load("https://cdn.rawgit.com/chrismcg61/TechDemos/master/Media/CloudParticle.jpg");
  shaderUniformList.push( newShaderMaterialParticles.uniforms );
  //
  var particles = new THREE.Points( geometry, newShaderMaterialParticles );
  return particles;
}



/*** GpuCompute PARTICLES  ***/
MY3D.init_GpuCompute_Particles = function(){
  var vPos = new THREE.Vector3(0,0,0);
  var vSize = new THREE.Vector3(1,1,1);
  physicalParticles = MY3D.initParticleObj( TEX_WW*TEX_WW, vPos, vSize, new THREE.Vector4( 1,0,0, 0.1 ) );    
  scene.add( physicalParticles );
  physicalParticles.material.uniforms.useTexturePosition.value = 1;
  //
  MY3D.init_GpuCompute();
}
MY3D.init_GpuCompute = function(){
  gpuCompute = new THREE.GPUComputationRenderer( TEX_WW,TEX_WW, renderer );
  var texPos = gpuCompute.createTexture();
  var texVel = gpuCompute.createTexture();
  var texPosData = texPos.image.data;
  var texVelData = texVel.image.data;
  for ( var i = 0; i < texPosData.length; i += 4 ) {
    var tt = rand(600);
    var vVel = new THREE.Vector3(sRand(1),sRand(1),sRand(1));
    vVel.normalize().multiplyScalar( rand(0.02) );
    texPosData[i+0] = 0;
    texPosData[i+1] = 0;
    texPosData[i+2] = 0;
    texPosData[i+3] = tt;
    //
    texVelData[i+0] = vVel.x;
    texVelData[i+1] = vVel.y;
    texVelData[i+2] = vVel.z;
    // texVelData[i+3] = tt;
  }
  positionVariable = gpuCompute.addVariable( "texturePosition", MY3D.GPUC_fShaderPos, texPos );
  velocityVariable = gpuCompute.addVariable( "textureVel", MY3D.GPUC_fShaderVel, texVel );
  gpuCompute.setVariableDependencies( positionVariable, [ positionVariable, velocityVariable ] );
  gpuCompute.setVariableDependencies( velocityVariable, [ positionVariable, velocityVariable ] );
  //
  gpuCompute.init();  
  {
    // var texPos0 = new THREE.DataTexture( texPos,  TEX_WW,TEX_WW, THREE.RGBAFormat, THREE.FloatType );  texPos0.needsUpdate = true;
    const duration = 0;
    posUniforms = positionVariable.material.uniforms;
    posUniforms[ 'texturePos0' ] = { value: texPos };
    posUniforms[ 'duration' ] = { value: duration };    
    velocityUniforms = velocityVariable.material.uniforms;
    velocityUniforms[ 'texturePos0' ] = { value: texPos };
    velocityUniforms[ 'textureVel0' ] = { value: texVel };
    velocityUniforms[ 'gravPos' ] = { value: new THREE.Vector3(0,0,0) };    
    velocityUniforms[ 'gravity' ] = { value: 0.1 };        
    velocityUniforms[ 'duration' ] = { value: duration }; 
  }
}
MY3D.update_GpuCompute = function(){
  gpuCompute.compute();
  physicalParticles.material.uniforms.texturePosition.value = gpuCompute.getCurrentRenderTarget( positionVariable ).texture;
  physicalParticles.material.uniforms.textureVel.value = gpuCompute.getCurrentRenderTarget( velocityVariable ).texture;
}
{
  MY3D.GPUC_fShaderPos = `
      uniform float duration;
      uniform sampler2D texturePos0;
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec4 tmpPos = texture2D( texturePosition, uv );
        vec4 tmpVel = texture2D( textureVel, uv );
        vec4 tmpPos0 = texture2D( texturePos0, uv );

        tmpPos += tmpVel;
        //if(tmpPos.w==0.0) tmpPos *= 0.0;        

        if(duration > 0.0){
          tmpPos.w += 1.0;
          if( mod(tmpPos.w, duration) <= 10.0 ) {
            tmpPos.xyz = tmpPos0.xyz;        
          }
        }

        gl_FragColor = tmpPos;
      }
    `;
  MY3D.GPUC_fShaderVel = `
      uniform float duration;
      uniform float gravity;
      uniform vec3 gravPos;
      uniform sampler2D texturePos0;
      uniform sampler2D textureVel0;
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec3 tmpVel = texture2D( textureVel, uv ).xyz;
        vec4 tmpPos = texture2D( texturePosition, uv );
        vec4 tmpPos0 = texture2D( texturePos0, uv );
        vec4 tmpVel0 = texture2D( textureVel0, uv );

        vec3 dPos = gravPos - tmpPos.xyz;
        float distance = 0.1 + length( dPos );
        //if(distance<0.1) distance=0.1;            
        vec3 gravityVel = gravity * 0.0001 * normalize(dPos) / pow(distance, 2.0);

        //tmpVel *= drag;
        tmpVel += gravityVel;

        if(duration > 0.0){
          if( mod(tmpPos.w, duration) <= 10.0 ) {
            tmpVel = tmpVel0.xyz;       
          }
        }

        gl_FragColor = vec4( tmpVel, 0.0);
      }
    `;
}




/*** Other Shaders ***/
var vShaderRain, fShaderRain;
initRainShader(1);
function initRainShader(nbLights)
{
  vShaderRain = `
    attribute vec3 color;
    varying vec3 vColor;
    attribute float texIndex;
    varying float fTexIndex;
    uniform float time;
    uniform float pointSize;
    uniform float speed;
    uniform float aoeRatio;
    struct lightMesh
    {
      vec3 pos;
      vec3 color;
      //sampler2D emissiveMap;
    };
    uniform lightMesh lightMeshes[`+nbLights+`];
    uniform vec3 camPos;
    void main() {
      vColor = color;
      vec3 tmpPos = aoeRatio * position;
      tmpPos.y = mod(tmpPos.y - time*speed, 10.0);     
      if(pointSize==1.0) tmpPos.y = 0.2*cos(time*speed + position.y);
      tmpPos += vec3(camPos.x, 0.0, camPos.z);
      vec4 mvPosition = modelViewMatrix * vec4( tmpPos, 1.0 );
      //
      gl_PointSize = pointSize / -mvPosition.z;
      
      gl_Position = projectionMatrix * mvPosition;
      
      
      //vColor = vec3(0.0,0.0,0.0);
      for (int i=0; i<2; i++ ) 
      {
        float dist = length( tmpPos - lightMeshes[i].pos );
        vColor += lightMeshes[i].color * 2.0/pow(dist,2.0);
      }
    }
    `;   
  fShaderRain = `
    uniform sampler2D pointTexture;
    uniform float alpha;
    uniform float pointRatio;
    varying vec3 vColor;
    varying float fTexIndex;
    void main() {      
      float rr = length( gl_PointCoord - vec2( 0.5, 0.5 ) );
      float ww = gl_PointCoord.x;
      float aa = 0.1;
      //aa = 1.0 - 2.0*rr;  // Alpha-Disc
      //aa = 0.1 - 2.0*ww;  // Alpha V-Rect
      gl_FragColor = vec4( vColor + vec3(aa,aa,aa), alpha );
      
      //if ( rr > 0.5 ) discard;      //Draw Disc
      if ( ww > pointRatio ) discard;      //Draw V-Rect
      
      // if(fTexIndex==1.0) gl_FragColor = vec4(gl_FragColor.xyz, 0.1) * texture2D( pointTexture, gl_PointCoord );
    }
    `;
}

var vShaderSky, fShaderSky;
{
  vShaderSky = `
    attribute vec3 color;
    varying vec3 vColor;
    uniform float time;
    uniform float speed;
    uniform float pointSize;
    void main() {
      vColor = color;
      float aa = vColor.r;
      //      
      vec3 tmpPos = position;
      vec4 mvPosition = modelViewMatrix * vec4( tmpPos, 1.0 );
      //
      gl_PointSize = pointSize * (1.0+2.0*aa);
      if(pointSize<=1.0) gl_PointSize *= cos(time*speed*aa);
      // gl_PointSize /= -mvPosition.z;
      
      gl_Position = projectionMatrix * mvPosition;
    }
    `;   
  fShaderSky = `
    uniform sampler2D pointTexture;
    uniform float time;
    uniform float speed;
    uniform float alpha;
    uniform float pointSize;
    varying vec3 vColor;
    void main() {      
      float aa = vColor.r;
      float aaa = cos(time*speed*aa);
      float bb = 0.25*aa;
      vec2 tmpPtCoord = gl_PointCoord - vec2(0.5,0.5);
      tmpPtCoord = vec2(tmpPtCoord.x*cos(bb) + tmpPtCoord.y*sin(bb),  tmpPtCoord.y*cos(bb) + tmpPtCoord.x*sin(bb));
      gl_FragColor = vec4( vColor, alpha );
      if(pointSize>1.0) {        
        gl_FragColor.a = alpha + aaa*0.5*alpha;
        gl_FragColor *= texture2D( pointTexture, vec2(0.5,0.5)+tmpPtCoord );    
      }
      else{
        float rr = length( gl_PointCoord - vec2( 0.5, 0.5 ) );
        if ( rr > 0.5 ) discard;      //Draw Disc      
      }
    }
    `;
}


var shaderUniformList = [];
function initGpuParticlesSky(bNormalize, pointNb, size, aoeRatio, pointSize, speed, _col,_colA, vShader,fShader){
  // var vertices = new THREE.BoxGeometry( 50,50,50, 10,10,10 ).vertices;
  var positions = new Float32Array( pointNb * 3 );
  var colors = new Float32Array( pointNb * 3 );
  for ( var i = 0, l = pointNb; i < l; i ++ ) {
    var vertex = new THREE.Vector3( (Math.random()-0.5), Math.random()-0.5, (Math.random()-0.5) );
    if(bNormalize) vertex.normalize();
    vertex.multiplyScalar(size);
    vertex.toArray( positions, i * 3 );
    var color = new THREE.Color( _col.r+Math.random()*_colA.r,  _col.g+Math.random()*_colA.g,  _col.b+Math.random()*_colA.b );
    color.toArray( colors, i * 3 );
  }
  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
  
  var newShaderUniforms = 
  {
    time: {value:0.0},
    speed: {value:speed},
    alpha: {value:0.9},
    pointSize: {value:pointSize},
    pointRatio: {value:1.0},
    pointTexture: {value: null},
    aoeRatio: {value:aoeRatio},
  };
  var shaderMaterialSky = new THREE.ShaderMaterial( {
    uniforms: newShaderUniforms,
    vertexShader: vShader,
    fragmentShader: fShader,
    transparent:true,
    //alphaTest: 0.9,
    blending: THREE.AdditiveBlending,
    //depthTest: true,
    depthWrite: false,
  } );
  
  shaderUniformList.push( newShaderUniforms );  
  var particles = new THREE.Points( geometry, shaderMaterialSky );
  //scene.add( particles );
  return particles;
}



/*** TEXT Shader ***/
var vShaderText,fShaderText;
{
  vShaderText = `
  varying vec2 vUv;
  void main()
  {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
  }`;
  fShaderText = `
  uniform float time;
  uniform float speed;
  uniform vec4 uColor;
  uniform sampler2D tex0;
  varying vec2 vUv;
  void main(void)
  {
      vec4 vColor0 = texture2D(tex0, vUv);
      float aa = 1.0 + 0.9*cos(90.0*vUv.x + time*speed);
      //
      gl_FragColor = vec4( uColor.a*uColor.xyz*vColor0.xyz,    vColor0.a );
      gl_FragColor.xyz *= aa;
      if(uColor.a*vColor0.a < 0.05) discard;
  }`;
}

function initTextShaderMaterial(textTexture){
  var textShaderUniforms = {
    time: { value: 0.0 },
    speed: { value: 0.04 },
    uColor: { value: new THREE.Vector4(1,1,1, 1) },
    tex0: { value: textTexture },
  };
  var textShaderMaterial = new THREE.ShaderMaterial( { 
    side:THREE.DoubleSide,                                                    
    uniforms:textShaderUniforms, vertexShader:vShaderText, fragmentShader:fShaderText,
  } );
  shaderUniformList.push( textShaderUniforms );  
  return textShaderMaterial;
}



// export default MY3D;
