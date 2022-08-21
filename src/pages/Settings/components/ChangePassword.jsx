import { React, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AuthUser from "../../../services/AuthUser";

const ChangePassword = () => {
  const [showPW, setShowPW] = useState(false);
  const [showCfmPW, setShowCfmPW] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const { httpwtoken } = AuthUser();

  const handleClick = () => {
    setOpenSuccess(true);
  };

  const handleClose = (event, reason) => {
    setOpenSuccess(false);
  };

  const handleClickShowPassword = () => {
    setShowPW(!showPW);
  };

  const handleClickShowConfirmPassword = () => {
    setShowCfmPW(!showCfmPW);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setError,
    reset,
  } = useForm({});

  const onSubmit = (data) => {
    console.log(data);

    // api call
    httpwtoken.post("/change-password", data).then(
      (res) => {
        console.log(res.data);
        handleClick();
        reset();
      },
      (error) => {
        console.log(error.response.data);
        if ((error.response.data.error = "Old password does not match")) {
          setError("old_password", { message: "Old password does not match" });
        }
      }
    );
  };

  return (
    <Grid container maxWidth={"sm"}>
      <Typography variant="h4">Change Password</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          {...register("old_password", {
            required: "Old Password is Required",
          })}
          name="old_password"
          label="Old Password"
          type={"password"}
          error={!!errors?.old_password}
          helperText={errors?.old_password ? errors.old_password.message : null}
        />
        <TextField
          margin="normal"
          fullWidth
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
          name="password"
          label="Password"
          type={showPW ? "text" : "password"}
          error={!!errors?.password}
          helperText={errors?.password ? errors.password.message : null}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPW ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          {...register("confirm_password", {
            required: "Confirm Password is Required",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
            validate: (value) =>
              value === getValues().password || "The passwords do not match",
          })}
          name="confirm_password"
          label="Confirm Password"
          autoComplete="off"
          type={showCfmPW ? "text" : "password"}
          error={!!errors?.confirm_password}
          helperText={
            errors?.confirm_password ? errors.confirm_password.message : null
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowConfirmPassword}>
                  {showCfmPW ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyUp={() => {
            trigger("password_confirmation");
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Password successfully updated
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ChangePassword;
