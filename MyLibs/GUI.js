////////////////////////////////////////////////////////////////
var gui, folder1,folder2;
function initGUI( ) {
  gui = new dat.GUI();
  gui.open();  
  
  if (typeof gVars !== 'undefined') {
    folder1 = gui.addFolder("Global Vars");
    folder1.open();
    for(var key in gVars){
      // folder1.add( gVars, key);  
      addGuiVar(folder1, gVars, key);
    }    
  }
  if (typeof vars !== 'undefined') {
    folder2 = gui.addFolder("Main Vars");
    folder2.open();
    for(var key in vars){
      // folder2.add( vars, key); 
      addGuiVar(folder2, vars, key);
    }    
  }   
}
//////////////////////////////////////////////////////////////
function addGuiVar(folder, vars, key){
  var param = vars[key];
  if( typeof(param) === 'object'){
    var subFolder = folder.addFolder(key);
    subFolder.addColor( param, "rgb");  
    subFolder.add( param, "a");  
  }
  else folder.add( vars, key);  
}
//////////////////////////////////////////////////////////////
