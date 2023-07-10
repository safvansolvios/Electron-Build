const dns = require('dns');
const ping = require('ping');
const getMAC  = require('getmac');

const currencyFormat = (num) => {
    return '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const getIP = async (hostname) => {
    let obj = await dns.promises.lookup(hostname).catch((error) => {
      console.error(error);
    });
    return obj;
}
const Ping = async (hostname) => {
    return await ping.promise.probe(hostname);
}

const GetMAC = async () =>{
    return getMAC.default();
};

module.exports ={
    currencyFormat,
    getIP,
    Ping,
    GetMAC
}