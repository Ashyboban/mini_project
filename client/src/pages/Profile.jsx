import Nav from "./components/Nav"
import { useSelector } from 'react-redux';
import './SignUp.css';
import { useRef, useState,useEffect } from "react";
import {getDownloadURL, getStorage, uploadBytesResumable,ref, list} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess,updateUserFailure,deleteUserFailure,
  deleteUserStart ,deleteUserSuccess, signOutUserStart,
  } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import Listing from "../../../server/models/listing.model";



const Profile = () => {
  const fileRef=useRef(null);
  const {currentUser,error} =useSelector((state)=>state.user);
  const [file,setFile]=useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData,setFormData]=useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const dispatch=useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate
  const [showListingError,setShowListingError]=useState(false);
  const [userListings,setUserListings]=useState([]);

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
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res=await fetch(`/server/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',

        },
        body:JSON.stringify(formData),
      });
      const data=await res.json()
      if (data.success==false){
        dispatch(updateUserFailure(data.message));
        return
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);


    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser=async()=>{
    try {
      dispatch(deleteUserStart());
     const res=await fetch(`/server/user/delete/${currentUser._id}`,{
      method:'DELETE',

     });
     const data=await res.json();
     if(data.success==false){
      dispatch(deleteUserFailure(data.message));
      return;
     }
     dispatch(deleteUserSuccess(data))
     navigate('/sign-in');

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut=async()=>{
    try {
      dispatch(signOutUserStart());
     const res= await fetch('/server/auth/signout');
     const data=await res.json();
     if(data.success==false){
      dispatch(deleteUserFailure(data.message));
      return;
     }
     dispatch(deleteUserSuccess(data))
     navigate('/sign-in');

    } catch (error) {
      dispatch(deleteUserFailure(error.message));

    }
  }
  const handleShowListing=async()=>{
    try {
      setShowListingError(false);
      const res=await fetch(`/server/user/listings/${currentUser._id}`);
      const data=await res.json();
      if (data.success==false){
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  }
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
      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          
          <input type="text" id="name" className="form-control" placeholder="username"   defaultValue={currentUser.username}
        onChange={handleChange}
/>
        </div>
      
        {/* Email */}
        <div className="form-group">
         
          <input type="email" id="email" className="form-control" placeholder="email"  defaultValue={currentUser.email}
          onChange={handleChange}
/>
         
        </div>

        {/* Password */}
        <div className="form-group">
          
          <input type="password" id="password" className="form-control" placeholder="password"  onChange={handleChange}/>

        </div>
        <div className="form-group">
          <button type="submit" className="btn-long">Update</button>
        </div>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>Create Listing</Link>

        {/* Links for Sign Out and Delete Account */}
       
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      <button onClick={handleShowListing} className="text-green-700 w-full">Show Listing</button>
      <p className="text-red-700 mt-5">{showListingError ? 'Error showing Listing':''}</p>
      {userListings&&userListings.length>0 &&
      <div className="flex flex-col gap-4">
        <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
 {userListings.map(listing => (
      <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center">
        <Link to={`/listing/${listing._id}`}>
          <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-contain" />
        </Link>
        <Link to={`/listing/${listing._id}`}>
          <p className="text-slate-700 font-semibold flex-1 hover:underline truncate">{listing.name}</p>

        </Link>
        <div className="flex flex-col items-center">
        <button className="text-green-700 uppercase">Delete</button>
        <button className="text-red-700 uppercase">Edit</button>

        </div>
      </div>
    ))}
      </div>
   
    
      }
    </div>
  



    </>
  )
}

export default Profile