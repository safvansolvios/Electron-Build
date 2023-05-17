const { app, BrowserWindow, screen, dialog,session } = require('electron')
const path = require('path')
const VirtualKeyboard = require('electron-virtual-keyboard');
const Updater = require('./Config/Update');
const IpcCommunication = require('./Communication');

let vkb;
let Clientwin;
let win;
let AuthToken = 'test';

//setupTitlebar();
app.commandLine.appendSwitch('disable-http2');
async function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
  })
  
  win.setFullScreen(true);
  if (process.env.ELECTRON_DEV == true) {
    win.loadURL(`file://${path.resolve(__dirname, 'index.html')}`);
    
    //win.loadURL(`http://localhost:3000`);
    
    //win.loadURL(`http://20.51.254.15:3000`);
  }
  else {
    //win.loadURL(`http://20.51.254.15:3000`);
    //win.loadURL(`http://localhost:3000`);
    win.loadURL(`file://${path.resolve(__dirname, 'index.html')}`);
    //win.loadURL(`file://${path.resolve(__dirname,'index.html')}`);  
  }
  win.maximize();
  vkb = new VirtualKeyboard(win.webContents);
}

function CreateClientWindow(externalDisplay, width, height) {
  Clientwin = new BrowserWindow({
    width: width,
    height: height,
    show:false,
    frame: false,
    x: externalDisplay.bounds.x,
    y: externalDisplay.bounds.y,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'Clientpreload.js')
    }
  })
  //Clientwin.loadURL(`file://${path.resolve(__dirname,'ClientOrderScreen.html')}`); 
  if (process.env.ELECTRON_DEV) {
    //Clientwin.loadURL(`http://localhost:3000/#/ClientScreen`);
    Clientwin.loadURL(`file://${path.resolve(__dirname, 'clientscreen.html')}`);
  }
  else {
    //Clientwin.loadURL(`http://localhost:3000/#/ClientScreen`);
    Clientwin.loadURL(`file://${path.resolve(__dirname, 'clientscreen.html')}`);
  }

  Clientwin.webContents.openDevTools()
 // Clientwin.maximize();
}

app.whenReady().then(() => {

  createWindow()
  const displays = screen.getAllDisplays()
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })


  if (externalDisplay) {
    const { width, height } = externalDisplay.workAreaSize
    CreateClientWindow(externalDisplay, width, height);
  }

  win.on('close', function (e) {
    win.hide();
    if (Clientwin != undefined)
      Clientwin.hide();
    app.quit();
  });

  IpcCommunication(win, Clientwin);
  if (!process.env.ELECTRON_DEV) {
    setTimeout(Updater(win),3000); 
  }

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})








