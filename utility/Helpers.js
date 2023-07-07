

const currencyFormat = (num) =>
{
    return '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

module.exports ={
    currencyFormat
}