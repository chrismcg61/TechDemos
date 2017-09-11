
var MyCanvasLib = {};
MyCanvasLib.writeText = function (canvas, text)
{
  var ctx = canvas.getContext("2d");
  ctx.font = '46pt Monospace';
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width/2 , canvas.height/2);
}
MyCanvasLib.drawShapes = function (canvas, shapes)
{
  var ctx = canvas.getContext("2d");  
  for(var i=0; i<shapes.length; i++)
  {
    var size = shapes[i].size;
    ctx.fillStyle = 'rgba('+
      shapes[i].color.r+','+
      shapes[i].color.g+','+
      shapes[i].color.b+','+
      shapes[i].color.a+')';
    ctx.fillRect(
      shapes[i].x - size.x/2, 
      shapes[i].y - size.y/2, 
      size.x, size.y);
  }
}
MyCanvasLib.drawImg = function (canvas, img)
{
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);    
}
MyCanvasLib.contrastor = function (color, contrastFactor){
  return 128 + (color - 128) * contrastFactor;
}
MyCanvasLib.constrainPos = function ( pos, maxPos, size){
  if(pos.x + size.x > maxPos.x) pos.x = maxPos.x - size.x;
  if(pos.y + size.y > maxPos.y) pos.y = maxPos.y - size.y;
  
  if(pos.x < 0) pos.x = 0;
  //if(pos.x > maxPos.x) pos.x = maxPos.x;
  if(pos.y < 0) pos.y = 0;
  //if(pos.y > maxPos.y) pos.y = maxPos.y;  
  
  //return {pos:pos, size:size};
}
MyCanvasLib.setColorFilter = function (canvas, canvasBack, pos, size,
constrast, gammaOffset, colorIntensity, alpha)
{
  //console.log(pos, size);
  
  var ctxB = canvasBack.getContext("2d");
  var imgData = ctxB.getImageData(0, 0, canvasBack.width, canvasBack.height);
  //var imgData = ctx.createImageData(100, 100);
  //const startIndex = (pos.x+pos.y*canvasBack.width)*4;
  //const maxIndex = Math.min( imgData.data.length, startIndex + (size.x+size.y*canvasBack.width)*4);
  //for (var i = startIndex; i < maxIndex; i += 4) 
  //if(  i%(canvasBack.width*4) < pos.x*4 || i%(canvasBack.width*4) > (pos.x+size.x)*4 ) continue;
  //console.log((pos.x + pos.y*canvasBack.width)*4);
  var correctPos = {};
  correctPos.x = Math.floor( pos.x - size.x/2 );
  correctPos.y = Math.floor( pos.y - size.y/2 );
  //var correctPos = 
  MyCanvasLib.constrainPos( 
    correctPos, 
    {x:canvasBack.width, y:canvasBack.height},
    size
  );
  for (var x = correctPos.x; x < correctPos.x + size.x; x++){
    for (var y = correctPos.y; y < correctPos.y + size.y; y++){
      var i = (x + y*canvasBack.width)*4;
      //if(i<0 || i>imgData.data.length) continue;
    
      var r = imgData.data[i+0];
      var g = imgData.data[i+1];
      var b = imgData.data[i+2];
      var brightness = (r+g+b) / 3;
    
      r = brightness*(1-colorIntensity) + r*colorIntensity + gammaOffset;
      g = brightness*(1-colorIntensity) + g*colorIntensity + gammaOffset;
      b = brightness*(1-colorIntensity) + b*colorIntensity + gammaOffset;
    
      imgData.data[i+0] = MyCanvasLib.contrastor(r, constrast);
      imgData.data[i+1] = MyCanvasLib.contrastor(g, constrast);
      imgData.data[i+2] = MyCanvasLib.contrastor(b, constrast);
    
      imgData.data[i+3] = alpha;
    }
  }

  var ctx = canvas.getContext("2d");
  ctx.putImageData(imgData, 0, 0);
}


MyCanvasLib.getColorAnalysis = function (canvas, pos, size, nb)
{
  var ctx = canvas.getContext("2d");
  var correctPos = {};
  correctPos.x = Math.floor( pos.x - size.x/2 );
  correctPos.y = Math.floor( pos.y - size.y/2 );
  
  //var correctPos = 
  MyCanvasLib.constrainPos( correctPos, {x:canvas.width, y:canvas.height}, size);
  
  var imgData = ctx.getImageData(correctPos.x, correctPos.y, size.x, size.y);
  
  var res = {};
  res.brightness = {};  
  res.brightness.avg = {};
  res.brightness.variance = {};
  //var avgBrightness = {};
  res.brightness.avg.value = 0;
  res.brightness.variance.value = 0;
  
  res.brightness.avg.subValues = [];
  res.brightness.variance.subValues = [];
  //for (var i = 0; i < imgData.data.length; i += 4){
  var avgIndex = 0;
  var sizeX = Math.floor( size.x/nb.x );
  var sizeY = Math.floor( size.y/nb.y );
  
  for (var ny = 0; ny < nb.y; ny++)  
  {
    for (var nx = 0; nx < nb.x; nx++)
    {
      //avgBrightness = 0;
      var subAvgIndex = 0;
      var subAvgBrightness = 0;
      var variance = 0;
      var resVals = [subAvgBrightness, variance];
      
      for (var mode = 0; mode < resVals.length; mode++){
        
        for (var x = nx*sizeX; x < (nx+1)*sizeX; x++){
          for (var y = ny*sizeY; y < (ny+1)*sizeY; y++){
            var i = (x + y*size.x)*4;
            //var i = (pos.x + pos.y*size.x)*4;
            var r = imgData.data[i+0];
            var g = imgData.data[i+1];
            var b = imgData.data[i+2];

            var brightness = (r+g+b) / 3;
            
            var inVals = [brightness,  Math.pow( resVals[0] - brightness,  2 )];

            //if(mode == 0) subAvgBrightness = (subAvgBrightness*subAvgIndex + brightness) / (subAvgIndex+1);            
            resVals[mode] = (resVals[mode]*subAvgIndex + inVals[mode]) / (subAvgIndex+1);

            subAvgIndex++;
          }
        }
        
      }
      res.brightness.avg.subValues.push(resVals[0]);
      res.brightness.variance.subValues.push(resVals[1]); // Math.sqrt(resVals[1]) );
      
      res.brightness.avg.value = (res.brightness.avg.value*avgIndex + resVals[0]) / (avgIndex+1)
      res.brightness.variance.value = (res.brightness.variance.value*avgIndex + resVals[1]) / (avgIndex+1)
      avgIndex++;
    }
  }  
  
  return res;  //{brightness: {avg: avgBrightness} };
}


MyCanvasLib.onmousedown = function(e, callback, canvas) {
  var mouseX = e.clientX;
  var mouseY = e.clientY;
  
  var rect = canvas.getBoundingClientRect();
  mouseX -= rect.left;
  mouseY -= rect.top;
  
  //console.log(e);
  //console.log(mouseX, mouseY);
  callback(e, Math.floor(mouseX), Math.floor(mouseY) );
}

