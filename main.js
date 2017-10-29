const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  //Window
  win = new BrowserWindow({
    icon: __dirname + '/img/target.png'
  });
  win.maximize();
  win.setFullScreen(true)
  // Fetch view
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.on('closed', () => {
    win = null;
  });
  win.setMenu(null);

}

app.on('ready', createWindow);

//Quit
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
