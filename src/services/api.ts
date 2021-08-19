import axiosClient from './axiosClient'

function getAllCoins () {
    return axiosClient.get('/listings/latest')
    .then((response) => response.data);
}

function getSymbolsInfo(symbols) {
    return axiosClient.get(`/info?symbol=${symbols}`)
    .then((response) => response.data);
}

 const CoinAPI = {
    getAllCoins,
    getSymbolsInfo
}
export default CoinAPI;