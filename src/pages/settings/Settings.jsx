import './settings.css';
import { useContext,useState } from 'react';
import { Context } from '../../contextApi/Context';
import SideBar from '../../components/sideBar/SideBar.jsx';
import {BrowserRouter as Router,} from "react-router-dom";
import axios from 'axios';


// settings page
function Settings()
{
    // public folder to access images
    const PF='http://localhost:3500/images/'
    // informations on the storage 
    const {user,dispatch}=useContext(Context); 
    // file for image if uploaded
    const [file,setFile]=useState(null);
    const [username,setUserName]=useState(user.username);
    const [email,setEmail]=useState(user.email);
    const [password,setPassword]=useState(user.password);
    const [success,setSuccess]=useState(false);
    const [successText,setSuccessText]=useState("");
    // update functionality
    const handleSubmit=async(e)=>
    {
        dispatch({type:'UPDATE_START'})
        e.preventDefault();
        const updatedUser=
        {
            userId:user._id,
            username,email,password
        }
        if(file)
        {
            const data=new FormData();
            const filename=Date.now()+file.name;
            data.append('name',filename);
            data.append('file',file);
            updatedUser.profilePic=filename;
            try {
                await axios.post('api/upload',data);
            } catch (error) {
                
            }
        }
        try {
            const res=await axios.put('api/user/'+user._id,updatedUser)
            dispatch({type:'UPDATE_SUCCESS',payload:res.data})
            console.log(user);
            setSuccess(true);
            setSuccessText("profile has been updated");
        } catch (error) {
            dispatch({type:'UPDATE_FAILURE'})
        }
    }
    // delete functionality
    const handleDelete=async(e)=>
    {
        dispatch({type:'UPDATE_START'})
        console.log('button triggered');
        e.preventDefault();
        try {
            // console.log(updatedUser);
            const res=await axios.delete('api/user/'+user._id,{data:{userId:user._id}})
            dispatch({type:'UPDATE_SUCCESS',payload:res.data})
            dispatch({type:'LOGOUT'})
            console.log('user deleted');
            setSuccess(true);
            setSuccessText("profile has been deleted");
            window.location.replace('/');
        } catch (error) {
            dispatch({type:'UPDATE_FAILURE'})
        }
    }
    return (
        // settings page container
        <div className="settings">
            {/* settings inner container */}
            <div className="settingsWrapper">
                {/* title container for settings */}
                <div className="settingsTitle">
                    <span className="settingUpdateTitle">update your account</span>
                    {/* delete button */}
                    <span className="settingDeleteTitle">
                        <button type='submit' onClick={(e)=>
                            {
                                if(window.confirm('Are you sure you want to Delete ?'))
                                {
                                    handleDelete(e)
                                }
                            }
                        } className='deleteButton'>
                            Delete Account
                        </button>
                    </span>
                </div>
                {/* settings form */}
                <form className="settingsForm" onSubmit={
                    (e)=>
                    {
                        if(window.confirm('Are you sure you want to Update ?'))
                        {
                            handleSubmit(e)
                        }
                    }
                }>
                    {/* lable for profile picture */}
                    <label >profile picture</label>
                    {/* upload image button and picture  */}
                    <div className="settingsPP">
                        <img src={file?URL.createObjectURL(file):(PF+user.profilePic)} alt="settings profile picture" />
                        <label htmlFor="fileInput">
                            <i className='settingsPPIcon far fa-user-circle'></i>
                        </label>
                        <input type="file" id='fileInput' style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
                    </div>
                    {/* username label and input */}
                    <label htmlFor="UserName">Username</label>
                    <input type="text" placeholder={user.username} onChange={e=>setUserName(e.target.value)}/>
                    {/* email label and input */}
                    <label htmlFor="UserName">Email</label>
                    <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)}/>
                    {/* password lable and input */}
                    <label htmlFor="UserName">Password</label>
                    <input type="password" onChange={e=>setPassword(e.target.value)} />
                    {/* update settings button submit for form */}
                    <button className="settingsSubmit" type='submit'>Update</button>
                    {/* status message */}
                    {success&& <span className="success">{successText}</span>}
                </form>
            </div>
            <SideBar></SideBar>
        </div>
    );
};


export default Settings