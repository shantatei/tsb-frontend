import { React } from "react";
import { useForm } from "react-hook-form";
import AuthUser from "../AuthUser";
import "../styles.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const { http, setToken } = AuthUser();


  const onSubmit = (data) => {
    console.log(data);

    // api call
    http.post("/login", data).then(
      (res) => {
        console.log(res.data);
        setToken(res.data.user, res.data.token);
      },
      (error) => {
        console.log(error.response.data);
      }
    );

    reset();
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
                  message: "Minimum password length is 6",
                },
              })}
              onKeyUp={()=>{
                trigger("password")
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
