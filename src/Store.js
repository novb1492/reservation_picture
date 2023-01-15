import { configureStore } from "@reduxjs/toolkit";
import ReserReducers from "./reducers/ReserReducers";


const store = configureStore({ reducer: {
    ReserReducers
} });

export default store;