import { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantityButton = ({ minusQty, addQty, qty ,stock}) => {
  const [isMinusBtnDisabled, setIsMinusBtnDisabled] = useState(false);
  const [isPlusBtnDisabled, setIsPlusBtnDisabled] = useState(false);
  useEffect(() => {
    setIsMinusBtnDisabled(true);

    if (stock == qty) {
      setIsPlusBtnDisabled(true);
    }
  }, []);

  useEffect(() => {
    setIsMinusBtnDisabled(qty == 1);

    setIsPlusBtnDisabled(stock == qty);
  }, [qty]);
  return (
    <Button
      sx={{
        height:"3rem",
        bgcolor: "#3396f5",
        color: "white",
        "&:hover": {
          backgroundColor: "#3396f5",
        },
      }}
      disableRipple
      disableElevation
      disableFocusRipple
      disableTouchRipple
      startIcon={
        <IconButton
          onClick={() => minusQty()}
          disabled={isMinusBtnDisabled}
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
          onClick={() => addQty()}
          disabled={isPlusBtnDisabled}
        >
          <AddIcon />
        </IconButton>
      }
      variant="outlined"
    >
      {qty}
    </Button>
  );
};

export default QuantityButton;
