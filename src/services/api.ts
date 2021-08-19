import axiosClient from './axiosClient'

function getAllCoins () {
    return axiosClient.get('/listings/latest')
}

 const coinAPI = {
    getAllCoins,
}
export default coinAPI;