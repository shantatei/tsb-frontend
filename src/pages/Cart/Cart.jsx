import { React, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  Stack,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart, getTotals } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import EmptyCartImage from "../../assets/Add to Cart-amico.png";
import CartItem from "./components/CartItem";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

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
    const line = {
      position: "relative",
      "&::after": {
        content: "''",
        width: "100%",
        left: 0,
        height: "2px",
        position: "absolute",
        bottom: "-5px",
        backgroundImage: "linear-gradient(to right, #3396f5, #001A33)",
        borderRadius: "10px",
      },
    };

    return (
      <>
        <Stack
          my={3}
          direction="row"
          justifyContent={"space-between"}
          alignItems="start"
        >
          <Stack gap={2} flexGrow={1}>
            {cart.cartItems?.map((cartItem) => (
              <CartItem cartItem={cartItem}></CartItem>
            ))}
          </Stack>
          <Box
            flexGrow={1}
            sx={{
              bgcolor: "rgba(255,255,255,150)",
              position: "sticky",
              top: "85px",
            }}
            p={2}
          >
            <Typography variant="h6" sx={line}>
              Order Summary
            </Typography>
            <Typography variant="body1" mt={2}>
              Total Items: {cart.cartTotalQuantity}
            </Typography>
            <Typography variant="body1">
              SubTotal: ${cart.cartTotalAmount}
            </Typography>
            <Box width="100%" sx={line} mt={2} />
            <Stack direction="row" mt={5} gap={2}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleEmptyCart()}
                sx={{
                  flexGrow: "1",
                  
                }}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/checkout"
                sx={{
                  flexGrow: "1",
                }}
              >
                Checkout
              </Button>
            </Stack>
          </Box>
        </Stack>
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
