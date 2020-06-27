var tVars = { 
  autoUpdate:true, deltaT:40,
  textScale:0.11,
  refreshTextures:refreshTextures,  
};
var texFolder; // = addGuiFolder(gui, "Textures", tVars, 1);
setTimeout( function(){ texFolder = addGuiFolder(gui, "Textures", tVars, 1); } ,  1);
//
var texObjs = [];

/*** New Texture INIT ***/
function addTexture(w,h, a) {
  var texCanvas = document.createElement( 'canvas' );
  texCanvas.width = w; 
  texCanvas.height = h;   
  var texture = new THREE.Texture( texCanvas );
  texture.anisotropy = a;

  var texObj = {texture:texture, canvas:texCanvas};
  texObjs.push(texObj);
  return texObj;
}

/*** Default Texture Draw ***/
function refreshTexture(id) {   
  var texture = texObjs[id].texture;  
  var texCanvas = texObjs[id].canvas; 
  var ctx = texCanvas.getContext( '2d' );
  
  ctx.clearRect( 0, 0, texCanvas.width, texCanvas.height ); 
  
  ctx.fillStyle = 'rgb(50,255,255)';
  ctx.fillRect( 0, 0, texCanvas.width, texCanvas.height );  
  
  var tt = 0.5 + 0.5*Math.cos(Date.now()*0.001);
  ctx.fillStyle = 'rgb(255,50,0)';
  ctx.fillRect( tt*texCanvas.width, texCanvas.height*0.6,  texCanvas.width, texCanvas.height );
  
  //Text:
  ctx.font = "bold "+ (texCanvas.width*tVars.textScale) +"px Verdana";
  ctx.textAlign = "center";
  ctx.fillText("TEXTURE"+(id), texCanvas.width/2, texCanvas.height/2);

  //UPDATE ASSOCIATED TEXTURE:
  texture.needsUpdate = true;
}

/*** Default Refresh of ALL Textures ***/
function refreshTextures() {   
  for (i=0; i<texObjs.length; i++) {     
    refreshTexture(i);
  }  
  
  if(tVars.autoUpdate) setTimeout(refreshTextures , tVars.deltaT);
}
