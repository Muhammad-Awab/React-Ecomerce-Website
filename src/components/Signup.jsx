
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importing Link for client-side navigation
import { Form } from "react-bootstrap"; // Importing Form, Button, and Alert components from React Bootstrap
import { Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext"; // Importing user authentication context


// Signup Component
const Signup = () => {
  const [email, setEmail] = useState(""); // State for email input value
  const [password, setPassword] = useState(""); // State for password input value
  const { signUp } = useUserAuth(); // Destructuring signUp function from user authentication context
  const [error, setError] = useState("") // State for error message
  const navigate = useNavigate(); // Initializing navigate function for routing

  // Function to handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault(); // Preventing default form submission behavior

    setError("") // Clearing previous error message
    try {
      await signUp(email, password) // Attempting sign up with email and password
      navigate("/"); // Redirecting user to home page on successful sign up
    } catch (error) {
      setError(error.mesage); // Setting error message if sign up fails
    }
  }

  return (
    <>
      {/* Signup form */}
      <div className="p-4 box">
        <h2 className="mb-3">Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>} {/* Displaying error message if present */}
        <Form onSubmit={handleSubmit}>
          {/* Name input field */}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="name"
              placeholder="Name"
              name="Name"

            />
          </Form.Group>
          {/* Email input field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
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
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      {/* Login link */}
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>

    </>
  );
};

export default Signup; // Exporting Signup component

