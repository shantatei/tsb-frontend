import { React, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import AuthUser from "../../services/AuthUser";
import {
  Alert,
  Snackbar,
  TextField,
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux/es/exports";
import {
  loginPending,
  loginSuccess,
  loginFail,
  loginNotPending,
} from "../../redux/authSlice";
import "../../css/styles.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginImage from "../../assets/Login-amico.png";

const Login = () => {
  const [showPW, setShowPW] = useState(false);

  const handleClickShowPassword = () => {
    setShowPW(!showPW);
  };

  const DefaultFormValues = {
    login: {
      email: "",
      password: "",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm({
    defaultValues: DefaultFormValues.login,
  });

  const { isDirty } = useFormState({
    control,
  });

  const { http, setToken } = AuthUser();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const dispatch = useDispatch();

  isDirty ? dispatch(loginPending()) : dispatch(loginNotPending());

  const handleClick = (type) => {
    if (type === "success") {
      setOpenSuccess(true);
    }
    if (type === "error") {
      setOpenError(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    // api call
    http.post("/login", data).then(
      (res) => {
        dispatch(loginSuccess());

        handleClick("success");
        setToken(res.data.token);
      },
      (error) => {
        console.log(data);
        console.log(error.response.data);
        dispatch(loginFail());
        if (
          (error.response.data.error =
            "Unauthorized, Invalid Email or Password")
        ) {
          console.log("invalid");
          setError("email", { message: "Incorrect Email or Password" });
          setError("password", { message: "Incorrect Email or Password" });
          handleClick("error");
        }
      }
    );
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid
        item
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src={LoginImage}
          style={{ height: "calc(100vh - 70px - 2rem)" }}
          alt="loginImage"
        ></img>
      </Grid>
      <Grid item md={6} alignItems="center" display="flex">
        <Stack
          sx={{ padding: "3rem" }}
          bgcolor="rgba(255,255,255,0.6)"
          boxShadow={"0 5px 10px grey"}
          borderRadius="1%"
        >
          <Typography variant="h2">Login</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
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
              autoComplete="email"
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
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
              Sign In
            </Button>
          </Box>
        </Stack>
      </Grid>

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Login Successfully
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Login Unsuccessful
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Login;
