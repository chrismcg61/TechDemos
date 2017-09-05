var MyJsLib = {};


MyJsLib.myDetectBrowser = function (log)
{
  const errStrFirefox = "is undefined";
  const errStrChrome = "Cannot read";
  var result = "";
  
  try {
    //adddlert("Welcome guest!");
    var browserVar;
    browserVar = browserVar.undefProperty;
  }
  catch(err) {
    result = err.message;
    if(log) console.log(result);

    if(result.search( errStrFirefox ) !== -1)
    {
      result = "FIREFOX";
    }
    else if(result.search( errStrChrome ) !== -1)
    {
      result = "CHROME";
    }
    //else result = "OTHER";
  }
  
  return result;  
}
