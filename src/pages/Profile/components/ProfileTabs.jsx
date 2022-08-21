import { React, useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import ProfileDashboard from "./ProfileDashboard/ProfileDashboard";
import ProfileListings from "./ProfileListing/ProfileListings";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileReviews from "./ProfileReview/ProfileReviews";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileTabs = ({
  listings,
  handleRemoveListing,
  handleUpdateListing,
  getlistings,
}) => {
  const userID = useSelector((state) => state.user.user.id);
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "50%",
        height: "100%",
        marginInline: "auto",
        bgcolor: "#062847",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          justifySelf: "center",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ color: "#aacff2" }} label="Listings" {...a11yProps(0)} />
          <Tab sx={{ color: "#aacff2" }} label="Reviews" {...a11yProps(1)} />
          {userID == id ? (
            <Tab
              sx={{ color: "#aacff2" }}
              label="Dashboard"
              {...a11yProps(2)}
            />
          ) : (
            []
          )}
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <ProfileListings products={listings}/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ProfileReviews />
      </TabPanel>

      {userID == id ? (
        <TabPanel value={value} index={2}>
          <ProfileDashboard
            rows={listings}
            handleRemoveListing={handleRemoveListing}
            handleUpdateListing={handleUpdateListing}
            getlistings={getlistings}
          />
        </TabPanel>
      ) : (
        []
      )}
    </Box>
  );
};

export default ProfileTabs;
