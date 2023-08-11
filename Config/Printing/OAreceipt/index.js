const { currencyFormat } = require('../../../utility/Helpers')
const { BrowserWindow, Menu } = require('electron')
const path = require('path')

const MapData = (data) => {
  const html =
    `
        <div class="dop-copy">
        <h2>Accounts Receivable Transaction</h2>
      </div>
      
      <div class="shift-deatils">
             <div class="order-txt flex-start">
                 <h4>DATE/TIME : </h4>
                 <h6 id="storeId">${data.currentDate}</h6>
             </div>
             <div class="order-txt flex-start">
                 <h4>CASHIER : </h4>
                 <h6 id="shift">${data.cashierId}</h6>
             </div>
             <div class="order-txt flex-start">
                 <h4>STATION : </h4>
                 <h6 id="shiftStart">${data.terminalId}</h6>
             </div>
             <div class="order-txt flex-start">
                 <h4>CUSTOMER INFO : </h4>
                 <h6 id="shifEnd"> ${data.customerName} </h6>
             </div>
         </div>
        <hr>
         <div class="order-txt flex-start">
             <strong> Trans # ${data.transactionId}-- Payment ${data.paymentMethod} </strong>
         </div>
             
         <div class="order-txt flex-start comment">
             <p>${data.description}
             </p>  
         </div>
           
         <hr>
      <div class="bottom-tab">
        <h4> Previous Balance</h4>
        <h6> ${currencyFormat(data.previousBalance)} </h6>
      </div>
      <div class="bottom-tab">
        <h4> Amount Applied </h4>
        <h6> ${currencyFormat(data.amtApplied)}</h6>
      </div>
      <div class="bottom-tab">
        <h4> New Balance </h4>
        <h6> ${currencyFormat(data.newBalance)} </h6>
      </div>
      <div class="thank">
        <h4>Thank You</h4>
      </div>`;
  return html;
};

const PrintOAreceipt = (data, name) => {

  return new Promise((resolve, reject) => {

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
    PrintWindow.loadURL(`file://${path.resolve(__dirname, 'index.html')}`);
    PrintWindow.webContents.on('did-finish-load', async () => {
      PrintWindow.webContents.send('LoadInvoice',
        { html: MapData(data) }
      );
      PrintWindow.webContents.print({
        silent: true,
        printBackground: true,
        deviceName: name
      }, () => {
        PrintWindow.close();
        resolve(true);
      });
    });
  });
}

module.exports = {
  PrintOAreceipt
}