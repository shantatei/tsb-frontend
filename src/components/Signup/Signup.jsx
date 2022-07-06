import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';
import AuthUser from "../AuthUser";
import "../styles.css";

const Signup = () => {
  const navigate = useNavigate();
  const {http} = AuthUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password , password_confirmation};

    //api call
    http.post('/register',user).then((res)=>{
      console.log(res.data);
      navigate('/login')
    })

  }


  return (
    <div className="container">
      <form>
        <h1 className="form-header">Signup</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div> */}
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
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="new-password"
              name="new-password"
              placeholder="Password"
              value={password_confirmation}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="submitbtn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
