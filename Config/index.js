
const Dev = require('./DevConfig');
const Prod = require('./ProdConfig');

module.exports = () =>
{
    return process.env.ELECTRON_DEV ? Dev : Prod;
};
