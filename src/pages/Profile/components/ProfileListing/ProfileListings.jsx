import React from "react";
import { Grid } from "@mui/material";
import UserProductCard from "../../../../components/UserProductCard";

const ProfileListings = ({ products }) => {

  return (
    <Grid container>
      {products?.map((product) => {
        return (
          <Grid item key={product.id}  m={6} >
            <UserProductCard product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProfileListings;
