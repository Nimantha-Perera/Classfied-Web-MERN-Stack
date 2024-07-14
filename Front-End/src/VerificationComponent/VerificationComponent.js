import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/analytics";
import SuccessErrorModal from "../SuccessErrorModal/SuccessErrorModal";

const firebaseConfig = {
  apiKey: "AIzaSyAWcqx_Gb8UJb4HmxamB7xaGvBZu999meQ",
  authDomain: "react-app-f8b50.firebaseapp.com",
  projectId: "react-app-f8b50",
  storageBucket: "react-app-f8b50.appspot.com",
  messagingSenderId: "167400345278",
  appId: "1:167400345278:web:f3ae9fd3187320e12a58ef",
  measurementId: "G-KV55WXZN08",
};

firebase.initializeApp(firebaseConfig);

const VerificationComponent = ({ onVerificationSuccess }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verifiedMobile, setVerifiedMobile] = useState(""); // Track verified mobile number

  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Succes and Error Modal shown
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);

  //Masg error and succes
  const [showMessage, setMessage] = useState("");

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  useEffect(() => {
    const verifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    setRecaptchaVerifier(verifier);
  }, []);

  const handleSendVerificationCode = () => {
  if (mobileNumber === "") {
    setMessage("Please Enter First Mobile Number");
    setShowErrorModal(true);
  } else {
    setLoading(true);
    setVerificationInProgress(true); // Set verification in progress
    const phoneNumber = `+94${mobileNumber}`;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        setLoading(false);
        setShowVerification(true);
      })
      .catch((error) => {
        setMessage("Please Enter Valid Mobile Number");
        setShowErrorModal(true);
        console.error("Error sending SMS:", error);
        setLoading(false);
        setVerificationInProgress(false); // Set verification not in progress on error
      });
  }
};


  const handleVerificationCodeChange = (e, index) => {
    const newValue = e.target.value;

    if (/^\d$/.test(newValue)) {
      const newCode = [...verificationCode];
      newCode[index] = newValue;
      setVerificationCode(newCode);

      if (index < 5) {
        const nextInput = document.getElementById(
          `verificationCode${index + 1}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleVerifyNumber = () => {
    const code = verificationCode.join("");
    const phoneNumber = `+94${mobileNumber}`;

    setLoading(true); // Set loading state to indicate verification is in progress

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        return confirmationResult.confirm(code);
      })
      .then((result) => {
        setLoading(false); // Turn off loading state when verification is successful
        console.log("Mobile number verified:", result.user);

        // Extract the verified mobile number without the "+94" prefix
        const verifiedNumberWithoutPrefix = mobileNumber;

        setVerificationSuccess(true);
        setVerifiedMobile(verifiedNumberWithoutPrefix); // Store the verified mobile number without the prefix
        // You can add your logic for what to do after successful verification here
        onVerificationSuccess(verifiedNumberWithoutPrefix);
      })
      .catch((error) => {
        setLoading(false); // Turn off loading state if there was an error
        console.error("Error verifying code:", error);
        // Handle error appropriately (e.g., show an error message)
      });
  };

  return (
    <div>
      {!showVerification && !verificationSuccess ? (
        <div className="mb-3">
          <label
            htmlFor="mobileNumber"
            className="form-label"
            style={{ color: "black" }}
          >
            <i
              className="bi bi-phone"
              style={{ marginRight: 10, color: "#fbd408" }}
            ></i>
            Add Mobile Number
          </label>
          <div className="input-group">
            <input
              type="number"
              maxLength={9}
              className="form-control"
              id="mobileNumber"
              placeholder="ex : 07XXXXXXXX"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              style={{ boxShadow: "none", fontSize: 12 }}
            />
            <button
              className="btn btn-primary"
              type="button"
              style={{
                fontSize: 10,
                backgroundColor: "#fbd408",
                border: "none",
                color: "black",
                display: "flex", // Add this line to make content display horizontally
                alignItems: "center", // Center content vertically
              }}
              onClick={handleSendVerificationCode}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    style={{ fontSize: 10 }}
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                <>
                  <span>Send Verify Code</span>
                  <i
                    className="bi bi-send-fill"
                    style={{ marginLeft: "5px" }}
                  ></i>{" "}
                  {/* Add margin for spacing */}
                </>
              )}
            </button>
          </div>
        </div>
      ) : null}

      {showVerification && !verificationSuccess ? (
        <div className="mb-3">
          <label className="form-label text-center" style={{ color: "black" }}>
            <i
              className="bi bi-shield-lock"
              style={{ marginRight: 10, color: "#fbd408" }}
            ></i>
            Verification Code
          </label>
          <div className="row">
            {verificationCode.map((digit, index) => (
              <div className="col-2" key={index}>
                <input
                  type="text"
                  className="form-control"
                  id={`verificationCode${index}`}
                  placeholder=""
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleVerificationCodeChange(e, index)}
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    boxShadow: "none",
                    borderBlockColor: "#fbd408",
                  }}
                />
              </div>
            ))}
          </div>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleVerifyNumber}
            disabled={loading} // Disable the button when loading is true
            style={{
              fontSize: 14,
              marginBottom: "-10px",
              width: "100%",
              marginTop: 20,
            }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  style={{ fontSize: 10 }}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              <>
                <i className="bi bi-patch-check" style={{ marginRight: 4 }}></i>
                Verify Number
              </>
            )}
          </button>
        </div>
      ) : null}

      {verificationSuccess && (
        <div className="" role="alert" style={{ marginBottom: 20 }}>
          <i
            className="bi bi-patch-check"
            style={{ marginRight: 4, color: "green" }}
          ></i>
          {verifiedMobile} verified
        </div>
      )}

      <SuccessErrorModal
        show={showSuccessModal}
        onHide={() => {
          handleCloseSuccessModal();

          // Remove items from secure local storage

          // Reload the page to reflect the changes
        }}
        type="success"
        message={showMessage}
      />

      <SuccessErrorModal
        show={showErrorModal}
        onHide={handleCloseErrorModal}
        type="error"
        message={showMessage}
      />

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default VerificationComponent;
