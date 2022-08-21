import { combineReducers } from "redux";
import userReducer from "./userSlice";
import loginReducer from "./authSlice";
import clickedUserReducer from "./clickedUserSlice";
import searchReducer from "./searchSlice";
import listingReducer from "./listingSlice";
import favouriteReducer from "./favouriteSlice";
import cartReducer from "./cartSlice";
import rolesReducer from "./rolesSlice";

export default combineReducers({
  roles:rolesReducer,
  cart: cartReducer,
  favourite: favouriteReducer,
  listing: listingReducer,
  search: searchReducer,
  clickedUser: clickedUserReducer,
  user: userReducer,
  login: loginReducer,
});
