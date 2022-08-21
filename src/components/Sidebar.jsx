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

const items = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    divider: true,
  },
  { name: "Users", icon: <PersonIcon />, path: "/users" },
  { name: "Products", icon: <StoreIcon />, path: "/products" },
  { name: "Orders", icon: <PaymentIcon />, path: "/orders", divider: true },
  { name: "Roles", icon: <ManageAccountsIcon />, path: "/roles" },
];

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
        {items.map((text, index) => (
          <>
            <ListItem
              sx={{ color: "black" }}
              key={text}
              disablePadding
              component={Link}
              to={text.path}
            >
              <ListItemButton>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
            {text.divider ? <Divider /> : <div></div>}
          </>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
