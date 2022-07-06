import { React, useState } from "react";
import AuthUser from "../AuthUser";
import "../styles.css";

const Login = () => {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    //api call
    http.post("/login", user).then(
      (res) => {
        console.log(res.data);
        setToken(res.data.user, res.data.token);
      },
      error => {
        console.log(error.response.data);
      }
    );
    
  };

  return (
    <div className="container">
      <form>
        <h1 className="form-header">Login</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <p>Email</p> */}
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <p>Password</p> */}
          <button className="submitbtn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
