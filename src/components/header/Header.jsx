import './header.css';


// Header component for landing picture and and Title
function Header()
{
  return (
    <div className="header">
        <div className="headerTitles">
            <span className='headerTitleSm'>MERN STACK APPLICATION</span>
            <span className='headerTitleLg'> Blog App</span>
        </div>
        <img src="https://images.pexels.com/photos/6130370/pexels-photo-6130370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="header image" className="headerImg" />
    </div>
  );
}

//&w=1260&h=750
export default Header;