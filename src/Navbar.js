import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function NavBar() {

  const [currentUser, setCurrentUser] = useState('');
  const user = useSelector((state) => state.currentUser.currentUser)

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <nav className="navbar">
      <div>
        <Link to={`/`}>
          <div className="logoContainer">
            <Logo />
            <h1>BLOG TEST</h1>
          </div>
        </Link>
        <div className="links">
          <Link to={`/`}>Home</Link>
          {currentUser && <Link to={`/create`}>New Blog</Link>}
          {!currentUser && <Link to={`/signIn`} className='login-btn'>Sign in</Link>}
        </div>
      </div>
    </nav>
  );
}
