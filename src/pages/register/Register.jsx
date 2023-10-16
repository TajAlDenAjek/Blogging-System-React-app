import './register.css';
import {React,useState} from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';


// Register page
function Register()
{
  const [username,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(false);
  //  submitting functionality
  const handleSubmit=async(e)=>
  {
    setError(false);
    e.preventDefault();
    try {
      const res=await axios.post('api/auth/register',{username,email,password})
      res.data&&window.location.replace('/login')
      
    } catch (error) {
      setError(true);
    }
  }
  
  return (
    // register container
    <div className="register">
        {/* title */}
        <span className="registerTitle">Register</span>
        {/* register form */}
        <form className="registerForm" onSubmit={handleSubmit}>
            {/* username label and input */}
            <label>Username</label>
            <input type="text" placeholder='Enter your username..'  className="registertInput" onChange={e=>setUserName(e.target.value)}/>
            {/* email label and input */}
            <label>Email</label>
            <input type="text" placeholder='Enter your email..'  className="registertInput" onChange={e=>setEmail(e.target.value)}/>
            {/* password lable and input */}
            <label>Password</label>
            <input type="password" placeholder='Enter your password..'  className="registertInput" onChange={e=>setPassword(e.target.value)}/>
            {/* submit (register) button */}
            <button className="registerbutton">
                Register
            </button>
        </form>
        {/* Link to login page button */}
        <button className="registerlogin">
          <Link className='link' to='/login'>Login</Link>
        </button>
        {/* handel errors getting from backend (user name is not unique number of letters .. and so on) */}
        {error&&<span style={{color:"red"}}>something went wrong</span>}
    </div>
  );
};


export default Register