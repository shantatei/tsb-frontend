import React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
} from "../../../redux/cartSlice";
import CloseIcon from "@mui/icons-material/Close";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseQuantity = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  return (
    <Box width="90%">
      <Stack
        direction="row"
        sx={{
          backgroundColor: "white",
          boxShadow: "5px 5px 8px grey",
          width: "100%",
        }}
        p={4}
      >
        <Box
          sx={{
            paddingTop: "15vw",
            position: "relative",
            overflow: "hidden",
            width: "15vw",
          }}
          bgcolor="#f2f2f2!important"
        >
          <img
            src={`http://localhost:8000/storage/products_images/${cartItem.image}`}
            alt={cartItem.itemname}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              maxWidth: "80%",
              maxHeight: "80%",
              transform: "translate(-50%, -50%)",
            }}
            loading="lazy"
          />
        </Box>

        <Stack
          ml={2}
          alignItems="flex-start"
          justifyContent="space-between"
          width="100%"
        >
          <Stack justifyContent="space-between" direction="row" width="100%">
            <Typography variant="h5">{cartItem.itemname}</Typography>
            <IconButton onClick={() => handleRemoveFromCart(cartItem)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </Stack>
          <Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="body1">
                Quantity: {cartItem.cartQuantity}
              </Typography>
              <Typography variant="body1">Price: ${cartItem.price}</Typography>
            </Stack>
            <Typography variant="h6">
              Subtotal: ${cartItem.price * cartItem.cartQuantity}
            </Typography>
            <Button
              disableRipple
              disableElevation
              disableFocusRipple
              disableTouchRipple
              startIcon={
                <IconButton
                  onClick={() => handleDecreaseCart(cartItem)}
                  sx={{
                    color: "white",
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              }
              endIcon={
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => handleIncreaseQuantity(cartItem)}
                >
                  <AddIcon />
                </IconButton>
              }
              variant="contained"
            >
              {cartItem.cartQuantity}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CartItem;
