import { React, useState, useEffect } from "react";
import "./listings.css";
import ApiService from "../../services/Api";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const Listings = () => {
  const { httprequest } = ApiService();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    httprequest.get("/allListings").then(
      (res) => {
        setProducts(res.data);
        console.log(products);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  },[]);

  return (
    <Grid container justify="center" alignItems={"center"} spacing={5} className="listings">
      {products.map((product) => (
        <Grid item key={product.id}  xs={12} sm={6} m={4} lg={2.4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Listings;
