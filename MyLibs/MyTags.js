var MYTAGS = {};

MYTAGS.initEditableCodeTag = function (codeTag)
{
	hljs.highlightBlock(codeTag);	
	codeTag.onmouseenter = function(){ hljs.highlightBlock(codeTag); };
	codeTag.onkeypress = function(e){ 
		var keycode = e.keyCode || e.which;
		console.log( "keycode = ", keycode ); 
		if(27 == keycode) hljs.highlightBlock(codeTag); // "Esc"
	};
}
