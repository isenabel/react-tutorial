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
          if (blogID && !allBlogs) {
            const blogRef = ref(db, 'blogs/' + blogID);
            onValue(blogRef, (snapShot) => {
              const data = snapShot.val();
              setData(data);
              setIsPending(false);
            });
          } else {
            if (allBlogs) {
              const blogRef = query(ref(db, 'blogs'), orderByChild('date'));
              onValue(blogRef, (snapShot) => {
                const data = snapShot.val();
                setData(data);
                setIsPending(false);
              });
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

  }, [method, blogID])

  return { data, isPending, error };
}

export default useFirebase;