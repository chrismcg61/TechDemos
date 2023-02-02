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
//
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
//
MY3D_Basic.onWindowResize = function() {
  width = window.innerWidth;  height = window.innerHeight;
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  renderer.setSize( width,height );
}


MY3D_Basic.ReInitScene = function() {
  if(scene) scene.clear();
  scene = new THREE.Scene();
  scene.background = new THREE.Color( sVars.fogCol );  //scene.fog = new THREE.FogExp2( sVars.fogCol, sVars.fogDensity )
  camera.clear();
  scene.add(camera);
  
  if(vars.RenderModes==RenderModes.PostFx) MY3D_Basic.ReInitPostFX();  //postFx  vars.RenderModes==RenderModes.PostFx  
  ReInitSceneObjs();
}
//
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
    unrealBloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( width,height ), sVars.bloomFactor*2,0.2,0.9,  );
    if(sVars.bloomFactor>0) composer.addPass( unrealBloomPass );
  }
  {
    effectTM = new THREE.ShaderPass( THREE.ACESFilmicToneMappingShader );  //AdaptiveToneMappingPass
    effectTM.uniforms.exposure.value = sVars.tmExposeFactor*4;
    if(sVars.tmExposeFactor>0) composer.addPass( effectTM );
  }
  if(sVars.gamma) composer.addPass( new THREE.ShaderPass( THREE.GammaCorrectionShader ) );
}



