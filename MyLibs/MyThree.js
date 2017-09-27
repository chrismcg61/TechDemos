var MyTHREE = {};

var stats, gui;

//TIME Vars:
var now = Date.now();
var lastT = now;
var deltaT = 0;


//INI CONFIG:
var defaultConfig = {};
var camConf = {near:1, far:100*1000};
defaultConfig.ambientLightIntensity = 0.05;

function updateDefaultConfig(){
  ambientDirLight.color.setScalar( defaultConfig.ambientLightIntensity );  
}


//SCENE VARS:
var container, camera, scene, renderer;
var camContainer;
//var hemiLight;
var ambientDirLight;
var directionalLight, dirLightHeper;


//CONTROLS:
var controls;
var camSpeed = new THREE.Vector3(0, 0, 0);
var playerInput = new THREE.Vector3(0, 0, 0);
defaultConfig.camAcceleration = 0.1;
defaultConfig.camDeceleration = 0.07;

var collisionCubes = [];

var raycaster, mouse;
var clicObjects = [];



//ENV Materials:
var canvasSkyResolution = 512;

var canvasSky, canvasStars, canvasClouds;
var sky, skyStar, skyClouds;
var skyMat;


//PARTICLES VAR:
var myParticleSystems = [];
var dustParticleSystem;


//VID Material Vars:
MyTHREE.vidMaterials = [];



//INITs:
MyTHREE.minInitScene = function ( isCanvas ){
  MyTHREE.canvasMode = isCanvas;
  
  //CONTAINER config:
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";

  container = document.createElement( 'div' );
  document.body.appendChild( container );


  //SCENE Config:
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, camConf.near, camConf.far );
  camContainer = camera;
  camera.position.set( 0, 10, 100 );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x888888 );  
  
  
  //RENDERER:
  if(isCanvas) renderer = new THREE.CanvasRenderer(); 
  else 
  {
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;
  }
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
  
  
  //Min Ambient LIGHT:
  //ambientDirLight = new THREE.AmbientLight( 0x050505, 1 );
  ambientDirLight = new THREE.DirectionalLight( 0x050505, 1 );
  ambientDirLight.position.set( 0, 1, 0 );
  scene.add( ambientDirLight );
}

