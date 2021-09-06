import { combineReducers } from "redux";

import pinReducer from "./pinReducer"
import coinReducer from "./coinReducer";


export default combineReducers({coinReducer});