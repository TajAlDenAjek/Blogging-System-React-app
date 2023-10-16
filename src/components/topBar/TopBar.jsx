import './TopBar.css'
import {React,useContext} from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Context } from '../../contextApi/Context';


// Top bar (navbar) component
function TopBar()
{
  // public folder access for images
  const PF='http://localhost:3500/images/';
  // context api using for user information
  const {user,dispatch}=useContext(Context);
  // Handling logout button
  const handleLogout=()=>
  {
    dispatch({type:'LOGOUT'});
  };
  return(
    // container
    <div className='top'>
      {/* logos */}
      <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook"><a href="#top"></a></i>
        <i className="topIcon fa-brands fa-linkedin"></i>
        <i className="topIcon fa-brands fa-telegram"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      {/* navbar */}
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to='/' className='link'>Home</Link>
          </li>
          <li className="topListItem">
            <Link to='/' className='link'>ABOUT</Link>
          </li>
          <li className="topListItem">
            <Link to='/' className='link'>CONTACT</Link>
          </li>
          <li className="topListItem">
            <Link to='/write' className='link'>WRITE</Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user&&'LOGOUT'}
          </li>
        </ul>
      </div>
      {/* userInfo | login/logout */}
      <div className="topRight">
        {
          user?
          (
            <Link to='/settings' className='link'>
              <img src={PF+user.profilePic} alt="top Image" className="topImg" />
            </Link>
          ):
          (
            <ul className='topList'>
              <li className='topListItem'>
                <Link to='/login' className='link'>LOGIN</Link>
              </li>
              <li className='topListItem'>
                <Link to='/register' className='link'>REGISTER</Link>
              </li>
            </ul>
          )
        }
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}


export default TopBar