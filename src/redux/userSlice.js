import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  error: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    UserSuccess: (state, { payload }) => {
      state.user = payload;
      state.error = "";
    },
    UserFail: (state, { payload }) => {
      state.error = payload;
    },
    UserLogout: (state) => {
      state.user = {};
      state.error = "";
      state.isAdmin = false;
    },
    UserIsAdmin: (state, { payload }) => {
      let isAdmin = payload.some((role) => role.role_name === "Admin");
      if (isAdmin) {
        state.isAdmin = true;
      } else {
        state.isAdmin = false;
      }
    },
  },
});

const { reducer, actions } = userSlice;

export const { UserSuccess, UserFail, UserLogout, UserIsAdmin } = actions;

export default reducer;
