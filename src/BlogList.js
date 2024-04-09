import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {

  const data = Object.entries(blogs);
  const dataSorted = data.reverse();

  return (
    <div className="blog-list">
      <h1>{title}</h1>
      {dataSorted.map((blog) => (
        <div className="blog-preview" key={blog[0]}>
          <Link to={`/blogs/${blog[0]}`}>
            <h2>{blog[1].title}</h2>
            <p className="author">Writen by: <b>{blog[1].author}</b></p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;