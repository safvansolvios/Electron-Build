const { currencyFormat } = require('../../../utility/StringHelpers')
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
   <h2> ***DUPLICATE COPY***</h2>
 </div>
 <div class="botiga-head">
   <h4>${data.CompanyName}</h4>
   <h6>${data.Address}</h6>
 </div>
 <div class="left-text">
   <P> ORDER : ${data.OrderNo} </P>
   <P> INVOICE : ${data.InvoiceNo} </P>
   <P> DATE/TIME: ${data.Time}</P>
   <P> CASHIER : ${data.Cashier} </P>
   <P> STATION : ${data.StationNo} </P>
 </div>
 <div class="table-side">
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
 </div>
 <div class="bottom-tab">
   <h4> Subtotal</h4>
   <h4> ${currencyFormat(data.Subtotal)} </h4>
 </div>
 <div class="bottom-tab">
   <h4> Tax</h4>
   <h4> ${currencyFormat(data.Tax)} </h4>
 </div>
 <div class="bottom-tab">
   <h4> DisCount(%) </h4>
   <h4> ${currencyFormat(data.Discount)}</h4>
 </div>
 <div class="bottom-tab">
   <h4> GRAND TOTAL </h4>
   <h4> ${currencyFormat(data.Grandtotal)} </h4>
 </div>
 <div class="thank">
   <h4>Thank You</h4>
 </div>`;
    return html;
};

const PrintInvoiceRecipt = (data, name, MainWin) => {

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
        PrintWindow.webContents.send('LoadInvoice', MapData(data));
        PrintWindow.webContents.print({ silent: true, printBackground: true, deviceName: name }, () => {
            PrintWindow.close();
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
        PrintWindow.webContents.send('LoadInvoice', MapData(data));
    });
}

module.exports = {
    PrintInvoiceRecipt,
    PreviewPrintInvoiceRecipt
}