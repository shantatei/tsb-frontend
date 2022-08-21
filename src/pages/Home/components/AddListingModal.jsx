import { React, useState, useEffect } from "react";
import { Typography, Box, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import ApiService from "../../../services/Api";

const AddListingModal = (props) => {
  const { httprequestwtoken } = ApiService();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset
  } = useForm();

  const onSubmit = (data) => {
    data.image = data.image[0];
    //api call
    httprequestwtoken.post("/listings", data).then(
      (res) => {
        console.log(res.data);
        reset()
      },
      (error) => {
        console.log(error.response.data);
        console.log(data);
      }
    );
  };

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
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <div className="ui divider"></div>
              <div className="ui form">
                <div className="field">
                  <label>What are you listing today ?</label>
                  <img
                    src={preview}
                    width="150"
                    alt=""
                    // onClick={() => {
                    //   setImage(null);
                    // }}
                  />
                  <input
                    type="file"
                    className={`form-control ${errors.image && "invalid"}`}
                    placeholder="Image"
                    {...register("image", {
                      required: "Image Photo is Required",
                    })}
                    onKeyUp={() => {
                      trigger("image");
                    }}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file) {
                        setImage(file);
                      } else {
                        setImage(null);
                      }
                    }}
                  />
                  {errors.image && (
                    <small className="text-danger">
                      {errors.image.message}
                    </small>
                  )}
                </div>
                <div className="field">
                  <label>Item Name</label>
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
