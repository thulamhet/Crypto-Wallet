import axiosClient from './axiosClient';

function getAllCoins () {
    return axiosClient.axiosClientCoinMarketCap.get('/listings/latest')
    .then((response) => response.data);
}

function getSymbolsInfo(symbols) {
    return axiosClient.axiosClientCoinMarketCap.get(`/info?symbol=${symbols}`)
    .then((response) => response.data);
}

function getPeriodCoins (symbol, period_id) { 
    console.log(symbol, period_id);
    return axiosClient.axiosClientCoinAPI.get(`/${symbol}/USD/latest?period_id=${period_id}`)
    .then((response) => response.data);
}

const CoinAPI = {
    getAllCoins,
    getSymbolsInfo,
    getPeriodCoins
}
export default CoinAPI;