// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBcJvmzKpeQD31eLg3l9uZHRtIY_7caxw",
  authDomain: "medmastero.firebaseapp.com",
  projectId: "medmastero",
  storageBucket: "medmastero.appspot.com",
  messagingSenderId: "18809959638",
  appId: "1:18809959638:web:e15dff1dfacf074d5b8577",
  measurementId: "G-Z0VEF7JK16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export {app};