function particleSystemInit( particlesNb, posConfig, matConfig) {
	var areaSize = posConfig.areaSize;
	var speed = posConfig.speed;

	var color = matConfig.color;
	var colSpeed = matConfig.speed;
	var size = matConfig.size;
	var alpha = matConfig.alpha;

	geometry = new THREE.Geometry();

	for (var i = 0; i < particlesNb; i ++ ) 
	{
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * areaSize.x - areaSize.x/2;
		vertex.y = Math.random() * areaSize.y - areaSize.y/2;
		vertex.z = Math.random() * areaSize.z - areaSize.z/2;
		
		vertex.speed = new THREE.Vector3(
			speed.min.x + (Math.random() ) * (speed.max.x - speed.min.x), 
			speed.min.y + (Math.random() ) * (speed.max.y - speed.min.y), 
			speed.min.z + (Math.random() ) * (speed.max.z - speed.min.z)
		);

		geometry.vertices.push( vertex );
		
		var newColor = new THREE.Color();
		newColor.setHSL( 
			color.min.x + Math.random() * (color.max.x - color.min.x), 
			0.5,	0.5	); 
		newColor.speed = new THREE.Vector3(
			colSpeed.min.x + (Math.random() ) * (colSpeed.max.x - colSpeed.min.x), 
			colSpeed.min.y + (Math.random() ) * (colSpeed.max.y - colSpeed.min.y), 
			colSpeed.min.z + (Math.random() ) * (colSpeed.max.z - colSpeed.min.z)
		);
		geometry.colors.push( newColor );
	}
  
	var material = new THREE.PointsMaterial( { 
	size: size.min + Math.random() * (size.max - size.min) } );
	material.transparent = true;
	material.opacity = alpha;
	material.vertexColors = THREE.VertexColors;

	var particleSystem = new THREE.Points( geometry, material );

	scene.add(particleSystem);
	myParticleSystems.push(particleSystem);
	particleSystem.posConfig = posConfig;
	particleSystem.matConfig = matConfig;

	return particleSystem;
}

function animParticles(particleSystems, ambientOn) {

  var slowTime = now * 0.00001;
  var correctDelta = deltaT / 33;	

  for (var i = 0; i < particleSystems.length; i ++ ) 
  {
    //var object = scene.children[ i ];
    //if ( particleSystem instanceof THREE.Points ) 
    var particleSystem = particleSystems[ i ];		
    if(!particleSystem.visible) continue;

    var posConfig = particleSystem.posConfig;
    var matConfig = particleSystem.matConfig;

    var areaSize = posConfig.areaSize;
    var speed = posConfig.speed;

    var color = matConfig.color;
    var colSpeed = matConfig.speed;
    var size = matConfig.size;
    var alpha = matConfig.alpha;

    {
      //object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );			
      var geom = particleSystem.geometry;
      //console.log(vertices);
      for ( v = 0; v < geom.vertices.length; v ++ ) {  
        var saveVertice = geom.vertices[v].clone();
        //var moveFactor =  Math.sin( time*20 );
        geom.vertices[v].x += geom.vertices[v].speed.x * correctDelta; // * moveFactor;	
        geom.vertices[v].y += geom.vertices[v].speed.y * correctDelta;
        geom.vertices[v].z += geom.vertices[v].speed.z * correctDelta;

        if(Math.abs( geom.vertices[v].x ) > areaSize.x/2) 
          geom.vertices[v].x  = saveVertice.x * (-1);
        if(Math.abs( geom.vertices[v].y ) > areaSize.y/2) 
          geom.vertices[v].y  = saveVertice.y * (-1);
        if(Math.abs( geom.vertices[v].z ) > areaSize.z/2) 
          geom.vertices[v].z  = saveVertice.z * (-1);


        var hslColor = geom.colors[v].getHSL();
        var h = hslColor.h + (deltaT * geom.colors[v].speed.x);
        var s = hslColor.s + (deltaT * geom.colors[v].speed.y);
        var l = hslColor.l + (deltaT * geom.colors[v].speed.z);

        if(h > color.max.x) h = color.min.x;
        if(s > color.max.y) s = color.min.y;
        if(l > color.max.z) l = color.min.z;

        geom.colors[v].setHSL( h, s, l ); 
      }

      geom.colorsNeedUpdate = true;
      geom.verticesNeedUpdate = true;

      particleSystem.material.opacity = alpha;
    }
  }
  
  if(ambientOn)
  {
	rainParticleSystem.position.copy(camera.position);
	dustParticleSystem.position.copy(camera.position);
  }
}
