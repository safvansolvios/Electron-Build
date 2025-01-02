const axios = require('axios');

const CheckTerminal = async (host,data) =>{
    return await axios.get(`http://${host}:8081/api/terminal/termilal-check`,{params: data});
};

const CheckHealth = async (host,data) =>{
    return await axios.get(`http://${host}:8081/_health`);
};

const OpenDrawerLog = async (host,token,reason) => {
    return await axios.post(`http://${host}:8081/api/cashdrawerlogs`,{reason},{
        headers: {
          'Authorization': `Bearer ${token} +xxxx`,
        }
      });
};

module.exports = {
    CheckTerminal,
    CheckHealth,
    OpenDrawerLog
};