import './sideBar.css';
import {React,useState,useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";


//SideBar componenet
function SideBar()
{
    // categories 
    const [cats,setCats]=useState([]);
    // load once 
    useEffect(()=>
    {
        const getCats=async()=>
        {
            const res=await axios.get('http://localhost:3500/api/category');
            setCats(res.data);
        };
        getCats();
    },[]);
    return(
        // container
        <div className="sidebar">
            {/* About Me section */}
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://images.pexels.com/photos/4064840/pexels-photo-4064840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="sidebarImage" />
                <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad sint eveniet a ipsum consequuntur.</p>
            </div>
            {/* Categories of posts */}
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarlist">
                    {
                        cats.map((c)=>(
                            <Link to={`/?cat=${c.name}` } className='link'>
                                <li className='sidebarlistitem'>{c.name}</li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
            {/* Follow us section */}
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-linkedin"></i>
                    <i className="sidebarIcon fa-brands fa-telegram"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </div>
    );
}


export default SideBar;