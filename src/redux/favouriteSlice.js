import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourite: [],
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    SetFavs: (state, { payload }) => {
      state.favourite = payload;
    },
    ResetFavs: (state) => {
      state.favourite = [];
    },
  },
});


const { reducer, actions } = favouriteSlice;

export const { SetFavs,ResetFavs} = actions;

export default reducer;