import { push, ref, serverTimestamp } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./hooks/firebase";
import { useSelector } from "react-redux";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const author = useSelector((state) => state.currentUser.currentUser);

  function addBlog({ title, body }) {
    push(ref(db, "blogs/"), {
      title: title,
      body: body,
      author: author,
      date: serverTimestamp()
    }).then(() => {
      setIsPending(false);
      navigate('/');
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
            maxLength={50}
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
        {!isPending && <button className="actionBtn" type="submit">Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
}

export default Create;