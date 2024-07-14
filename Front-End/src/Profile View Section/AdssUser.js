// AdssUser.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserAd from "./UserAd";
import secureLocalStorage from "react-secure-storage";
import YesNoModal from "../Yes_No_modal/YesNoModal";
import SuccessErrorModal from "../SuccessErrorModal/SuccessErrorModal";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdssUser() {
  const [ads, setAdss] = useState([]);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for modal visibility
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const [adToDelete, setAdToDelete] = useState(null); // State to store the ad ID to delete
  const [massages, setMessage] = useState("");
  useEffect(() => {
    const token = secureLocalStorage.getItem("token");

    if (token) {
      const userData = JSON.parse(secureLocalStorage.getItem("userData"));

      // Fetch ads for the logged-in user
      const userId = userData.id;

      axios
        .get(`http://localhost:5000/api/ad/user/${userId}`)
        .then((response) => {
          console.log("Data received from API:", response.data); // Log the API response

          // If the response is a single object, convert it into an array
          const adsArray = Array.isArray(response.data)
            ? response.data
            : [response.data];
          setAdss(adsArray);
        })
        .catch((error) => {
          console.error("Error fetching user ads:", error);
        });
    }
  }, []);

  const handleDelete = (adId) => {
    // Show the delete confirmation modal
    setShowDeleteModal(true);
    setAdToDelete(adId);
  };

  const handleConfirmDelete = () => {
    // Send a DELETE request to your API to delete the ad with the given ID
    axios
      .delete(`http://localhost:5000/api/delect/${adToDelete}`)
      .then((response) => {
        // If the deletion is successful, remove the deleted ad from the state
        setAdss((prevAds) => prevAds.filter((ad) => ad.id !== adToDelete));
        console.log(`Deleted ad with ID ${adToDelete}`);
        // Close the delete confirmation modal
        setShowDeleteModal(false);

        // Show the success modal with a success message

        setShowSuccessModal(true);
        setMessage("Ad successfully deleted.");
      })
      .catch((error) => {
        console.error(`Error deleting ad with ID ${adToDelete}:`, error);
        // Close the delete confirmation modal
        setShowDeleteModal(false);
      });
  };

  const handleClose = () => {
    setShowDeleteModal(false);
    setShowSuccessModal(false);
  };

  const hadlePostAdd = () =>{
    navigate('/PostAdd');
  }

  return (
    <div>
      {ads.length > 0 ? (
        ads.map((ad) => (
          <UserAd
            key={ad.id}
            adId={ad.id}
            img={ad.img}
            title={`${ad.brand || ad.institute_name || ad.sub_town || ""} ${
              ad.title
            }`}
            price={ad.main_category + ", " + ad.sub_category}
            location={ad.disthrick}
            description={`Rs ${ad.price}`}
            postedTime={ad.created_at} // Implement this logic
            ad_status={ad.status}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <div className="container mt-4 text-center">
          <button className="btn btn-primary" onClick={hadlePostAdd}>Post Your Add</button>
        </div>
      )}

      {/* Render the delete confirmation modal */}
      <YesNoModal
        show={showDeleteModal}
        handleClose={handleClose}
        handleYesClick={handleConfirmDelete}
        message="Are you sure you want to delete this ad?"
      />

      <SuccessErrorModal
        show={showSuccessModal}
        onHide={handleClose}
        type="success"
        message={massages}
      />
    </div>
  );
}