MyTHREE.initScene = function (isCanvas, groundCfg, skyCfg, particlesMode, controlsMode, activateClickObjs) {
  MyTHREE.skyMode = skyCfg.mode;
  MyTHREE.particlesMode = particlesMode;
  MyTHREE.clickMode = activateClickObjs;
  
  canvasSkyResolution = skyCfg.resolution;
  
    /*
				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> - clickable objects';
				container.appendChild( info );
   */

  MyTHREE.minInitScene(isCanvas);  
  
  //LIGHTS:  
  /*
  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setRGB(0.4, 0.4, 0.6); //setScalar(0.5);  //setHex()  //setRGB  //setHSL
  hemiLight.groundColor.setScalar( 0.2 );
  hemiLight.position.set( 0, camFar, 0 );
  //scene.add( hemiLight );
  
  var helperIsActive = false;
  if(helperIsActive)
  {
    hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 50 );
    scene.add( hemiLightHelper ); 
  }
  */
  
  {
    directionalLight = new THREE.DirectionalLight( 0x555555, 0.5 );
    var dirLightHeight = 200;
    directionalLight.position.x = 1 * dirLightHeight;
    directionalLight.position.y = 2 * dirLightHeight;
    directionalLight.position.z = 1 * dirLightHeight;
    //directionalLight.position.normalize();
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    var d = 500;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.far = 3500;
    directionalLight.shadow.bias = -0.0001;  
    //dirLightHeper = new THREE.DirectionalLightHelper( directionalLight, 10 )   
    scene.add( directionalLight );
    //directionalLight.add( dirLightHeper );  
  }
  
  
  /*
  // PointLight( color, intensity, distance, decay )
  var pointLight = new THREE.PointLight( 0xddddff, 2, 9000, 2);
  pointLight.position.set( 1000, 2000, 1000 );
  var pointLightHelper = new THREE.PointLightHelper( pointLight, 50 );
  //scene.add( pointLight );
  //scene.add( pointLightHelper ); 
  */

  
  //STATS:
  var statsIsActive = true;
  if(statsIsActive)  {
    stats = new Stats();
    container.appendChild( stats.dom );
  }
  
   //GUI:
  var guiIsActive = true;
  if(guiIsActive)  {
    gui = new dat.GUI();
    guiFolder1 = gui.addFolder('Default Config');
    guiFolder1.open();    
    
    for (var key in defaultConfig) {
      if (defaultConfig.hasOwnProperty(key)) {
        //console.log(key + " -> " + defaultConfig[key]);
        guiFolder1.add(defaultConfig, key).onChange( updateDefaultConfig ); 
      }
    }
  }
  
  
  //CONTROLS:
  //var controlMode = 1;
  initControls(controlsMode);
    
  
  //Clickable Objs:
  //var activateClickObjs = true;
  if(activateClickObjs)
  {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    document.addEventListener( 'click', myMouseDown, false );
    document.addEventListener( 'mousemove', updateMousePos, false );
  }
  
  
  // GROUND: 
  {
    //var groundSize = camConf.far/100;
    //var groundResolution = 20; //groundSize/100; //20;
    var planeGeometry = new THREE.PlaneGeometry( groundCfg.size, groundCfg.size, groundCfg.resolution, groundCfg.resolution ); 
    //var planeGeometry = new THREE.BoxGeometry( 400, 400, 100 );  
    MyTHREE.groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505,  } );
    //Alpha:
    MyTHREE.groundMat.transparent = false;
    MyTHREE.groundMat.opacity = 1.0;
    //
    MyTHREE.groundMat.bumpScale = 0.9;
    MyTHREE.groundMat.bumpMap = new THREE.TextureLoader().load( 'https://cdn.rawgit.com/mrdoob/three.js/r85/examples/textures/waternormals.jpg' );
    //MyTHREE.groundMat.map = new THREE.TextureLoader().load( 'https://cdn.rawgit.com/mrdoob/three.js/r85/examples/textures/waternormals.jpg' );
    MyTHREE.groundMat.bumpMap.wrapS = MyTHREE.groundMat.bumpMap.wrapT = THREE.RepeatWrapping;
    MyTHREE.groundMat.bumpMap.repeat.set( groundCfg.resolution, groundCfg.resolution );
    MyTHREE.groundMat.shininess = 50;
    //MyTHREE.groundMat.bumpMap = new THREE.TextureLoader().load( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/33170/egyptian_friz_2.png" );
    //MyTHREE.groundMat.map = new THREE.TextureLoader().load( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/33170/egyptian_friz_2.png" );
    //
    var groundPlane = new THREE.Mesh( planeGeometry , MyTHREE.groundMat );
    groundPlane.rotation.x = -Math.PI/2;
    groundPlane.position.y = 0;
    groundPlane.receiveShadow = true;  
    //groundPlane.rotation.x = - Math.PI * 0.5;
    //scene.add( groundPlane );  

    //var groundMode = 2;   
    if(groundCfg.mode == 2  &&  !isCanvas)  {
      //WATER:
      var waterNormals = new THREE.TextureLoader().load( 'https://cdn.rawgit.com/mrdoob/three.js/r85/examples/textures/waternormals.jpg' );
      waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
      MyTHREE.water = new THREE.Water( renderer, camera, scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 	1.0,
        sunDirection: directionalLight.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 50.0,
        fog: scene.fog != undefined
      } );
      /*
      var groundPlane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 1000, 1000 ),
        MyTHREE.water.material
      );
      */
      groundPlane.material = MyTHREE.water.material;
      groundPlane.add( MyTHREE.water );    
    }
    if(groundCfg.mode > 0) scene.add( groundPlane );
    
  }
  
  
  
  //SKIES:
  //var skyActive = true;
  if(skyCfg.mode) initSkies();
  
  
  //PARTICLES ENV:
  //var particlesActive = true;
  if(particlesMode) initDust();
  


  //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}


