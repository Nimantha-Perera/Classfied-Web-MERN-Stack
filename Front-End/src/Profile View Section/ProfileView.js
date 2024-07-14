import React, { useState, useEffect } from "react";
import "./ProfileView.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import UserAd from "./UserAd";
import AdssUser from "./AdssUser";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import SuccessErrorModal from "../SuccessErrorModal/SuccessErrorModal";
import YesNoModal from "../Yes_No_modal/YesNoModal";

const ProfileView = () => {
  const [isAccountVisible, setAccountVisible] = useState(true);
  const [isPhoneNumberVisible, setPhoneNumberVisible] = useState(false);
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isMyAdsVisible, setFavoritesVisible] = useState(false);
  const [isMembershipVisible, setMembershipVisible] = useState(false);
  const [headerText, setHeaderText] = useState("Profile Information");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(""); // Store the user's ID
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ads, setAds] = useState([]); // Define setAds and initialize it with an empty array
  //Succes and Error Modal shown
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  //Masg error and succes
  const [showMessage, setMessage] = useState("");

  //Yes No Modal
  const [showModal, setShowModal] = useState(false);

  const [showMessage2, setMessage2] = useState("");

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
  const navigate = useNavigate();

  const handleLinkClick = (section, header) => {
    setAccountVisible(section === "account");
    setPhoneNumberVisible(section === "phoneNumbers");
    setSettingsVisible(section === "settings");
    setFavoritesVisible(section === "favorites");
    setMembershipVisible(section === "membership");
    setHeaderText(header);
  };

  const handleLogout = () => {
    //   // Clear token and user data from local storage
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("userData");

    // Reset state values
    setIsLoggedIn(false);


    navigate("/");
    window.location.reload();
    
  };

  // Set default section to "Account" on component mount

  useEffect(() => {
    setAccountVisible(true);
  }, []);
  useEffect(() => {
    setAccountVisible(true);

    const token = secureLocalStorage.getItem("token");

    if (token) {
      const userData = JSON.parse(secureLocalStorage.getItem("userData"));
      setUsername(userData);
      setUserId(userData.id);

      // Fetch ads for the logged-in user
      // Add your fetch logic here
    }
  }, []);

  const sampleAd = {
    imageSrc: "sample-image.jpg", // URL to the ad's image
    title: "Amazing Product",
    price: 49.99, // Price of the product
    description: "This is a sample ad for demonstration purposes.",
    location: "New York, NY",
    seller: "John Doe", // Seller's name
    contactEmail: "john@example.com",
  };

  //Delect and View Add

  const handleDelete = (event) => {
    // Send a DELETE request to your backend API
    event.preventDefault();
    setShowModal(true);
    setMessage2('Are you sure you want to delete this account?');

    
  };

  const closeModal = ()=>{
    setShowModal(false);
  }
  


  const handleYesClick = (event) => {
    event.preventDefault();
  
    if (!userId) {
      // Handle the case where userId is not defined
      console.error("User ID is undefined.");
      return;
    }
  
    axios
      .delete(`http://localhost:5000/api/user/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          // Successful deletion
          setShowSuccessModal(true);
          setMessage("Account successfully delected.");
          console.log(`Ad with ID ${userId} deleted successfully`);
      
        } else {
          // Handle the case where the delete request was not successful
          console.error(`Failed to delete ad with ID ${userId}`);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error deleting ad:", error);
      });
  };

  const handleView = (adId) => {
    // Handle view logic here
    console.log(`Viewing ad with ID ${adId}`);
  };

  const handleUpdate = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Get updated user data from the form fields
      const updatedUserData = {
        f_name: document.getElementById("f_name").value,
        l_name: document.getElementById("l_name").value,
        email: document.getElementById("email").value,
        // Add other fields you want to update here
      };

      // Make a PUT request to update the user's data
      axios
        .put(`http://localhost:5000/api/updateUser/${userId}`, updatedUserData)
        .then((response) => {
          if (response.status === 200) {
            // User data updated successfully
            setShowSuccessModal(true);
            setMessage("User data updated successfully please re loggin now.");
            // You can add any additional logic here, such as showing a success message
          } else {
            // Handle the case where the update request was not successful
            console.error("Failed to update user data");
          }
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
          // Handle any errors that occur during the update process
          // You can display an error message to the user if needed
        });
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle any errors that occur before making the request
      // You can display an error message to the user if needed
    }
  };
  const handleModalHide = () => {
    // Perform the actions you want when the modal is hidden
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("userData");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className="container mt-5 col-md-7 pro_view"
      style={{ marginBottom: 320 }}
    >
      <div className="row" style={{ marginTop: 250 }}>
        <div className="col-md-3">
          {/* Profile Sidebar */}
          <div className="list-group" style={{ fontSize: 12 }}>
            {/* Add an onClick event to the links */}
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                isAccountVisible ? "active" : ""
              }`}
              onClick={() => handleLinkClick("account", "Account")}
            >
              My Account
            </a>
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                isMyAdsVisible ? "active" : ""
              }`}
              onClick={() => handleLinkClick("favorites", "My Ads")}
            >
              My Ads
            </a>
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                isPhoneNumberVisible ? "active" : ""
              }`}
              onClick={() => handleLinkClick("phoneNumbers", "Phone Numbers")}
            >
              Phone Numbers
            </a>
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                isSettingsVisible ? "active" : ""
              }`}
              onClick={() => handleLinkClick("settings", "Settings")}
            >
              Settings
            </a>

            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                isMembershipVisible ? "active" : ""
              }`}
              onClick={() => handleLinkClick("membership", "My Membership")}
            >
              My Membership
            </a>
          </div>
        </div>
        <div className="col-md-9 content_profile" style={{ fontSize: 12 }}>
          {/* Profile Content */}
          <div className="card">
            <div className="card-header">
              <h5>{headerText}</h5>
            </div>
            <div className="card-body">
              {/* Profile content goes here */}
              {/* For example: */}
              {isAccountVisible && (
                <div className="container mt-4">
               
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        {username.f_name} {username.l_name}
                      </li>
                      <li className="list-group-item">{username.email}</li>
                      <li className="list-group-item">
                        {username.mobile_number}
                      </li>
                    </ul>
                  </div>

                
                </div>
              )}

              {/* Conditionally render the "Phone Numbers" section based on the state */}
              {isPhoneNumberVisible && (
                <>
                  <p>Phone Numbers Content</p>
                  <p>Mobile Number: {username.mobile_number}</p>
                  {/* Add content for phone numbers here */}
                </>
              )}
              {/* Conditionally render the "Settings" section based on the state */}
              {isSettingsVisible && (
                <>
                  <form>
                    <div className="form-group">
                      <label htmlFor="f_name">First Name:</label>
                      <input
                        type="text"
                        id="f_name"
                        name="f_name"
                        className="form-control"
                        placeholder="Enter First Name"
                        defaultValue={username.f_name}
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="l_name">Last Name:</label>
                      <input
                        type="text"
                        id="l_name"
                        name="l_name"
                        className="form-control"
                        placeholder="Enter Last Name"
                        defaultValue={username.l_name}
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                        defaultValue={username.email}
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      />
                    </div>

                    <div style={{ marginTop: 20 }}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleUpdate}
                        style={{ float: "right" }}
                      >
                        Update
                      </button>
                      <button
                        onClick={handleLogout}
                        className="btn btn-secondary"
                        style={{
                          backgroundColor: "red",
                          float: "right",
                          marginRight: 10,
                        }}
                      >
                        Logout
                      </button>
                      <button
                    type="submit"
                    className="btn btn-danger mt-3"
                    onClick={handleDelete}
                    style={{ display:"flex",fontSize:10 }}
                  >
                    Delete My Account
                  </button>
                    </div>
                  </form>
                </>
              )}

              

              <YesNoModal
                show={showModal}
                handleClose={closeModal}
                handleYesClick={handleYesClick}
                message={showMessage2}
              />

              {/* Conditionally render the "Favorites" section based on the state */}
              {isMyAdsVisible && (
                <div>
                  <AdssUser />
                </div>
              )}

              {/* Conditionally render the "My Membership" section based on the state */}
              {isMembershipVisible && (
                <>
                  <p>My Membership Content</p>
                  {/* Add content for membership here */}
                </>
              )}
            </div>
          </div>

          {/* Other sections go here */}
          {/* ... */}
        </div>
      </div>

      <SuccessErrorModal
        show={showSuccessModal}
        onHide={() => {
          handleCloseSuccessModal();

          // Remove items from secure local storage
          secureLocalStorage.removeItem("token");
          secureLocalStorage.removeItem("userData");
          navigate("/");

          // Reset state values
          setIsLoggedIn(false);

          // Reload the page to reflect the changes
          window.location.reload();
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
    </div>
  );
};

export default ProfileView;
