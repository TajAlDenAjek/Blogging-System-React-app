import './singlePost.css';
import {React,useContext,useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { Context } from '../../contextApi/Context';


// SinglePost component
function SinglePost()
{
    // public folder for images
    const PF='http://localhost:3500/images/';
    const location=useLocation();
    const curId=location.pathname.split('/')[2];
    const [post,setPost]=useState({});
    const {user}=useContext(Context);
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [updateMode,setUpdateMode]=useState(false);
    // get method
    useEffect(() =>
    {
        const getPost=async()=>
        {
            const res=await axios.get(`/api/post/${curId}`);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    },[curId]);
    // delete method
    const handleDelete=async()=>
    {
        try {
            await axios.delete(`http://localhost:3500/api/post/${curId}`,{data:{username:user.username}});
            window.location.replace('/');
        } catch (error) {
            
        };
    };
    // update method
    const handleUpdate=async()=>
    {
        try {
            await axios.put(`http://localhost:3500/api/post/${curId}`,{username:user.username,title,desc});
            // window.location.reload();
            setUpdateMode(false);
        } catch (error) {
            
        };
    };
    return (
        // container
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo&& (<img src={PF+post.photo} alt="" className="singlePostImg" />)}
                {
                    updateMode ?<input className='singlePostTitleInput' value={title} type='text' autoFocus onChange={(e)=>setTitle(e.target.value)}/>
                    :(
                        <h1 className="singlePostTitle">
                            {title}
                            {post.username===user?.username&&(
                                <div className="singlePostEdit">
                                    <i className="singlePostIcons fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                                    <i class="singlePostIcons fa-solid fa-trash" onClick={handleDelete}></i>
                                </div>
                            )}
                        </h1>
                    )
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author:
                     <Link to={`/?user=${post.username}`} className='link'>
                        <b>{post.username}</b>
                     </Link>
                     </span>
                     <span className="singlePostDate">{new Date(post.created_at).toDateString()}</span>
                </div>
                {
                    updateMode
                        ?<textarea className='singlePostDescInput' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                        :<p className="singlePostDesc">
                            {desc}
                        </p>
                }
                {updateMode&&<button className="singlePostButton" onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    )
};


export default SinglePost