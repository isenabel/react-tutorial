import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

  const firebaseConfig = {
    apiKey: "AIzaSyCgQg2Jl5T5tbHks8XDsdx4AGHqAMMIrBA",
    authDomain: "nextjs-guide-cc36c.firebaseapp.com",
    databaseURL: "https://nextjs-guide-cc36c-default-rtdb.firebaseio.com",
    projectId: "nextjs-guide-cc36c",
    storageBucket: "nextjs-guide-cc36c.appspot.com",
    messagingSenderId: "321698354158",
    appId: "1:321698354158:web:bedfc5ed100d37fec174ff"
  };
  
  const app = initializeApp(firebaseConfig);
  // Export firestore database
  // It will be imported into your react app whenever it is needed
  export const db = getDatabase(app);