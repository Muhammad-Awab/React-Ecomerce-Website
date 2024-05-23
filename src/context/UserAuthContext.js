// Importing necessary hooks and createContext function from React
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,

  sendPasswordResetEmail,

} from "firebase/auth"; // Importing authentication methods from Firebase authentication
import { auth } from "../firebase"; // Importing Firebase authentication instance

// Creating user authentication context
const userAuthContext = createContext();

// UserAuthContextProvider Component
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({}); // State to store user data

  // Function to log in user with email and password
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // Function to sign up user with email and password
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  // Function to log out user
  function logOut() {
    return signOut(auth);
  }
  // Function to send password reset email
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // Function to sign in with Google account
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider)
  }
  // Effect to listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser); // Logging authentication state
      setUser(currentuser); // Setting user state with current user data
    });

    return () => {
      unsubscribe(); // Cleaning up listener when component unmounts
    };
  }, []);
  
  // Providing user authentication context and values to children components
  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, forgotPassword}}
    >
      {children}
    </userAuthContext.Provider>
  );
}

// Custom hook to access user authentication context
export function useUserAuth() {
  return useContext(userAuthContext);
}