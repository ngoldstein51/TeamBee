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

function lerp(x1, y1, x2, y2, d) {
	return {
		x: x1 * d + x2 * (1-d),
		y: y1 * d + y2 * (1-d),
	};
}

canvas.addEventListener('mousedown',function(event){draw(); down=1;},false);
canvas.addEventListener('mouseup',function(event){down=0;},false);
canvas.addEventListener('mousemove',function(event){if(down===1&&downTouch===0) draw();},false);
canvas.addEventListener('touchstart',function(event){let touchobj = event.changedTouches[0];
												downTouch=1;
												x=touchobj.clientX;
												y=touchobj.clientY;
												ctx.fillStyle = color;
												ctx.beginPath();
												ctx.arc(x, y, size, 0, 2 * Math.PI);
												ctx.fill();
												event.preventDefault();},false)
canvas.addEventListener('touchmove', function(event){let touchobj = event.changedTouches[0];
												x=touchobj.clientX;
												y=touchobj.clientY;
												ctx.fillStyle = color;
												ctx.beginPath();
												ctx.arc(x, y, size, 0, 2 * Math.PI);
												ctx.fill();
												event.preventDefault();}, false)
canvas.addEventListener('touchmove', function(event){downTouch=0;},false)

function draw()
{
	x = event.clientX;
	y = event.clientY;
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, size, 0, 2 * Math.PI);
	ctx.fill();
	//ctx.fillRect(x-12, y-12, 10, 10);
}

function colorChange(newCol)
{
	color = newCol;
}

function sizeChange(i)
{
	if(size+i>0)
		size=size+i;
}
