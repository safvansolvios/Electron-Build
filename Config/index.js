const { PrintInvoiceRecipt, PreviewPrintInvoiceRecipt } = require('../Config/Printing/Invoice');
const { PrintOAreceipt } = require('../Config/Printing/OAreceipt');
const { PrintShiftReport} = require('../Config/Printing/ShiftClose');
const { PrintReport } = require('../Config/Printing/Report');

module.exports = {
    PrintInvoiceRecipt,
    PreviewPrintInvoiceRecipt,
    PrintShiftReport,
    PrintReport,
    PrintOAreceipt
}