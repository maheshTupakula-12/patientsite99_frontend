import { combineReducers, configureStore } from "@reduxjs/toolkit";
import expertiseReducer from "./slices/listOfExpertise";

export const store = configureStore({
    reducer:combineReducers({
        expertiseReducer
    })
})