import React from "react";
import { Typography, Button, Divider, Container } from "@mui/material";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import OrderReview from "./OrderReview";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { emptyCart } from "../../../redux/cartSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({
  shippingData,
  backStep,
  nextStep,
  timeout,
  onCaptureCheckout,
}) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        billing_firstname: shippingData.firstName,
        billing_lastname: shippingData.lastName,
        billing_email: shippingData.email,
        billing_address: shippingData.Address,
        billing_postalcode: shippingData.zip,
        total_price: cart.cartTotalAmount,
        total_quantity: cart.cartTotalQuantity,
        products: cart.cartItems,
      };

      //api call (make order object)
      onCaptureCheckout(orderData);

      //also refresh the cart
      dispatch(emptyCart());

      timeout();

      nextStep();
    }
  };

  return (
    <Container sx={{ width: "80%", marginInline: "auto", mb: 3 }}>
      <OrderReview />
      <Divider />
      <Typography variant="h6" gutterBottom sx={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay Total
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </Container>
  );
};

export default PaymentForm;
