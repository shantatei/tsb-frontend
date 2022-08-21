import { React, useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import EditProfile from "./components/EditProfile";
import ChangePassword from "./components/ChangePassword";
import DeleteAccount from "./components/DeleteAccount";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Settings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        width: "50%",
        marginInline: "auto",
        bgcolor: "background.paper",
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Edit Profile" {...a11yProps(0)} />
        <Tab label="Change Password" {...a11yProps(1)} />
        <Tab label="Delete Account" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EditProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePassword />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DeleteAccount />
      </TabPanel>
    </Box>
  );
};

export default Settings;
