const { BrowserWindow, Menu } = require('electron')
const path = require('path')


const PrintShiftReport = (data, name) => {
  
  return new Promise((resolve, reject) => {
    const PrintWindow = new BrowserWindow({
      width: 400,
      height: 600,
      center: true,
      resizable: true,
      frame: true,
      transparent: false,
      show: false,
      webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          enableRemoteModule: true,
          contextIsolation: false
      }
  });
  
  PrintWindow.setMenu(null);
 
  PrintWindow.loadURL(`file://${path.resolve(__dirname, 'index.html')}`);
  PrintWindow.webContents.on('did-finish-load', async () => {
     PrintWindow.webContents.send('LoadReport',{info:data});
     PrintWindow.webContents.print({
      silent: true,
      printBackground: true,
      deviceName: name
    }, (res,err) => {
      setTimeout (()=>{
        PrintWindow.close();
        resolve(true);
      },2000)
    });
  });
});
}

module.exports = {PrintShiftReport}