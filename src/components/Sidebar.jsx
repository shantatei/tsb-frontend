import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import PaymentIcon from "@mui/icons-material/Payment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const drawerWidth = 240;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          top: "78px",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem disablePadding to="/dashboard" component={Link}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["Users", "Products", "Orders"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            component={Link}
            to={
              index === 0
                ? "/users"
                : index === 1
                ? "/products"
                : index === 2
                ? "/orders "
                : "/dashboard"
            }
          >
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? (
                  <PersonIcon />
                ) : index === 1 ? (
                  <StoreIcon />
                ) : (
                  <PaymentIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding to="/roles" component={Link}>
          <ListItemButton>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
