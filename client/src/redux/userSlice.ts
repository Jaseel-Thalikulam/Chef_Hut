import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    isAuth:false
}

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        setUserUnauthenticated: (state) => {
            state.isAuth = false;
        },
        setUserAuthenticated: (state) => {
            state.isAuth = true;
        }
    }
})


export const { setUserUnauthenticated, setUserAuthenticated } = userSlice.actions;

export default userSlice.reducer;