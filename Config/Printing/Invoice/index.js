const { currencyFormat } = require('../../../utility/Helpers')
const { BrowserWindow, Menu } = require('electron')
const path = require('path')

const Producttable = (data) => {

    let html = "";
    for (let index = 0; index < data.Data.length; index++) {
        const element = data.Data[index];
        html += `<tr>
        <td style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>${element.lineNumber}</td>
        <td style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>${element.productName}</td>
        <td style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>${element.qty}</td>
        <td style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>${currencyFormat(element.pricePer)}</td>
        <td style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>${currencyFormat(element.qty * element.pricePer)}</td>
    </tr>`
    }
    return html;
}

const MapData = (data) => {
    const html =
        `
 <div class="dop-copy">
   <h2> ${data.CompanyName}</h2>
 </div>
 <div class="botiga-head ${data.CompanyName ? '':'d-none'}">
   <h6>${data.Address}</h6>
 </div>
 <div class="left-text">
   <P> INVOICE : ${data.InvoiceNo} </P>
   <P class="${data.PrintObject.PrintCustomerinfo === 0 ? 'd-none' : '' }"> CUSTOMER ID : ${data.CustomerCode} </P>
   <P> DATE/TIME: ${data.Time}</P>
   <P> CASHIER : ${data.Cashier} </P>
   <P> TERMINAL : ${data.Terminal} </P>
   <P> PAYMENT METHOD : ${data.PaymentMethod} </P>
   <P> CHANGE : ${currencyFormat(data.AmtChange)} </P>
 </div>
 <div class="table-side">
 <hr>
   <table>
     <tr>
       <th>NO.</th>
       <th>Product Name</th>
       <th>QTY</th>
       <th>Price</th>
       <th>Total</th>
     </tr>
     ${Producttable(data)}
   </table>
   <hr>
 </div>
 <div class="bottom-tab">
   <h4> Subtotal</h4>
   <h6> ${currencyFormat(data.Subtotal)} </h6>
 </div>
 <div class="bottom-tab">
   <h4> Tax</h4>
   <h6> ${currencyFormat(data.Tax)} </h6>
 </div>
 <div class="bottom-tab ${data.PrintObject.PrintDiscount === 0 ? 'd-none' : '' }">
   <h4> Discount(%) </h4>
   <h6> ${currencyFormat(data.Discount)}</h6>
 </div>
 <div class="bottom-tab">
   <h4> GRAND TOTAL </h4>
   <h6> ${currencyFormat(data.Grandtotal)} </h6>
 </div>
 <div class="thank">
   <h4>Thank You</h4>
 </div>`;
    return html;
};

const PrintInvoiceRecipt = (data, name) => {
  
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
  PrintWindow.loadURL(`file://${path.resolve(__dirname, 'Invoice.html')}`);
  PrintWindow.webContents.on('did-finish-load', async () => {
      PrintWindow.webContents.send('LoadInvoice', 
      {html : MapData(data),info:data}
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

const PreviewPrintInvoiceRecipt = (data, name) => {
  
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

    PrintWindow.loadURL(`file://${path.resolve(__dirname, 'Invoice.html')}`);

    PrintWindow.webContents.on('did-finish-load', async () => {
        const template = [
            {
                label: 'print',
                click: () => {
                    PrintWindow.webContents.print({
                        silent: true,
                        margins: '0',
                        printBackground: true, deviceName: name
                    }, () => {
                        PrintWindow.close();
                    });
                }
            }
        ]
        const menu = Menu.buildFromTemplate(template)
        PrintWindow.setMenu(menu);
        PrintWindow.webContents.send('LoadInvoice', 
        {html : MapData(data),info:data});
    });
}

module.exports = {
    PrintInvoiceRecipt,
    PreviewPrintInvoiceRecipt
}