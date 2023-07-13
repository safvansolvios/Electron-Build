const axios = require('axios');

const CheckTerminal = async (host,data) =>{
    return await axios.get(`http://${host}/api/terminal/termilal-check`,{params: data});
};

const CheckHealth = async (host,data) =>{
    return await axios.get(`http://${host}/_health`);
};

module.exports = {
    CheckTerminal,
    CheckHealth
};