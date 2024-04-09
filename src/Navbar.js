import { Link } from 'react-router-dom';
import logo from './logo.svg'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div>
        <Link to={`/`}>
          <div className="logoContainer">
            <img src={logo} alt=''></img>
            <h1>React Blog Test</h1>
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
