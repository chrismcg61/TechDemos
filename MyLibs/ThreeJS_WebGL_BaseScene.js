var camera, scene, renderer, hemiLight;
var stats, gui, guiFolder1;

var now = performance.now();
var lastT = now;
var deltaT = 0;

var defaultConfig = {};
var controls;

var lightningColor = {r:0,g:0,b:0};
defaultConfig.lightning = function ( ) { lightningColor = {r:0.2, g:0.2, b:0.2};  };

var myParticleSystems = [];
var rainParticleSystem, dustParticleSystem;

var minRainDuration = 10000;
var maxRainDuration = 20000;

var skyColorTop;// = {min: {r:0.1,g:0.1,b:0.3},   max: {r:2.8,g:2.9,b:3}};
var skyAnimSpeed; // = 0.001;
var skyUniforms;

var skyVertexShader = ``;
var skyFragShader = ``;




function initWebGlScene(camZ, statsIsActive, guiIsActive, helperIsActive, isCanvas, controlMode, ambientPartsOn, skySpeed) 
{
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";

  var camAngle = 70;   //default: 70
  var camFar = 9000;
  
  camera = new THREE.PerspectiveCamera( camAngle, window.innerWidth / window.innerHeight, 1, camFar );
  camera.position.z = camZ;

  scene = new THREE.Scene();
  
  // LIGHTS

  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.99, 0.99, 0.99 );
  hemiLight.groundColor.setHSL( 0.7, 0.7, 0.7 );
  hemiLight.position.set( 0, 400, 0 );
  scene.add( hemiLight );

  if(helperIsActive)
  {
    hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
    scene.add( hemiLightHelper ); 
  }
  
  
  //RENDERER:
  if(!isCanvas) renderer = new THREE.WebGLRenderer();
  else renderer = new THREE.CanvasRenderer();
  
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //

  window.addEventListener( 'resize', onWindowResize, false );

  
  //STATS:
  if(statsIsActive)
  {
    stats = new Stats();
    document.body.appendChild( stats.dom );
  }
  
  //GUI:
  if(guiIsActive)
  {
    gui = new dat.GUI();
    guiFolder1 = gui.addFolder('Default Controls');
    guiFolder1.open();
    
    
    for (var key in defaultConfig) {
      if (defaultConfig.hasOwnProperty(key)) {
        //console.log(key + " -> " + defaultConfig[key]);
        guiFolder1.add(defaultConfig, key); 
      }
    }
  }
  
  //CONTROLS:
  initControls(controlMode);
  
  //SKY:
  initSky( skySpeed, 
    { min: {r:0.1,g:0.1,b:0.3}, 
      max: {r:0.8,g:0.9,b:1}}
  ); 
  
  
  //Ambience PARTICLES (Dust & Rain):  
  if(ambientPartsOn)
  {
    initRain();
    initDust();
    
    //RAIN Intensity Fluctuation:
    startRain();
  }  
 
}



function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}






//CONTROLS:
defaultConfig.FPS_Controls_Mode = function ( ) {
  initControls(2);
  document.body.requestPointerLock = 
    document.body.requestPointerLock || 
    document.body.mozRequestPointerLock || 
    document.body.webkitRequestPointerLock;
  document.body.requestPointerLock();     
}
function pointerLockChange ( e ) {
  if ( document.pointerLockElement        === document.body 
      || document.mozPointerLockElement     === document.body 
      || document.webkitPointerLockElement  === document.body ) 
  {
    controls.enabled = true;
    console.log("Mouse Pointer Locked");
  } else {
    controls.enabled = false;
  }
};
function initControls(mode){
  if(mode == 1)
  {
    console.log("CONTROLS : OrbitControls");
    controls = new THREE.OrbitControls( camera, renderer.domElement );
  }
  else if(mode == 2)
  {
    console.log("CONTROLS : PointerLockControls");

    controls = new THREE.PointerLockControls( camera );
    scene.add( controls.getObject() );

    document.addEventListener( 'pointerlockchange',       pointerLockChange, false );
    document.addEventListener( 'mozpointerlockchange',    pointerLockChange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerLockChange, false );
  }
  else
  {
    console.log("CONTROLS : No Controls");
  }
}





