import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import '../SignUp.css';
const Nav = () => {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <nav>
       <div className="navbar-site-name">
        <h1>Online Stay Finder</h1>
    

      </div>

      <div>
        <input type="text" className="search" placeholder="Search your property" />
      </div>

        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <div className="navbar-user">
          
        {currentUser ? (
  <Link to='/profile'>
    <img
      className="navbar-avatar"
      src={currentUser.avatar}
      alt='profile'
    />
  </Link>
) : (
  <Link to='/sign-in' className='text-slate-700 hover:underline'>Sign in</Link>
)}

      </div>
    </nav>
  )
}

export default Nav