import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    SetRoles: (state, { payload }) => {
      state.roles = payload;
    },
    ResetRoles: (state) => {
      state.roles = [];
    },
  },
});

const { reducer, actions } = roleSlice;

export const { SetRoles, ResetRoles } = actions;

export default reducer;
