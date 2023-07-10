const axios = require('axios');

const CheckTerminal = async (host,data) =>{
    return await axios.get(`http://${host}/api/terminal/termilal-check`,{params: data});
};

module.exports = {
    CheckTerminal
};