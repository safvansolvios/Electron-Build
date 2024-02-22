const { currencyFormat } = require('../../../utility/Helpers')
const { BrowserWindow, Menu } = require('electron')
const path = require('path')

const MapData = (data) => {
  let html = `
        <div class="store-name mb-1">Botiga</div>
         <div class="d-flex">
         <div class="barcode-div">
         <canvas id="canvas"></canvas>
        </div>
          <div class="product-details">
              <p id="productname">${data.productName}</p>
              <p id="description">${data.description}</p>
              <p id="price">${data.price}</p>
             
         </div>
        </div>
        <p id="barcodeno">${data.barcode}</p>
      `

      return html;
};



const PrintBarCode = async (data, name) => {

  const PrintWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    resizable: true,
    frame: true,
    transparent: false,
    show: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });

  PrintWindow.setMenu(null);

  setTimeout(() => {
    PrintWindow.webContents.openDevTools();
  }, 3000);

  PrintWindow.loadURL(`file://${path.resolve(__dirname, 'BarCode.html')}`);

  PrintWindow.webContents.on('did-finish-load', async () => {
    PrintWindow.webContents.send('Load', { html: MapData(data), info: data });
    // for (let i = 0; i < data.qty; i++) {
    //   Print(PrintWindow,data.printer);
    // }

    // const template = [
    //   {
    //     label: 'print',
    //     click: () => {
    //       PrintWindow.webContents.print({
    //         silent: true,
    //         margins: '0',
    //         printBackground: true, deviceName: name
    //       }, () => {
    //         //PrintWindow.close();
    //       });
    //     }
    //   }
    // ]
    // const menu = Menu.buildFromTemplate(template)
    // PrintWindow.setMenu(menu);

    PrintWindow.webContents.print({
      silent: false,
      printBackground: true,
      deviceName: name,
      copies:data.qty
    }, () => {
      try{
        if(PrintWindow){
          PrintWindow.close();
        }
      }
      catch(e){}
    });
  });
}


module.exports = {
  PrintBarCode,
}