import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isPending } = useFetch('http://localhost:4000/blogs/' + id);
  const navigate = useNavigate();
  const [blogDeleted, setBlogDeleted] = useState(false);

  const handleClick = async () => {
    const res = await fetch('http://localhost:4000/blogs/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'text/html',
        body: id
      }
    });
    if (res.ok) {
      setBlogDeleted(true);
    }
  }

  function goToHome() {
    navigate('/');
  }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by: <b>{blog.author}</b></p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
      {blogDeleted &&
        <div className="deleteMsg">
          <div>
            <CheckIcon />
            <p>Blog Deleted</p>
            <button onClick={goToHome}>Go to Home page</button>
          </div>
        </div>
      }
    </div>
  );
}

export default BlogDetails;