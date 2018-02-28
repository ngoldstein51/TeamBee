let body=document.getElementById("bod");
let history=[];
let bistory=[];
let color="#000000";
let down=0;
let downTouch=0;
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = canvas.clientWidth;
ctx.canvas.height = canvas.clientHeight;
let x;
let y;
let touchobj;
let filling=0;
let eyedrop=0;
let size=15;
let eraser=0;

//http://output.jsbin.com/ateho3/285

canvas.addEventListener('mousedown', function(e) {
	if(eyedrop===1)
	{
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
		this.down = true
		this.X = e.pageX-canvasX;
		this.Y = e.pageY-canvasY;
		let arr=ctx.getImageData(this.X,this.Y,1,1).data;

		let num1=(arr[0].toString(16)==="0")? "00":arr[0].toString(16);
		let num2=(arr[1].toString(16)==="0")? "00":arr[1].toString(16);
		let num3=(arr[2].toString(16)==="0")? "00":arr[2].toString(16);
		
		color="#"+num1+num2+num3;

		eyeDrop();
	}
	else if(filling===1&&downTouch===0)
	{
		captureCanvas(history); bistory=[];
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
		this.down = true
		this.X = e.pageX-canvasX;
		this.Y = e.pageY-canvasY;
		let arr=ctx.getImageData(0,0,canvas.width,canvas.height).data;
		let currpos=4*(Math.floor(this.X)+(canvas.width*(Math.floor(this.Y))));
		let col=color.split('');
		let arrcolor=[]

		arrcolor.push(parseInt(""+col[1]+col[2], 16));
		arrcolor.push(parseInt(""+col[3]+col[4], 16));
		arrcolor.push(parseInt(""+col[5]+col[6], 16));
		arrcolor[3]=255
		if(""+arrcolor!==pixelConvert(arr,currpos))
		{
			fillBucketHelper(currpos,arr,pixelConvert(arr,currpos),canvas.width,canvas.height,arrcolor);
			ctx.putImageData(new ImageData(arr,canvas.width,canvas.height),0,0);
		}
	}
	else if(downTouch===0)
		{
			captureCanvas(history); bistory=[];
			let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
			this.down = true;  
			this.X = e.pageX-canvasX;
			this.Y = e.pageY-canvasY;
			if(eraser)
			{
				ctx.beginPath();
				ctx.arc(e.pageX-canvasX,e.pageY-canvasY, size, 0, 2 * Math.PI);
				ctx.save();
				ctx.clip();
				ctx.clearRect(0,0,canvas.width,canvas.height);
				ctx.restore();
			}
			else
			{
				ctx.beginPath();
				ctx.moveTo(this.X, this.Y);
				ctx.lineCap = 'round';
				ctx.lineWidth = size;
				ctx.lineTo(e.pageX-canvasX , e.pageY-canvasY );
				ctx.strokeStyle = color;
				ctx.stroke();
				this.X = e.pageX-canvasX;
				this.Y = e.pageY-canvasY;
			}
		}
	downTouch=0;
}, 0);

canvas.addEventListener('mousemove', function(e) {
	if(this.down&&filling===0)
	{
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
		if(eraser)
		{
		  	ctx.beginPath();
	 		ctx.arc(e.pageX-canvasX,e.pageY-canvasY, size, 0, 2 * Math.PI);
	 		ctx.save();
	 		ctx.clip();
	 		ctx.clearRect(0,0,canvas.width,canvas.height);
	 		ctx.restore();
		}
		else
		{
			ctx.beginPath();
			ctx.moveTo(this.X, this.Y);
			ctx.lineCap = 'round';
			ctx.lineWidth = size;
			ctx.lineTo(e.pageX-canvasX , e.pageY-canvasY );
			ctx.strokeStyle = color;
			ctx.stroke();
			this.X = e.pageX-canvasX;
			this.Y = e.pageY-canvasY;
		}
	}
}, 0);

canvas.addEventListener('mouseup', function() {
	this.down = false;      
}, 0);

