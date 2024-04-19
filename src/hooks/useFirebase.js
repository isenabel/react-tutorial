import { db } from './firebase'
import { limitToLast, onValue, orderByChild, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useFirebase = (method, blogID, allBlogs) => {

  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    switch (method) {
      case 'GET':
        try {
          // If passing just the ID and the rest is null or false (BlogDetails component)
          if (blogID && !allBlogs) {
            const blogRef = ref(db, 'blogs/' + blogID);
            onValue(blogRef, (snapShot) => {
              const data = snapShot.val();
              setData(data);
              setIsPending(false);
            });
            // If not BlogDetails component who did the call
          } else {
            // If AllBlogs component did the call
            if (allBlogs) {
              const blogRef = query(ref(db, 'blogs'), orderByChild('date'));
              onValue(blogRef, (snapShot) => {
                const data = snapShot.val();
                setData(data);
                setIsPending(false);
              });
              // Latest 10 Blogs (Home page)
            } else {
              const blogRef = query(ref(db, 'blogs'), limitToLast(10));
              onValue(blogRef, (snapShot) => {
                const data = snapShot.val();
                setData(data);
                setIsPending(false);
              });
            }
          }
        } catch (err) {
          setError(err);
          console.log(err);
        }
        break;
      case 'POST':
        break;
      default:
        console.log('Incorrect parameters.');
        break;
    }

  }, [method, blogID, allBlogs]);

  return { data, isPending, error };
}

export default useFirebase;