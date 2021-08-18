import axios from 'axios';
import { APIconfig } from "../configs/APIConfig";

const axiosClient = axios.create({
  baseURL: APIconfig.baseURL,
  headers: {
    'X-CMC_PRO_API_KEY': APIconfig.key,
  },
});
export default axiosClient;