//CONTROLS:
function initControls(mode){
  MyTHREE.controlsMode = mode;
  if(mode == 1)
  {
    console.log("CONTROLS : OrbitControls");
    camera.position.set( 0, 10, 100 );
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enabled = true;
  }
  else if(mode == 2)
  {
    console.log("CONTROLS : PointerLockControls");

    camera.position.set( 0, 0, 0 );
    controls = new THREE.PointerLockControls( camera );
    camContainer = controls.getObject();
    scene.add( camContainer );
    

    document.addEventListener( 'pointerlockchange',       pointerLockChange, false );
    document.addEventListener( 'mozpointerlockchange',    pointerLockChange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerLockChange, false );
    
    document.onkeydown = function(e) { onKeyDown(e); };
    document.onkeyup = function(e) { onKeyUp(e); };
    
  }
  else
  {
    console.log("CONTROLS : No Controls");
  }
}
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


function updatePlayerInput ( keyCode, keyIsDown ){  
  switch ( keyCode ) 
  {
    case 38: // UP
      playerInput.z = -1*keyIsDown;
      break;
    case 40: // DOWN
      playerInput.z = 1*keyIsDown;
      break;
      
    case 39: // DOWN
      playerInput.x = 1*keyIsDown;
      break;
    case 37: // DOWN
      playerInput.x = -1*keyIsDown;
      break;
      
    default:
      console.log("updatePlayerInput : ", keyCode, keyIsDown);
  }  
}
function onKeyUp (e){
  updatePlayerInput ( e.keyCode, 0 );  
}
function onKeyDown (e){
  updatePlayerInput ( e.keyCode, 1 ); 
}

function detectCollisionCubic(mesh1, mesh2, minDistance){
  var pos1 = new THREE.Vector3();
  pos1.setFromMatrixPosition( mesh1.matrixWorld );
  var pos2 = new THREE.Vector3();
  pos2.setFromMatrixPosition( mesh2.matrixWorld );
  
  var collision = false;
  if( Math.abs(pos1.x - pos2.x) < minDistance //pos1.distanceTo( pos2 ) < minDistance )  
   && Math.abs(pos1.z - pos2.z) < minDistance
   && Math.abs(pos1.y - pos2.y) < minDistance
  )
    collision = true;
  
  return collision;
}
function moveCamFps(){
  var saveCamPos = camContainer.position.clone();  
   
  {
    camSpeed.z += playerInput.z * deltaT*defaultConfig.camAcceleration;
    camSpeed.x += playerInput.x * deltaT*defaultConfig.camAcceleration;

    camSpeed.divideScalar ( 20*defaultConfig.camDeceleration ); // *deltaT 
    camContainer.translateZ( camSpeed.z );
    camContainer.translateX( camSpeed.x );
  }
  
  scene.updateMatrixWorld();
  
  for ( var i = 0; i < collisionCubes.length; i ++ ) {    
    if( detectCollisionCubic(camContainer, collisionCubes[i], collisionCubes[i].size + (camConf.near+1)) )
    {
      console.log("Collision at : ", camContainer.position);
      camContainer.position.copy(saveCamPos);
      //camContainer.position.z = 0;
      console.log("Previous Pos : ", camContainer.position);
      camSpeed.multiplyScalar( 0 );
      //camContainer.translateZ( -2*camSpeed.z );
      //camContainer.translateX( -2*camSpeed.x );
      break;
    }      
  }
  
}



//MOUSE INPUTs:
function myMouseDown( event ) {
  //event.preventDefault();

  //mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  //mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( clicObjects );
  if ( intersects.length > 0 ) {
    intersects[ 0 ].object.onClick( intersects[ 0 ].object ); //material.color.g = Math.random();
  }
  /*
  // Parse all the faces
  for ( var i in intersects ) {
    intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );
  }
  */
}
function updateMousePos( event ) {
  //event.preventDefault();  
  
  mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;        

  /*
  for ( var i = 0; i < clicObjects.length; i ++ ) {
    clicObjects[i].onLeave( clicObjects[i] );
  }

  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( clicObjects );
  if ( intersects.length > 0 ) {
    intersects[ 0 ].object.onHover( intersects[ 0 ].object );
  }
  */
}

function updateHoverObjects(){
  for ( var i = 0; i < clicObjects.length; i ++ ) {
    clicObjects[i].onLeave( clicObjects[i] );
  }
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( clicObjects );
  if ( intersects.length > 0 ) {
    intersects[ 0 ].object.onHover( intersects[ 0 ].object );
  }
}


