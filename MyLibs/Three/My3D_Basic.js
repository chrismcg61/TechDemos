var MY3D_Basic = {};
MY3D_Basic.initMain = function() {
  height = 500;  width = 1.6*height;  
  // width = window.innerWidth;  height = window.innerHeight;
  camera = new THREE.PerspectiveCamera( 70, width/height, 0.1, 1000 );
  camera.position.set( 0,0.2,5 );
  //
  renderer = new THREE.WebGLRenderer( {  } );  // antialias:true
  document.body.appendChild( renderer.domElement );
  //
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width,height );
  
  clock = new THREE.Clock();
  stats = new Stats();  document.body.appendChild( stats.dom );
}
MY3D_Basic.initOptional = function() {
  renderer.shadowMap.enabled = true;   renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  window.addEventListener( 'resize', MY3D_Basic.onWindowResize );

  document.body.style.margin = 0;   document.body.style.overflow = "hidden"; 
  //
  infoDiv = document.createElement( 'div' );  document.body.appendChild( infoDiv );
  var style = infoDiv.style;  style.position = "absolute";  style.top = 0;  style.left = "33%";  style.width = "33%";  
  style.textAlign = "center";  style.color = "#ffffff";  style.backgroundColor = "rgba(0,0,0, 0.7)";
  infoDiv.innerHTML = "TITLE";
}
MY3D_Basic.onWindowResize = function() {
  width = window.innerWidth;  height = window.innerHeight;
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  renderer.setSize( width,height );
}
//
MY3D_Basic.ReInitScene = function() {
  if(scene) scene.clear();
  scene = new THREE.Scene();
  scene.background = new THREE.Color( sVars.fogCol );  //scene.fog = new THREE.FogExp2( sVars.fogCol, sVars.fogDensity )
  camera.clear();
  scene.add(camera);
  
  if(vars.RenderModes==RenderModes.PostFx) MY3D_Basic.ReInitPostFX();  //postFx  vars.RenderModes==RenderModes.PostFx  
  ReInitSceneObjs();
}
MY3D_Basic.ReInitPostFX = function() {
  // renderer.toneMapping = THREE.ReinhardToneMapping;
  // renderer.toneMappingExposure = Math.pow( 1.1, 4.0 );
  //
  var renderPass = new THREE.RenderPass( scene, camera );
  composer = new THREE.EffectComposer( renderer );
  // composer.renderToScreen = false;
  composer.setSize( width,height );
  composer.addPass( renderPass );
  //
  filmPass = new THREE.FilmPass( sVars.filmFactor, 0.05, 90,  false )
  console.log(filmPass);
  composer.addPass( filmPass );
  //
  unrealBloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( width,height ), sVars.bloomFactor,0.2,0.9,  );
  composer.addPass( unrealBloomPass );
  //
  effectTM = new THREE.ShaderPass( THREE.ACESFilmicToneMappingShader );  //AdaptiveToneMappingPass
  effectTM.uniforms.exposure.value = sVars.tmExposeFactor;
  composer.addPass( effectTM );
  //
  if(sVars.gamma) composer.addPass( new THREE.ShaderPass( THREE.GammaCorrectionShader ) );
}
//
MY3D_Basic.render = function() {
  MY3D_Basic.updateVars();
  animate();
  if(composer && vars.RenderModes==RenderModes.PostFx) {
    unrealBloomPass.strength  = sVars.bloomFactor;
    filmPass.uniforms.nIntensity.value = sVars.filmFactor;
    effectTM.uniforms.exposure.value = sVars.tmExposeFactor;
    composer.render();
  }
  else renderer.render( scene, camera );
  //
  requestAnimationFrame( MY3D_Basic.render );
}
MY3D_Basic.updateVars = function() {
  now = clock.getElapsedTime();
  stats.update();
  //
  scene.background = new THREE.Color( sVars.fogCol );
  scene.fog = new THREE.FogExp2( sVars.fogCol, sVars.fogDensity*0.1 );
  camera.position.set( sVars.camPosX,sVars.camPosY,sVars.camPosZ );
}
