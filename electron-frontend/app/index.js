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
let size=15;
let eraser=0;
document.getElementById("num").innerHTML = 15;

//http://output.jsbin.com/ateho3/285

canvas.addEventListener('mousedown', function(e) {
	console.log(history);
	if(filling===1)
	{
		captureCanvas(history); bistory=[];
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
        this.down = true
        this.X = e.pageX-canvasX;
        this.Y = e.pageY-canvasY;
	    let arr=ctx.getImageData(0,0,canvas.width,canvas.height).data;
	    let currpos=4*(Math.floor(this.X)+(canvas.width*(this.Y)));
	    let col=color.split('');
	    let arrcolor=[]

		arrcolor.push(parseInt(""+col[1]+col[2], 16));
		arrcolor.push(parseInt(""+col[3]+col[4], 16));
		arrcolor.push(parseInt(""+col[5]+col[6], 16));
		arrcolor[3]=255
		if(""+arrcolor!==pixelConvert(arr,currpos))
		{
			fillBucketHelperIt(currpos,arr,pixelConvert(arr,currpos),canvas.width,canvas.height,arrcolor);
			ctx.putImageData(new ImageData(arr,canvas.width,canvas.height),0,0);
		}
	}
	else if(downTouch===0){
	
	  captureCanvas(history); bistory=[];
	  let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
      this.down = true;  
      this.X = e.pageX-canvasX;
      this.Y = e.pageY-canvasY;
      if(eraser)
      {
		//ctx.clearRect(this.X-(size/2), this.Y-(size/2), size, size);
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
      if(this.down) {
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
      	if(eraser)
      {
		//ctx.clearRect(e.pageX-canvasX-(size/2), e.pageY-canvasY-(size/2), size, size);
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
	  
	  captureCanvas(history); bistory=[];
	  let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
      this.down = true;  
      let touchobj = e.changedTouches[0];
      this.X = touchobj.pageX-canvasX;
      this.Y = touchobj.pageY-canvasY;
      if(eraser)
      {
		//ctx.clearRect(touchobj.pageX-canvasX-(size/2), touchobj.pageY-canvasY-(size/2), size, size);
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
    }, 0);

	canvas.addEventListener('touchmove', function(e) {
		downTouch=0;
      if(this.down) {
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
		let touchobj = e.changedTouches[0];
      	if(eraser)
      {
		//ctx.clearRect(touchobj.pageX-canvasX-(size/2), touchobj.pageY-canvasY-(size/2), size, size);
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

// function lerp(x1, y1, x2, y2, d)
// {
// 	return {
// 		x: x1 * d + x2 * (1-d),
// 		y: y1 * d + y2 * (1-d),
// 	};
// }

// function draw()
// {
// 	let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
// 	x = event.clientX - canvasX;
// 	y = event.clientY - canvasY;
// 	ctx.fillStyle = color;
// 	if(eraser)
// 	{
// 		ctx.clearRect(x-(size/2), y-(size/2), size, size);
// 	}
// 	else
// 	{
// 		ctx.beginPath();
// 		ctx.arc(x, y, size, 0, 2 * Math.PI);
// 		ctx.fill();
// 	}
// }

function fillBucket()
{
	if(filling===0)
		filling=1;
	else
		filling=0;
}

function fillBucketHelper(currpos,image,clickedcolor,w,h,colorArray)
{
	try
	{
		image[currpos]=colorArray[0];
		image[currpos+1]=colorArray[1];
		image[currpos+2]=colorArray[2];
		image[currpos+3]=colorArray[3];

		let topbound=0;
		let bottombound=4*w*h;
		let rightbound=currpos;
		let leftbound=currpos;

		while(rightbound%(w*4)!=0)
			rightbound++;
		while(leftbound%(w*4)!=0)
			leftbound--;

		if(currpos+4<=rightbound&&clickedcolor===pixelConvert(image,currpos+4))
			fillBucketHelper(currpos+4,image,clickedcolor,w,h,colorArray);
		if(currpos-4>=leftbound&&clickedcolor===pixelConvert(image,currpos-4))
			fillBucketHelper(currpos-4,image,clickedcolor,w,h,colorArray);
		if(currpos+(w*4)>=topbound&&clickedcolor===pixelConvert(image,currpos+(w*4)))
			fillBucketHelper(currpos+(w*4),image,clickedcolor,w,h,colorArray);
		if(currpos-(w*4)<=bottombound&&clickedcolor===pixelConvert(image,currpos-(w*4)))
			fillBucketHelper(currpos-(w*4),image,clickedcolor,w,h,colorArray);
	}
	catch(e){}

}

function fillBucketHelperIt(currpos,image,clickedcolor,w,h,colorArray)
{
	let q=[];
	
	q.push(currpos);

	let rows=[];
	
	for(let i=0;i<(h*w*4);i+=(w*4))
		rows.push([i,i+w*4]);

	while(q.length>0)
	{
		//console.log(q);
		currpos=q.pop();

		image[currpos]=colorArray[0];
		image[currpos+1]=colorArray[1];
		image[currpos+2]=colorArray[2];
		image[currpos+3]=colorArray[3];

		let topbound=0;
		let bottombound=4*w*h;
		let crow=rows[Math.floor(currpos/(w*4))];
		let leftbound=crow[0];
		let rightbound=crow[1];

		if(currpos + 4 <= rightbound && clickedcolor == pixelConvert(image,currpos+4))
			q.push(currpos+4);
		if(currpos - 4 >= leftbound && clickedcolor == pixelConvert(image,currpos-4))
			q.push(currpos-4);
		if(currpos + (w*4) >= topbound && clickedcolor == pixelConvert(image,currpos+(w*4)))
			q.push(currpos+(w*4));
		if(currpos - (w*4) <= bottombound && clickedcolor == pixelConvert(image,currpos-(w*4)))
			q.push(currpos-(w*4));		
	}
}

function colorChange(newCol)
{
	if(newCol==='transp')
		eraser=1;
	else
	{
		eraser=0;
		color = newCol;
	}
}

function pixeleq(pix1, pix2)
{
	return (pix1[0]===pix2[0]&&pix1[1]===pix2[1]&&pix1[2]===pix2[2]&&pix1[3]===pix2[3])
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

document.onkeydown = function(e) {
  if (e.ctrlKey && e.key === 'z') {
    e.preventDefault();
    undo();
  }
  else if (e.ctrlKey && e.key === 'y') {
    e.preventDefault();
    redo();
  }
  else if (e.ctrlKey && e.key === 'l') {
    e.preventDefault();
    clearScreen();
  }
}

function addLayer()
{
	let newcanv=document.createElement("canvas");
	body.appendChild(newcanv);
}

// canvas.addEventListener('mousedown',function(event){captureCanvas(history); bistory=[]; draw(); down=1;},false);
// canvas.addEventListener('mouseup',function(event){down=0;},false);
// canvas.addEventListener('mousemove',function(event){if(down===1&&downTouch===0) draw();},false);

// canvas.addEventListener('touchstart',function(event){
// 		captureCanvas(history);
// 		bistory=[];
// 		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
// 		let touchobj = event.changedTouches[0];
// 		downTouch=1;
// 		x=touchobj.clientX-canvasX;
// 		y=touchobj.clientY-canvasY;
// 		ctx.fillStyle = color;
// 		if(eraser)
// 	{
// 		ctx.clearRect(x-(size/2), y-(size/2), size, size);
// 	}
// 	else
// 	{
// 	    ctx.beginPath();
// 		ctx.arc(x, y, size, 0, 2 * Math.PI);
// 		ctx.fill();
// 	}
// 	},
// 	false);
// canvas.addEventListener('touchmove', function(event){
// 		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
// 		let touchobj = event.changedTouches[0];
// 		x=touchobj.clientX-canvasX;
// 		y=touchobj.clientY-canvasY;
// 		ctx.fillStyle = color;
// 		if(eraser)
// 	{
// 		ctx.clearRect(x-(size/2), y-(size/2), size, size);
// 	}
// 	else
// 	{
// 		ctx.beginPath();
// 		ctx.arc(x, y, size, 0, 2 * Math.PI);
// 		ctx.fill();
// 	}
// 		event.preventDefault();}, false);
// canvas.addEventListener('touchend', function(event){downTouch=0;},false)