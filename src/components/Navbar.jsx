import React from 'react'
import { useUserAuth } from "../context/UserAuthContext"; // Importing user authentication context
import { useNavigate } from "react-router"; // Importing hook for programmatic navigation

// Navbar Component
const Navbar = () => {
    const { logOut, user } = useUserAuth(); // Destructuring 'logOut' function and 'user' data from user authentication context
    const navigate = useNavigate(); // Initializing navigate function for routing

    // Function to handle user logout
    const handleLogout = async () => {
      try {
        await logOut(); // Calling logout function from user authentication context
        navigate("/");
      } catch (error) {
        console.log(error.message); // Logging error message if logout fails
      }
    };
  return (
    // Navbar with responsive design
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      {/* Navbar brand */}
      <a class="navbar-brand fw-bold" href="#">Smart E-comm</a>
      {/* Navbar toggler for responsive design */}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          {/* Navigation links */}
          <li class="nav-item">
            <a class="nav-link text-black" href="/home">Home</a>
          </li>
         
          <li class="nav-item">
            <a class="nav-link text-black" href='/cart'>Cart</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
        <h4 className='px-4'>Hi : {user.email}</h4> {/* Displaying "Hi" message with the user email */}
          <button class="btn btn-outline-success" type="submit" onClick={handleLogout}>Logout</button> {/* Displaying logout button */}
        </form>
      </div>
    </div>
  </nav>
  )
}

export default Navbar // Exporting Navbar component