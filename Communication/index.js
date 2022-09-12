const { ipcMain } = require('electron')
const {TestFuncation,buildMenu,buildDefaultTemplate,buildDarwinTemplate } = require('../Menu')
const {ReadConnectionFile,SetPinPad } = require('../Config/Connection');
module.exports = (MainWin,ClientWin) =>
{

    ipcMain.handle('GetPinPadSetting', async (event, arg) => {

        let data = { PinPadIp:"", PinPadPort:"", SerialNumber:""};
        var Jsondata = ReadConnectionFile();
        //let Jsondata = JSON.parse(Condata);
        if(Jsondata !== undefined)
        {
            data.PinPadIp = Jsondata.PinPadIp;
            data.PinPadPort = Jsondata.PinPadPort;
            data.SerialNumber = Jsondata.SerialNumber;
        }
        return data;
    })
    
    ipcMain.handle('SetPinPadSetting', async (event, arg) => 
    {
       try
       {
            SetPinPad(arg);
            return true;
       }
       catch
       {
        return false;
       }
       return false;
    })
    
    ipcMain.handle('GetAllSetting', async (event, arg) => 
    {
       return ReadConnectionFile();
    })

    ipcMain.on('UpdateClientScreen', (event, arg) => {
        console.log('client-ClientScreenData');
        if(ClientWin != undefined)
            ClientWin.webContents.send('ClientScreenData',arg);
      });
      
      ipcMain.on('title-updated', (e,data) => {
        
        
        MainWin.webContents.send('title-updated-Client',data);
      });
      
      ipcMain.on('anaction', (e,data) => {
        const menu = Menu.buildFromTemplate(buildDarwinTemplate());
        Menu.setApplicationMenu(menu);
        MainWin.webContents.send('Update-Menu');
      });

      ipcMain.on('internet-connection', (e,data) => {
        console.log(data);
        MainWin.webContents.send('internet-connection',data);
      });

      
}





