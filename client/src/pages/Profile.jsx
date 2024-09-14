import Nav from "./components/Nav"
import { useSelector } from 'react-redux';
import './SignUp.css';
import { useRef, useState,useEffect } from "react";
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage';
import { app } from '../firebase';



const Profile = () => {
  const fileRef=useRef(null);
  const {currentUser} =useSelector((state)=>state.user)
  const [file,setFile]=useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData,setFormData]=useState({})
  //firebase storage
  //  allow read;
  //allow write: if 
  //request.resource.size<2*1024*1024 &&
  //request.resource.contentType.matches('image/.*');
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error)=>{
        setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setFormData({...formData,avatar:downloadURL});
        });
      }
    );




  };
  return (
    <>
      <Nav />
      
    

    <div className="profile-form-container">
    <h1 className="form-heading">Profile</h1>
      {/* Profile Image */}
      <div className="profile-image-container">
        <input onChange={(e)=>setFile(e.target.files[0])} 
        type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()}
          src={formData.avatar||currentUser.avatar}// Example placeholder image
          alt="Profile"
          className="profile-image"
        />
       
      </div>
      <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

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