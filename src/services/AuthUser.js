import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/authSlice";
import { UserLogout } from "../redux/userSlice";
import { ClickedUserLogout } from "../redux/clickedUserSlice";
import { ResetSearch } from "../redux/searchSlice";
import { emptyCart } from "../redux/cartSlice";
import { ResetFavs } from "../redux/favouriteSlice";

export default function AuthUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));

    setToken(token);
    navigate("/");
  };

  const logout = () => {
    dispatch(logoutSuccess());
    dispatch(UserLogout());
    dispatch(ClickedUserLogout());
    dispatch(ResetSearch());
    dispatch(emptyCart());
    dispatch(ResetFavs());
    localStorage.clear();
    navigate("/login");
  };

  const http = axios.create({
    baseURL: "http://localhost:8000/api/auth",
    headers: {
      "content-type": "multipart/form-data",
      Accept: "application/json",
    },
  });

  const httpwtoken = axios.create({
    baseURL: "http://localhost:8000/api/auth",
    headers: {
      Accept: "application/json",
      "content-type": "multipart/form-data",
      authorization: "Bearer " + getToken(),
    },
  });

  return {
    setToken: saveToken,
    token,
    getToken,
    http,
    httpwtoken,
    logout,
  };
}