//SKY SPHERES:
function initSkies(){
  //Init Canvases:  
  canvasSky = document.createElement( 'canvas' );
  canvasStars = document.createElement( 'canvas' );
  canvasClouds = document.createElement( 'canvas' );
  
  canvasClouds.width = canvasSky.width = canvasStars.width = canvasSkyResolution;
  canvasClouds.height = canvasSky.height = canvasStars.height = canvasSkyResolution/2;

  initStarsCanvas();
  initSkyCanvas();
  initCloudsCanvas();
  
  
  //Init Sky Spheres:
  var skySphereSize = camConf.far*0.6;
  var SphereFacesH = 32;
  var SphereFacesV = Math.floor( SphereFacesH * 1/2 );
  
  
  var starsGeo = new THREE.SphereGeometry( skySphereSize , SphereFacesH, SphereFacesV );
  var starsMat = new THREE.MeshBasicMaterial( {  side: THREE.BackSide} );
  //opacity: 1.0, transparent : false,
  //color: 0xffffff,
  starsMat.overdraw = 0.9;
  starsMat.map = new THREE.Texture(canvasStars);  
  starsMat.map.needsUpdate = true;
  skyStar = new THREE.Mesh( starsGeo, starsMat );
  scene.add( skyStar ); 
  
  var skyGeo = new THREE.SphereGeometry( skySphereSize*0.8 , SphereFacesH, SphereFacesV );
  skyMat = new THREE.MeshBasicMaterial( {  side: THREE.BackSide} );
  skyMat.opacity = 0.99;
  skyMat.transparent = true;
  //color: 0xffffff,
  skyMat.overdraw = 0.25;
  skyMat.map = new THREE.Texture(canvasSky);  
  skyMat.map.needsUpdate = true;
  sky = new THREE.Mesh( skyGeo, skyMat );
  sky.position.y -= skySphereSize/2;
  scene.add( sky ); 
  
  
  var cloudsGeo = new THREE.SphereGeometry( skySphereSize*0.8*0.8 , SphereFacesH, SphereFacesV );
  var cloudsMat = new THREE.MeshBasicMaterial( {  side: THREE.BackSide} );
  cloudsMat.opacity = 0.99;
  cloudsMat.transparent = true;
  cloudsMat.overdraw = 0.25;
  cloudsMat.map = new THREE.Texture(canvasClouds);  
  cloudsMat.map.needsUpdate = true;
  skyClouds = new THREE.Mesh( cloudsGeo, cloudsMat );
  skyClouds.position.y = sky.position.y;
  scene.add( skyClouds ); 
    
  
}

