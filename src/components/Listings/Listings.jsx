import { React, useState } from "react";
import "./listings.css";
import AuthUser from "../../services/AuthUser";
import { Box, Button, Typography, Modal } from "@mui/material";
import { useForm } from "react-hook-form";

const Listings = () => {
  const { getToken } = AuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();


  const style = {
    position: 'absolute',
    top: 70,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    console.log(data);


  };

  if (!getToken()) {
    return (
      <div>
        <h1 id="header">Listings</h1>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={handleOpen}  style={{color:"black",top:"70px"}}>SELL</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sell Your Item
          </Typography>
          <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header">Login</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              className={`form-control ${errors.email && "invalid"}`}
              placeholder="Email"
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              onKeyUp={() => {
                trigger("email");
              }}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>
          <button className="submitbtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Listings;
