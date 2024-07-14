import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Spinner, Alert } from "react-bootstrap";
import "./SignIn.css";
import CreateAc from "../Create Account Component/CreateAc";
import signInImage from "../SVG/Computer login-cuate.svg";
import axios from "axios";
import secureLocalStorage from 'react-secure-storage';

const SignIn = ({ show, handleClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showCreateAc, setShowCreateAc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [signInResult, setSignInResult] = useState(null); // Track sign-in result
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    // Check if a token exists in secure local storage
    const token = secureLocalStorage.getItem('token');
  
    if (token) {
      // If a token exists, the user is logged in
      setIsLoggedIn(true);
  
      // Fetch user data or set it from secure local storage if available
      const userData = JSON.parse(secureLocalStorage.getItem('userData'));
      setUser(userData);
    }
  }, []);




  

  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!username) {
      validationErrors.username = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSignInResult(null); // Reset sign-in result message

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;

        // Store the token in localStorage
        secureLocalStorage.setItem("token", token);

        const user = response.data.user;

        // Store the user data in state
        setUser(user);

        // Store user data in local storage for future use
        secureLocalStorage.setItem("userData", JSON.stringify(user));

        // Set isLoggedIn to true
        setIsLoggedIn(true);

        // Refresh the page upon successful login
        window.location.reload();

        // For now, just set a success message
        setSignInResult({ success: true });
      } else if (
        response.status === 401 &&
        response.data.error === "Invalid credentials"
      ) {
        setErrors({ password: "Password is incorrect" });
        setSignInResult({ success: false });
      } else if (
        response.status === 401 &&
        response.data.error === "Email not found"
      ) {
        setErrors({
          username: "Email not found. Please register first.",
        });
        setSignInResult({ success: false });
      } else {
        console.error("Error during login:", response.data.error);
        setErrors({ password: "An error occurred during login" });
        setSignInResult({ success: false });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ password: "Invalid credentials" });
      setSignInResult({ success: false });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleCreateAccountClick = () => {
    setShowCreateAc(true);
  };

  const handleCloseCreateAc = () => {
    setShowCreateAc(false);
  };

  const handleLogout = () => {
    // Clear token and user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    // Reset state values
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <>
     
    
        <Modal show={show && !showCreateAc} onHide={handleClose} centered>
          <Modal.Body className="body1">
            <div className="text-center">
              <img
                src={signInImage}
                alt="Sign In"
                style={{ maxWidth: "50%" }}
              />
            </div>
            <Form onSubmit={handleSignInSubmit} style={{ marginTop: 20 }}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label
                  style={{ fontSize: 13, marginLeft: 10 }}
                >
                  <i className="bi bi-person-fill"></i> Email
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={errors.username}
                  style={{
                    boxShadow: "none",
                    borderRadius: 50,
                  }}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="text-center"
                >
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                style={{ marginTop: 20, marginBottom: 50 }}
              >
                <Form.Label
                  style={{ fontSize: 13, marginLeft: 10 }}
                >
                  <i className="bi bi-key-fill"></i> Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={errors.password}
                  style={{
                    boxShadow: "none",
                    borderRadius: 50,
                  }}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="text-center"
                >
                  {errors.password}
                </Form.Control.Feedback>
                <div
                  className="text-center mt-3"
                  style={{
                    fontSize: 14,
                    marginRight: 10,
                    color: "#adadad",
                  }}
                >
                  Don't you remember the password?{" "}
                  <a
                    href="#"
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    forget now
                  </a>
                </div>
              </Form.Group>

              {loading ? (
                <div className="text-center">
                  <Spinner
                    animation="border"
                    variant="primary"
                  />
                </div>
              ) : (
                <Button
                  className="mt-3 d-flex justify-content-center"
                  variant="primary"
                  type="submit"
                  id="sign_in_btn_1"
                  block
                  style={{
                    borderRadius: 50,
                    marginTop: 50,
                  }}
                >
                  Sign In
                </Button>
              )}

              {signInResult && (
                <Alert
                style={{textAlign:"center"}}

                  variant={
                    signInResult.success ? "success" : "danger"
                  }
                  className="mt-3"
                >
                  {signInResult.success
                    ? "Sign in successful!"
                    : "Sign in failed."}
                </Alert>
              )}
            </Form>

            <div
              className="mt-4 text-center"
              style={{ fontSize: 10 }}
            >
              Or
            </div>
          </Modal.Body>
          <Modal.Body>
            <Form onSubmit={handleSignInSubmit}>
              <div
                className="text-center mt-3"
                style={{ fontSize: 14 }}
              >
                Don't have an account?{" "}
                <a
                  href="#"
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  onClick={handleCreateAccountClick}
                >
                  Register
                </a>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className="mt-3"
              onClick={handleGoogleSignIn}
              block
              style={{
                borderRadius: 50,
                width: 470,
              }}
            >
              <i className="bi bi-google"></i> Sign In with Google
            </Button>
          </Modal.Footer>
        </Modal>
      
      {showCreateAc && (
        <CreateAc show={showCreateAc} handleClose={handleCloseCreateAc} />
      )}
    </>
  );
};

export default SignIn;
