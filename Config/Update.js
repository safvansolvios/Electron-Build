const {autoUpdater} = require('electron-updater');
const {dialog } = require('electron');
const ProgressBar = require('electron-progressbar');
var AutoUpdateprogressBar;

 //C:\Users\Smit Doshi\AppData\Local\my-electron-app-updater\pending

autoUpdater.logger = require('electron-log');
autoUpdater.logger.info();
autoUpdater.autoDownload = false;
autoUpdater.requestHeaders = {'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'};

module.exports = (win) =>{
    
    autoUpdater.checkForUpdates();
    

    autoUpdater.on('update-available',()=>
    {


        dialog.showMessageBox({
            title: `Botiga Update`,
            message: `Update Available`,
            detail: `A new Version of Botiga is available. Do you want to update now?`,
            buttons: ['Update','No'],
           }).then(res=>{
            let btnindex = res.response;

            if(btnindex === 0)
            { 
              autoUpdater.downloadUpdate();

            //   AutoUpdateprogressBar = new ProgressBar({
            //       indeterminate: false,
            //       text: 'Preparing data...',
            //       detail: 'Wait...'
            //   });
            //   AutoUpdateprogressBar
            //   .on('completed', function() {
            //     AutoUpdateprogressBar.detail = 'Download completed';
            //   })
            //   .on('aborted', function(value) {
            //     console.info(`aborted... ${value}`);
            //   })
            //   .on('progress', function(value) {
            //     AutoUpdateprogressBar.detail = `Value ${value} out of ${AutoUpdateprogressBar.getOptions().maxValue}...`;
            //   });
            }
        })

    });

    autoUpdater.on('update-downloaded',()=>
    {
        // if(AutoUpdateprogressBar != undefined)
        // {
        //     AutoUpdateprogressBar.setCompleted();
        // }

        dialog.showMessageBox({
            title: `Botiga Update`,
            message: `Update Ready`,
            detail: `Install & Restart Now?`,
            buttons: ['Update','No'],
           }).then(res=>{
            let btnindex = res.response;
           
            if(btnindex === 0) autoUpdater.quitAndInstall(false,true);
        });
    });

    autoUpdater.on('download-progress', (progressObj) => 
    {
        
        let log_message = "Download speed: " +  (progressObj.bytesPerSecond / 1048576).toFixed(2) + "MB/s";
        log_message = log_message + ' - Downloaded ' + (progressObj.percent).toFixed(2) + '%';
        // if(AutoUpdateprogressBar != undefined)
        // {
        //     AutoUpdateprogressBar.value = progressObj.percent;
        // }
        log_message = log_message + ' (' + (progressObj.transferred / 1048576).toFixed(2) + "/" + (progressObj.total / 1048576).toFixed(2) + ') MB';
        win.webContents.send('UpdateProgress', log_message);

    });

    

    

}

