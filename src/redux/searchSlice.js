import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    SetSearch: (state, { payload }) => {
      state.searchTerm = payload;
    },
    ResetSearch: (state) => {
      state.searchTerm = "";
    },
  },
});

const { reducer, actions } = searchSlice;

export const { SetSearch, ResetSearch } = actions;

export default reducer;
