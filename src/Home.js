import { useState } from "react";
import BlogList from "./BlogList";

const Home = () => {

  const [blogs, setBlogs] = useState([
    {title: 'title1', body: 'aadsdasd', author: 'Fulano', id: 1},
    {title: 'title2', body: 'aadsdasd', author: 'Fulana', id: 2},
    {title: 'title3', body: 'aadsdasd', author: 'Fulano', id: 3}
  ]);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  }

  return ( 
    <div className="home">
      <BlogList blogs={blogs} title="All Blogs!" handleDelete={handleDelete} />
    </div>
   );
}
 
export default Home;