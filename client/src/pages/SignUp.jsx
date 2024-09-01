import React, { useState } from 'react';
import Nav from './components/Nav';
import {Link,useNavigate}from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    const res=await fetch('/server/auth/signup',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'},
        
        body:JSON.stringify(formData),
      }
    );
    const data =await res.json();
    if(data.success==false){
      setLoading(false);

      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    console.log(data);
    navigate('/sign-in');
  }
  console.log(formData);
  return (
    <>
      <Nav />
      <div className="main-body">
        <div className="signup-container">
          <h2>Sign Up</h2>
          <form action="/signup" method="POST" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Name</label>
              <input type="text" id="username" name="username" required onChange={handleChange}/>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required onChange={handleChange}/>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required onChange={handleChange}/>
            </div>
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" name="confirm-password" required onChange={handleChange}/>
            </div>
            <button type="submit" className="submit-button" disabled={loading}>{loading?'loading...':'Sign Up'}</button>
          </form>
          <p style={{ fontSize: '10px' }}>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
