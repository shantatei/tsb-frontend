import { React, useEffect } from "react";
import {
  Container,
  Typography,
  Stack,
  Grid,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  addToCart,
  decreaseCart,
  emptyCart,
  getTotals,
  removeFromCart,
} from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import EmptyCartImage from "../../assets/Add to Cart-amico.png";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseQuantity = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const EmptyCart = () => {
    return (
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h6">Your cart is currently empty</Typography>
          <Button component={Link} to="/" variant="contained">
            Start shopping
          </Button>
        </Grid>
        <Grid item md={6}>
          <img
            src={EmptyCartImage}
            alt=""
            style={{
              height: "calc(100vh - 70px - 2rem)",
              position: "absolute",
              top: "100px",
            }}
          ></img>
        </Grid>
      </Grid>
    );
  };

  const FilledCart = ({ cart }) => {
    return (
      <>
        <Grid container mt={3} mb={3}>
          <Grid item md={4}>
            <Typography>Product</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography>Price</Typography>
          </Grid>
          <Grid item md={4}>
            <Typography>Quantity</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography>Total</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container mt={3} mb={3}>
          {cart.cartItems?.map((cartItem) => (
            <>
              <Grid item md={4} display="flex" mt={2}>
                <img
                  style={{
                    width: "50%",
                  }}
                  src={`http://localhost:8000/storage/products_images/${cartItem.image}`}
                  alt={cartItem.itemname}
                  loading="lazy"
                />
                <Stack ml={2} alignItems="flex-start">
                  <Typography>{cartItem.itemname}</Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveFromCart(cartItem)}
                  >
                    Remove
                  </Button>
                </Stack>
              </Grid>
              <Grid item md={2} mt={2}>
                <Typography>${cartItem.price}</Typography>
              </Grid>
              <Grid item md={4} mt={2}>
                <Button
                  sx={{
                    bgcolor: "transparent",
                    color: "black",
                    border: "1px solid black",
                    "&:hover": {
                      backgroundColor: "transparent",
                      border: "1px solid black",
                    },
                  }}
                  disableRipple
                  disableElevation
                  disableFocusRipple
                  disableTouchRipple
                  startIcon={
                    <IconButton onClick={() => handleDecreaseCart(cartItem)}>
                      <RemoveIcon />
                    </IconButton>
                  }
                  endIcon={
                    <IconButton
                      onClick={() => handleIncreaseQuantity(cartItem)}
                    >
                      <AddIcon />
                    </IconButton>
                  }
                  variant="outlined"
                >
                  {cartItem.cartQuantity}
                </Button>
              </Grid>
              <Grid item md={2} mt={2}>
                <Typography>
                  ${cartItem.price * cartItem.cartQuantity}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
        <Divider />
        <Grid container mt={3} mb={3}>
          <Grid item md={4}>
            <Button
              variant="outlined"
              onClick={() => handleEmptyCart()}
              sx={{
                bgcolor: "transparent",
                color: "black",
                border: "1px solid black",
                "&:hover": {
                  backgroundColor: "transparent",
                  border: "1px solid black",
                },
              }}
            >
              Clear Cart
            </Button>
          </Grid>
          <Grid item md={4}></Grid>
          <Grid item md={4} flexWrap>
            <Grid container>
              <Grid item md={6}>
                <Typography>Subtotal</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>${cart.cartTotalAmount}</Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{ width: "60%" }}
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Container>
      <Typography variant="h2">Shopping Cart</Typography>
      {cart.cartItems.length === 0 ? <EmptyCart /> : <FilledCart cart={cart} />}
    </Container>
  );
};

export default Cart;
