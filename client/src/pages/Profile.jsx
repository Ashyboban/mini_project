import Nav from "./components/Nav"
import { useSelector } from 'react-redux';
import './SignUp.css';


const Profile = () => {
  const {currentUser} =useSelector((state)=>state.user)
  return (
    <>
      <Nav />
      
    

    <div className="profile-form-container">
    <h1 className="form-heading">Profile</h1>
      {/* Profile Image */}
      <div className="profile-image-container">
        <img 
          src={currentUser.avatar}// Example placeholder image
          alt="Profile"
          className="profile-image"
        />
      </div>

      {/* Form */}
      <form className="profile-form">
        {/* Name */}
        <div className="form-group">
          
          <input type="text" id="name" className="form-control" placeholder="username" />
        </div>

        {/* Email */}
        <div className="form-group">
         
          <input type="email" id="email" className="form-control" placeholder="email" />
        </div>

        {/* Password */}
        <div className="form-group">
          
          <input type="password" id="password" className="form-control" placeholder="password" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn-long">Submit</button>
        </div>

        {/* Links for Sign Out and Delete Account */}
        <div className="form-links">
          <a href="/signout" className="link-signout">Sign Out</a>
          <a href="/delete-account" className="link-delete">Delete Account</a>
        </div>
      </form>
    </div>
  



    </>
  )
}

export default Profile