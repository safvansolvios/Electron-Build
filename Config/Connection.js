const {getStore} = require('../Config/Store');

const GetAllConnection = () =>
{
    return getStore.get('connection');
}


const SetConnection = (_ConnectionName,_url) =>
{

    try{
    var obj = { id:Math.floor(Math.random() * 1000) + 1, ConnectionName:_ConnectionName, url : _url }

    const connection = getStore.get('connection');
    const newconnection = [...(connection || []), obj];

    getStore.set('connection',newconnection);
    }
    catch(e){}
    return true;
}

const GetPinpadSetting = () =>
{
    return getStore.get('pinpad');
}

const RemoveConnection = (ConnectionName) =>
{
    return true;
}

const SetPinPad = (PinPadIp,PinPadPort,SerialNumber) =>
{
    
    getStore.set('pinpad',
    {
        "PinPadIp":PinPadIp,
        "PinPadPort":PinPadPort,
        "SerialNumber":SerialNumber
    });

    return true;
}

const SaveConnectionFile =(data)=>
{
    return true;
}

const ReadConnectionFile =()=>{
    let data = {}
   
    return data;
}

module.exports ={
    GetAllConnection,
    GetPinpadSetting,
    SetConnection,
    RemoveConnection,
    SetPinPad,
    ReadConnectionFile
}

