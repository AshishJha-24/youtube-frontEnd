import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{
        
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            // Update user state immutably
            state.user = action.payload;
        },
        logout: (state) => {
            // Update user state immutably
            state.user = null;
        },
        updateStore:(state,action)=>{
            console.log(action.payload);
            state.user=action.payload;
        }

    }
});

export const { login,logout,updateStore } = userSlice.actions;

export default userSlice.reducer;