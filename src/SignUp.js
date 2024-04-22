import './styles/SignUp.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { child, get, ref, set } from 'firebase/database';
import { db } from './hooks/firebase'
import { useState } from 'react';
import { addUser, addRole } from './hooks/userSlice';
import { useDispatch } from 'react-redux';

const SignUp = () => {

  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryQ, setRecoveryQ] = useState('What is your favorite food?');
  const [recoveryAns, setRecoveryAns] = useState('');

  const [avaliableUser, setAvaliableUser] = useState(false);
  const [notAvaliableUser, setNotAvaliableUser] = useState(false);

  const dbRef = ref(db);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let create = false;

  function checkUsername(e) {
    if (e.target.checkValidity()) {
      e.target.parentNode.classList.remove('input-notvalid');
      e.target.parentNode.classList.add('input-valid');
    } else {
      e.target.parentNode.classList.remove('input-valid');
      e.target.parentNode.classList.add('input-notvalid');
    }
    setUserName(e.target.value);
  }

  function checkAvaliable() {
    get(child(dbRef, `users/${userName}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setAvaliableUser(false);
        setNotAvaliableUser(true);
      } else {
        setNotAvaliableUser(false);
        setAvaliableUser(true);
        if (create) {
          set(ref(db, 'users/' + userName), {
            fullName: fullName,
            password: password,
            role: 'member',
            recoveryQuestion: recoveryQ,
            recoveryAnswer: recoveryAns
          });
          dispatch(addUser(userName));
          dispatch(addRole('member'));
          navigate('/react-tutorial');
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    create = true;
    checkAvaliable();
  }

  return (
    <div className='signUp-back'>
      <div className="signUp-cont">
        <h1 className='signUp-title'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='form-cont'>
          <div className="fullname">
            <label htmlFor="fullname-input" className='fullname-label'>Full name:</label>
            <input
              type="text"
              placeholder="Enter full name"
              id='fullname-input'
              className="fullname-input"
              pattern="^[a-zA-Z ]+$"
              minLength={2}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <p className='username-info info'>Valid characters: Letters, numbers, (.) and (_)</p>
          <div className='username-cont'>
            <div className="username-box">
              <input
                type="text"
                placeholder='Username'
                aria-label='Username'
                maxLength={12}
                pattern='^[a-zA-Z]+[a-zA-Z0-9._]+$'
                onChange={e => checkUsername(e)}
                required />
              <PersonIcon className='userIcon' />
              {avaliableUser && <CheckIcon className='yesIcon' />}
              {notAvaliableUser && <CloseIcon className='noIcon' />}
            </div>
            <button type="button" className='checkBtn' onClick={checkAvaliable}>Check availability</button>
          </div>
          <p className='password-info info'>Min lenght: 8</p>
          <div className="password-box">
            <input type="password"
              placeholder='Password'
              aria-label='Password'
              minLength={8}
              onChange={e => setPassword(e.target.value)}
              required />
            <LockIcon className='passIcon' />
          </div>
          <div className="recoveryQ-cont">
            <select className='recoverySelect'
              value={recoveryQ}
              onChange={(e) => setRecoveryQ(e.target.value)}
              required
            >
              <option value="What is your favorite food?">What is your favorite food?</option>
              <option value="What is your favorite color?">What is your favorite color?</option>
            </select>
            <input type="text"
              className='recoveryAns'
              placeholder='Answer'
              aria-label='Answer'
              onChange={(e) => setRecoveryAns(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='submit' >Sign Up</button>
        </form>
      </div >
    </div>
  );
}

export default SignUp;