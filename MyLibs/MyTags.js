var MYTAGS = {};

MYTAGS.initEditableCodeTag = function (codeTag, languageClass)
{
	//Generic styles:
	codeTag.style.borderStyle = "solid";
	codeTag.style.overflowY = "scroll";
	codeTag.style.paddingTop = "0px";
	codeTag.style.paddingBottom = "0px";
	codeTag.className = languageClass;
	codeTag.contentEditable = true;
	//Default styles:	
	codeTag.style.height = "200px";	
	
	hljs.highlightBlock(codeTag);	
	
	codeTag.onmouseenter = function(){ hljs.highlightBlock(codeTag); };
	codeTag.onkeypress = function(e){ 
		var keycode = e.keyCode || e.which;
		console.log( "keycode = ", keycode ); 
		if(27 == keycode) hljs.highlightBlock(codeTag); // "Esc"
	};
}
