import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginNotPending:(state)=>{
        state.isLoading = false;
    },
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
    },
    loginFail: (state) => {
      state.isLoading = false;
    },
    logoutSuccess:(state)=>{
      state.isLoading = false;
      state.isAuth = false;
    }
  },
});

const {reducer,actions} = loginSlice

export const { loginNotPending,loginPending, loginSuccess, loginFail,logoutSuccess} = actions

export default reducer
