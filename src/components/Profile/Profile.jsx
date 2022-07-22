import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ProfileCard from "./ProfileCard";
import ProfileBanner from "./ProfileBanner";
import ProfileTabs from "./ProfileTabs";
import AuthUser from "../../services/AuthUser";
import ApiService from "../../services/Api";

const Profile = () => {
  const { httprequestwtoken } = ApiService();
  const { httpwtoken } = AuthUser();
  const [profile, setProfile] = useState({});
  const [listings, setListings] = useState([]);

  const fetchProfile = () => {
    httpwtoken.get("/profile", {}).then(
      (res) => {
        setProfile(res.data);
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
    httprequestwtoken.put(`/listings/${id}/update`, edited).then(
      (res) => {
        console.log(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchProfile();
    fetchProfileListings();
  }, []);

  return (
    <Grid
      container
      justify="center"
      alignItems={"center"}
      sx={{
        top: "70px",
        position: "relative",
      }}
    >
      <Grid item md={12} sx={{ paddingBottom: "20px" }}>
        <ProfileBanner />
      </Grid>
      <Grid item md={2}>
        <ProfileCard profile={profile} />
      </Grid>
      <Grid item md={10}>
        <ProfileTabs
          listings={listings}
          handleRemoveListing={handleRemoveListing}
          handleUpdateListing={handleUpdateListing}
        />
      </Grid>
    </Grid>
  );
};

export default Profile;
