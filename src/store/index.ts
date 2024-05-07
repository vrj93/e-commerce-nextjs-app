'use client';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "@/store/authSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ["authState"],
};

const persistedReducer = persistReducer  (authPersistConfig, authReducer);

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;