import { useNavigate, useParams } from "react-router-dom";
import useGetBlog from "./useGetBlog";
import { ref, remove } from "firebase/database";
import { db } from "./firebase";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isPending } = useGetBlog(id);
  const navigate = useNavigate();

  const handleClick = () => {
    remove(ref(db, "blogs/" + id)).then(() => {
      navigate('/');
    });
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
    </div>
  );
}

export default BlogDetails;