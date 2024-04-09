import { push, ref } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  function addBlog({ title, body, author }) {
    push(ref(db, "blogs/"), {
      title: title,
      body: body,
      author: author
    }).then(() => {
      navigate('/');
      setIsPending(false);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    addBlog(blog);
  }

  return (
    <div className="create">
      <h2>Add a new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={e => setAuthor(e.target.value)}
        >
          <option value="Mario">Mario</option>
          <option value="Yoshi">Yoshi</option>
        </select>
        {!isPending && <button className="actionBtn">Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
}

export default Create;