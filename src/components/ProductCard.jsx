import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ApiService from "../services/Api";
import { useDispatch } from "react-redux";
import { ClickedUserSuccess } from "../redux/clickedUserSlice";

const ProductCard = ({ product, favourites, fetchListings }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { httprequestwtoken } = ApiService();

  const toggleLike = async () => {
    try {
      await httprequestwtoken.post(`/listings/${product.id}/toggle-like`);
      fetchListings();
    } catch (error) {
      console.log(error);
    }
  };

  const toProductInfo = () => {
    navigate("/product", { state: product });
  };

  const toUserProfile = () => {
    dispatch(ClickedUserSuccess(product.user));
    navigate(`/profile/${product.user.id}`, { state: product.user });
  };


  return (
    <Card
      sx={{
        maxWidth: 300,
        ":hover": { boxShadow: "0 5px 10px grey" },
        transition: "all ease-in 300ms",
        backgroundColor:"rgba(255,255,255,0.6)"
      }}
    >
      <CardHeader
        avatar={
          <div
            onClick={() => {
              toUserProfile();
            }}
          >
            <Avatar
              sx={{ cursor: "pointer" }}
              src={`http://localhost:8000/storage/profile_images/${product.user.profile_photo}`}
              aria-label="user"
            ></Avatar>
          </div>
        }
        title={product.user.name}
      ></CardHeader>
      <div style={{ position: "relative", padding: "1rem" }}>
        <CardMedia
          onClick={() => {
            toProductInfo();
          }}
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            height: "180px",
            objectFit: "cover",
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
      <CardActions
        disableSpacing
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <IconButton aria-label="add to favorites" onClick={toggleLike}>
          {favourites ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography>{product.likes_count}</Typography>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
