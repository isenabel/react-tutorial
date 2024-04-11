import { push, ref, serverTimestamp } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Mario');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  function addBlog({ title, body, author }) {
    push(ref(db, "blogs/"), {
      title: title,
      body: body,
      author: author,
      date: serverTimestamp()
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
      <h1 className="createTitle">Add a new Blog</h1>
      <form onSubmit={handleSubmit}>
        <label>Blog title:
          <input
            type="text"
            required
            className="titleInput"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label>Blog body:
          <textarea
            required
            className="bodyInput"
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
        </label>
        <label>Blog author:
          <select
            className="selectInput"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          >
            <option value="Mario">Mario</option>
            <option value="Yoshi">Yoshi</option>
          </select>
        </label>
        {!isPending && <button className="actionBtn" type="submit">Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
}

export default Create;