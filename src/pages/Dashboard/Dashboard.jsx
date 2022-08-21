import { Typography, Stack } from "@mui/material";
import ApiService from "../../services/Api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetRoles } from "../../redux/rolesSlice";
import ConstructionImage from "../../assets/Under construction-amico.png";

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
    <Stack sx={{ position: "relative", width: "100%" }} direction="row">
      <img
        src={ConstructionImage}
        alt=""
        style={{ height: "calc(100vh - 70px - 2rem)", marginInline: "auto" }}
      />
    </Stack>
  );
};

export default Dashboard;
