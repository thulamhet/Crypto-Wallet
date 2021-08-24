import axios from 'axios';
import { APIConfig } from "../configs/APIConfig";

const axiosClientCoinMarketCap = axios.create({
  baseURL: APIConfig.coinMarketCap.baseURL,
  headers: {
    'X-CMC_PRO_API_KEY': APIConfig.coinMarketCap.key,
  },
});

const axiosClientCoinAPI = axios.create({ 
  baseURL: APIConfig.coinAPI.baseURL,
  headers: {
    'X-CoinAPI-Key': APIConfig.coinAPI.key,
  },
})

const axiosClient = {
  axiosClientCoinMarketCap, 
  axiosClientCoinAPI,
}

export default axiosClient;
