import { React } from "react";
import "./listings.css";
import AuthUser from "../../services/AuthUser";

const Listings = () => {
  const { getToken } = AuthUser();



  if (!getToken()) {
    return (
      <div>
        <h1 id="header">Listings</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 id="header">Listings Logged In</h1>
    </div>
  );
};

export default Listings;
