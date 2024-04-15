import { Link } from "react-router-dom";
import default_image from "./assets/default_image.webp";

const BlogList = ({ blogs, title, reversed }) => {

  let data, newData;

  
  if (Object.prototype.toString.call(blogs).slice(8).slice(0, -1).toLowerCase() === 'object') {
    data = Object.entries(blogs);
  } else {
    data = blogs;
  }
  
  if (reversed) {
    newData = data.reverse();
  } else {
    newData = data;
  }

  function convertDate(date) {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const newDate = new Date(date);
    return new Intl.DateTimeFormat('en-US', dateOptions).format(newDate);
  }

  function limitCaracters(title) {
    let newTitle = title.substring(0, 37) + '...';
    if (title.length >= 40) {
      return newTitle;
    } else {
      return title;
    }
  }

  return (
    <div className="blog-list">
      <h1>{title}</h1>
      <div className="blogContainers">
        {newData.map((blog) => (
          <article className="blog-preview" key={blog[0]}>
            <Link to={`/blogs/${blog[0]}`}>
              <img src={default_image} alt="Blog"></img>
              {/* <h2>{blog[1].title}</h2> */}
              <h2>{limitCaracters(blog[1].title)}</h2>
              <p className="author">Writen by: <b>{blog[1].author}</b></p>
              <p className="blogDate"><b>Created at: </b>{convertDate(blog[1].date)}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogList;