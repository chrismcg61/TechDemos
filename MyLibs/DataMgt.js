var BAR_FONTSIZE = "80%";
var BAR_COLOR_OFFSET = 250;
//
var BAR_TXT = "░"; // "▌";
var BAR_OFFSET = 20;
var BAR_FACTOR = 2.5;
// var BAR_COL = "rgba(255,0,0, 0.99)";
var TAG_BG_COL = "rgba(150,150,150, 0.5)";
var TAG_SEPARATOR = "&nbsp●&nbsp";
var TAG_TITLE_FONTW = "bold";
var DIV_BTN_OFF = "▼";
var DIV_BTN_ON = "►";
// var DIV_BTN_COL = "rgba(255,0,0, 0.5)";
var DIV_BTN_CLASS = "spanBtn";
//
var SUBDIV_OPACITY = 1;
var SUBDIV_FONT_SIZE = "85%";
var DIV_MARGIN_TOP = "4px";
var HIDDEN_DIV_MARGIN_L = "8px";
var HIDDEN_DIV_BORDER_L = "2px dotted blue";
//
var REGION_FONT_SIZE = "70%";
var DATE2_FONT_SIZE = "75%";
var DATE_MARGIN = "0.3em";
var DATE_BG_COL = "rgb(200,200,200)";
var ALPHA_TEXT_COL = "rgba(255,255,255, 0.8)";
//var MAX_DURATION = 8;
//var MIN_DURATION = MAX_DURATION/2;
//
var START_DATE = 1999.0;
//
function getDate(_durationQ){
  var start = START_DATE;
  START_DATE += _durationQ*0.25;
  return {start:start,duration:_durationQ};  
}
//
function small(_txt){
  return "<small><i>"+_txt+"</i></small>"  
}
//
function addTableTag(_table, _tag, _obj){
  _table[_tag] = _obj;  
  _table.push( _obj );
}
//
function getAge(_startT){
  var now = Date.now();
  const msPerY = 365*24*60*60*1000;
  var now_Y = 1970 + now/msPerY;
  return Math.floor(now_Y - _startT);  
}
//
function addElt(_tag, _parent, _txt){
  var newDiv = document.createElement(_tag);
  newDiv.innerHTML = _txt;
  _parent.appendChild(newDiv); 
  //
  return newDiv;
}
//
function getMissionsByType(_type, _subDivs){
  var newDivList = [];
  for ( var i=_subDivs.length-1; i>=0; i-- ) {
    var subDiv = _subDivs[i];
    if(subDiv.type == _type){
      newDivList.push( subDiv );      
    }
  }  
  return newDivList;
}


