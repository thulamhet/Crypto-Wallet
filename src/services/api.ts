import axiosClient from './axiosClient'
import { APIconfig } from '../configs/APIconfig'

function getAllCoins () {
    return axiosClient.get('/listings/latest')
}

 const coinAPI = {
    getAllCoins,
}
export default coinAPI;