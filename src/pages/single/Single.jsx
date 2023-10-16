import './single.css';
import SideBar from '../../components/sideBar/SideBar';
import SinglePost from '../../components/SinglePost/SinglePost';


// single post page
function Single()
{
  return (
    <div className="single">
        <SinglePost></SinglePost>
        <SideBar></SideBar>
    </div>
  );
}


export default Single