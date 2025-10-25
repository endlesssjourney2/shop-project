import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF1ZYXDwIWSsCTKUgQEZl14MpV0hyz3xU",
  authDomain: "shop-server-ba680.firebaseapp.com",
  projectId: "shop-server-ba680",
  storageBucket: "shop-server-ba680.firebasestorage.app",
  messagingSenderId: "218295018763",
  appId: "1:218295018763:web:08e74c279404bf77f9ee0e",
  measurementId: "G-2NC2PW1EK2",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