function initCloudsCanvas(){
  var groundColor = {
       r: 20,
       g: 20,
       b: 50,
       a: 0.30};
  var topColor = {
       r: 255,
       g: 255,
       b: 255,
       a: 0.99};
  var clouds = [ ];  

  var groundHeight = canvasClouds.height/4;
  
  var cloudHeight = 100; //canvasClouds.height/4; //200;
  var maxCloudWidth = canvasClouds.width/4;
  var minCloudWidth = maxCloudWidth/4;
  for(var i=0; i<minCloudWidth; i++){
    var brightness =  groundColor.r + (topColor.r - groundColor.r) * (i/cloudHeight);  
    brightness = Math.floor( brightness );

    var cloud = 
        {x:  maxCloudWidth + minCloudWidth*Math.random(), //(Math.random()+1)*canvasClouds.width/4, //starSize/2 + X*starSize, 
         y:  groundHeight - i, //starSize/2 + Y*starSize, 
         size:{x: minCloudWidth + (maxCloudWidth-minCloudWidth)*Math.random(), 
               y:1},
         color:{
           r: brightness, //X*colorOffset,
           g: brightness,
           b: brightness,
           a: 0.005*brightness},
         colorSpeed:{
           r: 0,
           g: 0,
           b: 0,
           a: 0},   
        };
    clouds.push(cloud);
  } 

  MyCanvasLib.drawColorRects(canvasClouds, clouds);
  
}
function initSkyCanvas(){
  var groundColor = {
       r: 20,
       g: 20,
       b: 50,
       a: 0.30};
  var topColor = {
       r: 255,
       g: 255,
       b: 255,
       a: 0.99};
  var skyLines = [ 
    {x:0, y:0, size:{x:canvasSky.width*2, y:canvasSky.height*2},
     color: groundColor,
     colorSpeed:{
       r: 0,
       g: 0,
       b: 0,
       a: 0},   
    }
  ];
  

  var groundHeight = canvasSky.height/2;
  for(var i=0; i<=groundHeight; i++){
    var brightness =  groundColor.r + (topColor.r - groundColor.r) * (i/groundHeight);  
    //Math.floor( 1 * (groundHeight-i)*255/groundHeight );
    brightness = Math.floor( brightness );
    var skyLine = 
        {x:  canvasSky.width/2, //starSize/2 + X*starSize, 
         y:  groundHeight-i, //starSize/2 + Y*starSize, 
         size:{x:canvasSky.width, //starSize, 
               y:1},
         color:{
           r: brightness*0.7, //X*colorOffset,
           g: brightness*0.7,
           b: brightness,
           a: 0.0005*brightness*brightness},
         colorSpeed:{
           r: 0, //Math.floor( 255*Math.random() ),
           g: 0,
           b: 0,
           a: 0},   
        };
    skyLines.push(skyLine);
  } 

  MyCanvasLib.drawColorRects(canvasSky, skyLines);  
}
function initStarsCanvas(){
  var stars = [
    {x:0, y:0, size:{x:canvasStars.width*2, y:canvasStars.height*2},
     color:{
       r: 0,
       g: 0,
       b: 0,
       a: 1.00},
     colorSpeed:{
       r: 0,
       g: 0,
       b: 0,
       a: 0},   
    }
  ];
  var starsNb = 30000;
  for(var i=0; i<starsNb; i++){
    var randSize = Math.floor( 1 + Math.random()*2 );
    var randBrightness =  Math.floor( Math.random()*255 );
    var randX = Math.floor( Math.random()*canvasStars.width );
    var randY = Math.floor( Math.random()*canvasStars.height );

    var star = 
        {x:  randX, //starSize/2 + X*starSize, 
         y:  randY, //starSize/2 + Y*starSize, 
         size:{x:randSize, //starSize, 
               y:randSize},
         color:{
           r: randBrightness, //X*colorOffset,
           g: randBrightness,
           b: randBrightness,
           a: 0.5},
         colorSpeed:{
           r: 0,
           g: 0,
           b: 0,
           a: 0},   
        };
    stars.push(star);
  } 

  MyCanvasLib.drawColorRects(canvasStars, stars);
  
}



//PARTICLES ENV:
function initDust(){
  var dustParticlesNb = 300;
  var dustParticlesPosConfig ={
    areaSize: new THREE.Vector3(400, 400, 400),
    speed: {
      min: new THREE.Vector3(-0.01, -1.1, -0.01), 
      max: new THREE.Vector3(0.01, -2.1, 0.01),
    },
  };
  var dustParticlesMaterialConfig = {
    //HSL COLORS:
    color: {
      min: new THREE.Vector3(0.01, 0.4, 0.2), 
      max: new THREE.Vector3(0.99, 0.99, 0.8), },	
    speed : {
      min: new THREE.Vector3(0.0008, 0.0, 0.0), 
      max: new THREE.Vector3(0.0009, 0.0, 0.0)}, 
    size: {
      min: new THREE.Vector2(10,10), 
      max: new THREE.Vector2(10,20)},
    alpha: 0.6,
  };
  dustParticleSystem = MyTHREE.particleSystemInit( 
    dustParticlesNb, 
    dustParticlesPosConfig, 
    dustParticlesMaterialConfig,
    MyTHREE.canvasMode
  );
  //dustParticleSystem.scale.x = 0.2;
}


//VID Materials:
MyTHREE.createVidMaterial = function ( dataURL ){	
  //Video:
  var newVid = document.createElement( 'video' );
  newVid.src = dataURL;
  newVid.autoplay = true;
  newVid.loop = true;
  newVid.muted = true;
  //newVid.oncanplay  = function(){ alert("Can play Vid");  }
  
  //Canvas:
  var newVidcanvas = document.createElement( 'canvas' );
  newVidcanvas.width = 512; //myVid.videoWidth;
  newVidcanvas.height = 256; //myVid.videoHeight;
  //Material:
  var newVidMaterial = new THREE.MeshBasicMaterial( {  
    map: new THREE.CanvasTexture( newVidcanvas ),
    transparent: true, opacity: 0.5,
  } );
  newVidMaterial.needsUpdate = true;
  
  newVidMaterial.video = newVid;
  newVidMaterial.canvas = newVidcanvas;
  //myVids.push( newVid );
  //vidCanvases.push( newVidcanvas );
  MyTHREE.vidMaterials.push( newVidMaterial );  
  
  return newVidMaterial;
}

