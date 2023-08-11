const { app } = require('electron')
const { print } = require('pdf-to-printer');
const path = require('path')
const fs = require('fs')

//C:/Users/Smit Doshi/Downloads/smit_doshi.pdf
const PrintReport = (MainWin,filename,PrinterName) => {
    const bindpath = path.join(app.getAppPath(),'temp',filename)
            MainWin.webContents.send("Start Printing", "");
    print(bindpath, {
        printer: PrinterName,
        silent: true
    }).then(res => {
                fs.unlinkSync(bindpath)
                MainWin.webContents.send("End Printing", "");
                //printwin.close();
    }).catch(err => {
        console.log(err)
        MainWin.webContents.send("End Printing", "");
    });
};

module.exports = {
    PrintReport
}