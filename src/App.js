import  { React,useContext } from 'react';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Home from './pages/home/Home';
import TopBar from './components/topBar/TopBar'
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register'
import { Context } from './contextApi/Context';


// app logic and design
function App()
{
  // user information in the storage
  const {user}=useContext(Context);

  return(
    // Router for all pages
    <Router>


      {/* navbar */}
      <TopBar></TopBar>


      {/* Routes for pages */}
      <Routes>
        {/* Single Route for Home */}
        <Route exact path='/' element={<Home/>} />


        {/* Register page */}
        <Route path='/register' element={user?<Home/>:<Register/>} />


        {/* Login page */}
        <Route path='/login' element={user?<Home/>:<Login/>} />


        {/* add new post page */}
        <Route path='/write' element={!user?<Register/>:<Write/>} />


        {/* Settings page */}
        <Route path='/settings' element={!user?<Register/>:<Settings/>}/>


        {/* Single Post page route */}
        <Route path='/post/:postId' element={<Single/>} />
      </Routes>
    </Router>
  );
};


export default App;
