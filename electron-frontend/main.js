let electron = require('electron');
let app = electron.app;
let BrowserWindow = electron.BrowserWindow;

let mainWindow = null;


app.on('ready', function()
{
	mainWindow = new BrowserWindow
	({
		height: 800,
		width: 800
	});
	//console.log(mainWindow);
	mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});