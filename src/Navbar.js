import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';

export default function NavBar() {
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
          <Link to={`/create`}>New Blog</Link>
        </div>
      </div>
    </nav>
  );
}
