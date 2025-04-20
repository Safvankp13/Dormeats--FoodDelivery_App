import React, { useState } from 'react';
import "./Login.scss";
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';

const Login = () => {
  const{login}=useUserStore()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
    
    
  };

  return (
    <div className='main'>
      <div className="login">
        <h1>Login</h1>
        <div className='container'>
          <form className='form' onSubmit={handleSubmit}>
            <div className='placeHolder'>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder='test123@gmail.com  -> use this to login as admin'
                name="email" 
                required 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
            <div className="placeHolder">
              <label htmlFor="password">Password</label>
              <input 
              placeholder='safvan --> use this to see login as admin'
                type="password" 
                id="password" 
                name="password" 
                required 
                value={formData.password} 
                onChange={handleChange} 
              />
            </div>
            <div className="button">
              <input type="submit" value="Login" />
            </div>
          </form>
          <p>
            Not A User? <Link to="/signup">Sign Up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
