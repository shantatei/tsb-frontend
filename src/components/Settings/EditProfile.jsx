import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthUser from "../../services/AuthUser";
import "../styles.css";

const EditProfile = () => {
  const { httpwtoken } = AuthUser();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    httpwtoken
      .get("/profile", {
      })
      .then(
        (res) => {
          setProfile(res.data);
        },
        (error) => {
          console.log(error.response.data);
        }
      );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
  });

  const onSubmit = (data) => {
    // api call
    httpwtoken
      .put("/editUser", 
        data,
      )
      .then(
        (res) => {
          console.log(res.data);
        },
        (error) => {
          console.log(error.response.data);
          console.log(data);
        }
      );
  };

  return (
    <div className="edit-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header">Edit Profile</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              defaultValue={profile.name}
              type="text"
              className={`form-control ${errors.name && "invalid"}`}
              placeholder="Name"
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
            <label>Email</label>
            <input
              defaultValue={profile.email}
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

          <button className="submitbtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
