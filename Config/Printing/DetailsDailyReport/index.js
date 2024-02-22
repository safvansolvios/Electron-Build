const { currencyFormat } = require('../../../utility/Helpers')
const { BrowserWindow, Menu } = require('electron')
const path = require('path')
const moment = require("moment")



const MapData = (data) => {
   let html = `
  <div class="header-title">
  <div class="d-report">
     <div class="d-flex">
        <span>Terminal : 1</span>
        <span>Cashier : 1</span>
     </div>
     <div class="report-text">
        <h4>DETAILED DAILY REPORT</h4>
        <span>${moment(data.startDateTime).format('MM/DD/YYYY')} - ${moment(data.endDateTime).format('MM/DD/YYYY')}</span>
     </div>
  </div>
</div>
<div class="total-sales">
  <h3> SALES TOTALS</h2>
  <table>
  <tr>
        <td>Net Sales</td>
        <td>${currencyFormat(data.netSales)}</td>
     </tr>
     <tr>
        <td>${data.tax1PerName}</td>
        <td>${currencyFormat(data.tax1)}</td>
     </tr>
     <tr>
        <td>${data.tax2PerName}</td>
        <td>${currencyFormat(data.tax2)}</td>
     </tr>
     <tr>
        <td>${data.tax3PerName}</td>
        <td>${currencyFormat(data.tax3)}</td>
     </tr>
     <tr>
        <td>${data.tax4PerName}</td>
        <td>${currencyFormat(data.tax4)}</td>
     </tr>
     <tr>
        <td>${data.tax5PerName}</td>
        <td>${currencyFormat(data.tax5)}</td>
     </tr>
     
     <tr class="bordernone">
        <td>${data.tax6PerName}</td>
        <td>${currencyFormat(data.tax6)}</td>
     </tr>
     <tr class="bordertop">
        <td>Grand Total Tax</td>
        <td>${currencyFormat(data.grandTotal)}</td>
     </tr>
     <tr class="borderbot">
        <td>Grand Total Sales with Tax</td>
        <td>${currencyFormat(data.grossSales)}</td>
     </tr>
     <tr>
        <td>Net Taxed Sales</td>
        <td>${currencyFormat(data.netSaleTaxed)}</td>
     </tr>
     <tr>
        <td>Net Non-Taxed Sales</td>
        <td>${currencyFormat(data.netSalesNonTaxed)}</td>
     </tr>
     <tr>
        <td>Net Tax Exempt Sales</td>
        <td>${currencyFormat(data.netSalesTaxExempt)}</td>
     </tr>
     <tr>
        <td>Coupon Total (Count : ${data.couponCount})</td>
        <td>${currencyFormat(data.couponTotal)}</td>
     </tr>

     <tr>
        <td>Gift Card Sale Price (Count : ${data.gcCountBySale})</td>
        <td>${currencyFormat(data.gcPriceWithTax)}</td>
     </tr>

     <tr>
        <td>Gift Card Balance By Sale</td>
        <td>${currencyFormat(data.gcRewardedAmountBySale)}</td>
     </tr>
     <tr>
     <td>Gift Card Balance By Reward (Count:${data.gcRewardedCountByPts})</td>
     <td>${currencyFormat(data.gcRewardedAmountByPts)}</td>
      </tr>
     <tr class="bordertop">
        <td>Gross T + GC</td>
        <td>${currencyFormat(data.grossSales + data.totalGCLineDiscount)}</td>
     </tr>
     <tr>
        <td>Gross T + GC - DISC for GC</td>
        <td>${currencyFormat(data.grossSales)}</td>
     </tr>
     <tr class="bordernone">
        <td>Total Voids (Count : ${data.voidInvoicesCount})</td>
        <td>${currencyFormat(data.voidInvoicesTotal)}</td>
     </tr>
     <tr>
     </tr>
  </table>
  <h3 class="text-center mt-2 font-weight-bold">LOTTO TRANSACTIONS</h3>
  <table>
     <tr>
        <td>Pay In Lotto</td>
        <td>${currencyFormat(data.totalPayInLotto)}</td>
     </tr>
     <tr>
        <td>Pay In Instant</td>
        <td>${currencyFormat(data.totalPayInInstant)}</td>
     </tr>
     <tr class="bordernone">
        <td>Pay In Total</td>
        <td>${currencyFormat(data.totalPayInLotto + data.totalPayInInstant)}</td>
     </tr>
     <tr class="bordertop">
        <td>Pay Out Lotto</td>
        <td>${currencyFormat(data.totalPayOutLotto)}</td>
     </tr>
     <tr>
        <td>Pay Out Instant</td>
        <td>${currencyFormat(data.totalPayOutInstant)}</td>
     </tr>
     <tr class="borderbot">
        <td>Pay Out Total</td>
        <td>${currencyFormat(data.totalPayOutLotto + data.totalPayOutInstant)}</td>
     </tr>
     <tr class="bordernone">
        <td>Final Lotto Total</td>
        <td>${currencyFormat(data.totalPayIn + data.totalPayOut)}</td>
     </tr>
  </table>
  <h3 class="text-center mt-2 font-weight-bold">BREAKDOWN BY PAYMENT TYPE</h3>
  <table>
     <tr>
        <td>Cash</td>
        <td>${currencyFormat(data.totalCash)}</td>
     </tr>
     <tr>
        <td>Cheque</td>
        <td>${currencyFormat(data.totalCheck)}</td>
     </tr>
     <tr>
        <td>Total EBT</td>
        <td>${currencyFormat(data.totalEBT)}</td>
     </tr>
     <tr>
        <td>Total On Account</td>
        <td>${currencyFormat(data.onAccount)}</td>
     </tr>
     <tr>
        <td>Total Debit Cards</td>
        <td>${currencyFormat(data.totalDebit)}</td>
     </tr>
     <tr>
        <td>Total Credit Cards</td>
        <td>${currencyFormat(data.totalCredit)}</td>
     </tr>
     <tr>
        <td>Total Gift Cards</td>
        <td>${currencyFormat(data.totalGiftCardRedeemed)}</td>
     </tr>
     <tr class="bordernone">
        <td>Open Drawer Count</td>
        <td>${data.openDrawerCount}</td>
     </tr>
  </table>
  ${data.breakdownByCategories.length > 0 ? '<h3 class="text-center mt-2 font-weight-bold">BREAKDOWN BY CATEGORY</h3>' : ''} 

  ${data.breakdownByCategories.map((item, index) => {
      return (
         `<table>
      <tr>
        <td>Category Name</td>
        <td>${item.categoryName}</td>
      </tr>
      <tr>
        <td>Product Sold</td>
        <td>${currencyFormat(item.totalItemSold)}</td>
      </tr>
      <tr>
        <td>Sales</td>
        <td>${currencyFormat(item.totalSales)}</td>
      </tr>
      <tr>
        <td>Coupon Discount</td>
        <td>${currencyFormat(item.totalCouponDiscount)}</td>
      </tr>
      <tr class="bordernone">
        <td>Sales After Coupon Discount</td>
        <td>${currencyFormat(item.totalSalesAfterCouponDiscount)}</td>
      </tr>
    </table>_col`
      )
   })}

  ${data.departmentWiseProducts.length > 0 ? '<h3 class="text-center mt-2 font-weight-bold">BREAKDOWN BY DEPARTMENT</h3>' : ''} 
  
  ${data.departmentWiseProducts.map((item, index) => {
      return (
         `<table>
         <tr>
         <td>Department Name</td>
         <td>${item.departmentName}</td>
      </tr>
      <tr>
         <td>Product Barcode</td>
         <td>${item.productCode}</td>
      </tr>
      <tr>
         <td>Product Name</td>
         <td>${item.productName}</td>
      </tr>
      <tr>
         <td>Price</td>
         <td>${currencyFormat(item.pricePer)}</td>
      </tr>
      <tr>
         <td>Qty</td>
         <td>${item.qty}</td>
      </tr>
      <tr class="bordernone">
         <td>Item Total</td>
         <td>${currencyFormat(item.totalPrice)}</td>
      </tr>
      </table>_col`)
   })}

  <table class="mt-2 mb-2">
     <tr>
        <td>TOTAL QTY</td>
        <td>${data.departmentWiseProducts.reduce((acc, item) => { return acc + item.qty; }, 0)}</td>
     </tr>
     <tr>
        <td>TOTAL ITEM PRICE</td>
        <td>${currencyFormat(data.departmentWiseProducts.reduce((acc, item) => { return acc + item.totalPrice; }, 0))}</td>
     </tr>
     <tr class="bordernone">
        <td>TOTAL WITHOUT LOTTO PAY IN/OUT</td>
        <td>${currencyFormat(data.netSales)}</td>
     </tr>
  </table>
  <div>
  </div>
</div>`
   return html.replaceAll(/_col,|_col/g, "");
};

const DetailsDailyReport = async (MainWin,data, name) => {

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

   // setTimeout(() => {
   //    PrintWindow.webContents.openDevTools();
   // }, 3000);

   PrintWindow.webContents.on('did-finish-load', async () => {
      PrintWindow.webContents.send('Load', { html: MapData(data) });

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
            MainWin.webContents.send("End Printing", "");
         }
         catch (e) { 
            MainWin.webContents.send("End Printing", "");
         }
      });
   });
}


module.exports = {
   DetailsDailyReport
}