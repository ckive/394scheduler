import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSpNcQslId0s9LjTD14Xe0H8QYihxj5wQ",
  authDomain: "scheduler-9fc33.firebaseapp.com",
  databaseURL: "https://scheduler-9fc33-default-rtdb.firebaseio.com",
  projectId: "scheduler-9fc33",
  storageBucket: "scheduler-9fc33.appspot.com",
  messagingSenderId: "609135703896",
  appId: "1:609135703896:web:a12046da92c506bbee972d"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };