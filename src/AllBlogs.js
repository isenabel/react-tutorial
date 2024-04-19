import { useEffect, useState } from "react";
import useFirebase from "./hooks/useFirebase";
import BlogList from "./BlogList";
import Pagination from "./Pagination";
import './styles/AllBlogs.css';
import { useParams } from "react-router-dom";

const AllBlogs = () => {
  const { author } = useParams();
  const { data, isPending, error } = useFirebase("GET", null, true);
  const [pageBlogs, setPageBlogs] = useState(null);
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    // Filter by author
    if (author && data) {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data[key], 'author')) {
          if (data[key].author === author) {
            const element = Object.fromEntries(Object.entries(data).filter((key) => key[1].author === author));
            setBlogs(Object.entries(element));
            setPageBlogs(Object.entries(element));
          }
        }
      }
    } else {
      if (data) {
        setBlogs(Object.entries(data));
      }
    }
  }, [data, author]);

  return (
    <div className="allBlogsCont">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {pageBlogs && <BlogList blogs={pageBlogs} title="All Blogs" reversed={false} />}
      {blogs && <Pagination data={blogs} pageLimit={10} setPageItems={setPageBlogs} />}
    </div>
  );
}

export default AllBlogs;