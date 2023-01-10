const { ipcMain } = require('electron')
const { app, BrowserWindow, screen } = require('electron')
const { TestFuncation, buildMenu, buildDefaultTemplate, buildDarwinTemplate } = require('../Menu')
const { ReadConnectionFile, SetPinPad } = require('../Config/Connection');
const { PrintRecipt,PreviewPrintRecipt } = require('../Config/Print');
module.exports = (MainWin, ClientWin) => {

  ipcMain.handle('GetPinPadSetting', async (event, arg) => {

    let data = { PinPadIp: "", PinPadPort: "", SerialNumber: "" };
    var Jsondata = ReadConnectionFile();
    //let Jsondata = JSON.parse(Condata);
    if (Jsondata !== undefined) {
      data.PinPadIp = Jsondata.PinPadIp;
      data.PinPadPort = Jsondata.PinPadPort;
      data.SerialNumber = Jsondata.SerialNumber;
    }
    return data;
  })

  ipcMain.handle('SetPinPadSetting', async (event, arg) => {
    try {
      SetPinPad(arg);
      return true;
    }
    catch
    {
      return false;
    }
    return false;
  })

  ipcMain.handle('GetAllSetting', async (event, arg) => {
    return ReadConnectionFile();
  })

  ipcMain.on('UpdateClientScreen', (event, arg) => {
    console.log('client-ClientScreenData');
    if (ClientWin != undefined)
      ClientWin.webContents.send('ClientScreenData', arg);
  });

  ipcMain.on('title-updated', (e, data) => {


    MainWin.webContents.send('title-updated-Client', data);
  });

  ipcMain.on('anaction', (e, data) => {
    const menu = Menu.buildFromTemplate(buildDarwinTemplate());
    Menu.setApplicationMenu(menu);
    MainWin.webContents.send('Update-Menu');
  });

  ipcMain.on('internet-connection', (e, data) => {
    console.log(data);
    MainWin.webContents.send('internet-connection', data);
  });


  
  ipcMain.on('preview-print-recipt', async (e, data) => {
    const getallprinter = await MainWin.webContents.getPrintersAsync();
    //console.log(getallprinter);
    if(getallprinter.length){
      const GetDefualtPrinter = getallprinter.filter(x => x.isDefault === true);
      PreviewPrintRecipt(data,GetDefualtPrinter[0].name);
    }
  });

  ipcMain.on('print-recipt', async (e, data) => {
    console.log('print-recipt');

    const getallprinter = await MainWin.webContents.getPrintersAsync();
    //console.log(getallprinter);
    if(getallprinter.length){
      const GetDefualtPrinter = getallprinter.filter(x => x.isDefault === true);
      //console.log(GetDefualtPrinter);
      PrintRecipt(data,GetDefualtPrinter[0].name);
    }
    
    // MainWin.webContents.getPrintersAsync().then((data) => {
    //   if (data.length) {
    //     const GetDefualtPrinter = data.filter(x => x.isDefault === true);
    //     PrintRecipt(data,GetDefualtPrinter[0].name);
    //   }
    //   // data will be an array of printer objects
    // }).catch((e) => {
    //   // handle error here
    // })

    //PrintRecipt(data,'EPSON TM-T20II Receipt');
    
    //MainWin.webContents.send('internet-connection',data);
  });

  ipcMain.on('close-app', (e, data) => {
    app.quit();
    //MainWin.webContents.send('internet-connection',data);
  });

}





