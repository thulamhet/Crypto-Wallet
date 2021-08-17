import { CHANGE_SEARCH } from "../action/searchAction";

const initialValue = {
    color: [{newColor: 'pink'}]
};

export default function colorReducer (state = initialValue, action: any) {
    switch(action.type) {
        case CHANGE_SEARCH:
            return action.payload;
        default: 
            return state;
    }
};