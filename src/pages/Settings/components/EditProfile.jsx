import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthUser from "../../../services/AuthUser";
import { useDispatch } from "react-redux/es/exports";
import { UserSuccess } from "../../../redux/userSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  Button,
  Avatar,
  TextField,
  Typography,
  Box,
  Alert,
  Grid,
  Snackbar,
} from "@mui/material";

const EditProfile = () => {
  const { httpwtoken } = AuthUser();
  const profile = useSelector((state) => state.user.user);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
  } = useForm({});

  const onSubmit = (data) => {
    data.profile_photo = image;
    data._method = "PUT";
    // api call
    httpwtoken.post("/editUser", data).then(
      (res) => {
        console.log(res.data);
        handleClick();
        dispatch(UserSuccess(res.data.user));
      },
      (error) => {
        console.log(error.response.data);
        console.log(data);
      }
    );
  };

  return (
    <Grid container maxWidth={"sm"}>
      <Typography variant="h4">Edit Profile</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mb: "1rem",
            boxShadow: 3,
            border: "2px solid #001A33",
          }}
          src={
            preview == null
              ? `http://localhost:8000/storage/profile_images/${profile.profile_photo}`
              : preview
          }
        ></Avatar>
        <Button variant="contained" component="label">
          Upload
          <input
            hidden
            type="file"
            className={`form-control ${errors.profile_photo && "invalid"}`}
            placeholder="Image"
            {...register("profile_photo")}
            onKeyUp={() => {
              trigger("profile_photo");
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
        <TextField
          margin="normal"
          required
          fullWidth
          defaultValue={profile.name}
          {...register("name", {
            required: "Name is Required",
            minLength: {
              value: 3,
              message: "Name must have at least 3 characters",
            },
            maxLength: {
              value: 100,
              message: "Maximum name length is 99 characters",
            },
          })}
          label="Name"
          autoComplete="off"
          error={!!errors?.name}
          helperText={errors?.name ? errors.name.message : null}
          onKeyUp={() => {
            trigger("name");
          }}
        />
        <TextField
          defaultValue={profile.email}
          margin="normal"
          required
          fullWidth
          {...register("email", {
            required: "Email is Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          label="Email"
          autoComplete="off"
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            Account Updated Successfully
          </Alert>
        </Snackbar>
      </Box>
    </Grid>
  );
};

export default EditProfile;
