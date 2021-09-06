import { Dispatch } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import CoinAPI from "../../services/api";
import axiosClient from "../../services/axiosClient";

export const GET_COIN = 'GET_COIN';

export const getAllCoin = () => (dispatch: Dispatch) => {
    axiosClient.axiosClientCoinMarketCap.get('/listings/latest').then(res => {
        dispatch({
            type: GET_COIN,
            data: res.data,
        });
    })
    .catch(error => {
        console.log(error);
        Alert.alert('Failed to get api');
    });
};