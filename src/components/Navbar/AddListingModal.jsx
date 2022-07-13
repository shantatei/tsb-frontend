import React from "react";
import { Typography, Box, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import ApiService from "../../services/Api";

const AddListingModal = (props) => {
  const { httprequestwtoken } = ApiService();

  const onSubmit = (data) => {

    //api call
    httprequestwtoken.post("/listings", data).then(
      (res) => {
        console.log(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const style = {
    position: "absolute",
    top: 70,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    width: 400,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sell Your Item
          </Typography>
          <div id="modal-modal-description">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ui divider"></div>
              <div className="ui form">
                <div className="field">
                  <label>What Item are your selling?</label>
                  <input
                    type="text"
                    className={`form-control ${errors.itemname && "invalid"}`}
                    placeholder="Item Name"
                    {...register("itemname", {
                      required: "Item Name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("itemname");
                    }}
                  />
                  {errors.itemname && (
                    <small className="text-danger">
                      {errors.itemname.message}
                    </small>
                  )}
                </div>
                <div className="field">
                  <label>Price</label>
                  <input
                    type="text"
                    className={`form-control ${errors.price && "invalid"}`}
                    placeholder="Price"
                    {...register("price", {
                      required: "Price is Required",
                    })}
                    onKeyUp={() => {
                      trigger("price");
                    }}
                  />
                  {errors.price && (
                    <small className="text-danger">
                      {errors.price.message}
                    </small>
                  )}
                </div>
                <div className="field">
                  <label>Quantity</label>
                  <input
                    type="text"
                    className={`form-control ${errors.quantity && "invalid"}`}
                    placeholder="Quantity"
                    {...register("quantity", {
                      required: "Quantity is Required",
                    })}
                    onKeyUp={() => {
                      trigger("quantity");
                    }}
                  />
                  {errors.quantity && (
                    <small className="text-danger">
                      {errors.quantity.message}
                    </small>
                  )}
                </div>
                <div className="field">
                  <label>Description</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.description && "invalid"
                    }`}
                    placeholder="Description"
                    {...register("description", {
                      required: "Description is Required",
                    })}
                    onKeyUp={() => {
                      trigger("description");
                    }}
                  />
                  {errors.description && (
                    <small className="text-danger">
                      {errors.description.message}
                    </small>
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

export default AddListingModal;
