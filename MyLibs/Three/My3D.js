var camera, scene, renderer;

var MY3D = {};
MY3D.camFov = 50;
MY3D.camFar = 2000;

MY3D.preInit = function(THREE) {
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



function addParams(_folder, _params){
  for(var key in _params){
    var param = _params[key];
    var max = 10.0;
    if(param>=1)  max = 100*param;

    if( typeof(param) === 'object') {
      var subFolder = _folder.addFolder(key);
      addParams(subFolder, param);
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



// export default MY3D;
