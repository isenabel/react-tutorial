import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const author = useSelector((state) => state.currentUser.currentUser);

  async function addBlog({ title, body }) {
   await fetch('https://3.142.12.117:80/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        body: body,
        author: author,
        date: Date.now()
      })
    }).then(async (res) => {
      console.log(await res.text());
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