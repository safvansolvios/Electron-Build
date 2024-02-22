// const { app, BrowserWindow, screen, dialog, session, net } = require('electron')
// const { download } = require('electron-dl');
// const { print } = require('pdf-to-printer');
// const fs = require('fs')
// const axios = require('axios');
// const path = require('path')

// app.whenReady().then(async () => {

//     console.log(path.join(app.getAppPath(), 'temp','tmp_pdf.pdf'));

//     let window = new BrowserWindow({
//         width: 380,
//         height: 566,
//         show: true,
        
//     });
//     window.loadURL('https://www.google.com');


//     //window.webContents.downloadURL('http://localhost:5000')

//     session.defaultSession.webRequest.onBeforeSendHeaders( { urls: ["*://*/api/report/*"] }, (details, callback) => {
//         details.requestHeaders['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI0NjQwMDYyNS04NmFlLTRlMzktODU0MS1lMjg5NzE0ZmE3ZGEiLCJpYXQiOiIxNC0wOC0yMDIzIDA4OjU2OjA0IiwiVXNlck5hbWUiOiIxIiwiVGVybWluYWxJZCI6IjEiLCJTdG9yZUlkIjoiMSIsIlJvbGUiOiJBZG1pbiIsImV4cCI6MTY5MjA4OTc2NCwiaXNzIjoiSldUQXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJKV1RTZXJ2aWNlUG9zdG1hbkNsaWVudCJ9.OYTQ74PyL8suh7mw-DvDq-sQG0gzZjW_TtglSHis8ec';
//         callback({ requestHeaders: details.requestHeaders })
//     })

    

//     setTimeout(async () => {
//       await download(window, 'http://192.168.1.26/api/report/credit-card-detail?startDate=08/11/2023&endDate=08/11/2023&storeId=1&terminalId=1&paymentMethod=undefined', {
//         onProgress: (progress) => {
//             window.webContents.send("download progress", progress);
//           console.log("download progress", progress);
//         },
//         onCompleted: (item) => {
//             window.webContents.send("download complete", item);
         
//         },
//         onStarted: () => {
//             window.webContents.send("download start", "Start Download");
//         }
//       }).then(() => {

//       }).catch((err) => {
//         console.log("error", err);
//       });
//     }, 3000);

    

//     //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRhNTY3MDQ1YTQzODZlMmI0Nzg3NTRmIiwicm9sZSI6InVzZXIiLCJ1c2VybmFtZSI6ImRzbWl0MDg5IiwiZW1haWwiOiJkc21pdDA4OUBnbWFpbC5jb20iLCJpYXQiOjE2OTE4MjY0MjYsImV4cCI6MTY5MjQzMTIyNn0.M9NGWPgItQjC62JMr12gwaNzHe2JTgKafH8NnoytlDA
// //     axios.get("http://localhost:5000",
// //     {responseType: "arraybuffer",headers: {'Accept': 'application/pdf'}})
// //    .then(res => {
// //     console.log(res)
// //       //  let printer = printer_settings["printFormatX"];
// //       const DirectoryPath = path.join(app.getAppPath(), 'temp','tmp_pdf.pdf');
// //         fs.writeFileSync(app.getAppPath() + "/demo.pdf", res.data, {encoding: "binary"});
// //     })

// //     const getallprinter = await window.webContents.getPrintersAsync();
// //     const GetDefualtPrinter = getallprinter.filter(x => x.isDefault === true);

// //     axios.get("http://127.0.0.1:5500/test1.pdf",
// //     {responseType: "arraybuffer",headers: {'Accept': 'application/pdf'}})
// //    .then(res => {
// //     console.log(res)
// //       //  let printer = printer_settings["printFormatX"];
// //         let tmpFile = __dirname + "/tmp_pdf.pdf"
// //         fs.writeFileSync(tmpFile, res.data, {encoding: "binary"});
// //         print(tmpFile, res.data, {printer: GetDefualtPrinter[0].name}).then(()=>{
// //             console.log("print finished")
// //         });
// //     })

// });