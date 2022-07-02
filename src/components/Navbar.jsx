import React from "react";
import { AppBar, Typography, Toolbar, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography>TradeSellBuy</Typography>
          <Tabs sx={{ marginLeft: "auto" }} textcolor="inherit">
            <Tab component={Link} to="/login" label="Login" />
            <Tab component={Link} to="/signup" label="Signup" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
