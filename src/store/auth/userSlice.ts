import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUserState {
    userNameState: string;
}

const initialState: IUserState = {
    userNameState: '',
}

export const userSlice = createSlice({
    name: 'userName',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.userNameState = action.payload;
        }
    }
});

export const { setUserName } = userSlice.actions;
export const userNameReducer = userSlice.reducer;
