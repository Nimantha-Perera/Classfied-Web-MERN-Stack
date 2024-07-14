import React, { useState, useEffect } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import VerificationComponent from "../VerificationComponent/VerificationComponent";

export default function MobileNumberFetcher({
  isCheckedProp,
  verifiedNumberProp,
  onVerifiedNumberChange,
  onIsCheckedChange,
}) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isChecked, setIsChecked] = useState(isCheckedProp); // Initialize with the prop value
  const [verifiedNumber, setVerifiedNumber] = useState("");

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");

    if (token) {
      const userData = JSON.parse(secureLocalStorage.getItem("userData"));

      const fetchMobileNumber = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/mobile-number/${userData.id}`
          );
          if (response.status === 200) {
            setUser(response.data[0]);
            setMobileNumber(response.data[0].mobile_number); // Set the mobile number
            setLoading(false);
          } else {
            console.error(
              `Failed to fetch mobile number for user with ID ${userData.id}`
            );
          }
        } catch (error) {
          console.error("Error fetching mobile number:", error);
        }
      };

      fetchMobileNumber();
    } else {
      setLoading(false);
    }
  }, []);

  const handleCheckboxChange = (event) => {
    const isCheckedValue = event.target.checked;
    setIsChecked(isCheckedValue);

    // If the checkbox is checked, pass the mobileNumber to the parent
    if (isCheckedValue) {
      onIsCheckedChange(mobileNumber);
    } else {
      // Optionally, you can pass some other value or null when the checkbox is unchecked
      onIsCheckedChange(null);
    }
  };

  // Check if user or mobile number is null or empty, if so, hide the checkbox and user number
  // if (!user || !mobileNumber) {
  //   return <div>{loading ? <p>Loading...</p> : <p></p>}</div>;
  // }
  const handleVerificationSuccess = (verifiedNumberWithoutPrefix) => {
    setVerifiedNumber(verifiedNumberWithoutPrefix);
    onVerifiedNumberChange(verifiedNumberWithoutPrefix);
  };

  return (
    <div>
      {(mobileNumber) && (
        <div>
          <p>
            <i
              className="bi bi-file-earmark-check"
              style={{ marginRight: 5, color: "#fbd408" }}
            ></i>
            Use Your Verified Mobile Numbers
          </p>
          <p style={{ marginLeft: 20 }}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              style={{ marginRight: 10 }}
            />
            {mobileNumber}
          </p>
        </div>
      )}

      {!isChecked && (
        <VerificationComponent
          onVerificationSuccess={handleVerificationSuccess}
        />
      )}
    </div>
  );
}
