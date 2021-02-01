import firebase  from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC0hYFUUf05Rop09QjvDdMCG2fraiiDFeI",
    authDomain: "story-hub-2b163.firebaseapp.com",
    projectId: "story-hub-2b163",
    storageBucket: "story-hub-2b163.appspot.com",
    messagingSenderId: "1007601703386",
    appId: "1:1007601703386:web:86861d442d51cd809e88e3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();