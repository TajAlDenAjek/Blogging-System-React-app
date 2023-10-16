import './home.css';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import SideBar from '../../components/sideBar/SideBar';
import {React,useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


// Home page 
function Home()
{
  // posts state
  const [posts,setPosts]=useState([]);
  // searching 
  const {search}=useLocation();
  useEffect(()=>
  {
      const fetchPosts=async()=>
      {
        const res=await axios.get('api/post'+search); 
        setPosts(res.data);
      }
      fetchPosts();
  }
  ,[search]);
  return (
      <>
        <Header></Header>
        <div className="home">
          <Posts posts={posts}/>
          <SideBar></SideBar>
        </div>
     </>
  );
}


export default Home