const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');
const url = require('url');
//init window
let win;

function createWindow() {
  //Window
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/img/target.png'
  });
  // Fetch view
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open Devtools
  //win.webContents.openDevTools();
  // lamda function
  win.on('closed', () => {
    win = null;
  });

}

app.on('ready', createWindow);

//Quit
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
