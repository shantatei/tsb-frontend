import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthUser from "../AuthUser";
import "../styles.css";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger
  } = useForm();

  const navigate = useNavigate();
  const { http } = AuthUser();

  const onSubmit = (data) => {
    console.log(data);

    // api call

    http.post('/register',data).then((res)=>{
      console.log(res.data);
      navigate('/login')
    },
    error => {
      console.log(error.response.data);
    })
    reset();
  };

  const onError = (errors) =>{
    console.log(errors);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <h1 className="form-header">Signup</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              className={`form-control ${errors.name && "invalid"}` }
              placeholder="Name"
              {...register("name", {
                required: "Name is Required",
                minLength: {
                  value: 3,
                  message: "Minimum name length is 3",
                },
                maxLength: {
                  value: 100,
                  message: "Maximum name length is 99",
                },
              })}
              onKeyUp={()=>{
                trigger("name")
              }}
              
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              className={`form-control ${errors.email && "invalid"}` }
              placeholder="Email"
              {...register("email", { required: "Email is Required" ,
            pattern:{
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            }})}
            onKeyUp={()=>{
              trigger("email")
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
              className={`form-control ${errors.password && "invalid"}` }
              placeholder="Password"
              {...register("password", { required: "Password is Required" , minLength:{
                value: 6,
                message: "Minimum password length is 6"
              }})}
              onKeyUp={()=>{
                trigger("password")
              }}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.password_confirmation && "invalid"}` }
              placeholder="Confirm Password"
              {...register("password_confirmation", {
                required: "Confirm Password is Required",
                minLength:{
                  value:6,
                  message:"Minmum password length is 6"
                }
              })}
              onKeyUp={()=>{
                trigger("name")
              }}
            />
          </div>
          {errors.password_confirmation && (
            <small className="text-danger">
              {errors.password_confirmation.message}
            </small>
          )}
          <button className="submitbtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
