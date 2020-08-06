const PARTICLES_SPEED = 0.03;
const PARTICLES_AREA = 1.5;
var pVars = { 
  // speedX: 0.002, speedY: 0.002, speedZ: 0.002,    ticks:60,  width:7,
  loop:true, depthTest:false,
  nb:500,  size:0.5, maxSize:90.0, alpha:1.0,  addPartSys:addPartSys, 
  mainColor:{rgb:0x552266,a:0.5},
  area:{x:PARTICLES_AREA,y:PARTICLES_AREA,z:PARTICLES_AREA},
  // updatePartSys:updatePartSys 
};
var pDynVars = {
  ticks:90,
  speed:{ Xmin:-PARTICLES_SPEED,Xmax:PARTICLES_SPEED, Ymin:-PARTICLES_SPEED,Ymax:PARTICLES_SPEED, Zmin:-PARTICLES_SPEED,Zmax:PARTICLES_SPEED, },
};
//
var PARTSYS_I = 0;
var partFolder, partDynFolder, objsFolder, sceneFolder;
var partSysList = [];
//
function rand(){ return Math.random() };
function randCol(r){ return r+rand()*pVars.mainColor.a };
function randSpeed(min,max){ return min + rand()*(max-min) };
function randTick(){ return (rand())*pDynVars.ticks };
function randPos(x){ return rand()*x - x/2 };

/*** INIT SHADERS ***/
var partVShader, partFShader;
initPartShaders();
function initPartShaders(){
  partVShader = `
    uniform float maxSize;
    attribute float size;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = size * ( 300.0 / -mvPosition.z );
      gl_PointSize = min(gl_PointSize, maxSize);
      //
      gl_Position = projectionMatrix * mvPosition;
    }
  `;
  partFShader = `
    uniform sampler2D pointTexture;
    uniform float alpha;
    varying vec3 vColor;
    void main() {
      gl_FragColor = vec4( vColor, alpha );
      gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
    }
  `;
}


/*** INIT PARTSYS MGR ***/
setTimeout( initPartSys ,  1);
function initPartSys(){
  if(typeof(addGuiFolder) !== 'undefined'){
    partFolder = addGuiFolder(gui, "PARTICLE VARS", pVars, 1);
    partDynFolder = addGuiFolder(gui, "PARTICLE DYN_VARS", pDynVars, 1);
    objsFolder = gui.addFolder("OBJS");
  }  
}
/***  ***/

/*** INIT SCENE PARTSYS MGR ***/
function initPartSys_Scene(){
  partSysList = [];
  sceneFolder = objsFolder.addFolder("SCENE"+PARTSYS_I);
  PARTSYS_I++;
}
/***  ***/

/*** ADD PARTICLE SYSTEM ***/
function addPartSys(){
  // pN = vars.nb;   // pW = vars.width;  
  // const r0 = 0.1;  
  var vertices = [];
  var partColors = [];  
  var partSizes = [];
  
  var speeds = [];
  var ticks = [];  
  
  for ( var i = 0; i < pVars.nb; i ++ ) {
    var color = new THREE.Color(pVars.mainColor.rgb);
    vertices.push( randPos(pVars.area.x), randPos(pVars.area.y), randPos(pVars.area.z) );    
    partColors.push( randCol(color.r), randCol(color.g), randCol(color.b) );    
    partSizes.push(pVars.size);
    
    var tick = {cur:0, max:randTick() };  //
    ticks.push(tick);
    speeds.push( 
      randSpeed(pDynVars.speed.Xmin, pDynVars.speed.Xmax), 
      randSpeed(pDynVars.speed.Ymin, pDynVars.speed.Ymax),
      randSpeed(pDynVars.speed.Zmin, pDynVars.speed.Zmax),
    );      
  }
  
  var partGeometry = new THREE.BufferGeometry();
  partGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
  partGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( partColors, 3 ) );
  partGeometry.addAttribute( 'size', new THREE.Float32BufferAttribute( partSizes, 1 ) );

  var uniforms = { 
    pointTexture: {value: new THREE.TextureLoader().load( "https://cdn.rawgit.com/mrdoob/three.js/r97/examples/textures/sprites/spark1.png" ) },
    maxSize: {value:pVars.maxSize},
    alpha: {value:pVars.alpha},
  };
  var shaderMaterial = new THREE.ShaderMaterial( {
    vertexColors: true,
    uniforms: uniforms,
    vertexShader: partVShader,
    fragmentShader: partFShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: pVars.depthTest,
    opacity:pVars.alpha,
    alphaTest:0.1,    
  } );  
  // var pointsMaterial = new THREE.PointsMaterial({vertexColors:true, transparent:true, opacity:pVars.alpha, size:vars.size, });
  
  var partSys = new THREE.Points( partGeometry, shaderMaterial );
  partSys.dynVars = { speeds:speeds,  ticks:ticks, };
  partSys.dynGVars = {
    loop:pVars.loop, 
    size:pVars.size, 
    area:{x:pVars.area.x, y:pVars.area.y, z:pVars.area.z},
  };
  scene.add( partSys );
  partSysList.push( partSys );
  
  addGuiFolder(sceneFolder, "PART_SYS#"+partSysList.length, partSys.dynGVars, 0);
}
/***  ***/


/*** UPDATE ALL PARTICLE SYSTEMS ***/
function updatePartSys(){
  for (j=0; j<partSysList.length; j++ ) {
    var partSys = partSysList[j];
    var sizes = partSys.geometry.attributes.size.array;
    for ( var i = 0; i < sizes.length; i+=1 ) {
      var ii = i*3;      
      var tick = partSys.dynVars.ticks[i];
      var halfTick = tick.max/2;
      tick.cur++;
      //
      partSys.geometry.attributes.position.array[ii] += partSys.dynVars.speeds[ii]; 
      partSys.geometry.attributes.position.array[ii+1] += partSys.dynVars.speeds[ii+1];
      partSys.geometry.attributes.position.array[ii+2] += partSys.dynVars.speeds[ii+2]; 
      //
      if(tick.cur > tick.max) 
      {        
        if(partSys.dynGVars.loop){
          tick.cur = 0;        
          partSys.geometry.attributes.position.array[ii] = randPos(partSys.dynGVars.area.x);
          partSys.geometry.attributes.position.array[ii+1] = randPos(partSys.dynGVars.area.y);
          partSys.geometry.attributes.position.array[ii+2] = randPos(partSys.dynGVars.area.z);
        }
        else{
          sizes[i] = 0;  // partSys.geometry.attributes.position.array[ii] = 0;          
        }        
      }      
      
      if(tick.cur < halfTick) sizes[i] = partSys.dynGVars.size * tick.cur/halfTick;
      else sizes[i] = partSys.dynGVars.size * (tick.max-tick.cur)/halfTick;
    }
    
    partSys.geometry.attributes.color.needsUpdate = true;
    partSys.geometry.attributes.position.needsUpdate = true;
    partSys.geometry.attributes.size.needsUpdate = true;
  }   
}
/***  ***/
