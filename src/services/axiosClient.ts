import axios from 'axios';
import { APIConfig } from "../configs/APIConfig";

const axiosClient = axios.create({
  baseURL: APIConfig.baseURL,
  headers: {
    'X-CMC_PRO_API_KEY': APIConfig.key,
  },
});
export default axiosClient;
