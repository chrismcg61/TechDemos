var MyWebAudio = {};

var audioContext = new (window.AudioContext || window.webKitAudioContext)();

MyWebAudio.onAudioFileLoaded = function( arrayBuf, callback ){	
	audioContext.decodeAudioData( 
  		arrayBuf, 
  		function(decodedAudioBuffer){ MyWebAudio.onAudioDecoded( decodedAudioBuffer, callback ); }
  	);
}
MyWebAudio.onAudioDecoded = function(decodedAudioBuffer, callback) {
  callback(decodedAudioBuffer);
}



function playDecodedBuffer(source, decodedAudioBuffer, startTime, detune, log) {
	// Clear any existing audio source that we might be using:
	if (source != null) {
		source.disconnect(audioContext.destination);
		source = null; // Leave existing source to garbage collection
	} 
	
	// Recreate Buffer EVERY time you play a source with WebAudio API:
	source = audioContext.createBufferSource();
	source.buffer = decodedAudioBuffer; 
	source.connect(audioContext.destination); 	
	source.start( startTime );
  
  	source.detune.value = detune * 100;		//pitch alteration (1 semitone avery 100 units, 12 semitones max up & down)
  
	if(log)
	{
		console.log("source = ", source );
		console.log("decodedAudioBuffer = ", decodedAudioBuffer );
	}
	
  	return source;
}
