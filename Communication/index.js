const { ipcMain } = require('electron')
const { app, BrowserWindow, screen } = require('electron')
const { TestFuncation, buildMenu, buildDefaultTemplate, buildDarwinTemplate } = require('../Menu')
const { ReadConnectionFile, SetPinPad } = require('../Config/Connection');
const print = require('../Config');
const { download } = require('electron-dl');
const path = require('path')
const dns = require('dns');
const Store = require('../Config/Store');
var ping = require('ping');


const getIP = async (hostname) => {
  let obj = await dns.promises.lookup(hostname).catch((error) => {
    console.error(error);
  });
  return obj?.address;
}

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

  ipcMain.handle('GetVersion', async (event, arg) => {
    return app.getVersion();
  })

  ipcMain.handle('GetTerminalDetails', async (event, arg) => {
    const terminalConfig = Store.get('terminalConfig');
    return {...terminalConfig,IpAddress:await getIP(terminalConfig.connection)};
  })

  ipcMain.handle('hostping', async (event, arg) => {
    let res = await ping.promise.probe(arg.host);
    return res;
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

  ipcMain.handle('terminalSetup', async (event, arg) => {
    try {
      Store.set('terminalConfig.connection', arg.server)
      Store.set('terminalConfig.terminalId', arg.terminal)
      Store.set('terminalConfig.storeId', arg.storeid)
      Store.set('terminalConfig.storeName', arg.storename)
      return true;
    } catch {
      return false;
    }
    
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
    await print.PrintInvoiceRecipt(data, PrinterName);
    for (let index = 0; index < data.PrintObject.Extracopy; index++) {
      await print.PrintInvoiceRecipt(data, PrinterName);
    }
  });

  ipcMain.on('print-OAreceipt', async (e, data) => {
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
    await print.PrintOAreceipt(data, PrinterName);

  });

  ipcMain.on('print-Report', async (e, data) => {

    const Filename = `temp_${Math.floor((Math.random() * 1000) + 1)}.pdf`;
    const DirectoryPath = path.join(app.getAppPath(), 'temp');

    const DownloadWindow = new BrowserWindow({ show: false });
    DownloadWindow.loadURL(data.url, {
      extraHeaders: `Authorization:Bearer ${data.Token}`
    });

    await download(DownloadWindow, data.url, {
      directory: DirectoryPath,
      filename: Filename,
      onCompleted: (item) => {
        print.PrintReport(MainWin, Filename, data.printer);
        DownloadWindow.close();
      },
      showBadge: true
    })
      .then(dl => {
        DownloadWindow.close();
      }).catch(err => {
        console.log('err');
        console.log(err);
        DownloadWindow.close();
      });
  });

  ipcMain.on('download-Report', async (e, data) => {

    const DownloadWindow = new BrowserWindow({ show: false });
    DownloadWindow.loadURL(data.url, {
      extraHeaders: `Authorization:Bearer ${data.Token}`
    });

    await download(DownloadWindow, data.url, {
      onProgress: (progress) => {
        MainWin.webContents.send("download progress", progress);
      },
      onCompleted: (item) => {
        MainWin.webContents.send("download complete", item);
        DownloadWindow.close();
      },
      onStarted: () => {
        MainWin.webContents.send("download start", "Start Download");
      },
      showBadge: true
    })
      .then(dl => {
        DownloadWindow.close();
      }).catch(err => {
        console.log('err');
        console.log(err);
        DownloadWindow.close();
      });

  });


  ipcMain.on('close-app', (e, data) => {
    app.quit();
  });
}





