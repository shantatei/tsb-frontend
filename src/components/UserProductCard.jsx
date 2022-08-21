import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserProductCard = ({ product }) => {
  const navigate = useNavigate();

  const toProductInfo = () => {
    navigate("/product", { state: product });
  };

  return (
    <Card
      raised
      sx={{
        ":hover": { boxShadow: "5px 10px 18px #888888" },
        transition: "all ease-in 300ms",
        width: 250,
        margin: "0 auto",
        padding: "0.1em",
      }}
    >
      <div style={{ padding: "1rem" }}>
        <CardMedia
          onClick={() => {
            toProductInfo();
          }}
          height="200"
          width="250"
          sx={{
            objectFit: "fill",
            borderRadius: "5%",
            backgroundColor: "#f2f0f0 !important",
            cursor: "pointer",
          }}
          component="img"
          image={`http://localhost:8000/storage/products_images/${product.image}`}
        />
      </div>
      <CardContent style={{ display: "flex", justifyContent: "left" }}>
        <div>
          <Typography variant="body2" color="text.secondary">
            {product.itemname}
          </Typography>
          <Typography variant="h5">{"$" + product.price}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProductCard;
