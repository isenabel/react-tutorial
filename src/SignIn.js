import './styles/SignIn.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import { child, get, ref } from 'firebase/database';
import { db } from './hooks/firebase'
import { useState } from 'react';
import { addUser, addRole } from './hooks/userSlice';
import { useDispatch } from 'react-redux';

const SignIn = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [badUser, setBadUser] = useState(false);
  const [badPass, setBadPass] = useState(false);

  const dbRef = ref(db);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    get(child(dbRef, `users/${userName}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setBadUser(false);
        if (password === snapshot.val().password) {
          setBadPass(false);
          dispatch(addUser(userName));
          dispatch(addRole(snapshot.val().role));
          console.log(`Welcome! ${userName}`);
          navigate('/react-tutorial');
        } else {
          setBadPass(true);
        }
      } else {
        setBadUser(true);
        console.log("No user found");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className='login-back'>
      <div className="login-cont">
        <form onSubmit={handleSubmit} className='form-cont'>
          <h1 className='login-title'>Sign in</h1>
          <div className="username-box">
            {badUser && <p className='badUser'>Username doesn't exist or incorrect</p>}
            <input
              type="text"
              placeholder='Username'
              aria-label='Username'
              maxLength={30}
              onChange={e => setUserName(e.target.value)}
              required />
            <PersonIcon />
          </div>
          <div className="password-box">
            {badPass && <p className='badPass'>Incorrect password</p>}
            <input type="password"
              placeholder='Password'
              aria-label='Password'
              minLength={8}
              onChange={e => setPassword(e.target.value)}
              required />
            <LockIcon />
          </div>

          <Link to={'/forgotPass'} className="forgotPass">Forgot password?</Link>
          <button type="submit" >Sign in</button>
        </form>
        <div className="register">
          <p>Don't have an account? <Link to={'/signUp'}>Register</Link></p>
        </div>
      </div >
    </div>
  );
}

export default SignIn;