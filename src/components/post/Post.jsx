import './post.css';
import {React} from 'react';
import Posts from '../posts/Posts';
import {BrowserRouter as Router,Link} from "react-router-dom";


// post component 
function Post({post})
{
  //public folder to access the images 
  const PF='http://localhost:3500/images/';
  return (
    // post container
    <div className="post">
        {/* rendering image if found */}
        {post.photo&&(<img src={PF+post.photo} alt="postImg" className="postImg" />)}
        <div className="postInfo">
            <div className="postCats">
                {
                  post.categories.map((c)=>
                  {
                    <span className="postCat">{c.name}</span>
                  })
                } 
            </div> 
            {/* access the post in a single post page  */}
            <Link to={`/post/${post._id}`}className='link'>
              <span className="postTitle">
                {post.title}
              </span>
            </Link>
            <hr />
            <div className="postSubInfo">
              <span className="postDateAndName">
                {`Author : ${post.username}`}
              </span>
              <span className="postDateAndName">
                {`- Date : ${new Date(post.created_at).toDateString()}`}
              </span>
            </div>
        </div>
        <p className="postDesc">{post.desc}</p>
    </div>
  );
}


export default Post