import { GET_COIN } from "../action/coinAction";
const initialValue = {
    coins: [],
};

export default function coinReducer (state = initialValue, action: any) {
    switch(action.type) {
        case GET_COIN:
            console.log('actiondata', action.data.data[0])
            return {
                ...state,
                coins: action.data
            };
        default: 
            return state;
    }
};