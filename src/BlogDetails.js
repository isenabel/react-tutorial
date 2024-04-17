import { useNavigate, useParams } from "react-router-dom";
// import useFetch from "./useFetch";
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { db } from './hooks/firebase'
import { ref, remove } from 'firebase/database';
import useFirebase from "./hooks/useFirebase";

const BlogDetails = () => {
  const { id } = useParams();
  // const { data: blog, isPending } = useFetch('http://localhost:4000/blogs/' + id);
  const { data: blog, isPending, error } = useFirebase('GET', id, null);
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [blogDeleted, setBlogDeleted] = useState(false);

  const deleteContainer = document.querySelector('.deleteMsgBack');

  let dateConverted;

  if (blog) {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    const newDate = new Date(blog.date);
    dateConverted = new Intl.DateTimeFormat('en-US', dateOptions).format(newDate);
  }

  const handleClick = () => {
    setConfirmDelete(true);
    deleteContainer.classList.remove('hide');
  }

  const deleteBlog = () => {
    const blogRef = ref(db, 'blogs/' + id);
    remove(blogRef).then(() => {
      setConfirmDelete(false);
      setBlogDeleted(true);
      goToHome();
    });
  }

  function cancelDelete() {
    setConfirmDelete(false);
    deleteContainer.classList.add('hide');
  }

  // const handleClick = async () => {
  //   const res = await fetch('http://localhost:4000/blogs/' + id, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'text/html',
  //       body: id
  //     }
  //   });
  //   if (res.ok) {
  //     setBlogDeleted(true);
  //   }
  // }

  function goToHome() {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }

  return (
    <div className="blog-details">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blog && (
        <article>
          <h1 className="blogTitle">{blog.title}</h1>
          <p className="author">Written by: <b>{blog.author}</b></p>
          <p className="body">{blog.body}</p>
          <p className="blogDate"><b>Created at: </b>{dateConverted}</p>
          <button onClick={handleClick} className="actionBtn">Delete</button>
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