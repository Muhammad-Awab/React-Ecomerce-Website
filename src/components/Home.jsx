import React from "react";
import { Button } from "react-bootstrap"; // Importing Button component from React Bootstrap
import { useNavigate } from "react-router"; // Importing hook for programmatic navigation
import { useUserAuth } from "../context/UserAuthContext"; // Importing user authentication context
import Navbar from "./Navbar"; // Importing Navbar component

// Home Component
const Home = (props) => {
  const { logOut, user } = useUserAuth(); // Destructuring logOut function and user data from user authentication context

  const navigate = useNavigate(); // Initializing navigate function for routing

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await logOut(); // Calling logout function from user authentication context
      navigate("/"); // Redirecting user to home page after logout
    } catch (error) {
      console.log(error.message); // Logging error message if logout fails
    }
  };
  return (
    <>
     <Navbar/>
      {/* User greeting and information */}
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
      <h2>Email : {user.email}</h2>
      </div>
      <div className="d-grid gap-2">
        {/* Logout button */}
        <Button  variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home; // Exporting Home component