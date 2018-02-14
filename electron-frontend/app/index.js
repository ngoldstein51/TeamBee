let body=document.getElementById("bod");
let history=[];
let bistory=[];
let color="#000000";
let down=0;
let downTouch=0
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = canvas.clientWidth;
ctx.canvas.height = canvas.clientHeight;
let x;
let y;
let touchobj;
let size=15;
let eraser=0;
document.getElementById("num").innerHTML = 15;

//http://output.jsbin.com/ateho3/285

canvas.addEventListener('mousedown', function(e) {
	  captureCanvas(history); bistory=[];
	  let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
      this.down = true;  
      this.X = e.pageX-canvasX;
      this.Y = e.pageY-canvasY;
      if(eraser)
      {
		ctx.clearRect(this.X-(size/2), this.Y-(size/2), size, size);
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
    }, 0);

	canvas.addEventListener('mousemove', function(e) {
      if(this.down) {
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
      	if(eraser)
      {
		ctx.clearRect(e.pageX-canvasX-(size/2), e.pageY-canvasY-(size/2), size, size);
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
	  captureCanvas(history); bistory=[];
	  let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
      this.down = true;  
      let touchobj = e.changedTouches[0];
      this.X = touchobj.pageX-canvasX;
      this.Y = touchobj.pageY-canvasY;
      if(eraser)
      {
		ctx.clearRect(touchobj.pageX-canvasX-(size/2), touchobj.pageY-canvasY-(size/2), size, size);
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
      if(this.down) {
		let {left: canvasX, top: canvasY} = canvas.getBoundingClientRect();
		let touchobj = e.changedTouches[0];
      	if(eraser)
      {
		ctx.clearRect(touchobj.pageX-canvasX-(size/2), touchobj.pageY-canvasY-(size/2), size, size);
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

function sizeChange(i)
{
	size=parseInt(size);
	if(size+i>0)
		size=size+i;
	document.getElementById("num").innerHTML = size;
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
	undo();
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