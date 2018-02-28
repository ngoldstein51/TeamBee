let electron = require('electron');
let app = electron.app;
let BrowserWindow = electron.BrowserWindow;
let mainWindow = null;

app.on('ready', function()
{
	mainWindow = new BrowserWindow
	({
		height: 0,
		width: 0
	});
	mainWindow.loadURL('file://' + __dirname + '/app/index.html');
	mainWindow.maximize();
});