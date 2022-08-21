import { React, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AuthUser from "../../../services/AuthUser";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const DeleteAccount = () => {
  const [showPW, setShowPW] = useState(false);
  const { httpwtoken, logout, http, getToken } = AuthUser();

  const handleClickShowPassword = () => {
    setShowPW(!showPW);
  };

  const logoutUser = () => {
    http.post("/logout", { token: getToken() }).then((res) => {
      console.log(res.data);
    });

    logout();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
    reset,
  } = useForm({});

  const onSubmit = (data) => {
    data._method = "DELETE";
    console.log(data);
    // api call
    httpwtoken.post("/deleteUser", data).then(
      (res) => {
        console.log(res.data);
        logoutUser();
      },
      (error) => {
        console.log(error.response.data);
        if ((error.response.data.error = "Current password does not match")) {
          setError("password", { message: "Current password does not match" });
        }
      }
    );
  };

  return (
    <Grid container maxWidth={"sm"}>
      <Typography variant="h4">Delete Account</Typography>
      <Typography variant="caption">
        Please provide your password in order to delete your account
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          {...register("password", {
            required: "Password is Required",
          })}
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
          onKeyUp={() => {
            trigger("password");
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
    </Grid>
  );
};

export default DeleteAccount;
