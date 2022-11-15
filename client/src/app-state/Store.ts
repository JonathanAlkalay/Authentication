import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api-slice/RootApiSlice";


const reducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer
});

const middleware: Middleware[] = [apiSlice.middleware];

export type RootState = ReturnType<typeof reducer>;
export const createStore = () => configureStore({reducer, middleware })
