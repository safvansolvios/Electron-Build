const { PrintInvoiceRecipt, PreviewPrintInvoiceRecipt } = require('../Config/Printing/Invoice');
const { PrintOAreceipt } = require('../Config/Printing/OAreceipt');
const { PrintShiftReport} = require('../Config/Printing/ShiftClose');
const { PrintReport } = require('../Config/Printing/Report');
const { PrintBarCode } = require('../Config/Printing/BarCode');
const { DetailsDailyReport } = require('../Config/Printing/DetailsDailyReport');

module.exports = {
    PrintInvoiceRecipt,
    PreviewPrintInvoiceRecipt,
    PrintShiftReport,
    PrintReport,
    PrintOAreceipt,
    PrintBarCode,
    DetailsDailyReport
}