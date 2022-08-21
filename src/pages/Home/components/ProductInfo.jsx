import { React } from "react";
import { Grid, Typography, Box, Button, Stack, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { addToCart, getTotals } from "../../../redux/cartSlice";

import { useEffect } from "react";
import QuantityButton from "./QuantityButton";

const ProductInfo = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

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

  const handleAddToCart = (product) => {
    product.qty = qty;
    dispatch(addToCart(product));
    dispatch(getTotals());
    setQty(1);
  };

  const addQty = () => {
    if (qty == location.state.quantity) return;
    setQty(qty + 1);
  };

  const minusQty = () => {
    if (qty <= 1) {
    } else {
      setQty(qty - 1);
    }
  };

  const itemData = [
    {
      header: location.state.itemname,
      content: "$" + location.state.price,
    },
    {
      header: "Description",
      content: location.state.description,
    },
    {
      header: "In Stock",
      content: location.state.quantity,
    },
  ];

  return (
    <Grid
      container
      sx={{
        bgcolor: "#fff",
        width: "60%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50% , -50%)",
        boxShadow: "0px 5px 10px grey",
        borderRadius: "5px",
      }}
    >
      <Grid item sx={12} md={6} justifyContent="center" display={"flex"}>
        <div
          style={{
            backgroundImage: `url('http://localhost:8000/storage/products_images/${location.state.image}')`,
            width: "100%",
            height: "60vh",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundOrigin: "content-box",
            padding: "1rem",
            backgroundColor: "#f2f2f2",
          }}
        ></div>
      </Grid>
      <Grid item sx={12} md={6} flexWrap>
        <Box
          sx={{
            height: "60vh",
            color: "white",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            {itemData.map((item) => {
              return (
                <>
                  <Typography variant="h4" sx={line} color="black">
                    {item.header}
                  </Typography>
                  <Typography
                    variant="h6"
                    mt={1}
                    sx={{ opacity: "0.7" }}
                    color="black"
                  >
                    {item.content}
                  </Typography>
                </>
              );
            })}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing="1rem"
          >
            <Typography variant="h5" color="black" textAlign="start">
              Quantity:
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              spacing="1rem"
            >
              <QuantityButton
                minusQty={minusQty}
                addQty={addQty}
                qty={qty}
                stock={location.state.quantity}
              ></QuantityButton>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  height: "3rem",
                  color: "white",
                  bgcolor: "#001A33",
                  "&:hover": { backgroundColor: "#001A33" },
                }}
                onClick={() => handleAddToCart(location.state)}
              >
                Add to Cart
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
