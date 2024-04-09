import { db } from './firebase'
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useFirebase = (method, blogID) => {

  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    switch (method) {
      case 'GET':
        try {
          if (blogID) {
            const blogRef = ref(db, 'blogs/' + blogID);
            onValue(blogRef, (snapShot) => {
              const data = snapShot.val();
              setData(data);
              setIsPending(false);
            });
          } else {
            const blogRef = ref(db, 'blogs');
            onValue(blogRef, (snapShot) => {
              const data = snapShot.val();
              setData(data);
              setIsPending(false);
            });
          }
        } catch (err) {
          setError(err);
          console.log(err);
        }
        break;
      case 'POST':
        break;
      default:
        console.log('Incorrect Method or ID. Try: GET, POST, DELETE or UPDATE for Method');
        break;
    }

  }, [method, blogID])

  return { data, isPending, error };
}

export default useFirebase;