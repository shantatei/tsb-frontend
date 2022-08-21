import { React, useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  InputBase,
  IconButton,
  Badge,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import AuthUser from "../services/AuthUser";
import AddListingModal from "../pages/Home/components/AddListingModal";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { SetSearch } from "../redux/searchSlice";
import ApiService from "../services/Api";
import { SetProducts } from "../redux/listingSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: "auto",
  marginLeft: "auto",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const profile = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [open, setOpen] = useState(false);
  const { token, logout, getToken, http } = AuthUser();
  const { httprequest } = ApiService();
  const searchKeyword = useSelector((state) => state.search.searchTerm);
  const cartTotalQuantity = useSelector(
    (state) => state.cart.cartTotalQuantity
  );

  const handleOpenmodal = () => setOpen(true);
  const handleClosemodal = () => setOpen(false);

  const dispatch = useDispatch();

  const openMenu = Boolean(anchorEl);

  const handleKeyboard = (event) => {
    dispatch(SetSearch(event.target.value));
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchSearchList = () => {
    httprequest
      .get(`/queryListings?sortOrder=asc&keyword=${searchKeyword}`)
      .then(
        (res) => {
          dispatch(SetProducts(res.data.data));
        },
        (error) => {
          console.log(error.response.data);
        }
      );
  };

  const logoutUser = () => {
    if (token !== undefined) {
      http.post("/logout", { token: getToken() }).then((res) => {
        console.log(res.data);
      });
      logout();
    }
  };

  if (!getToken()) {
    return (
      <>
        <AppBar sx={{ bgcolor: "#001A33" }}>
          <Toolbar>
            <Typography
              style={{ textDecoration: "none", color: "white" }}
              component={Link}
              to="/"
            >
              TradeSellBuy
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "white" }} />
              </SearchIconWrapper>
              <StyledInputBase
                onKeyUp={fetchSearchList}
                onChange={handleKeyboard}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button
              component={Link}
              to="/login"
              sx={{
                marginLeft: "auto",
                color: "white",
                backgroundColor: "#4a4646",
                "&:hover": { backgroundColor: "#383535" },
              }}
              variant="contained"
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              sx={{
                marginLeft: "10px",
                color: "white",
                backgroundColor: "#0066CC",
              }}
              variant="contained"
            >
              Signup
            </Button>
          </Toolbar>
        </AppBar>
      </>
    );
  }

  return (
    <>
      <AppBar sx={{ bgcolor: "#001A33" }}>
        <Toolbar>
          <Typography
            style={{ textDecoration: "none", color: "white" }}
            component={Link}
            to="/"
          >
            TradeSellBuy
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onKeyUp={fetchSearchList}
              onChange={handleKeyboard}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button
            sx={{ marginLeft: "auto" }}
            style={{ color: "white" }}
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <Avatar
              sx={{ marginRight: 1 }}
              src={`http://localhost:8000/storage/profile_images/${profile.profile_photo}`}
            ></Avatar>

            {profile.name}
          </Button>
          <IconButton component={Link} to="/favourites">
            <FavoriteBorderIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton component={Link} to="/sell">
            <SellIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton component={Link} to="/cart">
            <Badge badgeContent={cartTotalQuantity} color="primary">
              <ShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
          </IconButton>
          {isAdmin ? (
            <IconButton component={Link} to="/dashboard">
              <DashboardIcon sx={{ color: "white" }} />
            </IconButton>
          ) : (
            <></>
          )}
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
          <MenuItem component={Link} to={`/profile/${profile.id}`}>
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
