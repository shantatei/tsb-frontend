import React from "react";
import { AppBar, Typography, Toolbar, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import AuthUser from "../AuthUser"; 

const Navbar = () => {

  
  const {token,logout,getToken,http} = AuthUser();

  const logoutUser = () => {

    if(token !== undefined){
        http.post('/logout',{token:getToken()}).then((res)=>{
          console.log(res.data);

        });
        console.log(getToken());
        logout();
    }
  }

  if(!getToken()){
    
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography style = {{textDecoration: 'none', color :"black"}}  component ={Link} to="/">TradeSellBuy</Typography>
          <Tabs sx={{ marginLeft: "auto" }} textcolor="inherit">
            <Tab component={Link} to={"/login"} label="Login" />
            <Tab component={Link} to={"/signup"} label="Signup" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
  }

  return(
    <>
      <AppBar>
        <Toolbar>
          <Typography style = {{textDecoration: 'none', color :"black"}}  component ={Link} to="/">TradeSellBuy</Typography>
          <Tabs sx={{ marginLeft: "auto" }} textcolor="inherit">
            <Tab  onClick={logoutUser}  label="Logout" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  )

};

export default Navbar;
