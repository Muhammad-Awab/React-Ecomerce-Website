import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importing Link for client-side navigation
import { Form, Alert } from "react-bootstrap"; // Importing Form and Alert components from React Bootstrap
import { Button } from "react-bootstrap"; // Importing Button component from React Bootstrap
import GoogleButton from "react-google-button"; // Importing GoogleButton component
import { useUserAuth } from "../context/UserAuthContext"; // Importing user authentication context
import { useRef } from "react";

// Login component
const Login = () => {
  const emailRef = useRef(); // Creating ref for email input field
  const {  forgotPassword } = useUserAuth(); // Destructuring 'forgotPassword' function from user authentication context
  const [email, setEmail] = useState("") // State for email input value
  const [password, setPassword] = useState("") // State for password input value
  const { logIn, googleSignIn } = useUserAuth(); // Destructuring 'logIn' and 'googleSignIn' functions from user authentication context
  const [error, setError] = useState("") // State for error message
  const navigate = useNavigate(); // Initializing navigate function for routing

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    setError("") // Clearing previous error message
    try {
      await logIn(email, password) // Attempting login with email and password
      navigate("/home"); // Redirecting user to home page on successful login
    } catch (error) {
      setError(error.mesage); // Setting error message if login fails
    }
  }

  // Function to handle Google sign-in
  const handleGoogleSignIn = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    try {
      await googleSignIn(); // Attempting Google sign-in
      navigate("/home") // Redirecting user to home page on successful login
    } catch (error) {
      setError(e.mesage) // Setting error message if Google sign-in fails
    }
  }
  // Function to handle forgot password
  const forgotPasswordHandler = () => {
    const email = emailRef.current.value; // Getting email from input field
    if (email)
      // If email is provided
      forgotPassword(email).then(() => {
        emailRef.current.value = ""; // Clearing email input field after sending reset email
      });
  };
  return (
    <>
      {/* Login form */}
      <div className="p-4 box">
        <h2 className="mb-3">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>} {/* Displaying error message if present */}
        <Form onSubmit={handleSubmit}>
          {/* Email input field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email" ref={emailRef}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* Password input field */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Submit button */}
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
          {/* Forgot password link */}
          <p onClick={forgotPasswordHandler}>Forgot Password?</p>
        </Form>
        <hr />
        {/* Google sign-in button */} 
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      {/* Sign-up link */}
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login; // Exporting Login component
