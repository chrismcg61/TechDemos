/////////////////////////////////////
// USER VARS :
/////////////////////////////////////
var staticParamFolders = { };
var dynParamFolders = { };
var hiddenParamFolders = { };


/////////////////////////////////////
// GUI :
/////////////////////////////////////
function initGUI( updateCallback ) {    
  var gui = new dat.GUI();
  gui.open();  

  var staticFolder = gui.addFolder("Static Params");
  staticFolder.open();  
  //for ( var i = 0; i < staticParamFolders.length; i ++ ) {  
  for(var folderKey in staticParamFolders){
    var newFolder = staticFolder.addFolder(staticParamFolders[folderKey].Title);
    if(staticParamFolders[folderKey].Open) newFolder.open();
    for(var key in staticParamFolders[folderKey].Params){
      newFolder.add( staticParamFolders[folderKey].Params, key);    
    } 
  }

  var dynFolder = gui.addFolder("Dynamic Params");
  dynFolder.open();  
  for(var folderKey in dynParamFolders){
    var newFolder = dynFolder.addFolder(dynParamFolders[folderKey].Title);
    newFolder.open();
    for(var key in dynParamFolders[folderKey].Params){
      newFolder.add( dynParamFolders[folderKey].Params, key).onChange( updateCallback );    
    } 
  }
  
  var hiddenFolder = gui.addFolder("Hidden Params");
  //hiddenFolder.open();  
  for(var folderKey in hiddenParamFolders){
    var newFolder = staticFolder.addFolder(hiddenParamFolders[folderKey].Title);
    //newFolder.open();
    for(var key in hiddenParamFolders[folderKey].Params){
      newFolder.add( hiddenParamFolders[folderKey].Params, key);    
    } 
  }

}

function initStats(){
  stats = new Stats();
  document.body.appendChild( stats.dom );  
}
  

/////////////////////////////////////
// 2D CANVAS LIB :
/////////////////////////////////////
var canvas, ctx;
var sceneMeshes = [];
var infoDiv;
var stats;
var mouse = {x:1, y:1};

// MESH & SCENE :
class Mesh {
  constructor() {
    this.position = {
      x: 0.0,
      y: 0.0
    };
    this.size = 0.1;
    this.color = 'rgba(255, 255, 255, 1)';
  }
}
function clearScene(  ){
  sceneMeshes = [];
}
function addToScene( newMesh ){
  sceneMeshes.push(newMesh);
}

//
function initCanvas( callback ){
  document.body.style.margin = 0;
  document.body.style.overflow = "hidden"; 

  // Info Div:
  infoDiv = document.createElement( 'div' );
  document.body.appendChild( infoDiv );
  infoDiv.style.position = "absolute";
  infoDiv.style.top = 0;
  infoDiv.style.left = "33%";
  infoDiv.style.width = "33%";
  infoDiv.style.textAlign = "center";
  infoDiv.style.color = "#ffffff";
  infoDiv.style.backgroundColor = "rgba(0,0,0, 0.8)";
  
  infoDiv.innerHTML = "2D Canvas";
  
  // CANVAS :
  canvas = document.createElement( 'canvas' );
  canvas.style.cursor = "crosshair"; 
  document.body.appendChild(canvas);
  ctx = canvas.getContext( '2d' );  

  // Window Events: 
  window.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
  onWindowResize();  
  
  //Custom Init Callback:
  callback();
}
function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;  
}

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  //console.log(mouse);
}

function initScene( callback ){
  clearScene();

  //Custom Init Callback:
  callback();  
}

function renderCanvas(){
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillRect( 0, 0, canvas.width, canvas.height );

  for ( var i = 0; i < sceneMeshes.length; i ++ ) { 
    var fullSize = sceneMeshes[i].size * canvas.height;
    var halfSize = fullSize / 2;
    
    ctx.fillStyle = sceneMeshes[i].color;
    ctx.beginPath();
    ctx.arc((canvas.width/2) + sceneMeshes[i].position.x * canvas.height,
            (canvas.height/2) + sceneMeshes[i].position.y * canvas.height,
            halfSize,
            0,2*Math.PI);
    ctx.fill();
    /*ctx.fillRect( (canvas.width/2 - halfSize) + sceneMeshes[i].position.x * canvas.height,
                 (canvas.height/2 - halfSize) + sceneMeshes[i].position.y * canvas.height,
                 fullSize,  
                 fullSize
    );  */
  }  
}

function animate( callback ){
  if(stats) stats.update();
  
  renderCanvas();
  
  callback();
  
  requestAnimationFrame( function(){ animate( callback ); } );
}





/////////////////////////////////////
// 2D VECTOR Funcs :
/////////////////////////////////////
function multScalar(v, a){
  return {x: v.x * a, y: v.y * a};
}
function addV(pos1, pos2){
  return {x: pos2.x + pos1.x, y: pos2.y + pos1.y};
}
function subV(pos1, pos2){
  return {x: pos2.x - pos1.x, y: pos2.y - pos1.y};
}
function lengthV( dirV ){
  var dist = Math.pow( (dirV.x) , 2)
           + Math.pow( (dirV.y) , 2);
  return Math.sqrt( dist );
  
}