MY3D_Basic.render = function() {
  MY3D_Basic.updateVars();
  animate();
  if(composer && vars.RenderModes==RenderModes.PostFx) {
    unrealBloomPass.strength  = sVars.bloomFactor*2;
    filmPass.uniforms.nIntensity.value = sVars.filmFactor;
    effectTM.uniforms.exposure.value = sVars.tmExposeFactor*4;
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
  //
  if(typeof guiMeshes!=='undefined'  &&  guiMeshes.length>0){
    guiMeshes[vars.MeshModes].position.x = vars.meshPosX
    guiMeshes[vars.MeshModes].position.z = vars.meshPosZ
  }
}



/*** Other Common FUNCS ***/
MY3D_Basic.addSsrMesh = function() {
  var mesh = new THREE.Mesh( new THREE.SphereGeometry( 0.3, 32,32 ),  new THREE.MeshStandardMaterial({roughness:0.1,metalness:0.9})  );
  mesh.position.set(rand(2),0.5,rand(1))
  scene.add( mesh );
  ssrMeshes.push( mesh );    // ssrPass.selects
}
//
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

MY3D_Basic.setVertexAttribs = function(geo, aa, _pos) {
  var facePositions = [];  //geo.attributes.position.array;
  var offsetPositions = [];
  var speeds = [];
  aa *= rand(0.99);
  const nbVertex = geo.attributes.position.count;
  for ( let jj=0; jj<nbVertex; jj++ ) {
    facePositions.push( _pos.x,_pos.y,_pos.z );
    offsetPositions.push( 0,0,0 );
    speeds.push( 0,aa+0.3,0 );
  }
  geo.setAttribute( 'facePos', new THREE.Float32BufferAttribute( facePositions, 3 ) );
  geo.setAttribute( 'offsetPos', new THREE.Float32BufferAttribute( offsetPositions, 3 ) );
  geo.setAttribute( 'speed', new THREE.Float32BufferAttribute( speeds, 1 ) );
  geo.attributes.facePos.needsUpdate = true;
  geo.attributes.offsetPos.needsUpdate = true;
  geo.attributes.speed.needsUpdate = true;
}


MY3D_Basic.newQuadParticles_Instances = function( _partNb, _partSize, _mat ) {
  var newInstancedMesh = new THREE.InstancedMesh(  new THREE.PlaneGeometry( _partSize,_partSize ),  _mat,  _partNb );  // particleMat lambertMat
  for ( ii=0; ii<_partNb; ii++ ) {
    var dummy = new THREE.Mesh( );   
    dummy.position.set( sRand(2),rand(2),sRand(1) );
    dummy.updateMatrix();
    newInstancedMesh.setMatrixAt( ii, dummy.matrix );
  }
  scene.add( newInstancedMesh );
  //
  return newInstancedMesh;
}
//
MY3D_Basic.newQuadParticles_MergedMesh = function( _partNb, _partSize, _vSize, _mat, _autoAnim ) {
  var geometries = [];
  for ( ii=0; ii<_partNb; ii++ ) {
    var newGeo = new THREE.PlaneGeometry( _partSize,_partSize );
    var newPos = new THREE.Vector3( sRand(_vSize.x),rand(_vSize.y),sRand(_vSize.z) );  //.normalize();
    newGeo.translate( newPos.x,newPos.y,newPos.z );  
    geometries.push( newGeo );
    MY3D_Basic.setVertexAttribs(newGeo, 1.0, newPos);
  }
  var mergedGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries( geometries );
  var mergedMesh = new THREE.Mesh( mergedGeometry,   _mat  );  // particleMat lambertMat
  scene.add(mergedMesh);  
  //
  if(_autoAnim) mergedMesh.onBeforeRender = MY3D_Basic.animWorldParticles;
  return mergedMesh;
}
//
MY3D_Basic.animWorldParticles = function( ) {
  var positions = worldPoints.geometry.attributes.position.array;
  var facePositions = worldPoints.geometry.attributes.facePos.array;
  var offsetPositions = worldPoints.geometry.attributes.offsetPos.array;
  var speeds = worldPoints.geometry.attributes.speed.array;
  for ( let jj=0; jj<worldPoints.geometry.attributes.position.count*1; jj+=1 ) {
    var i3 = jj*3;
    var deltaY = 0.002*speeds[i3+1];
    positions[i3+1] += deltaY
    facePositions[i3+1] += deltaY
    if( facePositions[i3+1]>1 ) {  /*** Out-of-Bounds : Respawn! ***/
      positions[i3+1]     -= facePositions[i3+1];
      facePositions[i3+1] -= facePositions[i3+1];
      //
      offsetPositions[i3+0] = camera.position.x;
      offsetPositions[i3+2] = camera.position.z;
    }
  }
  worldPoints.geometry.attributes.facePos.needsUpdate = true;
  worldPoints.geometry.attributes.offsetPos.needsUpdate = true;
  worldPoints.geometry.attributes.position.needsUpdate = true;
}



MY3D_Basic.displaceVertex = function(geo, offset){
  var positions = geo.attributes.position.array;
  for ( ii=0; ii<geo.attributes.position.count*3; ii+=1 ) {
    positions[ii+0] += sRand(offset);
  }
  geo.attributes.position.needsUpdate = true;
  geo.computeVertexNormals();
}
//
MY3D_Basic.addReflectionCubeCam = function( texW ){
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
  MY3D_Basic.displaceVertex( shinyPlane.geometry, 0.01 );
  shinyPlane.rotation.x = -Math.PI/2;
  //
  return cubeCamera;
}


MY3D_Basic.initShaderMat = function(){
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
//
MY3D_Basic.myInitGpuCompute = function(){
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


MY3D_Basic.customizeMat = function(_mat) {
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
//
MY3D_Basic.customizeMat_AlphaLit = function(_mat) {
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
    // _mat.userData.shader = shader;
    
    shader.uniforms.litMode = { value: 1 };
    shader.uniforms.litAlphaTest = { value: 0.6 };
    //
    shader.fragmentShader = 'uniform float litMode;\n' + shader.fragmentShader;
    shader.fragmentShader = 'uniform float litAlphaTest;\n' + shader.fragmentShader;
    //
    shader.fragmentShader = shader.fragmentShader.replace(
      // '#include <lights_lambert_fragment>',
      "#include <lights_fragment_begin>",
      `      
        GeometricContext geometry;
        geometry.position = - vViewPosition;
        geometry.normal = normal;
        geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

        IncidentLight directLight;
        #if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
        PointLight pointLight;
        #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
        PointLightShadow pointLightShadow;
        #endif
        #pragma unroll_loop_start
        for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
          pointLight = pointLights[ i ];
          if(litMode>0.0) geometry.normal = pointLight.position - geometry.position;
          //
          getPointLightInfo( pointLight, geometry, directLight );
          #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
          pointLightShadow = pointLightShadows[ i ];
          directLight.color *= ( directLight.visible && receiveShadow ) 
            ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) 
          : 1.0;
          #endif
          RE_Direct( directLight, geometry, material, reflectedLight );
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

          if(litMode>0.0) geometry.normal = spotLight.position - geometry.position;
          // spotLight.position = geometry.position + vec3(1.0,1.0,1.0);  // 2.0*normal.xyz;

          getSpotLightInfo( spotLight, geometry, directLight );
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

          directLight.color *= ( directLight.visible && receiveShadow ) 
            ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) 
          : 1.0;
          #endif
          RE_Direct( directLight, geometry, material, reflectedLight );
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
          // if(litMode>0.0) geometry.normal = directionalLight.position - geometry.position;
          //
          getDirectionalLightInfo( directionalLight, geometry, directLight );
          #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
          directionalLightShadow = directionalLightShadows[ i ];
          directLight.color *= ( directLight.visible && receiveShadow ) 
            ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) 
          : 1.0;
          #endif
          RE_Direct( directLight, geometry, material, reflectedLight );
        }
        #pragma unroll_loop_end
        #endif
        #if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
        RectAreaLight rectAreaLight;
        #pragma unroll_loop_start
        for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
          rectAreaLight = rectAreaLights[ i ];
          RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
        }
        #pragma unroll_loop_end
        #endif
        #if defined( RE_IndirectDiffuse )
        vec3 iblIrradiance = vec3( 0.0 );
        vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

        // vec3 testVec = lightProbe.position - geometry.position;
        irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
        #if ( NUM_HEMI_LIGHTS > 0 )
        #pragma unroll_loop_start
        for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
        }
        #pragma unroll_loop_end
        #endif
        #endif
        #if defined( RE_IndirectSpecular )
        vec3 radiance = vec3( 0.0 );
        vec3 clearcoatRadiance = vec3( 0.0 );
        #endif
      `);

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <output_fragment>",
      `
        #ifdef OPAQUE
          diffuseColor.a = 1.0;
        #endif
        #ifdef USE_TRANSMISSION
          diffuseColor.a *= material.transmissionAlpha + 0.1;
        #endif
        gl_FragColor = vec4( outgoingLight, diffuseColor.a );
        float aa = gl_FragColor.r + gl_FragColor.g + gl_FragColor.b;
        if( aa < litAlphaTest ) discard;
      `);
    _mat.userData.shader = shader;
  };
}
