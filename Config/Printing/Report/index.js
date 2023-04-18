const { app } = require('electron')
const { print } = require('pdf-to-printer');
const path = require('path')
//D:\Botiga\Electron-Build\Botiga-Internal\Electron-beta\Electron-Build\temp\temp_182.pdf
const PrintReport = (filename,PrinterName) => {
    // D:\\Botiga\\Electron-Build\\Botiga-Internal\\Electron-beta\\Electron-Build\\assets\\0410100.pdf
    const bindpath = path.join(app.getAppPath(),'temp',filename)
    console.log('PrintReport',path.join(app.getAppPath(),'temp',filename))
    print(bindpath, {
        printer: PrinterName
    }).then(res => {
        console.log(err);
    }).catch(err => {
        console.log(err);
    });
    // return new Promise((resolve, reject) => {

    //     const PrintWindow = new BrowserWindow({
    //       width: 800,
    //       height: 600,
    //       center: true,
    //       resizable: true,
    //       frame: true,
    //       transparent: false,
    //       show: true,
    //       webPreferences: {
    //           webSecurity: false,
    //           nodeIntegration: true,
    //           enableRemoteModule: true,
    //           contextIsolation: false,
    //           plugins: true 
    //       }
    //   });

    //   PrintWindow.setMenu(null);
    //   PrintWindow.loadURL(url);
    //   PrintWindow.webContents.on('did-finish-load', async () => {
    //     //C:\Users\Smit Doshi\Downloads
    //     //  PrintWindow.webContents.print({
    //     //   silent: true,
    //     //   printBackground: true,
    //     //   deviceName: PrinterName
    //     // }, () => {
    //     //   //PrintWindow.close();
    //     //   //resolve(true);
    //     // });
    //   });
    // });
};

module.exports = {
    PrintReport
}