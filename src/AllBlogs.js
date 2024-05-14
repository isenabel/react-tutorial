import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import Pagination from "./Pagination";
import './styles/AllBlogs.css';
import { useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";

const AllBlogs = () => {
  const { author } = useParams();
  const { data, isPending, error } = useFetch('https://3.142.12.117:80/blogs');
  const [pageBlogs, setPageBlogs] = useState(null);
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    // Filter by author
    if (author && data) {
      const filteredData = data.filter((element) => element.author === author);
      setBlogs(filteredData);
      setPageBlogs(filteredData);
    } else {
      if (data) {
        setBlogs(data);
      }
    }
  }, [data, author]);

  return (
    <div className="allBlogsCont">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {pageBlogs && <BlogList blogs={pageBlogs} title="All Blogs" reversed={false} />}
      {blogs && <Pagination data={blogs} pageLimit={11} setPageItems={setPageBlogs} />}
    </div>
  );
}

export default AllBlogs;