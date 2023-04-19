const { app } = require('electron')
const { print } = require('pdf-to-printer');
const path = require('path')
const fs = require('fs')

//C:/Users/Smit Doshi/Downloads/smit_doshi.pdf
const PrintReport = (MainWin,filename,PrinterName) => {
    
    const bindpath = path.join(app.getAppPath(),'temp',filename)
    console.log('MainWin',MainWin)
            MainWin.webContents.send("Start Printing", "");
    print(bindpath, {
        printer: PrinterName
    }).then(res => {
                fs.unlinkSync(bindpath)
                MainWin.webContents.send("End Printing", "");
    }).catch(err => {
        MainWin.webContents.send("End Printing", "");
    });
};

module.exports = {
    PrintReport
}