MyTHREE.animVidMaterials = function (deltaVidFrame){
  for(var i=0; i < MyTHREE.vidMaterials.length; i++)
  {
    MyCanvasLib.drawImg(MyTHREE.vidMaterials[i].canvas, MyTHREE.vidMaterials[i].video);  
    MyCanvasLib.writeText(MyTHREE.vidMaterials[i].canvas, "VID Canvas");
    MyTHREE.vidMaterials[i].map.needsUpdate = true;
  } 
 
  setTimeout( MyTHREE.animVidMaterials, deltaVidFrame, deltaVidFrame );
}


//DYNAMIC CUBES (MultiMat, Clickable, Collidable):
MyTHREE.createCube = function (size, materials, dynamicConf, isCol) {  
  var cubeGeometry = new THREE.BoxGeometry( size, size, size );  
  var newCube = new THREE.Mesh( cubeGeometry, materials[0] );
  for ( var i = 1; i < materials.length; i ++ ) {
    var subCube = new THREE.Mesh( cubeGeometry, materials[i] );
    newCube.add(subCube);
  }
  
  //Dynamic Conf:
  if(dynamicConf)
  {
    newCube.onClick = dynamicConf.onClick; //function(obj){ alert(obj.position.x); };
    newCube.onHover = dynamicConf.onHover; //function(obj){ obj.material.color.setHex( 0x33ff33 ); };
    //Default material (not hovered/selected):
    newCube.onLeave = dynamicConf.onLeave; //function(obj){ obj.material.color.setHex( 0x00ff00 ); };
    newCube.onLeave(newCube);

    clicObjects.push( newCube );
  }
  
  if(isCol)
  {
    newCube.size = size/2;
    collisionCubes.push( newCube );
  }
  
  return newCube;
}



//DEFAULT FRAME RENDER:
MyTHREE.render = function( dayNightSpeed, rainSwitchSpeed, callback ) {
  now = Date.now(); //performance.now();
  deltaT = now - lastT;
  lastT = now; 
  
  MyTHREE.optionalAnim( dayNightSpeed, rainSwitchSpeed);  
  callback();
  
  renderer.render( scene, camera );  
}
MyTHREE.optionalAnim = function ( dayNightSpeed, rainSwitchSpeed ) {
  var sinTime = 0.5 + 0.5*Math.sin(now*rainSwitchSpeed); //0.0005
  
  if(stats) stats.update();
  
  MyTHREE.animParticles(myParticleSystems, MyTHREE.canvasMode);    
  if(MyTHREE.particlesMode)   {
    dustParticleSystem.position.copy( camContainer.position );
    
    if(!MyTHREE.canvasMode) dustParticleSystem.material.opacity = (1-sinTime)*0.9;
    else
    {
      for(var i=0; i < dustParticleSystem.children.length; i++)
      {
        var sprite = dustParticleSystem.children[i];
        if ( sprite instanceof THREE.Sprite ) 
        {
          sprite.material.opacity = (1-sinTime)*0.9;
        }
      }
    }

  }
 
  if(MyTHREE.clickMode) updateHoverObjects();   
  
  if(MyTHREE.skyMode)  {
    skyClouds.rotation.y += 0.003*deltaT/33;  
    skyStar.rotation.y -= 0.0005*deltaT/33;
    sky.rotation.x += dayNightSpeed*deltaT/33; //0.006
    
    directionalLight.position.x = 0;
    directionalLight.position.y = Math.cos( sky.rotation.x ); 
    directionalLight.position.z = Math.sin( sky.rotation.x );
    directionalLight.color.setScalar( 0.5 + 0.5*directionalLight.position.normalize().y );
  }
  
  if(MyTHREE.controlsMode == 2) moveCamFps();
      
  if(MyTHREE.water)  {
    MyTHREE.water.sunDirection = directionalLight.position.clone().normalize();      
    MyTHREE.water.material.uniforms.time.value += 1.0 / 60.0;  
    MyTHREE.water.render();
  }

}




