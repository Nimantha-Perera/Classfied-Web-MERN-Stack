import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./CreateAc.css"; // Import the CSS file
import axios from "axios";
import Recaptcha from "./ReCaptcha";
import Sign_In from "../SignIn/SignIn";
import SuccessErrorModal from "../SuccessErrorModal/SuccessErrorModal";

const CreateAc = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    recaptchaValue: null,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    recaptchaValue: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  //Succes and Error Modal shown
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  //Masg error and succes
  const [showMessage, setMessage] = useState('');

  const handleShowSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const handleShowErrorModal = () => {
    setShowErrorModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateAccountClick = () => {
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "First Name is required.";
    }
    if (!formData.lastName) {
      errors.lastName = "Last Name is required.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!formData.username) {
      errors.username = "Username is required.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.recaptchaValue) {
      errors.recaptchaValue = "Please complete the reCAPTCHA.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const userData = {
      f_name: formData.firstName,
      l_name: formData.lastName,
      email: formData.email,
      mobile_number: formData.username,
      password: formData.password,
    };

    axios
      .post("http://localhost:5000/insertData", userData)
      .then((response) => {
        console.log("Data inserted successfully:", response.data);
        setShowSuccessModal(true);
        setMessage('Register Successful');
        setShowLoginPopup(true);
        

       
      
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        setShowErrorModal(true);
        if (error.response) {
          // Handle specific error messages from the backend
          if (error.response.status === 400) {
            setShowErrorModal(true);
            setMessage('Email already registered.');
          } else {
            
            setShowErrorModal(true);
            setMessage('An error occurred while inserting data. Please try again later.');
          }
        } else {
          // Handle general network or server errors
         
          setShowErrorModal(true);
            setMessage('An error occurred. Please try again later.');
        }
      });
  
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="create-ac-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label className="lable_cre">
              <i className="bi bi-person-check-fill"></i> First Name
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={{ boxShadow: "none", borderRadius: 50 }}
              placeholder="Enter your first name"
              isInvalid={!!formErrors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Label className="lable_cre">
              <i class="bi bi-person-check-fill"></i> Last Name
            </Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              style={{ boxShadow: "none", borderRadius: 50 }}
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              isInvalid={!!formErrors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.lastName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="lable_cre">
              <i class="bi bi-envelope-fill"></i> Email address
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ boxShadow: "none", borderRadius: 50 }}
              placeholder="Enter email"
              isInvalid={!!formErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label className="lable_cre">
              <i class="bi bi-person"></i> Username
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              style={{ boxShadow: "none", borderRadius: 50 }}
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              isInvalid={!!formErrors.username}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="lable_cre">
              <i className="bi bi-key-fill"></i> Create Password
            </Form.Label>
            <div className="password-input-group">
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                style={{ boxShadow: "none", borderRadius: 50 }}
                onChange={handleChange}
                placeholder="Create password"
                isInvalid={!!formErrors.password}
              />
              <i
                className={`bi ${
                  passwordVisible ? "bi-eye-slash" : "bi-eye"
                } password-toggle`}
                style={{ float: "right", marginRight: 10, marginTop: -30 }}
                onClick={() => setPasswordVisible(!passwordVisible)}
              ></i>
            </div>
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label className="lable_cre">
              <i className="bi bi-key"></i> Confirm Password
            </Form.Label>
            <div className="password-input-group">
              <Form.Control
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                style={{ boxShadow: "none", borderRadius: 50 }}
                onChange={handleChange}
                placeholder="Confirm password"
                isInvalid={!!formErrors.confirmPassword}
              />
              <i
                className={`bi ${
                  confirmPasswordVisible ? "bi-eye-slash" : "bi-eye"
                } password-toggle`}
                style={{ float: "right", marginRight: 10, marginTop: -30 }}
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              ></i>
            </div>
            <Form.Control.Feedback type="invalid">
              {formErrors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Include similar Form.Group elements for other input fields */}

          {/* Recaptcha */}
          <Recaptcha
            onChange={(value) =>
              setFormData({ ...formData, recaptchaValue: value })
            }
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.recaptchaValue}
          </Form.Control.Feedback>
        </Modal.Body>
        <Button
          variant="primary"
          type="submit"
          className="create-ac-button"
          onClick={handleCreateAccountClick}
          style={{ borderRadius: 20 }}
        >
          Create Account
        </Button>
      </Modal>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Account created successfully!</Modal.Body>
        <Button variant="success" onClick={() => setShowSuccessModal(false)}>
          Close
        </Button>
      </Modal>

      {/* Render the SuccessModal component with the message prop */}
   

      <SuccessErrorModal
        show={showSuccessModal}
        onHide={handleCloseSuccessModal}
        type="success"
        message={showMessage}
      />

      <SuccessErrorModal
        show={showErrorModal}
        onHide={handleCloseErrorModal}
        type="error"
        message={showMessage}
      />
      {showLoginPopup && (
        <Sign_In
          show={showLoginPopup}
          handleClose={() => setShowLoginPopup(false)}
        />
      )}
    </>
  );
};

export default CreateAc;
