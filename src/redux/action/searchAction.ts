import { Dispatch } from "@reduxjs/toolkit";

export const CHANGE_SEARCH = 'CHANGE_SEARCH';

export const changeSearch = (data: any) => (dispatch: Dispatch) => {
    dispatch ({
        type: CHANGE_SEARCH,
        payload: data
    })
};