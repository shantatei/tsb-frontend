import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedUser: {},
};

const clickedUserSlice = createSlice({
  name: "clickedUser",
  initialState,
  reducers: {
    ClickedUserSuccess: (state, { payload }) => {
      state.clickedUser = payload;
    },
    ClickedUserLogout: (state) => {
      state.clickedUser = {};
    },
  },
});

const { reducer, actions } = clickedUserSlice;

export const { ClickedUserSuccess, ClickedUserLogout } = actions;

export default reducer;
