import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from './hooks/userSlice';

export default function NavBar() {

  const [currentUser, setCurrentUser] = useState('');
  const user = useSelector((state) => state.currentUser.currentUser);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  function openUserMenu(e) {
    e.stopPropagation();
    document.querySelector('.userMenu').classList.remove('hide');
  }
  
  function userOptionsClick (e) {
    e.stopPropagation();
    document.querySelector('.userMenu').classList.add('hide');
  }

  function logOut() {
    dispatch(resetUser());
    navigate('/react-tutorial');
  }

  return (
    <nav className="navbar">
      <div>
        <Link to={`/react-tutorial`}>
          <div className="logoContainer">
            <Logo />
            <h1>BLOG TEST</h1>
          </div>
        </Link>
        <div className="links">
          <Link to={`/react-tutorial`} className='desktop'>Home</Link>
          <Link to={`/react-tutorial`} className='homeIcon navbarIcon mobile'><HomeIcon /></Link>
          {currentUser && <Link to={`/create`} className='desktop'>New Blog</Link>}
          {currentUser && <Link to={`/create`} className='newBlogIcon navbarIcon mobile'><NoteAddIcon /></Link>}
          {!currentUser && <Link to={`/signUp`} className='signUp-btn desktop'>Sign up</Link>}
          {!currentUser && <Link to={`/signIn`} className='login-btn desktop'>Sign in</Link>}
          {!currentUser && <Link to={`/signIn`} className='loginIcon navbarIcon mobile'><LoginIcon /></Link>}
          {currentUser && <div className="userIcon navbarIcon" onClick={(e) => {openUserMenu(e)}}><AccountCircleIcon /></div>}
          {currentUser &&
            <div className="userMenu hide">
              <ul>
                <li className='userInfo'>{currentUser}</li>
                <li className='userOptions' onClick={e => userOptionsClick(e)}><Link to={'/forgotPass'}>Change password</Link></li>
                <li className='userOptions' onClick={e => userOptionsClick(e)}><Link to={`/all/${currentUser}`}>My blogs</Link></li>
                <li className='userOptions' onClick={logOut}><span>Sign out</span></li>
              </ul>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}
