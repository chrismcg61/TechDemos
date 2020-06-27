/** GUI **/
var fxVars = { bloomExposure:1, bloomStrength:0.5, bloomThreshol5d:0, bloomRadius:0,   initPostFX:initPostFX}; 
var fxFolder;
setTimeout( initPostFX_Gui ,  1);
function initPostFX_Gui() {
  if(typeof(addGuiFolder) !== 'undefined') fxFolder = addGuiFolder(gui, "PostFX", fxVars, 1);
}
/** RENDER Override **/
var composer;
function render( animateCallback ) {
  stats.update();  
  animateCallback();
  //renderer.render( scene, camera );
  composer.render();
  requestAnimationFrame( function(){render(animateCallback);} );
}
/** INIT **/
function initPostFX(  ) {
  renderer.toneMapping = THREE.ReinhardToneMapping;  
  renderer.toneMappingExposure = Math.pow( fxVars.bloomExposure, 4.0 );
  // renderer.toneMappingExposure = Math.pow( 1.2, 4.0 );
  var renderPass = new THREE.RenderPass( scene, camera );
  // var bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
  var bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), fxVars.bloomStrength,fxVars.bloomRadius,fxVars.bloomThreshold );
  bloomPass.renderToScreen = true;
  //
  composer = new THREE.EffectComposer( renderer );
  composer.setSize( window.innerWidth, window.innerHeight );
  composer.addPass( renderPass );
  composer.addPass( bloomPass );
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
