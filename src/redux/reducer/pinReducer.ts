import { CHANGE_PIN } from "../action/pinAction";

const initialValue = {
    checkPin: true,
};

export default function pinReducer (state = initialValue, action: any) {
    switch(action.type) {
        case CHANGE_PIN:
            return action.payload;
        default: 
            return state;
    }
};