canvas.addEventListener('touchstart', function(e) {
	downTouch=1;

	if(eyedrop===1)
	{
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
		this.down = true
		let touchobj = e.changedTouches[0];
		this.X = touchobj.pageX-canvasX;
		this.Y = touchobj.pageY-canvasY;
		let arr=ctx.getImageData(this.X,this.Y,1,1).data;

		let num1=(arr[0].toString(16)==="0")? "00":arr[0].toString(16);
		let num2=(arr[1].toString(16)==="0")? "00":arr[1].toString(16);
		let num3=(arr[2].toString(16)==="0")? "00":arr[2].toString(16);
		
		color="#"+num1+num2+num3;

		eyeDrop();
	}
	else if(filling===1)
	{
		captureCanvas(history); bistory=[];
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
		this.down = true
		let touchobj = e.changedTouches[0];
		this.X = touchobj.pageX-canvasX;
		this.Y = touchobj.pageY-canvasY;
		let arr=ctx.getImageData(0,0,canvas.width,canvas.height).data;
		let currpos=4*(Math.floor(this.X)+(canvas.width*(Math.floor(this.Y))));
		let col=color.split('');
		let arrcolor=[]

		arrcolor.push(parseInt(""+col[1]+col[2], 16));
		arrcolor.push(parseInt(""+col[3]+col[4], 16));
		arrcolor.push(parseInt(""+col[5]+col[6], 16));
		arrcolor[3]=255
		if(""+arrcolor!==pixelConvert(arr,currpos))
		{
			fillBucketHelper(currpos,arr,pixelConvert(arr,currpos),canvas.width,canvas.height,arrcolor);
			ctx.putImageData(new ImageData(arr,canvas.width,canvas.height),0,0);
		}
	}
	else
	{
		captureCanvas(history); bistory=[];
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
		this.down = true;  
		let touchobj = e.changedTouches[0];
		this.X = touchobj.pageX-canvasX;
		this.Y = touchobj.pageY-canvasY;
		if(eraser)
		{
			ctx.beginPath();
			ctx.arc(touchobj.pageX-canvasX,touchobj.pageY-canvasY, size, 0, 2 * Math.PI);
			ctx.save();
			ctx.clip();
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.restore();
		}
		else
		{
			ctx.beginPath();
			ctx.moveTo(this.X, this.Y);
			ctx.lineCap = 'round';
			ctx.lineWidth = size;
			ctx.lineTo(touchobj.pageX-canvasX , touchobj.pageY-canvasY );
			ctx.strokeStyle = color;
			ctx.stroke();

			this.X = touchobj.pageX-canvasX;
			this.Y = touchobj.pageY-canvasY;
		}
	}
}, 0);

canvas.addEventListener('touchmove', function(e) {
	downTouch=0;
	if(this.down&&filling===0) 
	{
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
		let touchobj = e.changedTouches[0];
		
		if(eraser)
		{
			ctx.beginPath();
			ctx.arc(touchobj.pageX-canvasX,touchobj.pageY-canvasY, size, 0, 2 * Math.PI);
			ctx.save();
			ctx.clip();
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.restore();
		}
		else
		{
			ctx.beginPath();
			ctx.moveTo(this.X, this.Y);
			ctx.lineCap = 'round';
			ctx.lineWidth = size;
			ctx.lineTo(touchobj.pageX-canvasX , touchobj.pageY-canvasY );
			ctx.strokeStyle = color;
			ctx.stroke();

			this.X = touchobj.pageX-canvasX;
			this.Y = touchobj.pageY-canvasY;
		}
	}
	e.preventDefault();
}, 0);

canvas.addEventListener('touchend', function() {
	this.down = false;      
}, 0);

document.onkeydown = function(e) {
	if (e.ctrlKey && e.key === 'z')
	{
		e.preventDefault();
		undo();
	}
	else if (e.ctrlKey && e.key === 'y')
	{
		e.preventDefault();
		redo();
	}
	else if (e.ctrlKey && e.key === 'l')
	{
		e.preventDefault();
		clearScreen();
	}
	else if (e.ctrlKey && e.key === '-')
	{
		e.preventDefault();
	}
	else if (e.ctrlKey && e.key === '+')
	{
		e.preventDefault();
	}
}

