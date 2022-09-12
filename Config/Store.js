// Refrences
//https://github.com/sindresorhus/electron-store/issues/32
//https://github.com/sindresorhus/electron-store/issues/115
//C:\Users\Smit Doshi\AppData\Roaming\my-electron-app\TerminalData
//D:\Botiga\Electron-Build\my-electron-app\node_modules\json-schema-typed\dist-types

const Store = require('electron-store');
const { execSync } = require('child_process');

let _store;

const _schema = 
{
	connection:
    {
        type: 'array',
        items: 
        {
            type: 'object',
            properties: 
            {
                id:{type:'number',},
                ConnectionName:{type:'string'},
                url:{ type: 'string',pattern:"^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"}
            },
            required: ["id","url"]
        }
    },    
    pinpad:
    {
        type: 'object',
        properties: {
            PinPadIp: { type: 'string' },
            PinPadPort: { type: 'string' },
            SerialNumber: { type: 'string' },
        },
    }
};


   const store  = new Store({
        name:"TerminalSetting",
        encryptionKey:execSync('wmic csproduct get IdentifyingNumber').toString().replace('IdentifyingNumber','').trim(),
        schema:_schema,
        fileExtension:".wxs",
        cwd:"TerminalSetting",
    });

module.exports = {
    store
};