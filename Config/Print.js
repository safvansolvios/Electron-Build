const {PosPrinter} = require("electron-pos-printer");
const {currencyFormat}  = require('../utility/Helpers')
const { app, BrowserWindow,screen,Menu} = require('electron')
const {TestFuncation,buildMenu,buildDefaultTemplate,buildDarwinTemplate } = require('../Menu')

const options = {
    preview: false,
    copies: 1,
    printerName: 'EPSON TM-T20II Receipt',
    pageSize: '80mm',
    footer:'Test Bar Code',
    silent:true,
    
 }

 const HR = {
    type:'text',
    value:'<hr>',
    style: { 
        fontWeight: "700", 
        textAlign: 'left',
        fontSize: "16px",
        bordertop: '2px dotted #000'
    }
    };

const DivFlex = {
    fontWeight: "700", 
    textAlign: 'left', 
    fontSize: "12px",
    margin: '2px 10px 0px 5px',
    display: 'flex',
    justifyContent: 'space-between'
};


const Producttable = (data) =>{

  let html = "";
  for (let index = 0; index < data.Data.length; index++) {
    const element = data.Data[index];
    html +=`<tr>
        <td style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>${element.lineNumber}</td>
        <td style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>${element.productName}</td>
        <td style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>${element.qty}</td>
        <td style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>${currencyFormat(element.pricePer)}</td>
        <td style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>${currencyFormat(element.qty*element.pricePer)}</td>
    </tr>`
  }
  return html;

}

const MapData = (data) =>{

    const NewData = [
        {
            type: 'text', value: '***DUPLICATE COPY***', style: { 
                fontWeight: "700",
                textAlign: 'center',
                fontSize: "16px",
                margin: '2px 0px 0px 0px'}
        },
        {
            type: 'text', value: `${data.CompanyName}`, style: { fontWeight: "700", textAlign: 'center',  fontSize: "16px",margin: '10px 0px 0px 0px'}
        },
        {
            type: 'text', value: `${data.Address}`, style: { fontWeight: "700", textAlign: 'center',  fontSize: "12px",margin: '2px 0px 0px 5px'}
        },
        {
            type: 'text', value: `ORDER # ${data.OrderNo}`, style: { fontWeight: "400", textAlign: 'left',  fontSize: "12px",margin: '2px 0px 0px 5px' }
        },
        {
            type: 'text', value: `INVOICE # ${data.InvoiceNo}`, style: {fontWeight: "400", textAlign: 'left',  fontSize: "12px",margin: '2px 0px 0px 5px'  }
        },
        {
            type: 'text', value: `DATE/TIME: ${data.Time}`, style: { fontWeight: "400", textAlign: 'left',  fontSize: "12px",margin: '2px 0px 0px 5px' }
        },
        {
            type: 'text', value: `CASHIER: ${data.Cashier}`, style: { fontWeight: "400", textAlign: 'left',  fontSize: "12px",margin: '2px 0px 0px 5px' }
        },
        {
            type: 'text', value: `STATION: ${data.StationNo}`, style: { fontWeight: "400", textAlign: 'left',  fontSize: "12px",margin: '2px 0px 0px 5px' }
        },
        {
            type: 'text', value: `<table style='font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 99.5%;'>
            <tr>
              <th style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>No.</th>
              <th style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>Product Name</th>
              <th style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>Qty</th>
              <th style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>Price</th>
              <th style='border: 1px dotted #dddddd;text-align: left;padding: 8px;'>Total</th>
            </tr>
            ${Producttable(data)}
          </table>
          `, style: { fontWeight: "400", textAlign: 'left',  fontSize: "12px",margin: '2px 10px 0px 5px' }
        },
        HR,
        {
            type: 'text', value: `<span>Subtotal</span><span>${currencyFormat(data.Subtotal)}</span>`, style: DivFlex
        },
        {
            type: 'text', value: `<span>Tax</span><span>${currencyFormat(data.Tax)}</span>`,style: DivFlex
        },
        {
          type: 'text', value: `<span>DisCount(%)</span><span>${currencyFormat(data.Discount)}</span>`,style: DivFlex
        },
        {
            type: 'text', value: `<span>GRAND TOTAL</span><span>${currencyFormat(data.Grandtotal)}</span>`, style: {  ...DivFlex ,fontSize: "16px !important"}
        },
        {
            type: 'text', value: 'Thank You', style: { fontWeight: "700", textAlign: 'center',  fontSize: "16px",margin: '15px 0px 0px 0px'}
        },
        {
            type: 'barCode',
            value: `${data.InvoiceNo}`,
            height: 40,   
            width: 1,
            position:'center',
            displayValue:true      
        }
    ];

    return NewData;
};

const PrintRecipt = (data,name) =>{

    options.printerName = name;
    PosPrinter.print(MapData(data), options)
    .then(res =>{ })
    .catch((error) => {
       console.error(error);
     });
}



const PreviewPrintRecipt = (data,name) =>{
   // options.printerName = name;
    PosPrinter.print(MapData(data), {
        ...options,
        printerName:name,
        preview:true,
        silent:false
     })
    .then(res =>{
        let count = BrowserWindow.getAllWindows().filter(b => { return b.isVisible()});
        for (let index = 0; index < count.length; index++) {
            if(count[index].getTitle() === 'Print preview'){
                count[index].setMinimizable(false);
                count[index].setMaximizable(false);
                const template = [
                    {
                      label: 'print',
                      click: () => { 
                        count[index].webContents.print({silent: true, printBackground: true, deviceName : name},() => {
                            count[index].close();
                        });
                        //count[index].close();
                     }
                    }
                  ]
                  const menu = Menu.buildFromTemplate(template)
                  count[index].setMenu(menu);
            }
        }
    })
    .catch((error) => {
       console.error(error);
     });
}

module.exports = {
    PrintRecipt,
    PreviewPrintRecipt
}