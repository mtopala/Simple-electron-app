var img;
var poza = 'error';
var i=0;
var canvas;
var rot = 0;
var rSlider;
var checker = null;
var id = 1;
var DOM = {
	pencil: '#pencil',
	brushe: '#brushe',
	eraser: '#delete',
	rotate: '#refresh'
}
/*Open file*/
document.getElementById('getFile').onclick = function() {
	document.getElementById('myFile').click();
}

document.getElementById('myFile').addEventListener('change', upload, false);

function upload(myFile) {
	var file = myFile.files[0];  
   	poza = file.path;
	setup();
	i=0;
}
/*****************************************************************/
/*Save file*/
function Save() {
	if(poza != "error" ){
		save();
	}else {
		alert("Please, load image before save it!");
	}
}
  

/******************************************************************/

/*Main setup*/
function setup() {
	if(poza != "error"){
		var x = windowWidth-200;
		var y = windowHeight-150;	
		img = loadImage(poza, function(img) {
		    image(img, 0, 0);
		    if(img.width > x && img.height > y){
				img.width=(windowWidth-250);
				img.height=(windowHeight-150);
			}
			i=0;
			canvas = createCanvas(img.width, img.height);
			canvas.parent("cnv");
		  });

	}else{
		canvas= createCanvas(0, 0);
		canvas.parent("cnv");
	}
}
/**************************************************************/

/*Draw main*/
function draw() {
	
	if(poza != "error" && i == 0 ){
		background(img);
		i=1;

    }
}
/***************************************************************/

// function setGrayScale() {
// 		loadPixels();
// 		img.loadPixels();
// 	for(var y = 0; y < height; y++) {
// 	   for(var x = 0; x < width; x++) {
// 		  var index = (x + y * width) * 4;
// 		  var average = (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
	   
// 		   pixels[index] = average;
// 		   pixels[index + 1] = average;
// 		   pixels[index + 2] = average;
// 	   }
//     }
// 	 updatePixels();
	  
// }
//  function setBrightness() {
// 	var bright   =  document.getElementById('myRange_bright').value;
// 	loadPixels();
// 	img.loadPixels();
//   for(var y = 0; y < height; y++) {
//      for(var x = 0; x < width; x++) {
// 		var index = (x + y * width) * 4;
// 		pixels[index] = pixels[index]+100 < 255 ? pixels[index] + 100 : 255;
// 	    pixels[index + 1] = pixels[index+1]+100 < 255 ? pixels[index+1] + 100 : 255;
// 		pixels[index + 2] = pixels[index+2]+100 < 255 ? pixels[index+2] + 100 : 255;
// 		pixels[index + 3] = pixels[index+2]+100 < 255 ? pixels[index+3] + 100 : 255;
		
// 	    pixels[index] = pixels[index]-bright >= 0 ? pixels[index] - bright : 0;
// 	    pixels[index + 1] = pixels[index+1]-bright >= 0 ? pixels[index+1] - bright : 0;
// 		pixels[index + 2] = pixels[index+2]-bright >= 0 ? pixels[index+2] - bright : 0;
// 		pixels[index + 3] = pixels[index+3]-bright >= 0 ? pixels[index+3] - bright : 0;
//       }
//    }
//  updatePixels();
// }

// function setContrast() {
// 	var contrast =  document.getElementById('myRange_contrast').value;
// 	loadPixels();
// 	img.loadPixels();
//   for(var y = 0; y < height; y++) {
//      for(var x = 0; x < width; x++) {
// 		var index = (x + y * width) * 4;
// 		pixels[index] = contrast*(pixels[index] - 128) + 128;
// 	    pixels[index + 1] = contrast*(pixels[index] - 128) + 128;
// 		pixels[index + 2] = contrast*(pixels[index] - 128) + 128 ;
//       }
//    }
//  updatePixels();
// }

// function setSaturation() {
// 	loadPixels();
// 	img.loadPixels();
// for(var y = 0; y < height; y++) {
//    for(var x = 0; x < width; x++) {
// 	  var index = (x + y * width) * 4;
// 	  var sat = (pixels[index] + pixels[index + 1] + pixels[index + 2] + pixels[index + 3]) * 0.333;
   
// 	   pixels[index] = sat;
// 	   pixels[index + 1] = sat;
// 	   pixels[index + 2] = sat;
// 	   pixels[index + 3] = sat;
//    }
// }
//  updatePixels();
  
// }

// function setInvert() {
// 	var invert   =  document.getElementById('myRange_invert').value;
// 	document.getElementById('cnv').style.filter = "invert(" + invert + "%)";

// }
/*Header tools*/

