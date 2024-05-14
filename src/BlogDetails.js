import { Link, useNavigate, useParams } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "./hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isPending, error } = useFetch('https://3.142.12.117:80/blogs/' + id);
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [blogDeleted, setBlogDeleted] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [currentRole, setCurrentRole] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [dateConverted, setDateConverted] = useState();

  const user = useSelector((state) => state.currentUser.currentUser);
  const role = useSelector((state) => state.currentUser.role);
  const deleteContainer = document.querySelector('.deleteMsgBack');


  useEffect(() => {
    setCurrentRole(role);
    setCurrentUser(user);
    if (currentRole === 'admin' || currentRole === 'moderator') {
      setCanDelete(true);
    }
    if (blog) {
      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      const newDate = new Date(blog.date);
      setDateConverted(new Intl.DateTimeFormat('en-US', dateOptions).format(newDate));

      if (currentUser === blog.author) {
        setCanDelete(true);
      };
    }
  }, [role, currentRole, user, currentUser, blog]);

  const handleClick = () => {
    setConfirmDelete(true);
    deleteContainer.classList.remove('hide');
  }

  const deleteBlog = async () => {
    await fetch('https://3.142.12.117:80/blogs/' + id, {
      method: 'DELETE'
    })
      .then(async (res) => {
        console.log( await res.text()); 
        setConfirmDelete(false);
        setBlogDeleted(true);
        goToHome();
      })
      .catch(err => console.log(err));
  }

  function cancelDelete() {
    setConfirmDelete(false);
    deleteContainer.classList.add('hide');
  }

  function goToHome() {
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  return (
    <div className="blog-details">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blog && (
        <article>
          <h1 className="blogTitle">{blog.title}</h1>
          <p className="author">Written by: <Link to={`/all/${blog.author}`}><b>{blog.author}</b></Link></p>
          <p className="body">{blog.body}</p>
          <p className="blogDate"><b>Created at: </b>{dateConverted}</p>
          {canDelete && <button onClick={handleClick} className="actionBtn">Delete</button>}
        </article>
      )}
      <div className="deleteMsgBack hide">
        <div className="deleteMsgCont">
          {confirmDelete &&
            <div className="confirmDelete">
              <p>Are you sure you want to permanently delete this blog?</p>
              <div className="confirmBtnCont">
                <button className="deleteYes" onClick={deleteBlog}>Yes</button>
                <button className="deleteNo" onClick={cancelDelete}>No</button>
              </div>
            </div>
          }
          {blogDeleted &&
            <div className="deleteMsg">
              <CheckIcon />
              <p>Blog Deleted</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;