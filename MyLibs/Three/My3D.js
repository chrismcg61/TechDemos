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
MY3D.addGuiParams = function(_folder, _params){
  for(var key in _params){
    var param = _params[key];
    var max = 10.0;
    if(param>=1)  max = 100*param;

    if( typeof(param) === 'object') {
      var subFolder = _folder.addFolder(key);
      MY3D.addGuiParams(subFolder, param);
    }
    else if(param>0xffff) {
      _folder.addColor( _params, key, );
    }
    else _folder.add( _params, key, 0.0,max).onChange(onGuiChange);
  }
}
function onGuiChange(){
  //init();  
}



/*** PARTICLE Shaders ***/
const MAX_LIGHTS_SHADER = 32;
var vShaderRain, fShaderRain;
{
  vShaderRain = `
    attribute vec3 color;
    varying vec3 vColor;
    attribute float texIndex;
    varying float fTexIndex;
    uniform float time;
    uniform float pointSize;
    uniform float speed;
    struct lightMesh
    {
      vec3 pos;
      vec3 color;
      //sampler2D emissiveMap;
    };
    uniform lightMesh lightMeshes[`+MAX_LIGHTS_SHADER+`];
    uniform vec3 camPos;
    void main() {
      vColor = color;
      vec3 tmpPos = position;
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


function initGpuParticlesSky(bNormalize, pointNb, size, pointSize, _col, _colA){
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
    speed: {value:0.02},
    alpha: {value:0.9},
    pointSize: {value:pointSize},
    pointRatio: {value:1.0},
    pointTexture: {value: null},
  };
  //shaderUniformList.push( newShaderUniforms );
  var shaderMaterialSky = new THREE.ShaderMaterial( {
    uniforms: newShaderUniforms,
    vertexShader: vShaderSky,
    fragmentShader: fShaderSky,
    transparent:true,
    //alphaTest: 0.9,
    blending: THREE.AdditiveBlending,
    //depthTest: true,
    depthWrite: false,
  } );
  
  var particles = new THREE.Points( geometry, shaderMaterialSky );
  //scene.add( particles );
  return particles;
}





// export default MY3D;
