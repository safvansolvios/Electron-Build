const { app, BrowserWindow, screen, dialog, session, net,Menu,globalShortcut  } = require('electron')
const { getIP, Ping, GetMAC,generateRandomId } = require('./utility/Helpers');
const { CheckTerminal } = require('./service');
const path = require('path')
const VirtualKeyboard = require('electron-virtual-keyboard');
const Updater = require('./Config/Update');
const Store = require('./Config/Store');
const IpcCommunication = require('./Communication');

let Clientwin;
let win;

// log.info(`getAppPath ${path.join(app.getAppPath(), '..','extraResources/CashDrawer.exe "MyPrinter"')}`)
// log.info(`exe ${app.getPath("exe")}`)
// log.info(`temp ${app.getPath("temp")}`)

const uri = `file://${path.resolve(__dirname, 'index.html')}`;
//const uri = 'http://localhost:3000';

const terminalConfig = Store.get('terminalConfig');
app.commandLine.appendSwitch('disable-http2');

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {

  async function createWindow() {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({
      //icon:'./assets/images/icon256.png',
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
    await win.webContents.session.clearStorageData({
      storages: ['localstorage']
    });


    win.setFullScreen(true);

    

    if (terminalConfig) {
      if (terminalConfig.connection != undefined && terminalConfig.terminalName != undefined && terminalConfig.storeId != undefined) {

        let res = await getIP(terminalConfig.connection);

        const DeviceInfo = {
          macAddress: await GetMAC(),
          terminalName: terminalConfig.terminalName,
          storeId: 1
        }

        try {
          const req = await CheckTerminal(res.address, DeviceInfo);
          if (req.data.success) {
            if (req.data.result.length > 0) {
              win.loadURL(uri);
            } else {
              win.loadURL(`${uri}?terminalsetup=true`);
            }
          }
          else {
            win.loadURL(`${uri}?terminalsetup=true`);
          }
        }
        catch {
          win.loadURL(`${uri}?terminalsetup=true`);
        }
      }
      else {
        win.loadURL(`${uri}?terminalsetup=true`);
      }
    }
    else {
      win.loadURL(`${uri}?terminalsetup=true`);
    }

    vkb = new VirtualKeyboard(win.webContents);

    globalShortcut.register('CommandOrControl+R', () => {
      console.log('Do Nothing');
    });

    // globalShortcut.register('CommandOrControl+J', () => {
    //   //console.log('Do Nothing j');
    // });

    globalShortcut.register('CommandOrControl+M', () => {
      console.log('Alt + Tab pressed using node-global-shortcut');
   });

    win.on('blur', () => {
      const isMinimized = win.isMinimized();
      if (!isMinimized) {
        //win.focus();
      }
    });
  }

  function CreateClientWindow(externalDisplay) {
    Clientwin = new BrowserWindow({
      // width: width,
      // height: height,
      fullscreen: true,
      show: true,
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
    Clientwin.loadURL(`${uri}?ClientScreen=true`);
  }

  

  app.whenReady().then(() => {

    if(!terminalConfig?.sitId){
      Store.set('terminalConfig.sitId', generateRandomId(24))
    }

    createWindow()
    const displays = screen.getAllDisplays()
    const externalDisplay = displays.find((display) => {
      return display.bounds.x !== 0 || display.bounds.y !== 0
    })


    if (externalDisplay) {
      CreateClientWindow(externalDisplay);
    }
    //CreateClientWindow(null);

    win.on('close', function (e) {
      win.hide();
      if (Clientwin != undefined)
        Clientwin.hide();
      app.quit();
    });

    IpcCommunication(win, Clientwin);
    if (!process.env.ELECTRON_DEV) {
      setTimeout(Updater(win), 3000);
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

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });
  
}








