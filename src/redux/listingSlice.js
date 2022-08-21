import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    SetProducts: (state, { payload }) => {
      state.products = payload;
    },
    // UpdateProducts:(state,{payload})=>{
    //   state.products.map((product)=>{
    //     if(product.id == payload.id){
    //       product = payload
    //     }
    //   })
    // },
    ResetProducts: (state) => {
      state.products = [];
    },
  },
});


const { reducer, actions } = listingSlice;

export const { SetProducts,ResetProducts,UpdateProducts} = actions;

export default reducer;

