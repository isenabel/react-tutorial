import NavBar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import { useEffect } from 'react';
import AllBlogs from './AllBlogs';
import SignIn from './SignIn';
import SignUp from './SignUp';

// import { Provider } from 'react-redux';

export default function App() {

  useEffect(() => {
    const onPageLoad = () => {
      document.body.classList.add('show');
    };

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/react-tutorial' element={<Home />}></Route>
            <Route path='/all' element={<AllBlogs />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path='/signIn' element={<SignIn />}></Route>
            <Route path='/signUp' element={<SignUp />}></Route>
            <Route path='/blogs/:id' element={<BlogDetails />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}