import { React, useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { SetProducts } from "../../redux/listingSlice";
import { SetFavs } from "../../redux/favouriteSlice";
import ApiService from "../../services/Api";
import NoFavourite from "../../assets/Online wishes list-pana.png";

const Favourites = () => {
  const getFavoritePosts = () => {
    let filteredFavourites = favourites
      .filter((fav) => fav["user_id"] === profileid)
      .map((fav) => fav["listing_id"]);
    return products.filter(
      (product) => filteredFavourites.indexOf(product.id) !== -1
    );
  };
  const dispatch = useDispatch();
  const { httprequest } = ApiService();
  const products = useSelector((state) => state.listing.products);
  const favourites = useSelector((state) => state.favourite.favourite);
  const profileid = useSelector((state) => state.user.user.id);
  const [favList, setFavList] = useState(() => getFavoritePosts());

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
    setFavList(getFavoritePosts());
  }, [favourites, products]);

  return (
    <Box>
      {favList.length === 0 ? (
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Typography variant="h3" sx={{ ml: "2rem" }}>
            You have no favourites
          </Typography>
          <img
            src={NoFavourite}
            alt=""
            style={{ height: "calc(100vh - 70px - 2rem)" }}
          />
        </Box>
      ) : (
        <Typography variant="h3" sx={{ ml: "2rem" }}>
          Your Favourites
        </Typography>
      )}

      <Grid container justify="center" alignItems={"center"} spacing={5}>
        {favList.map((filteredProduct) => {
          return (
            <Grid item key={filteredProduct.id} xs={12} sm={5} m={4} lg={2.4}>
              <ProductCard
                product={filteredProduct}
                favourites={true}
                fetchListings={fetchListings}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Favourites;
