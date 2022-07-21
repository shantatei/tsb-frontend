import { React, useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import AuthUser from "../../services/AuthUser";
import AddListingModal from "../Listings/AddListingModal";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [profile, setProfile] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpenmodal = () => setOpen(true);
  const handleClosemodal = () => setOpen(false);
  const { token, logout, getToken, http, httpwtoken } = AuthUser();

  useEffect(() => {
    httpwtoken.get("/profile", {}).then(
      (res) => {
        setProfile(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  }, []);

  const openMenu = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    console.log(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    if (token !== undefined) {
      http.post("/logout", { token: getToken() }).then((res) => {
        console.log(res.data);
      });
      console.log(getToken());
      logout();
    }
  };

  if (!getToken()) {
    return (
      <>
        <AppBar>
          <Toolbar>
            <Typography
              style={{ textDecoration: "none", color: "white" }}
              component={Link}
              to="/"
            >
              TradeSellBuy
            </Typography>
            <Tabs sx={{ marginLeft: "auto" }}>
              <Tab
                style={{ color: "white" }}
                component={Link}
                to={"/login"}
                label="Login"
              />
              <Tab
                style={{ color: "white" }}
                component={Link}
                to={"/signup"}
                label="Signup"
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      </>
    );
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography
            style={{ textDecoration: "none", color: "white" }}
            component={Link}
            to="/"
          >
            TradeSellBuy
          </Typography>
          <Button
            sx={{ marginLeft: "auto" }}
            style={{ color: "white" }}
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Hello , {profile.name}
          </Button>
          <Button onClick={handleOpenmodal} style={{ color: "white" }}>
            SELL
          </Button>
        </Toolbar>

        {/* Dropdown Menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem component={Link} to={"/profile"}>
            {/* <PersonIcon /> */}
            Profile
          </MenuItem>
          <MenuItem component={Link} to={"/settings"}>
            {/* <SettingsIcon /> */}
            Settings
          </MenuItem>
          <MenuItem onClick={logoutUser}>
            {/* <LogoutIcon /> */}
            Logout
          </MenuItem>
        </Menu>

        {/* //Add Listing Modal */}
        <AddListingModal open={open} onClose={handleClosemodal} />
      </AppBar>
    </>
  );
};

export default Navbar;
