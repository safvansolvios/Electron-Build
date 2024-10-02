const dns = require('dns');
const ping = require('ping');
const getMAC = require('getmac');
const { CheckHealth } = require('../service');

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

const GetMAC = async () => {
  return getMAC.default();
};

const ProcessHealthCheckResult = async (numeric_host) => {

  const Req = await CheckHealth(numeric_host);

  let res = {};

  if (Req.data.status === 'Healthy') {
    res.numeric_host = `${numeric_host}:8081`
    if (Req.data.entries?.Database?.status === 'Healthy' &&
      Req.data.entries?.OnlineRegistration?.status === 'Healthy') {
      res.alive = true;
    } else {
      res.alive = false;
      res.reason = "Registraion Code not valid.";
    }
    return res;
  } else {
    res.alive = false;
    res.reason = "Server not found.";
    return res;
  }
};

const generateRandomId = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

module.exports = {
  currencyFormat,
  getIP,
  Ping,
  GetMAC,
  generateRandomId,
  ProcessHealthCheckResult
}