//SKY:
skyVertexShader = `
varying vec3 vWorldPosition;
void main() {
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
skyFragShader = `
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;
varying vec3 vWorldPosition;
void main() {
  float h = normalize( vWorldPosition + offset ).y;
  gl_FragColor = vec4( 
    mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 
    1.0 );
}
`;
function initSky( mySkyAnimSpeed, mySkyColorTop ){
  skyColorTop = mySkyColorTop;
  skyAnimSpeed = mySkyAnimSpeed;

  skyUniforms = {
    topColor:    { value: new THREE.Color( 0x000000 ) },
    bottomColor: { value: new THREE.Color( 0x000000 ) },
    offset:      { value: 50 },
    exponent:    { value: 0.9 }
  };
  skyUniforms.topColor.value.copy( hemiLight.color );
  skyUniforms.bottomColor.value.copy( hemiLight.groundColor );
  //scene.fog.color.copy( skyUniforms.bottomColor.value );
  var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
  var skyMat = new THREE.ShaderMaterial( { 
    vertexShader: skyVertexShader, fragmentShader: skyFragShader, uniforms: skyUniforms, 
    side: THREE.BackSide } );
  var sky = new THREE.Mesh( skyGeo, skyMat );
  scene.add( sky );  
}
function animSky(topColor, speed, lightningColor){
  var maxColorFactor = 0.5 + Math.cos( now * speed ) * 0.5;
  var groundColorFactor = 0.25;
  var lightningDamping = 0.95;

  hemiLight.color.r = topColor.min.r + maxColorFactor * (topColor.max.r - topColor.min.r);
  hemiLight.color.g = topColor.min.g + maxColorFactor * (topColor.max.g - topColor.min.g);
  hemiLight.color.b = topColor.min.b + maxColorFactor * (topColor.max.b - topColor.min.b);
  
  hemiLight.color.r += lightningColor.r;
  hemiLight.color.g += lightningColor.g;
  hemiLight.color.b += lightningColor.b;
  lightningColor.r *= lightningDamping;
  lightningColor.g *= lightningDamping;
  lightningColor.b *= lightningDamping;
    
  hemiLight.groundColor.r = hemiLight.color.r * groundColorFactor; 
  hemiLight.groundColor.g = hemiLight.color.g * groundColorFactor; 
  hemiLight.groundColor.b = hemiLight.color.b * groundColorFactor; 
  
  skyUniforms.topColor.value.copy( hemiLight.color );
  skyUniforms.bottomColor.value.copy( hemiLight.groundColor );  
  
  //setTimeout(animSky , 50, skyColorTop, skyAnimSpeed);
}





//AMBIENT PARTICLES:
function initRain(){
  var rainParticlesNb = 900;
  var rainParticlesPosConfig ={
    areaSize: new THREE.Vector3(900, 900, 900),
    speed: {
      min: new THREE.Vector3(0.0, -30.0, 0.0), 
      max: new THREE.Vector3(0.0, -60.0, 0.0),
    },
  };
  var rainParticlesMaterialConfig = {
    color: {
      min: new THREE.Vector3(0.45, 0.01, 0.01), 
      max: new THREE.Vector3(0.55, 0.50, 0.99), },	
    speed : {
      min: new THREE.Vector3(0.0, 0.0, 0.0), 
      max: new THREE.Vector3(0.0, 0.0, 0.0)}, 
    size: {
      min: 1, 
      max: 4},
    alpha: 0.4,
  };
  rainParticleSystem = particleSystemInit( 
    rainParticlesNb, 
    rainParticlesPosConfig, 
    rainParticlesMaterialConfig
  );
}
function initDust(){
{
  var dustParticlesNb = 200;
  var dustParticlesPosConfig ={
    areaSize: new THREE.Vector3(400, 400, 400),
    speed: {
      min: new THREE.Vector3(-0.1, -0.1, -0.1), 
      max: new THREE.Vector3(0.1, 0.1, 0.1),
    },
  };
  var dustParticlesMaterialConfig = {
    color: {
      min: new THREE.Vector3(0.2, 0.01, 0.01), 
      max: new THREE.Vector3(0.8, 0.99, 0.99), },	
    speed : {
      min: new THREE.Vector3(0.0, 0.0, 0.0), 
      max: new THREE.Vector3(0.0, 0.0, 0.0)}, 
    size: {
      min: 1, 
      max: 2},
    alpha: 0.2,
  };
  dustParticleSystem = particleSystemInit( 
    dustParticlesNb, 
    dustParticlesPosConfig, 
    dustParticlesMaterialConfig
  );
}





//RAIN INTENSITY:
function startRain(){
  defaultConfig.lightning();
  
  rainParticleSystem.visible = true;
  rainParticleSystem.matConfig.alpha = 0.1;  
  
  var randRainDuration = minRainDuration + Math.random()*(maxRainDuration - minRainDuration);
  setTimeout(stopRain , randRainDuration);
  
  for(var i=0; i < 10; i++)
  {
    setTimeout( increaseRain , (randRainDuration/2)*Math.random() );
  }
  for(var i=0; i < 9; i++)
  {
    setTimeout( decreaseRain , (randRainDuration/2)*(1+Math.random()) );
  }
}
function increaseRain(){
  defaultConfig.lightning();  
  rainParticleSystem.matConfig.alpha += 0.1;
}
function decreaseRain(){
  defaultConfig.lightning();  
  rainParticleSystem.matConfig.alpha -= 0.1;
}
function stopRain(){
  rainParticleSystem.visible = false;
  rainParticleSystem.matConfig.alpha = 0.0;  
  
  var randDryDuration = minRainDuration + Math.random()*(maxRainDuration - minRainDuration);
  setTimeout(startRain , randDryDuration);
}

