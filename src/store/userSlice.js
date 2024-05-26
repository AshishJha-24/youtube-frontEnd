import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:JSON.parse(localStorage.getItem("user"))
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            // Update user state immutably
            localStorage.setItem("user",JSON.stringify(action.payload))
            state.user = action.payload;
        },
        logout: (state) => {
            // Update user state immutably
            localStorage.clear();
            state.user = null;
        }
    }
});

export const { login } = userSlice.actions;

export default userSlice.reducer;