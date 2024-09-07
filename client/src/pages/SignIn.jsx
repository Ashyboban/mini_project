import  { useState } from 'react';
import Nav from './components/Nav';
import {Link,useNavigate}from 'react-router-dom';
import './SignUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';

const SignIn = () => {
  const [formData,setFormData]=useState({});
  const {loading,error}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try
    {

      dispatch(signInStart());
      const res=await fetch('/server/auth/signin',
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json'},
          
          body:JSON.stringify(formData),
        }
      );
      const data =await res.json();
      console.log(data);
      if(data.success==false){
      dispatch(signInFailure(data.message));      
        return;
      }
     dispatch(signInSuccess(data));
      navigate('/');
    }
    catch(error){
      dispatch(signInFailure(error.message));
    }
    };
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
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required onChange={handleChange}/>
            </div>
            
            <button type="submit" className="submit-button" disabled={loading}>{loading?'loading...':'Sign In'}</button>
          </form>
          <p style={{ fontSize: '10px' }}>Dont Have an Account? <Link to={'/sign-up'}>Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
