const { ipcMain } = require('electron')
const { app, BrowserWindow, screen } = require('electron')
const { TestFuncation, buildMenu, buildDefaultTemplate, buildDarwinTemplate } = require('../Menu')
const { ReadConnectionFile, SetPinPad } = require('../Config/Connection');
const { PrintInvoiceRecipt, PreviewPrintInvoiceRecipt } = require('../Config/Printing/Invoice');
const { PrintReport } = require('../Config/Printing/Report');
const { download } = require('electron-dl');
const path = require('path')

module.exports = (MainWin, ClientWin) => {

  ipcMain.handle('GetPinPadSetting', async (event, arg) => {

    let data = { PinPadIp: "", PinPadPort: "", SerialNumber: "" };
    var Jsondata = ReadConnectionFile();
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
    if (ClientWin != undefined)
      ClientWin.webContents.send('ClientScreenData', arg);
  });

  ipcMain.handle('GetAllPrinter', async (event, arg) => {
    if (MainWin != undefined) {
      try {
        const Printers = await MainWin.webContents.getPrintersAsync();
        return Printers;
      }
      catch (e) {
        return e;
      }
    }
  })

  ipcMain.on('UpdateClientScreenTransactionDone', (event, arg) => {
    if (ClientWin != undefined)
      ClientWin.webContents.send('ClientScreenTransactionDone', arg);
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
    MainWin.webContents.send('internet-connection', data);
  });

  ipcMain.on('open-clientscreen', (e, data) => {
    if (ClientWin) {
      data === 1 ? ClientWin.show() : ClientWin.hide();
    }
  });

  ipcMain.on('minimize-app', (e, data) => {
    if (MainWin) {
      MainWin.minimize();
    }
  });

  ipcMain.on('preview-print-recipt', async (e, data) => {
    const getallprinter = await MainWin.webContents.getPrintersAsync();
    //console.log(getallprinter);
    if (getallprinter.length) {
      const GetDefualtPrinter = getallprinter.filter(x => x.isDefault === true);
      PreviewPrintInvoiceRecipt(data, GetDefualtPrinter[0].name);
    }
  });

  ipcMain.on('print-recipt', async (e, data) => {
    const getallprinter = await MainWin.webContents.getPrintersAsync();
    let PrinterName = '';
    const PrinterInfo = data.PrintObject.PrintSetupList.filter(x => x.type === data.PrintObject.ReceiptType)[0];
    console.log(PrinterInfo)
    if (PrinterInfo) {
      PrinterName = PrinterInfo.printer;
    } else {
      const GetDefualtPrinter = getallprinter.filter(x => x.isDefault === true);
      PrinterName = GetDefualtPrinter[0].name;
    }
    await PrintInvoiceRecipt(data, PrinterName);
    for (let index = 0; index < data.PrintObject.Extracopy; index++) {
      await PrintInvoiceRecipt(data, PrinterName);
    }
  });

  ipcMain.on('print-Report', async (e, data) => {

    
    const Filename = `temp_${Math.floor((Math.random() * 1000) + 1)}.pdf`;
    const DirectoryPath = path.join(app.getAppPath(),'temp');
    await download(MainWin, data, {
      directory:DirectoryPath,
      filename:Filename,
      onCompleted:  (item) => {
        PrintReport(Filename,'Microsoft Print to PDF');      
      },
      showBadge: true
    })
      .then(dl => {
      }).catch(err => {
        console.log('err');
        console.log(err);
      });
  });

  ipcMain.on('download-Report', async (e, data) => {

    await download(MainWin, data, {
      onProgress: (progress) => {
        MainWin.webContents.send("download progress", progress);
      },
      onCompleted: (item) => {
        MainWin.webContents.send("download complete", item);
      },
      onStarted: () => {
        MainWin.webContents.send("download start", "Start Download");
      },
      showBadge: true
    })
      .then(dl => {
      }).catch(err => {
        console.log('err');
        console.log(err);
      });

  });


  ipcMain.on('close-app', (e, data) => {
    app.quit();
  });
}





