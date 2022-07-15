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
import "./listings.css";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 300}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            S
          </Avatar>
        }
        title={product.user.name}
      ></CardHeader>
        <CardMedia
          component="img"
          className="card-image"
          image={`http://localhost:8000/storage/products/${product.image}`}
        />
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
