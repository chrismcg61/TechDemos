////////////////////////////////////////////////////////////////
var gui, folder1,folder2;
function initGUI( ) {
  gui = new dat.GUI();
  gui.open();  
  
  if (typeof gVars !== 'undefined') {
    folder1 = addGuiFolder(gui, "GLOBAL_VARS", gVars, 1);    
  }
  if (typeof vars !== 'undefined') {
    folder2 = addGuiFolder(gui, "MAIN_VARS", vars, 1);    
  }   
}
//////////////////////////////////////////////////////////////
function addGuiVar(folder, vars, key){
  var param = vars[key];
  if( typeof(param) === 'object'){
    var subFolder = folder.addFolder(key);
    if(param["rgb"]){
      subFolder.addColor( param, "rgb");  
      subFolder.add( param, "a");      
    }
    else{
      for(var key2 in param){
        addGuiVar(subFolder, param, key2);
      } 
    }      
  }
  else folder.add( vars, key);  
}
//////////////////////////////////////////////////////////////
function addGuiFolder(parentFolder, name, vars, open){
  var newfolder = parentFolder.addFolder(name);
  if(open) newfolder.open();
  for(var key in vars){
    addGuiVar(newfolder, vars, key);
  } 
  return newfolder;
}
//////////////////////////////////////////////////////////////
