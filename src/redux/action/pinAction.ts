import { Dispatch } from "@reduxjs/toolkit";

export const CHANGE_PIN = 'CHANGE_PIN';

export const changePin = (data: any) => (dispatch: Dispatch) => {
    dispatch ({
        type: CHANGE_PIN,
        payload: data
    })
};