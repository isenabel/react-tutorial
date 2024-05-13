import './styles/SignIn.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addUser, addRole } from './hooks/userSlice';
import { useDispatch } from 'react-redux';


const SignIn = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotuser, setforgotUser] = useState('');
  const [recoveryQ, setRecoveryQ] = useState('');
  const [recoveryAns, setRecoveryAns] = useState('');
  const [recoveryQAns, setRecoveryQAns] = useState('');
  const [goodUser, setGoodUser] = useState(false);
  const [badUser, setBadUser] = useState(false);
  const [badUserForgot, setBadUserForgot] = useState(false);
  const [badPass, setBadPass] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const [clickForgot, setClickForgot] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://3.142.12.117:80/users/login', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: userName,
        password: password
      })
    })
    .then(res => {
      if (!res.ok) {
        throw Error('could not fetch the data for that resource');
      }
      return res.json();
    })
    .then((data) => {
      if (data.username) {
        setBadUser(false);
        if (data.password) {
          setBadPass(false);
          dispatch(addUser(userName));
          dispatch(addRole(data.role));
          console.log(`Welcome! ${userName}`);
          navigate('/');
        } else {
          setBadPass(true);
        }
      } else {
        setBadUser(true);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const continueForgot = () => {
    fetch('http://3.142.12.117:80/users/' + forgotuser)
    .then(res => {
      if (!res.ok) {
        throw Error('could not fetch the data for that resource');
      }
      return res.json();
    })
    .then((data) => {
      if (data) {
        setRecoveryQ(data.recoveryQuestion);
        setRecoveryAns(data.recoveryAnswer);
        setGoodUser(true);
        setShowNextBtn(false);
        setBadUserForgot(false);
        document.querySelector('.forgotUser').disabled = true;
      } else {
        setBadUserForgot(true);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const recoverPass = () => {
    if (recoveryAns === recoveryQAns) {
      document.querySelector('.recovery-answer').disabled = true;
      setShowChangePassword(true);
      document.querySelector('.nextBtn').style.display = 'none';
    } else {
      setIncorrectAnswer(true);
    }
  }

  const submitRecoveryPass = (e) => {
    e.preventDefault();
    fetch('http://3.142.12.117:80/users/' + forgotuser, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: newPassword
      })
     })
    .then(() => {
      setPasswordChanged(true);
      setTimeout(() => {
        setClickForgot(false);
        setforgotUser('');
        setBadUserForgot(false);
        setGoodUser(false);
        setRecoveryQAns('');
        setIncorrectAnswer(false);
        setShowChangePassword(false);
        setNewPassword('');
        setShowNextBtn(true);
        setPasswordChanged(false);
        document.querySelector('.nextBtn').style.display = 'block';
      }, 1000);
    });
  }

  return (
    <div className='login'>
      <div className="login-cont">
        <form onSubmit={handleSubmit} className='form-cont'>
          <h1 className='login-title'>Sign in</h1>
          <div className="username-box">
            {badUser && <p className='badUser'>Username doesn't exist</p>}
            <input
              type="text"
              placeholder='Username'
              aria-label='Username'
              maxLength={12}
              pattern='^[a-zA-Z]+[a-zA-Z0-9._]+$'
              value={userName}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              required />
            <LockIcon />
          </div>

          <span className="forgotPass" onClick={() => setClickForgot(true)}>Forgot password?</span>
          <button type="submit" >Sign in</button>
        </form>
        <div className="register">
          <p>Don't have an account? <Link to={'/signUp'}>Register</Link></p>
        </div>
      </div >
      {/*------------ Forgot Password HTML5 ------------- */}
      {clickForgot && <div className="forgotPassBack" onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setClickForgot(false);
      }}>
        <div className="forgotPassCont">
          <h1 className='forgotTitle'>Recover password</h1>
          <input
            type="text"
            placeholder='Username'
            aria-label='Forgot password, input username'
            className="forgotUser"
            maxLength={12}
            pattern='^[a-zA-Z]+[a-zA-Z0-9._]+$'
            value={forgotuser}
            onChange={(e) => setforgotUser(e.target.value)}
            required
          />
          {badUserForgot && <p className='badUserForgot'>Username doesn't exist or incorrect</p>}
          {goodUser &&
            <div className='recoveryQ-cont'>
              <p className='recoveryQ'>{recoveryQ}</p>
              <input
                type="text"
                placeholder='Answer'
                aria-label='Recovery question answer'
                className='recovery-answer'
                value={recoveryQAns}
                onChange={(e) => setRecoveryQAns(e.target.value)}
                required
              />
              {incorrectAnswer && <p className="incorrectAnswer">Incorrect</p>}
            </div>
          }
          {showChangePassword &&
            <div className='changePass'>
              <input
                type="password"
                placeholder='New Password'
                aria-label='New Password'
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          }
          {showChangePassword && <button type='button' className='recoverSubmit' onClick={submitRecoveryPass}>Update</button>}
          {showNextBtn && <button type="button" className='nextBtn' onClick={continueForgot}>
            Next <ArrowForwardIosIcon className='nextIcon' />
          </button>
          }
          {goodUser && <button type='button' className='nextBtn' onClick={recoverPass}>
            Next <ArrowForwardIosIcon className='nextIcon' />
          </button>}
          {passwordChanged && <p className='correctPassChange'>Password changed!</p>}
        </div>
      </div>
      }
    </div>
  );
}

export default SignIn;