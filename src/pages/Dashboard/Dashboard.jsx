import { Box, Typography, Stack } from "@mui/material";
import ApiService from "../../services/Api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetRoles } from "../../redux/rolesSlice";
import FeaturedInfo from "./components/FeaturedInfo";

const Dashboard = () => {
  const { httpadmin } = ApiService();

  const dispatch = useDispatch();

  const fetchAllRoles = () => {
    httpadmin.get("/roles").then(
      (res) => {
        dispatch(SetRoles(res.data));
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchAllRoles();
  }, []);

  return (
    <Stack sx={{ position: "relative", left: "240px" }} direction="row">
      <FeaturedInfo title={"Users"} amount={6} />
    </Stack>
  );
};

export default Dashboard;
