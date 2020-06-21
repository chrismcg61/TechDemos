////////////////////////////////////////////////////////////////
var gui, folder0;
function initGUI( ) {
  gui = new dat.GUI();
  gui.open();  
  
  folder0 = gui.addFolder("Main Vars");
  folder0.open();
  for(var key in vars){
    folder0.add( vars, key);    
  } 
}
//////////////////////////////////////////////////////////////
