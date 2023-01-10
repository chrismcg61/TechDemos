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
  // renderer.toneMapping = THREE.ReinhardToneMapping;    // renderer.toneMappingExposure = Math.pow( 1.1, 4.0 );
  var renderPass = new THREE.RenderPass( scene, camera );
  composer = new THREE.EffectComposer( renderer );
  // composer.renderToScreen = false;
  composer.setSize( width,height );
  composer.addPass( renderPass );
  {
    ssrMeshes = [];
    ssrPass = new THREE.SSRPass( { renderer,scene,camera, width:width,height:height, selects:ssrMeshes, } );  //groundReflector:ssrGroundReflector,
    ssrPass.renderToScreen = false;
    ssrPass.maxDistance  = 3;
    if(sVars.ssr) composer.addPass( ssrPass );
    // MY3D_Basic.addSsrMesh()
    // console.log(ssrPass);
  }
  {
    filmPass = new THREE.FilmPass( sVars.filmFactor, 0.05, 90,  false )
    if(sVars.filmFactor>0) composer.addPass( filmPass );
    // console.log(filmPass);
  }
  {
    unrealBloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( width,height ), sVars.bloomFactor,0.2,0.9,  );
    if(sVars.bloomFactor>0) composer.addPass( unrealBloomPass );
  }
  {
    effectTM = new THREE.ShaderPass( THREE.ACESFilmicToneMappingShader );  //AdaptiveToneMappingPass
    effectTM.uniforms.exposure.value = sVars.tmExposeFactor;
    if(sVars.tmExposeFactor>0) composer.addPass( effectTM );
  }
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



MY3D_Basic.addSsrMesh = function() {
  var mesh = new THREE.Mesh( new THREE.SphereGeometry( 0.3, 32,32 ),  new THREE.MeshStandardMaterial({roughness:0.1,metalness:0.9})  );
  mesh.position.set(rand(2),0.5,rand(1))
  scene.add( mesh );
  ssrMeshes.push( mesh );    // ssrPass.selects
}
MY3D_Basic.addMirrorFloor_Perf = function(){
  var mirrorFloor = new THREE.Reflector( new THREE.PlaneGeometry( 90,90 ),  {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,  // 512
    textureHeight: window.innerHeight * window.devicePixelRatio,  // 512
    color: 0x222222
  } );
  mirrorFloor.rotation.x = -Math.PI/2;
  scene.add( mirrorFloor );  
  //
  mirrorFloor.myOnBeforeRender = mirrorFloor.onBeforeRender;
  mirrorFloor.onBeforeRender = function(){}
  //
  return mirrorFloor;
}



