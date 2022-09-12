
const Dev = require('./DevConfig');
const Prod = require('./ProdConfig');

module.exports = () =>
{
    console.log(Dev);
    return process.env.ELECTRON_DEV ? Dev : Prod;
};
