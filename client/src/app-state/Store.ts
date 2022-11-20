import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import AuthApiSlice from "./api-slices/auth-api/RootApiSlice";


const reducer = combineReducers({
    [AuthApiSlice.reducerPath]: AuthApiSlice.reducer
});

const middleware: Middleware[] = [
    logger, 
    AuthApiSlice.middleware
];

export type RootState = ReturnType<typeof reducer>;
export const createStore = () => configureStore({
    reducer, 
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware) 
})
