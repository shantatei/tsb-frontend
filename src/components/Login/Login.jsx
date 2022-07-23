import { React } from "react";
import { useForm } from "react-hook-form";
import AuthUser from "../../services/AuthUser";
import { Alert, AlertTitle } from "@mui/material";
import "../styles.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
  } = useForm();

  const { http, setToken } = AuthUser();

  const onSubmit = (data) => {
    // api call
    http.post("/login", data).then(
      (res) => {
        setToken(res.data.user, res.data.token);
        return (
          <Alert severity="success" onClose={() => {}}>
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>check it out!</strong>
          </Alert>
        );
      },
      (error) => {
        console.log(error.response.data);
        if (
          (error.response.data.error =
            "Unauthorized, Invalid Email or Password")
        ) {
          console.log("invalid");
          setError("email", { message: "Incorrect Email or Password" });
          setError("password", { message: "Incorrect Email or Password" });
          return (
            <Alert severity="error" onClose={() => {}}>
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
            </Alert>
          );
        }
      }
    );
  };

  return (
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
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              className={`form-control ${errors.password && "invalid"}`}
              placeholder="Password"
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
              onKeyUp={() => {
                trigger("password");
              }}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>
          <button className="submitbtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
