import useFirebase from "./useFirebase";
import BlogList from "./BlogList";

const AllBlogs = () => {
  const { data: blogs, isPending, error } = useFirebase("GET", null, true);

  return (
    <>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </>
  );
}

export default AllBlogs;