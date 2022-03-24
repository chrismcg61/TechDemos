var camera, scene, renderer;

var MY3D = {};
MY3D.camFov = 50;
MY3D.camFar = 900000;

var THREE;
MY3D.preInit = function(_THREE) {
  THREE=_THREE;
  //
  document.body.style.margin = 0; 
  document.body.style.overflow = "hidden"; 
  //
  renderer = new THREE.WebGLRenderer( { antialias: false } );
  //renderer.toneMapping = THREE.ReinhardToneMapping;
  document.body.appendChild( renderer.domElement );  
  //
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( MY3D.camFov, window.innerWidth/window.innerHeight, 0.01, MY3D.camFar );
  camera.position.z = 2;
  scene.add(camera);
  //
  MY3D.onWindowResize();
  window.addEventListener( 'resize', MY3D.onWindowResize, false );
}

MY3D.onWindowResize = function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
}



/*** GUI ***/
MY3D.addGuiParams = function(_folder, _params, _open, _max, _delta){
  for(var key in _params){
    var param = _params[key];
    // var max = 10.0;
    // if(param>=1)  max = 100*param;
    if( typeof(param) === 'object') {
      var subFolder = _folder.addFolder(key);
      if(_open) subFolder.open();
      MY3D.addGuiParams(subFolder, param, _open, _max, _delta);
    }
    else if(param>0xffff) _folder.addColor( _params, key ).onChange(onGuiChange);
    else if(_max>0) _folder.add( _params, key, 0.0,_max,_delta).onChange(onGuiChange);
    else _folder.add( _params, key ).onChange(onGuiChange);
  }
}
function onGuiChange(){
  //init();  
}



/*** PARTICLE Shaders ***/
var sprite0, shaderUniforms0, shaderMaterial0, vShader0,fShader0;
function initShader0(){
  sprite0 = new THREE.TextureLoader().load("https://cdn.rawgit.com/mrdoob/three.js/r138/examples/textures/sprites/disc.png");
  
  shaderUniforms0 = {
    time: {value:0},
    alpha: {value:0.5},
    size: {value:4},
    pointTexture: { value:sprite0 },
    useTexturePosition: {value:0},
    texturePosition: {value:null},
  };
  {
    vShader0 = `
      uniform float useTexturePosition;
      uniform sampler2D texturePosition;
      //
      uniform float size;
      uniform float time;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec3 tmpPos = position * (1.0 + sin(time*0.002));
        if(useTexturePosition>0.0) tmpPos = texture2D( texturePosition, uv ).xyz;
        vec4 mvPosition = modelViewMatrix * vec4( tmpPos, 1.0 );
        //
        gl_PointSize = ( size / -mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
      }
      `;   
    fShader0 = `
      uniform sampler2D pointTexture;
      uniform float alpha;
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4( vColor,  alpha ) * texture2D( pointTexture, gl_PointCoord );
      }
      `;
  }
  shaderMaterial0 = new THREE.ShaderMaterial( {
    uniforms: shaderUniforms0,
    vertexShader: vShader0,
    fragmentShader: fShader0,
    transparent:true,
    //alphaTest: 0.9,
    depthTest:false,
    blending:THREE.AdditiveBlending,
  } );  
}


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



/*** Texture ***/
function addTexture(_ww) {
  var texCanvas = document.createElement( 'canvas' );
  texCanvas.width = texCanvas.height = _ww; 
  var newTexture = new THREE.Texture( texCanvas );
  newTexture.texCanvas = texCanvas;
  newTexture.anisotropy = 8;
  //newTexture.magFilter = THREE.NearestFilter;
  // newTexture.wrapS = newTexture.wrapT = THREE.RepeatWrapping;
  // newTexture.repeat.set( 1, 1 );
  // newTexture.offset.set( 0, 0 );
  initTexture_Text(newTexture, _ww*0.1, "TITLE_TITLE", 
    ["A","B","C","D","E","F","g","H","I","j", ] );
  return newTexture;
}
function initTexture_Text(texture, _fontSize, title, txtLines) {  
  var ctx = texture.texCanvas.getContext( '2d' );
  var ww = texture.texCanvas.width;
  ctx.clearRect( 0, 0, ww,ww );  
  ctx.fillStyle = 'rgba(0,0,0, 0.1)';
  ctx.fillRect( 0, 0, ww,ww );  
  ctx.fillStyle = 'rgba(255,255,255, 1)';
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







// export default MY3D;
