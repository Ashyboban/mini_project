import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/about">About</Link>
        <Link to="/sign-up">SignUp</Link>
        <Link to="/sign-in">SignIn</Link>
    </nav>
  )
}

export default Nav