import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthUser from "../../services/AuthUser";
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SignupImage from "../../assets/Ecommerce web page-pana.png";

const Signup = () => {
  const [showPW, setShowPW] = useState(false);
  const [showCfmPW, setShowCfmPW] = useState(false);


  const handleClickShowPassword = () => {
    setShowPW(!showPW);
  };

  const handleClickShowConfirmPassword = () => {
    setShowCfmPW(!showCfmPW);
  };

  const DefaultFormValues = {
    registration: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm({
    defaultValues: DefaultFormValues.registration,
  });

  const navigate = useNavigate();
  const { http } = AuthUser();

  const onSubmit = (data) => {
    console.log(data);
    // api call

    http.post("/register", data).then(
      (res) => {
        console.log(res.data);
        navigate("/login");
      },
      (error) => {
        console.log(error.response.data);
      }
    );
    reset();
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Grid justifyContent="center" container padding={"0 5%"}>
      <Grid
        item
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src={SignupImage}
          style={{ height: "calc(100vh - 70px - 2rem)" }}
          alt="SignupImage"
        />
      </Grid>
      <Grid item md={6} alignItems="center" display="flex">
        <Stack
          sx={{ padding: "3rem" }}
          bgcolor="rgba(255,255,255,0.6)"
          boxShadow={"0 5px 10px grey"}
          borderRadius="1%"
        >
          <Typography variant="h2">Signup</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit, onError)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
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
              margin="normal"
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
              onKeyUp={() => {
                trigger("email");
              }}
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
              autoComplete="off"
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
              onKeyUp={() => {
                trigger("password");
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              {...register("password_confirmation", {
                required: "Confirm Password is Required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
                validate: (value) =>
                  value === getValues().password ||
                  "The passwords do not match",
              })}
              name="password_confirmation"
              label="Confirm Password"
              autoComplete="off"
              type={showCfmPW ? "text" : "password"}
              error={!!errors?.password_confirmation}
              helperText={
                errors?.password_confirmation
                  ? errors.password_confirmation.message
                  : null
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
              sx={{
                mt: 3,
                mb: 2,
                color: "white",
                backgroundColor: "#0a7df0",
                "&:hover": { backgroundColor: "#0a7df0" },
              }}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Signup;
