import './login.css';
import {React,useRef,useContext} from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Context } from '../../contextApi/Context';
import axios from 'axios';


// Login page
function Login()
{
  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching}=useContext(Context);
  // submitting functionality
  const handleSubmit=async(e)=>
  {
    e.preventDefault(); 
    dispatch({type:'LOGIN_START'});
    try {
      const res=await axios.post('api/auth/login',
      {
        username:userRef.current.value,
        password:passwordRef.current.value
      });
      dispatch({type:'LOGIN_SUCCESS',payload:res.data});
    } catch (error) {
      dispatch({type:'LOGIN_FAILURE'});
    }
  };

  return (
    // login container
    <div className="login">
        {/* title  */}
        <span className="loginTitle">Login</span>
        {/* form  */}
        <form className="loginForm" onSubmit={handleSubmit}>
            {/* username label and input */}
            <label>Username</label>
            <input type="text" placeholder='Enter your username..'  className="logintInput" ref={userRef}/>
            {/* password lable and input */}
            <label>Password</label>
            <input type="password" placeholder='Enter your password..'  className="logintInput" ref={passwordRef}/>
            {/* login button */}
            <button className="loginbutton" type='submit' disabled={isFetching}>
                {isFetching?'loading':'LOGIN'}
            </button>
        </form>
        {/* go to register page */}
        <button className="loginregister">
            <Link className='link' to='/register'>Register</Link>
        </button>
    </div>
  );
};


export default Login