function mirrorImg() {
   var x = document.getElementById('cnv');
   if(poza !== 'error' && x.className !== 'active') {
   	 x.className = 'active';
   	 x.style.transform = "scaleX(" + -1 +")";
     x.style.filter = "FlipH";
   } else if(x.className !== 'inactive'){
             x.className = 'inactive';
			 x.style.transform = 'none';
   			 x.style.filter = 'none';
    } else {
    	alert('Please, upload the image');
    }
    		
  }
   
 function touchMoved() {
	var x = document.getElementById('brushe');
	var y = document.getElementById('pencil');
	var e = document.getElementById('delete');
	var z = document.getElementById('cnv');
	if(x.className === 'brushe_true') 
	 {  z.style.cursor = "url('icons/paintbrush.png'), auto";
		strokeWeight(changeWeight());
		stroke(values[1]);
		line(mouseX, mouseY, pmouseX, pmouseY);
	} else if(y.className === 'pencil_true') {
		z.style.cursor = "url('icons/pencil.png'), auto";
		strokeWeight(1);
		stroke(values[1]);
		line(mouseX, mouseY, pmouseX, pmouseY);
	}  else {
		z.style.cursor = "pointer";
	}
}
function openPencil() {

   var x = document.querySelector(DOM.pencil);
    if(x.className !== 'pencil_true') {
		if (checker !== DOM.pencil && checker !== null)
		{
			var str = document.querySelector(checker).className.slice(0,-5);
			document.querySelector(checker).className = str+'_false';
			document.getElementById('slide').style.display = 'none';
		}
		checker = DOM.pencil;
		x.className = 'pencil_true';

    } else {
    	x.className = 'pencil_false';
    	x.style.backgroundColor = 'none';
    }
}

function openBrush() {
	var x = document.querySelector(DOM.brushe);
    var y = document.getElementById('slide');
    if(x.className !== 'brushe_true') {
		if (checker !== DOM.brushe && checker !== null)
		{
			var str = document.querySelector(checker).className.slice(0,-5);
			document.querySelector(checker).className = str+'_false';
			y.style.display = 'none';
		}
		checker = DOM.brushe;
    	x.className = 'brushe_true';
    	y.style.display = 'block';
       
    } else {
    	x.className = 'brushe_false';
    	y.style.display = 'none';
    }
}

function clearDraw() {
 var x = document.querySelector(DOM.eraser);
 if(x.className !== 'delete_true') {
	if (checker !== DOM.eraser && checker !== null)
	{
		var str = document.querySelector(checker).className.slice(0,-5);
		document.querySelector(checker).className = str +'_false';
		document.getElementById('slide').style.display = 'none';
	}
	checker = DOM.eraser;
 	 x.className = 'delete_true';
 	 clear();
     i=0;
     draw();
 } else {
 	 x.className = 'delete_false';
 }
 
}
function rotateImg() {
  var y,x;
   x = document.querySelector(DOM.rotate);
   y = document.getElementById('cnv');
    
   if(x.className !== 'refresh_true') {
	if (checker !== DOM.rotate && checker !== null)
	{
		var str = document.querySelector(checker).className.slice(0,-5);
		document.querySelector(checker).className = str + '_false';
		document.getElementById('slide').style.display = 'none';
	}
	checker = DOM.rotate;

       x.className = 'refresh_true';
	   rot++;
	   if(rot !== 5) {
         y.style.transform = "rotate("+ rot * 90 + "deg)";
   	 	 y.style.left = "500px";
   	 	 y.style.top = "150px";
	   }
    } else {
    	x.className = 'refresh_false';
    }
}

function changeWeight() {
    var x;
    var y;
      x = document.getElementById('myRange').value;
      y = document.getElementById('val').innerHTML = x + 'px';
      
  return x;
}

function setFilter() {
	var bright   =  document.getElementById('myRange_bright').value;
	var satur    =  document.getElementById('myRange_satur').value;
	var gray     =  document.getElementById('myRange_gray').value;
	var contrast =  document.getElementById('myRange_contrast').value;
	var invert   =  document.getElementById('myRange_invert').value;
	
	 document.getElementById('cnv').style.filter ="brightness(" + bright + "%)" +" " +  "saturate(" + satur + ")" 
	 +" " + "contrast(" + contrast + "%)"  +" " + "invert(" + invert + "%)" +" " + "grayscale(" + gray + "%)";

	 document.getElementById('val_bright').innerHTML = bright + "%";
	 document.getElementById('val_satur').innerHTML = satur + "%";
	 document.getElementById('val_gray').innerHTML = gray + "%";
	 document.getElementById('val_contrast').innerHTML = contrast + "%";
     document.getElementById('val_invert').innerHTML = invert + "%";
}

var colorPicker = new iro.ColorPicker(".wrapper", {
  width: 220,
  height: 220,
  color: {r: 255, g: 0, b: 0},
  anticlockwise: true,
  borderWidth: 0,
  borderColor: "#fff",
  css: {
    "#swatch": {
      "background-color": "$color"
    }
  }
});

var values;

colorPicker.on("color:change", function(color){
  values = [
       color.hexString,
       color.rgbString,
       color.hslString,
  ];
});
/************************************************************/



/*Submenu*/
function openTools() {
	var x;
	var y;
	    x = document.getElementById('submenu');
	    y = document.getElementById('main');
	    if(x.className === 'active') {
	    	x.style.display = "flex";
			x.className = 'false';
			y.style
	    } else if(x.className === 'false') {
	    	closeTools(x);
	    }
	    
}

function closeTools(x) {
	x = document.getElementById('submenu');
	x.style.display = "none";
	x.className = 'active';
}
/*************************************************************/