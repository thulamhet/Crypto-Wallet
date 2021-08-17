  
import rootReducer from "./reducer/index";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({reducer: rootReducer})