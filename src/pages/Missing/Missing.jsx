import React from "react";
import { Container } from "@mui/material";
import MissingImage from "../../assets/404.png";
const Missing = () => {
  return (
    <Container sx={{ justifyContent: "center", display: "flex" }}>
      <img
        src={MissingImage}
        alt=""
        style={{ height: "calc(100vh - 70px - 2rem)" }}
      />
    </Container>
  );
};

export default Missing;
