import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

export default function OAuth(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick=async()=>{
        try {
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result=await signInWithPopup(auth,provider);
            const res=await fetch('/server/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({name:result.user.displayName,email:result.user.email,photos:result.user.photoURL}),
            })
            const data=await res.json();
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            console.log('couldnt sign in with Google',error);
        }
    }
    return(
        <button onClick={handleGoogleClick} type='button'
        style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: 'red', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            fontSize: '16px', 
            marginTop: '10px' 
        }}
    >
        Continue with Google
    </button>
    )
}