//PARTICLES:
function spriteCanvasMatProgram ( context ) {
  context.beginPath();
  context.arc( 0, 0, 0.1, 0, 2*Math.PI, true );
  context.fill();
};
function generateSprite() {
  var canvas = document.createElement( 'canvas' );
  canvas.width = 64;
  canvas.height = 64;
  var context = canvas.getContext( '2d' );
  var gradient = context.createRadialGradient( 
    canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
  gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
  gradient.addColorStop( 0.2, 'rgba(200,200,200,1)' );
  gradient.addColorStop( 0.4, 'rgba(64,64,64,1)' );
  gradient.addColorStop( 1, 'rgba(0,0,0,1)' );
  context.fillStyle = gradient;
  context.fillRect( 0, 0, canvas.width, canvas.height );
  return canvas;
}

MyTHREE.particleSystemInit = function ( particlesNb, posConfig, matConfig, isCanvas) {
	var areaSize = posConfig.areaSize;
	var speed = posConfig.speed;

	var color = matConfig.color;
	var colSpeed = matConfig.speed;
	var sizeConf = matConfig.size;
	var alpha = matConfig.alpha;

  var sizeX = sizeConf.min.x + Math.random() * (sizeConf.max.x - sizeConf.min.x);
  var sizeY = sizeConf.min.y + Math.random() * (sizeConf.max.y - sizeConf.min.y);
  
	var geometry = new THREE.Geometry();
  
  var particleSystem = new THREE.Group();
  

	for (var i = 0; i < particlesNb; i ++ ) 
	{
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * areaSize.x - areaSize.x/2;
		vertex.y = Math.random() * areaSize.y - areaSize.y/2;
		vertex.z = Math.random() * areaSize.z - areaSize.z/2;
		
		vertex.speed = new THREE.Vector3(
			speed.min.x + (Math.random() ) * (speed.max.x - speed.min.x), 
			speed.min.y + (Math.random() ) * (speed.max.y - speed.min.y), 
			speed.min.z + (Math.random() ) * (speed.max.z - speed.min.z)
		);

		geometry.vertices.push( vertex );
		
		var newColor = new THREE.Color();
		newColor.setHSL( 
			color.min.x + Math.random() * (color.max.x - color.min.x), 
      color.min.y + Math.random() * (color.max.y - color.min.y),
      color.min.z + Math.random() * (color.max.z - color.min.z),
			); 
		newColor.speed = new THREE.Vector3(
			colSpeed.min.x + (Math.random() ) * (colSpeed.max.x - colSpeed.min.x), 
			colSpeed.min.y + (Math.random() ) * (colSpeed.max.y - colSpeed.min.y), 
			colSpeed.min.z + (Math.random() ) * (colSpeed.max.z - colSpeed.min.z)
		);
		geometry.colors.push( newColor );
    
    /*
    var particleCloneNb = 0; //Math.floor( sizeY/sizeX );
    for(var n=0; n < particleCloneNb; n++)
    {
      var vertexBis = new THREE.Vector3();
      vertexBis.copy(vertex);
      vertexBis.y += sizeX;
      vertexBis.speed = vertex.speed;
      geometry.vertices.push( vertexBis );
      geometry.colors.push( newColor );
    }
    */
    
    var spriteTex = new THREE.TextureLoader().load( "https://cdn.rawgit.com/mrdoob/three.js/r87/examples/textures/sprites/snowflake4.png" );
    if(isCanvas)
    {
      var spriteCanvasMat = new THREE.SpriteCanvasMaterial( {
        color: Math.random() * 0x808008 + 0x808080,
        program: spriteCanvasMatProgram,
        transparent: true,
        opacity: 0.3
      } );
      /*
      var spriteMat = new THREE.SpriteMaterial( {  } ) ;
      spriteMat.map = spriteTex; //new THREE.CanvasTexture( generateSprite() );  //spriteTex; 
      spriteMat.blending = THREE.AdditiveBlending;
      spriteMat.color = newColor;
      spriteMat.transparent = true;
      spriteMat.opacity = 0.5;
      spriteMat.alphaTest = 0.5;
      */
      var sprite = new THREE.Sprite( spriteCanvasMat );
      sprite.scale.set(sizeX, sizeY, 1);
      sprite.position.copy(vertex);
      sprite.speed = vertex.speed;
      sprite.colorSpeed = newColor.speed;
      particleSystem.add(sprite);
    }
	}
  
	var material = new THREE.PointsMaterial( { 
	  size: sizeX*1 } );  
  material.map = new THREE.CanvasTexture( generateSprite() ); //spriteTex;
  material.blending = THREE.AdditiveBlending;
  material.side = THREE.DoubleSide;
  material.depthTest = false;
  
	material.transparent = true;
	material.opacity = alpha;
	material.vertexColors = THREE.VertexColors;

  if(!isCanvas)
  {
    geometry.computeBoundingBox(); //Sphere();
    particleSystem = new THREE.Points( geometry, material );
    particleSystem.frustumCulled = false;
    //var bboxPoints = new THREE.BoxHelper( particleSystem );
    //particleSystem.add( bboxPoints );
  }
    
    scene.add(particleSystem);
    myParticleSystems.push(particleSystem);
    particleSystem.posConfig = posConfig;
    particleSystem.matConfig = matConfig;

	return particleSystem;
}

MyTHREE.animParticles = function (particleSystems, isCanvas) {

  var slowTime = now * 0.00001;
  var correctDelta = deltaT / 33;	

  for (var i = 0; i < particleSystems.length; i ++ ) 
  {
    //var object = scene.children[ i ];
    //if ( particleSystem instanceof THREE.Points ) 
    var particleSystem = particleSystems[ i ];		

    var posConfig = particleSystem.posConfig;
    var matConfig = particleSystem.matConfig;

    var areaSize = posConfig.areaSize;
    var speed = posConfig.speed;

    var color = matConfig.color;
    var colSpeed = matConfig.speed;
    var size = matConfig.size;
    var alpha = matConfig.alpha;
    
    if(!particleSystem.visible || alpha < 0.01) continue;

    {
      //object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );			
      var geom;
      var sprites;
      var maxIndex;
      if(isCanvas) 
      {
        sprites = particleSystem.children;
        maxIndex = sprites.length;                   
      }
      else 
      {
        geom = particleSystem.geometry;
        maxIndex = geom.vertices.length;
      }
      //console.log(vertices);
      for ( v = 0; v < maxIndex; v ++ ) { 
        var vertice;
        var verticePos;
        var verticeColor;
        var verticeColorSpeed;
        if(isCanvas) 
        {
          verticePos = sprites[v].position;
          vertice = sprites[v];
          verticeColor = sprites[v].material.color;
          verticeColorSpeed = sprites[v].colorSpeed;
        }
        else
        {
          verticePos = geom.vertices[v];
          vertice = verticePos;
          verticeColor = geom.colors[v];
          verticeColorSpeed = geom.colors[v].speed;
        }
          
        var saveVertice = verticePos.clone();
        //var moveFactor =  Math.sin( time*20 );
        verticePos.x += vertice.speed.x * correctDelta; // * moveFactor;	
        verticePos.y += vertice.speed.y * correctDelta;
        verticePos.z += vertice.speed.z * correctDelta;

        if(Math.abs( verticePos.x ) > areaSize.x/2) 
          verticePos.x  = saveVertice.x * (-1);
        if(Math.abs( verticePos.y ) > areaSize.y/2) 
          verticePos.y  = saveVertice.y * (-1);
        if(Math.abs( verticePos.z ) > areaSize.z/2) 
          verticePos.z  = saveVertice.z * (-1);


        var hslColor = verticeColor.getHSL();
        var h = hslColor.h + (deltaT * verticeColorSpeed.x);
        var s = hslColor.s + (deltaT * verticeColorSpeed.y);
        var l = hslColor.l + (deltaT * verticeColorSpeed.z);

        if(h > color.max.x) h = color.min.x;
        if(s > color.max.y) s = color.min.y;
        if(l > color.max.z) l = color.min.z;

        verticeColor.setHSL( h, s, l ); 
      }

      if(!isCanvas)
      {
        geom.colorsNeedUpdate = true;
        geom.verticesNeedUpdate = true;
        particleSystem.material.opacity = alpha;        
      }

    }
  }
  
  /*
  if(ambientOn)
  {
    rainParticleSystem.position.copy(camera.position);
    dustParticleSystem.position.copy(camera.position);
  }
  */
}


