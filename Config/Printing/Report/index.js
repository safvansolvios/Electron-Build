const { print } = require('pdf-to-printer');

const PrintReport = (MainWin,filepath,PrinterName) => {
        MainWin.webContents.send("Start Printing", "");
    print(filepath, {
        printer: PrinterName,
        silent: true
    }).then(res => {
                MainWin.webContents.send("End Printing", "");
    }).catch(err => {
        console.log(err)
        MainWin.webContents.send("End Printing", "");
    });
};

module.exports = {
    PrintReport
}