import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import UserProductCard from "../../../../components/UserProductCard";
import NoListing from "../../../../assets/Ecommerce web page-pana.png";

const ProfileListings = ({ products }) => {
  return (
    <Grid container>
      {products.length === 0 ? (
        <Stack justifyContent={"center"} alignItems="center" width="100%">
          <Typography color={"white"}>Wow, Such empty</Typography>
          <Typography color={"white"}>No Listings to show here</Typography>
          <img
            src={NoListing}
            style={{ height: "calc(100vh - 70px - 5rem)" }}
          />
        </Stack>
      ) : (
        products?.map((product) => {
          return (
            <Grid item key={product.id} m={6}>
              <UserProductCard product={product} />
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default ProfileListings;
