import { useState } from "react";
import useFirebase from "./useFirebase";
import BlogList from "./BlogList";
import Pagination from "./Pagination";
import './styles/AllBlogs.css';

const AllBlogs = () => {
  const { data, isPending, error } = useFirebase("GET", null, true);
  const [pageBlogs, setPageBlogs] = useState(null);

  let blogs;
  if (data) {
    blogs = Object.entries(data);
  }

  return (
    <div className="allBlogsCont">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {pageBlogs && <BlogList blogs={pageBlogs} title="All Blogs" reversed={false} />}
      {blogs && <Pagination  data={blogs} pageLimit={10} setPageItems={setPageBlogs} />}
    </div>
  );
}

export default AllBlogs;