import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useUserStore } from '../../store/useUserStore';


export default function Register() {
  const{signUp,user}=useUserStore()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    signUp(formData)
  };

  return (
    <div className="main">
      <div className="login">
        <h1>Register</h1>
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="placeHolder">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="placeHolder">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="placeHolder">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="placeHolder">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
          <p>
            Already Have an Account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      
    </div>
  );
}
