import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
       <div className="navbar-site-name">
        <h1>Online Stay Finder</h1>
    

      </div>

        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/about">About</Link>
        <Link to="/sign-in">SignIn</Link>
    </nav>
  )
}

export default Nav