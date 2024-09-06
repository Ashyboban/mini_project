import React, { useState } from 'react';
import Nav from './components/Nav';
import {Link,useNavigate}from 'react-router-dom';
import './SignUp.css';

const SignIn = () => {
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
    const res=await fetch('/server/auth/signin',
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
      console.log(data.message);
      
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    console.log(data);
    navigate('/');
  }
  console.log(formData);
  return (
    <>
      <Nav />
      <div className="main-body">
        <div className="signup-container">
          <h2>Sign In</h2>
          <form action="/signup" method="POST" onSubmit={handleSubmit}>
            
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required onChange={handleChange}/>
            </div>
            <div className='error-message'>{error}</div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required onChange={handleChange}/>
            </div>
            
            <button type="submit" className="submit-button" disabled={loading}>{loading?'loading...':'Sign In'}</button>
          </form>
          <p style={{ fontSize: '10px' }}>Don't Have an Account? <Link to={'/sign-up'}>Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
