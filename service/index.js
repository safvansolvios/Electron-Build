const axios = require('axios');

const CheckTerminal = async (host,data) =>{
    return await axios.get(`http://${host}:8081/api/terminal/termilal-check`,{params: data});
};

const CheckHealth = async (host,data) =>{
    return await axios.get(`http://${host}:8081/_health`);
};

module.exports = {
    CheckTerminal,
    CheckHealth
};