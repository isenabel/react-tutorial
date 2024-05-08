import { Link } from "react-router-dom";
import BlogList from "./BlogList";
import useFetch from "./hooks/useFetch";

const Home = () => {

  const { data: blogs, isPending, error } = useFetch('http://localhost:4000/blogs', 10);

  return (
    <div className="home">
      <div className="homeMsg">
        <h1>Welcome</h1>
        <p>This is a test website to practice ReactJS. Please DO NOT enter any confidential data on this website.</p>
      </div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="Latest Blogs" reversed={true} />}
      {blogs &&
        <Link to={'/all'}>
          <button className="viewAllBtn">View All</button>
        </Link>
      }
    </div>
  );
}

export default Home;