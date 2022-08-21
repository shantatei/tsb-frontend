import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
const OrderReview = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.cartItems.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.id}>
            <ListItemText
              primary={product.itemname}
              secondary={`Quantity: ${product.cartQuantity}`}
            ></ListItemText>
            <Typography variant="body2">$ {product.price}</Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total"></ListItemText>
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          ${cart.cartTotalAmount}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default OrderReview;
