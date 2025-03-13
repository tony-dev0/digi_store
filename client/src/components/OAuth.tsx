import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import google from "../assets/images/google.png";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const body ={
            name: result.user.displayName,
            email: result.user.email,
          }
        // console.log(userdata, userdata.name)
      axios.post('/api/auth/google', body).then((res) => {
        console.log(res.data);
        dispatch(signInSuccess(res.data));
        navigate('/');
      }).catch(err => console.log("Server ERR: ",err))
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <div className='inputBox'>
    <button
      onClick={handleGoogleClick}
      type='button'
      className='btn btn-grayish w-100 text-white py-2 rounded-3'
    >
   <img src={google} alt="#" width={42} />
   <span className='ms-2'> Continue with Google </span>
    </button>
    </div>
  );
}
