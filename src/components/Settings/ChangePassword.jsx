import React from "react";
import { useForm } from "react-hook-form";
import "../styles.css";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({});

  const onSubmit = (data) => {
    console.log(data);

    // api call
  };

  return (
    <div className="edit-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header">Change Password</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Old Password</label>
            <input
              type="text"
              className={`form-control ${errors.name && "invalid"}`}
              placeholder="Old Password"
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
              onKeyUp={() => {
                trigger("name");
              }}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>
          <div className="field">
            <label>New Password</label>
            <input
              type="text"
              className={`form-control ${errors.email && "invalid"}`}
              placeholder="New Password"
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

          <button className="submitbtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
