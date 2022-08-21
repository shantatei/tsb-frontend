import { React, useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  Container,
  Box,
} from "@mui/material";
import AddressForm from "./components/AddressForm";
import PaymentForm from "./components/PaymentForm";
import { Link } from "react-router-dom";
import ApiService from "../../services/Api";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const { httprequestwtoken2 } = ApiService();
  const [order, setOrder] = useState([]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const steps = ["Shipping address", "Payment details"];

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  const onCaptureCheckout = (neworder) => {
    httprequestwtoken2.post("/orders/save", neworder).then(
      (res) => {
        console.log(res.data);
        setOrder(res.data.order);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const Confirmation = () =>
    order.id ? (
      <Container
        p={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">
          Thank you for your purchase, {order.billing_firstname}{" "}
          {order.billing_lastname}
        </Typography>
        <Divider />
        <Typography variant="subtitle2">Order ref : {order.id}</Typography>
        <br />
        <Button
          component={Link}
          to="/"
          variant="contained"
          type="button"
          sx={{ mb: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    ) : (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        mb={2}
      >
        <CircularProgress />
      </Box>
    );

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        backStep={backStep}
        timeout={timeout}
      />
    );

  return (
    <Paper sx={{ width: "40%", alignSelf: "center" }}>
      <Typography variant="h4" align="center" mt={2}>
        Checkout
      </Typography>
      <Stepper
        activeStep={activeStep}
        sx={{
          marginTop: 3,
          marginBottom: 3,
          width: "80%",
          marginInline: "auto",
        }}
      >
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? <Confirmation /> : <Form />}
    </Paper>
  );
};

export default Checkout;