window.addEventListener('resize', function(event){resize()},false)

let s=document.getElementById('myRange');

s.oninput=function()
{
	document.getElementById('num').innerHTML=document.getElementById('myRange').value;
	size=document.getElementById('num').innerHTML;
}

let c=document.getElementById('colorpicker');

c.oninput=function(event)
{
	event.preventDefault();
	colorChange(c.value);
}

function fillBucket()
{
	if(eyedrop===1)
		eyeDrop();

	if(filling===0)
	{
		filling=1;
		document.getElementById("filler").innerHTML="Stop filling";
		document.getElementById("filler").style.backgroundColor="red";
	}
	else
	{
		filling=0;
		document.getElementById("filler").innerHTML="Start filling";
		document.getElementById("filler").style.backgroundColor="#4CAF50";
	}
}

function fillBucketHelper(currpos,image,clickedcolor,w,h,colorArray)
{
	let s=[];
	s.push(currpos);

	let rows=[];
	for(let i=0;i<(h*w*4);i+=(w*4))
		rows.push([i,i+w*4]);

	while(s.length>0)
	{
		currpos = s.pop();

		image[currpos] = colorArray[0];
		image[currpos+1] = colorArray[1];
		image[currpos+2] = colorArray[2];
		image[currpos+3] = colorArray[3];

		let topbound = 0;
		let bottombound = 4*w*h;
		let crow = rows[Math.floor(currpos/(w*4))];
		let leftbound = crow[0];
		let rightbound = crow[1]-1;

		if(currpos + 4 <= rightbound && clickedcolor == pixelConvert(image,currpos+4))
			s.push(currpos+4);
		if(currpos - 4 >= leftbound && clickedcolor == pixelConvert(image,currpos-4))
			s.push(currpos-4);
		if(currpos + (w*4) >= topbound && clickedcolor == pixelConvert(image,currpos+(w*4)))
			s.push(currpos+(w*4));
		if(currpos - (w*4) <= bottombound && clickedcolor == pixelConvert(image,currpos-(w*4)))
			s.push(currpos-(w*4));		
		}
}

function colorChange(newCol)
{
	if(newCol==='transp')
	{
		if(filling===1)
			fillBucket();
		eraser=1;
	}
	else
	{
		eraser=0;
		color = newCol;
	}
}

function pixelConvert(arr,i)
{
	return ""+arr[i]+","+arr[i+1]+","+arr[i+2]+","+arr[i+3];
}

function sizeChange(i)
{
	size=parseInt(size);
	if(size+i>0&&size+i<=200)
	{
		size=size+i;
		document.getElementById("num").innerHTML = size;
		document.getElementById("myRange").value = size;
	}
}

function captureCanvas(target)
{
	let save=document.createElement('canvas');
	save.width = canvas.width;
	save.height = canvas.height;
	save.getContext('2d').drawImage(canvas,0,0);
	target.push(save);
}

function undo()
{
	if (!history.length) return;
	captureCanvas(bistory);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(history.pop(),0,0);
}

function resize()
{
	captureCanvas(history);
	let {height, width} = canvas.getBoundingClientRect();
	canvas.height=height;
	canvas.width=width;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(history.pop(),0,0);
}

function redo()
{
	if (!bistory.length) return;
	captureCanvas(history);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(bistory.pop(),0,0);
}

function clearScreen()
{
	captureCanvas(history);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	bistory=[];
}

function addLayer()
{
	let newcanv=document.createElement("canvas");
	body.appendChild(newcanv);
}

function eyeDrop()
{
	if(filling===1)
		fillBucket();

	if(eyedrop===0)
	{
		eyedrop=1;
		document.getElementById("eyedropper").style.backgroundColor="red";
	}
	else
	{
		eyedrop=0;
		document.getElementById("eyedropper").style.backgroundColor="#4CAF50";
	}
}