import './write.css';
import {React,useState,useContext} from 'react';
import axios from 'axios';
import { Context } from '../../contextApi/Context';


// Write page (add new post)
function Write()
{
  // post variables
  const [title,setTitle]=useState('');
  const [desc,setDesc]=useState('');
  const [file,setFile]=useState(null);
  // user storage 
  const {user}=useContext(Context);
  // posting functionality
  const handleSubmit=async(e)=>
  {
    e.preventDefault();
    const newPost=
    {
      username:user.username,
      title,
      desc,
    };
    if(file)
    {
      const data=new FormData();
      const filename=Date.now()+file.name;
      data.append('name',filename);
      data.append('file',file);
      newPost.photo=filename;
      try {
        await axios.post('api/upload',data);
      } catch (error) {
        
      }
    }
    try {
      const res=await axios.post('api/post',newPost)
      window.location.replace('/post/'+res.data._id)
    } catch (error) {
      
    }
  }

  return (
    // write page container
    <div className="write">
        {/* image  */}
        {
          file&&<img src={URL.createObjectURL(file)} alt="write Image" className='writeImg' />
        }
        {/* post form */}
        <form  className="writeForm" onSubmit={handleSubmit}>
            {/* items container */}
            <div className="writeFormGroup">
                {/* add image button */}
                <label htmlFor="fileInput">
                  <i className="writeIcon fas fa-plus"/>
                </label>
                <input type="file" id='fileInput' style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
                {/* add title input area */}
                <input type="text" placeholder='Title' className='writeInput' autoFocus={true} onChange={e=>setTitle(e.target.value)}/>
            </div>
            {/* items container */}
            <div className="writeFormGroup">
              {/* description */}
              <textarea placeholder='Tell you story .. ' type="text" className='writeInput writeText' onChange={e=>setDesc(e.target.value)}></textarea>
            </div>
            {/* post button */}
            <button className="writeSubmit" type='submit'>
              Publish
            </button>
        </form>
    </div>
  );
};


export default Write