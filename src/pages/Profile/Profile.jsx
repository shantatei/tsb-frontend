import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ProfileCard from "./components/ProfileCard";
import ProfileTabs from "./components/ProfileTabs";
import ApiService from "../../services/Api";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const { httprequestwtoken, httprequestwtoken2, httprequest } = ApiService();
  const profile = useSelector((state) => state.user.user);
  const [listings, setListings] = useState([]);

  const location = useLocation();

  const fetchListingByUserId = () => {
    httprequest.get(`listingbyid/${location.state.id}`).then(
      (res) => {
        setListings(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const fetchProfileListings = () => {
    httprequestwtoken.get("/listings", {}).then(
      (res) => {
        setListings(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const handleRemoveListing = (id) => {
    httprequestwtoken.delete(`/listings/${id}/delete`).then(
      (res) => {
        console.log(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const handleUpdateListing = (id, edited) => {
    httprequestwtoken2.put(`/listings/${id}/update`, edited).then(
      (res) => {
        console.log(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    if (location.state == null) {
      fetchProfileListings();
    } else {
      fetchListingByUserId();
    }
  }, []);

  return (
    <Grid
      container
      justify="center"
    >
      <Grid item md={12}>
        <ProfileCard
          profile_photo={
            location.state == null
              ? profile.profile_photo
              : location.state.profile_photo
          }
          name={location.state == null ? profile.name : location.state.name}
          roles = {location.state == null ? profile.roles : location.state.roles}
        />
      </Grid>
      <Grid item md={12}>
        <ProfileTabs
          listings={listings}
          handleRemoveListing={handleRemoveListing}
          handleUpdateListing={handleUpdateListing}
          getlistings={fetchProfileListings}
        />
      </Grid>
    </Grid>
  );
};

export default Profile;
