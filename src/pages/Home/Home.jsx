import { React, useState, useEffect } from "react";
import ApiService from "../../services/Api";
import AuthUser from "../../services/AuthUser";
import { Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { UserSuccess, UserFail , UserIsAdmin } from "../../redux/userSlice";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/exports";
import { SetProducts } from "../../redux/listingSlice";
import { SetFavs } from "../../redux/favouriteSlice";

const Home = () => {
  const { httprequest } = ApiService();
  const { httpwtoken } = AuthUser();
  const products = useSelector((state) => state.listing.products);
  const favourites = useSelector((state) => state.favourite.favourite);
  const profileid = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();



  const fetchProfile = () => {
    httpwtoken.get("/profile").then(
      (res) => {
        dispatch(UserSuccess(res.data));
        dispatch(UserIsAdmin(res.data.roles));
      },
      (error) => {
        dispatch(UserFail(error.response.data));
      }
    );
  };

  const fetchListings = async () => {
    try {
      let listings = await httprequest.get("/allListings");
      dispatch(SetProducts(listings.data));
      let favs = await httprequest.get("/favourites");
      dispatch(SetFavs(favs.data));
    } catch (e) {
      console.log(e.response.data);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchListings();
  }, []);

  return (
    <Grid container justify="center" alignItems={"center"} spacing={5}>
      {products?.map((product) => {
        let favourite = favourites.filter(
          (fav) =>
            fav["listing_id"] === product.id && fav["user_id"] === profileid
        );

        return (
          <Grid item key={product.id} xs={12} sm={5} m={4} lg={2.4}>
            <ProductCard
              product={product}
              fetchListings={fetchListings}
              favourites={favourite !== undefined && favourite.length === 1}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Home;
