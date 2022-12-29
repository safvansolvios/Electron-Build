const {PosPrinter} = require("electron-pos-printer");
const path = require('path')
const { dirname } = require('path');

const options = {
    preview: true,
    margin: '0 0 0 0',    
    copies: 1,
    printerName: 'XP-80C',
    timeOutPerLine: 400,
    pageSize: '80mm' // page size
 }

 const HR = 

const data = [
    {
        type: 'text', value: '***DUPLICATE COPY***', style: { fontWeight: "700", textAlign: 'center',  fontSize: "16px",margin: '10px 0px 0px 0px'}
    },
    {
        type: 'text', value: 'BOTIGA', style: { fontWeight: "700", textAlign: 'center',  fontSize: "16px",margin: '10px 0px 0px 0px'}
    },
    // {
    //     type: 'text', value: 'JCR Fashion Retail Pvt. Ltd.', style: {fontWeight: "700", textAlign: 'center',  fontSize: "14px",margin: '5px 0px 0px 0px'}
    // }, 
    {
        type: 'text', value: '122 E DIVISION RD, <br /> OAK RIDGE, TN 37830', style: { fontWeight: "700", textAlign: 'center',  fontSize: "12px",margin: '5px 0px 15px 0px'}
    },

    {
        type: 'text', value: 'ORDER # 288088', style: { fontWeight: "700", textAlign: 'left',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    },
    {
        type: 'text', value: 'INVOICE # 288088', style: { fontWeight: "700", textAlign: 'left',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    },
    {
        type: 'text', value: 'DATE/TIME: 10/17/2022 11:17:00 AM', style: { fontWeight: "700", textAlign: 'left',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    },
    {
        type: 'text', value: 'CASHIER: 100101', style: { fontWeight: "700", textAlign: 'left',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    },
    {
        type: 'text', value: 'STATION: 02', style: { fontWeight: "700", textAlign: 'left',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    },
    

    // {
    //     type: 'text', value: 'Mahendra Mil Road, Kalol 382721', style: { fontWeight: "700", textAlign: 'center',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    // }, 
    // {
    //     type: 'text', value: 'Dsmit089@gmail.com', style: { fontWeight: "700", textAlign: 'center',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    // },
    // {
    //     type: 'text', value: 'www.solvios.com,CC:8460593707', style: { fontWeight: "700", textAlign: 'center',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    // },
    // {
    //     type: 'text', value: 'GST:2452125245212', style: { fontWeight: "700", textAlign: 'center',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    // },
    // {
    //     type: 'barCode',
    //     value: '023456789010',
    //     height: 40,                    
    //     width: 2                     
    //     // position:'center',
    //     // style: { margin: '50px' }
    // },
    // {
    //     type: 'text', value: 'INVOICE', style: { fontWeight: "700", textAlign: 'center',  fontSize: "16px",margin: '20px 0px 20px 0px'}
    // },
    // {
    //     type:'text',value:'<hr>',style: { fontWeight: "700", textAlign: 'center',  fontSize: "16px",  bordertop: '1px dashed red'}
    // },
    {
        type:'text',value:'<hr>',style: { fontWeight: "700", textAlign: 'left',  fontSize: "16px",  bordertop: '1px dashed red'}
    },
    {
        type: 'table',
        style: {border: '1px solid #ddd'},             // style the table
        // list of the columns to be rendered in the table header
        tableHeader: ['CODE', 'PRODUCT','QT','RATE','AMT'],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: [
            ['5522', 'Nike Air Max 95 By You','15','$60','$900'],
            ['8899', 'School Bag','15','$60','$900'],
            ['2323', 'Way to go','15','$60','$900'],
            ['20341234', 'My Toy','15','$60','$900'],
        ],
        // list of columns to be rendered in the table footer
        tableFooter: [],
        // custom style for the table header
        tableHeaderStyle: { backgroundColor: '#000', color: 'white'},
        // custom style for the table body
        tableBodyStyle: {'border': '0.5px solid #ddd'},
        // custom style for the table footer
        tableFooterStyle: {backgroundColor: '#000', color: 'white'},
    },
    {
        type:'text',value:'<hr>',style: { fontWeight: "700", textAlign: 'left',  fontSize: "16px",  bordertop: '1px dashed red'}
    },
    {
        type: 'text', value: '<div style="display: flex;justify-content: space-between;"><span>Subtotal</span><span>$500</span></div>', style: { 
            fontWeight: "700", textAlign: 'left',  fontSize: "12px",margin: '5px 0px 0px 0px'
        }
    },
    {
        type: 'text', value: '<div style="display: flex;justify-content: space-between;"><span>Tax</span><span>$500</span></div>', style: { fontWeight: "700", textAlign: 'left',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    },
    {
        type: 'text', value: '<div style="display: flex;justify-content: space-between;"><span>GRAND TOTAL</span><span>$500</span></div>', style: { fontWeight: "700", textAlign: 'left',  fontSize: "16px",margin: '5px 0px 0px 0px'}
    },
    {
        type: 'text', value: '<div style="display: flex;justify-content: space-between;"><span>Cash</span><span>$500</span></div>', style: { fontWeight: "700", textAlign: 'left',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    },
    {
        type: 'text', value: '<div style="display: flex;justify-content: space-between;"><span>Amt Tendered</span><span>$500</span></div>', style: { fontWeight: "700", textAlign: 'left',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    },
    {
        type: 'text', value: '<div style="display: flex;justify-content: space-between;"><span>Change</span><span>$500</span></div>', style: { fontWeight: "700", textAlign: 'left',  fontSize: "12px",margin: '5px 0px 0px 0px'}
    },
    {
        type: 'text', value: 'Thank You', style: { fontWeight: "700", textAlign: 'center',  fontSize: "16px",margin: '15px 0px 0px 0px'}
    },
    {
        type: 'barCode',
        value: '023456789010',
        height: 40,                    
        width: 2                     
        // position:'center',
        // style: { margin: '50px' }
    },
]


const PrintRecipt = () =>{
    
    PosPrinter.print(data, options)
    .then(console.log)
    .catch((error) => {
       console.error(error);
     });
}

module.exports = {
    PrintRecipt
}