function customizeMat(_mat){
  _mat.onBeforeCompile = function ( shader ) {
    shader.uniforms.time = { value: 0 };    
    shader.vertexShader = `
        varying vec4 vPos;
        attribute vec3 facePos;
        attribute vec3 offsetPos;
        uniform float time;
      `+ shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
          vec3 transformed = position;

          float facePosY = position.y - facePos.y;          
          transformed.y = mod( facePos.y + 0.05*time,  2.0) + facePosY;
          transformed += offsetPos;

          vPos = vec4( transformed, 1.0);
          #ifdef USE_INSTANCING
            vPos = instanceMatrix * vPos;
          #endif
          vPos = modelMatrix * vPos;
      `); 
    _mat.userData.shader = shader;
  };
}
function setVertexAttribs(geo, aa, _pos){
  var facePositions = [];  //geo.attributes.position.array;
  var offsetPositions = [];
  // aa *= rand(0.99);
  const nbVertex = geo.attributes.position.count;
  for ( let jj=0; jj<nbVertex; jj++ ) {
    facePositions.push( _pos.x,_pos.y,_pos.z );
    offsetPositions.push( 0,0,0 );
  }
  geo.setAttribute( 'facePos', new THREE.Float32BufferAttribute( facePositions, 3 ) );
  geo.setAttribute( 'offsetPos', new THREE.Float32BufferAttribute( offsetPositions, 3 ) );
  geo.attributes.facePos.needsUpdate = true;
  geo.attributes.offsetPos.needsUpdate = true;
}
//
function newQuadParticles_Instances(){
  const INSTANCES = 900;
  var newInstancedMesh = new THREE.InstancedMesh(  new THREE.PlaneGeometry( 0.03,0.03 ),  lambertMat,  INSTANCES );  // particleMat lambertMat
  for ( ii=0; ii<INSTANCES; ii++ ) {
    var dummy = new THREE.Mesh( );   
    dummy.position.set( sRand(2),rand(2),sRand(1) );
    dummy.updateMatrix();
    newInstancedMesh.setMatrixAt( ii, dummy.matrix );
  }
  scene.add( newInstancedMesh ); 
}
function newQuadParticles_MergedMesh(){
  var geometries = [];
  for ( ii=0; ii<150000; ii++ ) {
    var newGeo = new THREE.PlaneGeometry( 0.01,0.01 );
    var newPos = new THREE.Vector3( sRand(2),rand(2),sRand(2) );  //.normalize();
    newGeo.translate( newPos.x,newPos.y,newPos.z );  
    geometries.push( newGeo );
    setVertexAttribs(newGeo, 1.0, newPos);
  }
  var mergedGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries( geometries );
  mergedMesh = new THREE.Mesh( mergedGeometry,   particleMat  );  // particleMat lambertMat
  scene.add(mergedMesh);  
}

function displaceVertex(geo, offset){
  var positions = geo.attributes.position.array;
  for ( ii=0; ii<geo.attributes.position.count*3; ii+=1 ) {
    positions[ii+0] += sRand(offset);
  }
  geo.attributes.position.needsUpdate = true;
  geo.computeVertexNormals();
}
function addReflectionCubeCam( texW ){
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( texW );
  var cubeCamera = new THREE.CubeCamera( 0.05, 30, cubeRenderTarget );
  scene.add( cubeCamera );
  // cubeCamera.position.set( 0,0.2,0 );
  //
  var shinyMat = new THREE.MeshStandardMaterial( { envMap:cubeRenderTarget.texture, roughness:0.05,metalness:0.9,  } );
  var shinySphere = new THREE.Mesh( new THREE.SphereGeometry( 0.3 ),   shinyMat  );
  cubeCamera.add( shinySphere );
  //
  var shinyPlane = new THREE.Mesh( new THREE.PlaneGeometry( 1,0.7, 30,30 ),   shinyMat  );
  cubeCamera.add( shinyPlane );
  displaceVertex( shinyPlane.geometry, 0.01 );
  shinyPlane.rotation.x = -Math.PI/2;
  //
  return cubeCamera;
}
//
function initShaderMat(){
  var vertexShader = `
      uniform float time;
      uniform float useTexturePosition;
      uniform sampler2D texturePosition;
      // attribute float size;   // varying vec3 vColor;
      float size = 1.0;			
			void main() {        
        vec3 tmpPos = position * size*0.3*cos(time);
        if(useTexturePosition>0.0)  tmpPos = texture2D( texturePosition, uv ).xyz;
        //
        float tmpSize = size * (0.5 + 0.5*cos(time*size*10.0));
        //
				vec4 mvPosition = modelViewMatrix * vec4( tmpPos, 1.0 );
				gl_PointSize = tmpSize / -mvPosition.z ;
				gl_Position = projectionMatrix * mvPosition;
			}					
  `;
  var fragmentShader = `
      uniform vec3 color;
			uniform sampler2D pointTexture;
			void main() {
        gl_FragColor = vec4( color, 1.0 );
				gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
        if( gl_FragColor.r+gl_FragColor.g+gl_FragColor.b < 0.1 ) discard;
			}				
  `;
  var myPointMaterial = new THREE.ShaderMaterial( {
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color( 0xffffff ) },
      pointTexture: { value: new THREE.TextureLoader().load( 'https://cdn.rawgit.com/mrdoob/three.js/r144/examples/textures/sprites/disc.png' ) },
      texturePosition: { value: null },
      useTexturePosition: { value: 0 },
    },
    vertexShader,  fragmentShader,
    blending: THREE.AdditiveBlending,  transparent: true,     // depthTest: false,
  } );
  return myPointMaterial;
}
function myInitGpuCompute(){
  gpuCompute = new THREE.GPUComputationRenderer( 32,32, renderer );  
  var newTexturePosition = gpuCompute.createTexture();
  var newTextureVel = gpuCompute.createTexture();
  var texPosData = newTexturePosition.image.data;
  // var pointsPositions = points.geometry.attributes.position.array;
  for ( ii=0; ii<texPosData.length; ii+=1 ) {
    var i4 = ii*4;   // var i3 = ii*3;
    texPosData[i4+0] = sRand(2)  //sRand(2)  pointsPositions[i3+0]
    texPosData[i4+1] = sRand(2)
    texPosData[i4+2] = sRand(2)
  }
  // points.material.uniforms.texturePosition.value = newTexturePosition
  // points.material.uniforms.useTexturePosition.value = 1;
  fShaderPos = `
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;        
        gl_FragColor = texture2D( texturePosition, uv ) + texture2D( textureVel, uv );
      }`
  fShaderVel = `
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec4 tmpPos = texture2D( texturePosition, uv );
        vec4 tmpVel = texture2D( textureVel, uv );        

        for ( float x = 0.0; x < resolution.x; x++ ) {         //resolution.x
          for ( float y = 0.0; y < resolution.y; y++ ) {
            vec2 uv2 = vec2(x,y) / resolution.xy;
            vec4 tmpGravPos = texture2D( texturePosition, uv2 );

            vec3 dPos = tmpGravPos.xyz - tmpPos.xyz;    
            float distance = length( dPos );   //+0.01
            if(distance <= 0.1) continue;
            vec3 gravityVel = 0.1*0.001*0.001 * normalize(dPos) / pow(distance, 2.0);

            tmpVel.xyz += gravityVel;
          }
        }
        gl_FragColor = tmpVel;
      }
    `;
  positionVariable = gpuCompute.addVariable( "texturePosition",  fShaderPos,  newTexturePosition );
  velocityVariable = gpuCompute.addVariable( "textureVel", fShaderVel, newTextureVel );
  gpuCompute.setVariableDependencies( positionVariable, [ positionVariable, velocityVariable  ] );
  gpuCompute.setVariableDependencies( velocityVariable, [ velocityVariable, positionVariable  ] );
  //
  gpuCompute.init();
}
