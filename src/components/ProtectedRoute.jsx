import React from "react";
import { Navigate } from "react-router-dom"; // Importing Navigate component for client-side navigation
import { useUserAuth } from "../context/UserAuthContext"; // Importing user authentication context

// ProtectedRoute Component
const ProtectedRoute = ({children}) => {
    let {user}=useUserAuth(); // Accessing user authentication context
     // Checking if user is authenticated
    if(!user){
       return <Navigate to="/"/> // Redirecting user to home page if not authenticated
    }
    
 return children // Rendering children components if user is authenticated
};

export default ProtectedRoute; // Exporting ProtectedRoute component