import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { useState, useEffect } from "react"

const useGetBlog = (blogId) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    let blogRef;
    if (blogId) {
      blogRef = ref(db, 'blogs/' + blogId);
    } else {
      blogRef = ref(db, 'blogs/');
    }

    onValue(blogRef, (blog) => {
      setData(blog.val());
      setIsPending(false);
    });
  }, [blogId])

  return { data, isPending };
}

export default useGetBlog;
