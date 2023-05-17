const { ipcMain } = require('electron')
const { app, BrowserWindow, screen } = require('electron')
const { TestFuncation, buildMenu, buildDefaultTemplate, buildDarwinTemplate } = require('../Menu')
const { ReadConnectionFile, SetPinPad } = require('../Config/Connection');
<<<<<<< HEAD
const print = require('../Config');
=======
const { PrintInvoiceRecipt, PreviewPrintInvoiceRecipt } = require('../Config/Printing/Invoice');
const { PrintReport } = require('../Config/Printing/Report');
>>>>>>> dc5c37bca8efc484fd0ae9f15fa497854d207de7
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
      print.PreviewPrintInvoiceRecipt(data, GetDefualtPrinter[0].name);
    }
  });

  ipcMain.on('print-Shift-recipt', async (e, data) => {
      print.PrintShiftReport(data.data, data.printer);
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
<<<<<<< HEAD
    await print.PrintInvoiceRecipt(data, PrinterName);
    for (let index = 0; index < data.PrintObject.Extracopy; index++) {
      await print.PrintInvoiceRecipt(data, PrinterName);
=======
    await PrintInvoiceRecipt(data, PrinterName);
    for (let index = 0; index < data.PrintObject.Extracopy; index++) {
      await PrintInvoiceRecipt(data, PrinterName);
>>>>>>> dc5c37bca8efc484fd0ae9f15fa497854d207de7
    }
  });

  ipcMain.on('print-Report', async (e, data) => {
<<<<<<< HEAD
    
    const Filename = `temp_${Math.floor((Math.random() * 1000) + 1)}.pdf`;
    const DirectoryPath = path.join(app.getAppPath(),'temp');

    const DownloadWindow = new BrowserWindow({show: false});
    DownloadWindow.loadURL(data.url,{
      extraHeaders:`Authorization:Bearer ${data.Token}`
    });

    await download(DownloadWindow, data.url, {
      directory:DirectoryPath,
      filename:Filename,
      onCompleted:  (item) => {
        print.PrintReport(MainWin,Filename,data.printer);  
        DownloadWindow.close();    
=======

    
    const Filename = `temp_${Math.floor((Math.random() * 1000) + 1)}.pdf`;
    const DirectoryPath = path.join(app.getAppPath(),'temp');
    await download(MainWin, data, {
      directory:DirectoryPath,
      filename:Filename,
      onCompleted:  (item) => {
        PrintReport(MainWin,Filename,'Microsoft Print to PDF');      
>>>>>>> dc5c37bca8efc484fd0ae9f15fa497854d207de7
      },
      showBadge: true
    })
      .then(dl => {
<<<<<<< HEAD
        DownloadWindow.close();
      }).catch(err => {
        console.log('err');
        console.log(err);
        DownloadWindow.close();
=======
      }).catch(err => {
        console.log('err');
        console.log(err);
>>>>>>> dc5c37bca8efc484fd0ae9f15fa497854d207de7
      });
  });

  ipcMain.on('download-Report', async (e, data) => {
<<<<<<< HEAD
    
    const DownloadWindow = new BrowserWindow({show: false});
    DownloadWindow.loadURL(data.url,{
      extraHeaders:`Authorization:Bearer ${data.Token}`
    });

    await download(DownloadWindow, data.url, {
=======

    await download(MainWin, data, {
>>>>>>> dc5c37bca8efc484fd0ae9f15fa497854d207de7
      onProgress: (progress) => {
        MainWin.webContents.send("download progress", progress);
      },
      onCompleted: (item) => {
        MainWin.webContents.send("download complete", item);
<<<<<<< HEAD
        DownloadWindow.close();
=======
>>>>>>> dc5c37bca8efc484fd0ae9f15fa497854d207de7
      },
      onStarted: () => {
        MainWin.webContents.send("download start", "Start Download");
      },
      showBadge: true
    })
      .then(dl => {
<<<<<<< HEAD
        DownloadWindow.close();
      }).catch(err => {
        console.log('err');
        console.log(err);
        DownloadWindow.close();
=======
      }).catch(err => {
        console.log('err');
        console.log(err);
>>>>>>> dc5c37bca8efc484fd0ae9f15fa497854d207de7
      });

  });


  ipcMain.on('close-app', (e, data) => {
    app.quit();
  });
}




