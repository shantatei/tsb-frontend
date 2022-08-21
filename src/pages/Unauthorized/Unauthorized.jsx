import React from "react";
import { Container, Typography } from "@mui/material";
import UnauthorizedImage from "../../assets/401 Error Unauthorized-amico.png";
const Unauthorized = () => {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" ,alignItems:"center"}}>
      <Typography variant="h2">
        You are Unauthorized to view this page{" "}
      </Typography>
      <img
        src={UnauthorizedImage}
        style={{ height: "calc(100vh - 70px - 2rem)" }}
        alt=""
      />
    </Container>
  );
};

export default Unauthorized;
