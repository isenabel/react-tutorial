import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {

  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>
            <h2>{blog.title}</h2>
            <p>Writen by: <b>{blog.author}</b></p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;