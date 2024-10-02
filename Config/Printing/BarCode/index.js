const { currencyFormat } = require('../../../utility/Helpers')
const { BrowserWindow, Menu } = require('electron')
const path = require('path')

const MapData = (data) => {

  let html = '';
  if (data.printerType === '2.25W X 1.25L') {
    html = `
    <div class="store-name"><p>${data.storename}</p></div>
    <p class="p-5" id="price">${data.isActive.price ? `$${data.price}` : ``}</p>
     <div class="d-flex -m-t-12 p-5">
     <div class="barcode-div">
     <canvas id="canvas"></canvas>
    </div>
      <div class="product-details">
          <p id="barcodeno">${data.isActive.productNumber ? `${data.barcode}` : ``}</p> 
          <p id="productname">${data.productName} ${data.isActive.description ? `${data.description}` : ``}</p>
     </div>
    </div> `
  } else {
    html = `
     <div class="d-flex p-5">
     <div class="barcode-div">
     <canvas id="canvas"></canvas>
    </div>
      <div class="product-details">
      <p id="price">$${data.price}</p>
          <p id="productname">${data.productName}</p>
     </div>
    </div>
  `
  }

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
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });

  PrintWindow.setMenu(null);

  // setTimeout(() => {
  //   PrintWindow.webContents.openDevTools();
  // }, 3000);

  PrintWindow.loadURL(`file://${path.resolve(__dirname, data.printerType === '2.25W X 1.25L' ? 'BarCode.html' : 'SM-BarCode.html')}`);

  PrintWindow.webContents.on('did-finish-load', async () => {
    PrintWindow.webContents.send('Load', { html: MapData(data), info: data });
    PrintWindow.webContents.print({
      silent: true,
      printBackground: true,
      deviceName: name,
      copies: data.qty
    }, () => {
      try {
        if (PrintWindow) {
          PrintWindow.close();
        }
      }
      catch (e) { }
    });
  });
}


module.exports = {
  PrintBarCode,
}