import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        ":hover": { boxShadow: "5px 10px 18px #888888" },
        transition: "all ease-in 300ms",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={`http://localhost:8000/storage/profile_images/${product.user.profile_photo}`}
            aria-label="user"
          ></Avatar>
        }
        title={product.user.name}
      ></CardHeader>
      <div style={{ position: "relative", padding: "1rem" }}>
        <CardMedia
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "5%",
            backgroundColor: "#f2f0f0 !important",
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
      <CardActions
        disableSpacing
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Button size="small" color="primary">
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
