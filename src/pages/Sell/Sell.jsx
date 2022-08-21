import { React, useState, useEffect } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import ApiService from "../../services/Api";
import Placeholder from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const { httprequestwtoken } = ApiService();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(Placeholder);
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(Placeholder);
    }
  }, [image]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    data.image = image;
    console.log(data);
    //api call
    httprequestwtoken.post("/listings", data).then(
      (res) => {
        console.log(res.data);
        navigate("/");
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const style = {
    bgcolor: "background.paper",
    boxShadow: 24,
    width: 400,
    p: 4,
    marginInline: "auto",
  };
  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        Sell Your Item
      </Typography>
      <Box
        component="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          mt={"1rem"}
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <img
            src={preview}
            width="150"
            height="150"
            style={{
              boxShadow: "2px 2px 10px grey",
              marginBottom: "1rem",
            }}
            alt=""
          />
          <Button variant="contained" component="label">
            Upload
            <input
              hidden
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
          </Button>

          {errors.image && (
            <Typography color={"red"}> {errors.image.message}</Typography>
          )}
        </Box>
        <TextField
          margin="dense"
          required
          fullWidth
          {...register("itemname", {
            required: "Item Name is Required",
          })}
          label="ItemName"
          autoComplete="off"
          error={!!errors?.itemname}
          helperText={errors?.itemname ? errors.itemname.message : null}
          onKeyUp={() => {
            trigger("itemname");
          }}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          {...register("price", {
            required: "Price is Required",
          })}
          label="Price"
          autoComplete="off"
          error={!!errors?.price}
          helperText={errors?.price ? errors.price.message : null}
          onKeyUp={() => {
            trigger("price");
          }}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          {...register("quantity", {
            required: "Quantity is Required",
          })}
          label="Quantity"
          autoComplete="off"
          error={!!errors?.quantity}
          helperText={errors?.quantity ? errors.quantity.message : null}
          onKeyUp={() => {
            trigger("quantity");
          }}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          {...register("description", {
            required: "Description is Required",
          })}
          label="Description"
          autoComplete="off"
          error={!!errors?.description}
          helperText={errors?.description ? errors.description.message : null}
          onKeyUp={() => {
            trigger("description");
          }}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: "1rem" }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Sell;
