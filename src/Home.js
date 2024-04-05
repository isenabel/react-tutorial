import BlogList from "./BlogList";
import useGetBlog from "./useGetBlog";

const Home = () => {

  const { data: blogs, isPending } = useGetBlog();

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
    </div>
  );
}

export default Home;