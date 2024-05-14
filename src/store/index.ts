'use client';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "@/store/auth/authSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {userNameReducer} from "@/store/auth/userSlice";

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ["authState"],
};

const userNamePersistConfig = {
    key: 'userName',
    storage: storage,
    whitelist: ["userNameState"],
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    userName: persistReducer(userNamePersistConfig, userNameReducer),
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