import NavBar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import { useEffect, useState } from 'react';
import AllBlogs from './AllBlogs';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useSelector } from 'react-redux';
import ForgotPass from './ForgotPass';

// import { Provider } from 'react-redux';

export default function App() {

  const [currentUser, setCurrentUser] = useState('');
  const user = useSelector((state) => state.currentUser.currentUser);

  const [firstOpen, setFirstOpen] = useState(true);

  useEffect(() => {
    const onPageLoad = () => {
      document.getElementById('root').classList.add('show');
      setFirstOpen(false);
    };

    if (document.readyState === 'complete' && firstOpen) {
      onPageLoad();
    } else {
      if (firstOpen) {
        window.addEventListener('load', onPageLoad, false);
        return () => window.removeEventListener('load', onPageLoad);
      }
    }

    setCurrentUser(user);
  }, [user, firstOpen]);

  function closeUserMenu(e) {
    if (currentUser) {
      document.querySelector('.userMenu').classList.add('hide');
    }
  }

  return (
    <Router>
      <div className="App" onClick={closeUserMenu}>
        <NavBar />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/react-tutorial' element={<Home />}></Route>
            <Route path='/all' element={<AllBlogs />}></Route>
            {currentUser && <Route path='/all/:author' element={<AllBlogs />}></Route>}
            <Route path='/blogs/:id' element={<BlogDetails />}></Route>
            {currentUser && <Route path='/create' element={<Create />}></Route>}
            {currentUser && <Route path='/forgotPass' element={<ForgotPass />}></Route>}
            <Route path='/signIn' element={<SignIn />}></Route>
            <Route path='/signUp' element={<SignUp />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}