/*** Display Data from Obj (Recursive) ***/
function displayData(_data, _parent, _lvl){
  var subDivs = _data.subDivs;
  if(subDivs){
    for ( var i=0; i<subDivs.length; i++ ) {
      var subDiv = subDivs[i];
      var btnSpan;
      if(subDiv.hidden) {
        btnSpan = addElt("SPAN", _parent, DIV_BTN_OFF);
        btnSpan.classList.add( DIV_BTN_CLASS ); 
		if(subDiv.expandPrio) btnSpan.expandPrio = subDiv.expandPrio;
      }
      var newSubDiv = addElt("DIV", _parent, "");
      newSubDiv.style.marginTop = DIV_MARGIN_TOP;
      if(subDiv.hidden) {
        newSubDiv.style.display = "none";
        newSubDiv.style.marginLeft = HIDDEN_DIV_MARGIN_L;
        newSubDiv.style.paddingLeft = "4px"; 
        newSubDiv.style.borderLeft = HIDDEN_DIV_BORDER_L;
        btnSpan.onclick = function(){ 
          if(newSubDiv.style.display == "none") {
            newSubDiv.style.display = "block";
            btnSpan.innerHTML = DIV_BTN_ON;
          } 
          else {
            newSubDiv.style.display = "none";
            btnSpan.innerHTML = DIV_BTN_OFF;
          }
        };
      }
      //
      var classes = subDiv.classes;
      if(classes){
        for ( var j=0; j<classes.length; j++ ) {
          newSubDiv.classList.add(classes[j]); 
        }      
      }
      else newSubDiv.style.fontSize = SUBDIV_FONT_SIZE;
      if(SUBDIV_OPACITY<1) newSubDiv.style.opacity = SUBDIV_OPACITY;
      //
      if(subDiv.title) {
        var newTitleDiv = addElt("DIV", newSubDiv, subDiv.title.txt);
        if(subDiv.title.classes){
          for ( var j=0; j<subDiv.title.classes.length; j++ ) {
            newTitleDiv.classList.add(subDiv.title.classes[j]); 
          }      
        }
      }
      //
      if(subDiv.dates){
        var dates = subDiv.dates;
        var startY = Math.floor(dates.start);
        var startQ = 1+(dates.start-startY)*4;
        var startQ_Str = "Q"+startQ;
        //
        var endDate = dates.start+dates.duration*0.25;
        var endY = Math.floor(endDate);
        var endQ = 1+(endDate-endY)*4;
        var endQ_Str = "Q"+endQ;
        //
        var dateStr = startY+small(startQ_Str);
        var dateSpan = addElt("SPAN", newSubDiv, dateStr);
        dateSpan.style.marginRight = DATE_MARGIN; //"8px";
		//
		var totalW = 1.7; // 50;
		var maxQ = 10;
		var durationStr = "";
		durationStr += dates.duration + small("Q");
		var durationSpan1 = addElt("SPAN", newSubDiv, durationStr);
		durationSpan1.style.color = ALPHA_TEXT_COL;
		// durationSpan1.style.fontSize = "90%";	
		//durationSpan1.style.opacity = dates.duration/8;	
		durationSpan1.style.display = "inline-block";
		durationSpan1.style.width = (totalW*dates.duration/maxQ)+"em"; //"px";
        durationSpan1.style.backgroundColor = DATE_BG_COL;
		//
		var durationSpan2 = addElt("SPAN", newSubDiv, "&nbsp");
		durationSpan2.style.display = "inline-block";
        durationSpan2.style.width = (totalW*(maxQ-dates.duration)/maxQ)+"em";
		durationSpan2.style.backgroundColor = "rgba(150,150,150, 0.5)";
		//durationSpan2.style.marginRight = DATE_MARGIN;
		//
		//
		var endDateStr =  endY+small(endQ_Str);
		var dateSpan2 = addElt("SPAN", newSubDiv, endDateStr);
		dateSpan2.style.marginRight = DATE_MARGIN;
		dateSpan2.style.fontSize = DATE2_FONT_SIZE;
		dateSpan2.style.opacity = 0.4;
      }
	  //
	  if(subDiv.region){
		  var regionTxt = subDiv.region;  //"["+subDiv.region+"] ";
		  var regionSpan = addElt("SPAN", newSubDiv, regionTxt);
		  regionSpan.style.marginRight = DATE_MARGIN;
		  regionSpan.style.color = ALPHA_TEXT_COL;
		  regionSpan.style.fontSize = REGION_FONT_SIZE;		  
		  regionSpan.style.display = "inline-block";
		  regionSpan.style.width = "7em";
		  regionSpan.style.textAlign = "center";
		  regionSpan.style.backgroundColor = DATE_BG_COL;
	  }
      //
      var tagDiv = subDiv.tagDiv;
      if(tagDiv){
        var tags = tagDiv.tags;
        if(tagDiv.title) {
          var tagTitle = addElt("SPAN", newSubDiv, tagDiv.title);
          tagTitle.style.fontWeight = TAG_TITLE_FONTW;
        }
        for ( var j=0; j<tags.length; j++ ) {
          var tag = tags[j];      
          if(j>0) addElt("SPAN", newSubDiv, TAG_SEPARATOR);
          var newSpan = addElt("SPAN", newSubDiv, tag);
          newSpan.style.backgroundColor = TAG_BG_COL;
        }
      }
	  //
	  var url = subDiv.url;
	  if(url){
		  var urlChar = "";
		  if(url[4]=="s") urlChar="i";  // Real "https" or Fake "http"?
		  var urlTag = addElt("A", newSubDiv, urlChar);		
		  urlTag.href = url;
		  urlTag.target = "_blank";		  
	  }
      //
      if(subDiv.rating){
        var spanContainer = addElt("SPAN", newSubDiv, "");
        spanContainer.style.position = "relative";
        spanContainer.style.float = "right";
        var newSpan = addElt("SPAN", spanContainer, BAR_TXT);
        newSpan.style.display = "inline-block";
        newSpan.style.width = BAR_FACTOR*(subDiv.rating-BAR_OFFSET)+"px";
        newSpan.style.backgroundColor = "rgba(255,"+(-BAR_COLOR_OFFSET+_lvl*70)+",0, 0.99)"; //BAR_COL;
        newSpan.style.marginLeft = "8px";
		    newSpan.style.fontSize = BAR_FONTSIZE;
        newSpan.classList.add( "tooltipBtn" ); 
        var tooltip = addElt("DIV", spanContainer, subDiv.rating+"%");
        tooltip.classList.add( "centered" ); 
        tooltip.classList.add( "tooltip" ); 
      }
      //
      displayData(subDiv, newSubDiv, _lvl+1);
    }
  }
}
