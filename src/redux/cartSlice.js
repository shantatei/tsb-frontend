import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );

      const qtyStated = payload.qty;

      if (qtyStated == 1) {
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].cartQuantity += 1;
       
        } else {
          const tempProduct = { ...payload, cartQuantity: 1 };
          state.cartItems.push(tempProduct);
        }
      } else {
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].cartQuantity += qtyStated;
          state.cartItems[itemIndex].qty = 1;
        } else {
          const tempProduct = { ...payload, cartQuantity: qtyStated };
          state.cartItems.push(tempProduct);
        }
      }
    },
    removeFromCart: (state, { payload }) => {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== payload.id
      );

      state.cartItems = nextCartItems;
    },
    decreaseCart: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== payload.id
        );

        state.cartItems = nextCartItems;
      }
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
    getTotals(state, { payload }) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

const { reducer, actions } = cartSlice;

export const { addToCart, removeFromCart, decreaseCart, emptyCart, getTotals } =
  actions;

export default reducer;
