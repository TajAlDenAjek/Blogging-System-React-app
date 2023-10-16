import './posts.css';
import Post from '../post/Post';


//posts componenet
function Posts({posts})
{
  return (
    // render posts 
    <div className="posts">
        {
          posts.map((p)=>(
            <Post post={p} key={p._id}/>
          ))
        }
    </div>
  );
};


export default Posts