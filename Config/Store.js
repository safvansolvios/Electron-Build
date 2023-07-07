// Refrences
//https://github.com/sindresorhus/electron-store/issues/32
//https://github.com/sindresorhus/electron-store/issues/115
//C:\Users\Smit Doshi\AppData\Roaming\my-electron-app\TerminalData
//D:\Botiga\Electron-Build\my-electron-app\node_modules\json-schema-typed\dist-types

const Store = require('electron-store');

const _schema = {
    terminalConfig: {
        type: 'object',
        properties: {
            connection: {type: 'string'},
            terminalId: {type: 'string'},
            storeId: {type: 'string'},
            storeName: {type: 'string'},
        },
    }
};

const store = new Store({
    name: "TerminalSetting",
    //encryptionKey:execSync('wmic csproduct get IdentifyingNumber').toString().replace('IdentifyingNumber','').trim(),
    encryptionKey: ')u6+U5B#BB*N%&cw',
    schema: _schema,
    fileExtension: ".wxs",
    cwd: "TerminalSetting",
});

module.exports = store;
