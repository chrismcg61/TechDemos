var FileManager = {};

//////////////////////////////////////////////////////////////////
//FILE SELECTOR:
FileManager.fileSelector = document.createElement('input');
FileManager.fileSelector.type = "file";
FileManager.fileSelector.style.display = 'none';

FileManager.fileSelector.onchange = function(){ 
  readFile_DataUrl( FileManager.fileSelector.files[0], FileManager.onFileLoaded );
};	

FileManager.onFileLoaded = function( dataURL ){	
  alert("File Loaded - ReDefine Func : 'FileManager.onFileLoaded( dataURL )' ");
}





//////////////////////////////////////////////////////////////////
//FILE READERS:
function dataURItoBlob(dataURI) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	var byteString = atob(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);

	// create a view into the buffer
	var ia = new Uint8Array(ab);

	// set the bytes of the buffer to the correct values
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob, and you're done
	var blob = new Blob([ab], {type: mimeString});
	return blob;

}

function readFile_DataUrl(selectedFile, callback)
{
	var readerURL = new FileReader(); 
	readerURL.onload = 
		function (ev) {
			var dataURL = readerURL.result; 			
			//localStorage.setItem("savedDataUrl", dataURL);
			callback(dataURL);
		}
	readerURL.readAsDataURL(selectedFile);
}

function readFile_ArrayBuffer(selectedFile, callback)
{
	var reader_ArrayBuf = new FileReader(); 
	reader_ArrayBuf.onload = 
		function (ev) {
			var arrayBuf = reader_ArrayBuf.result; 			
			//localStorage.setItem("savedDataUrl", dataURL);
			callback(arrayBuf);
		}
	reader_ArrayBuf.readAsArrayBuffer(selectedFile);
}


function readFile_ArrayBuffer_FromURL(url, callback)
{
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'blob';
	request.onload = function() {
		var reader = new FileReader();
		reader.onload =  function(e){
			callback(e.target.result);
		};
		reader.readAsArrayBuffer(request.response);
	};
	request.send();
}


