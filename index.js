const { app, BrowserWindow,screen} = require('electron')
const path = require('path')
const {TestFuncation,buildMenu,buildDefaultTemplate,buildDarwinTemplate } = require('./Menu')
const { setupTitlebar} = require('custom-electron-titlebar/main');
const VirtualKeyboard = require('electron-virtual-keyboard');
const {GetAllConnection ,SetConnection,SetPinPad,GetPinpadSetting} = require('./Config/Connection');
const Updater = require('./Config/Update');
const {store} = require('./Config/Store');
const Config = require('./Config');
const IpcCommunication = require('./Communication');
 var serialNumber = require('serial-number');


let vkb;
let Clientwin;
let win;

setupTitlebar();

function createWindow () 
{
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({
    width: width,
    height: height,
    frame:false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.setFullScreen(true);
  if(process.env.ELECTRON_DEV == true) 
  {
    win.loadURL(`http://localhost:3000`);  
  }
  else
  {
    //win.loadURL(`http://localhost:3000`);
    win.loadURL(`file://${path.resolve(__dirname,'index.html')}`);  
  }
  win.webContents.openDevTools() 
  win.maximize();
  
  
  
  // launch a task and increase the value of the progress bar for each step completed of a big task;
  // the progress bar is set to completed when it reaches its maxValue (default maxValue: 100);
  // ps: setInterval is used here just to simulate the progress of a task
  

try
{
  // SetConnection('Con1','https://test.regex101asdasd.com');
  // SetConnection('Con2','https://test.regex101asdasd.com');
  //SetPinPad('192.168.0.123','3254','231465789');
  // store.set('connection',[
  //   {id:1, url:'https://test.regex101asdasd.com'},
  //   {id:2 ,url:'https://test.regex101asdasd.com'}
  // ]);
   
}
catch(e)
{
  console.log(e);
}

vkb = new VirtualKeyboard(win.webContents);
}

function CreateClientWindow(externalDisplay,width,height){
  Clientwin = new BrowserWindow({
    width: width,
    height: height,
    frame:false,
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
  if(process.env.ELECTRON_DEV) 
  {
    Clientwin.loadURL(`http://localhost:3000/#/ClientScreen`);
  }
  else
  {
    Clientwin.loadURL(`file://${path.resolve(__dirname,'clientscreen.html')}`);  
  }
  
  Clientwin.webContents.openDevTools() 
  Clientwin.maximize();


  


  
}

app.whenReady().then(() =>
{
  createWindow()
  const displays = screen.getAllDisplays()
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })
  

  if (externalDisplay) 
  {
    const { width, height } = externalDisplay.workAreaSize
    CreateClientWindow(externalDisplay,width,height);
  }

  win.on('close', function(e)
  {
    win.hide();
    if(Clientwin != undefined)
       Clientwin.hide();
    app.quit();
  });

  IpcCommunication(win,Clientwin);
  if(!process.env.ELECTRON_DEV) 
  {
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







