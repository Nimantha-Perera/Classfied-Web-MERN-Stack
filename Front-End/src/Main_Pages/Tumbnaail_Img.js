import React, { useState } from "react";
import firebase from "./Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ThumbnailImg({ onTumbnailImage }) {
  // State to hold the uploaded image
  const [image, setImage] = useState(null);
  // State to manage the error message
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImagename , setSelectedImageName] = useState("");

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];

    // Check if an image is selected
    if (selectedImage) {
      // Create an image element to check the dimensions
      const img = new Image();
      img.src = URL.createObjectURL(selectedImage);

      // Set up a load event to check the image dimensions
      img.onload = () => {
        if (img.width === 500 && img.height === 500) {
          // Continue with image upload to Firebase Storage
          uploadImage(selectedImage);
        } else {
          // Display an error message for incorrect image dimensions
          setErrorMessage("Please select an image with dimensions 500x500 pixels.");
          setImage(null);
        }
      };
    }
  };

  // Function to upload the image to Firebase Storage
const uploadImage = async (selectedImage) => {
    try {
      // Create a reference to Firebase Storage
      const storageRef = firebase.storage().ref();
     
  
      // Get the name of the selected image file
      const imageName = selectedImage.name;
      setSelectedImageName(imageName);
  
      // Upload the selected image to Firebase Storage with the selected name
      const imageRef = storageRef.child(`thumbnails/${imageName}`);
      await imageRef.put(selectedImage);
  
      // Get the download URL for the uploaded image
      const downloadURL = await imageRef.getDownloadURL();
  
      // Set the download URL in the state
      setImage(downloadURL);
      onTumbnailImage(downloadURL);
      
  
      // Clear any previous error message
      setErrorMessage("");
    } catch (error) {
      // Handle errors
      console.error("Error uploading image:", error);
      setErrorMessage("An error occurred while uploading the image.");
      setImage(null);
    }
  };

  // Function to handle image deletion
  const handleImageDelete = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    if (image) {
      try {
        // Get the image file name from the image URL
        
  
        // Create a reference to Firebase Storage for the image
        const storageRef = firebase.storage().ref(`thumbnails/${selectedImagename}`);
  
        // Delete the image from Firebase Storage
        await storageRef.delete();
  
        // Clear the image and error message
        setImage(null); // Clear the image state
        setErrorMessage("");
        console.log("Image deleted successfully.");
        setImage(null);
      } catch (error) {
        // Handle errors
        console.error("Error deleting image:", error);
        setErrorMessage("An error occurred while deleting the image.");
      }
    }
  };
  
  

  return (
    <div className="container" style={{ padding: 0 }}>
      <form>
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">
            <i
              className="bi bi-card-heading"
              style={{ marginRight: 10, color: "#fbd408" }}
            ></i>
            Upload Thumbnail Image (500x500)
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="imageUpload"
            onChange={handleImageUpload}
            style={{ boxShadow: "none", fontSize: 12 }}
          />
        </div>

        {/* Display the uploaded image as a thumbnail */}
        {image && (
          <div className="position-relative mt-4" style={{ marginBottom: 20, textAlign: "center" }}>
            <img
              src={image}
              alt="Thumbnail"
              style={{ width: "150px", height: "150px" }}
            />
            <button
              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
              onClick={handleImageDelete}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>
        )}

        {/* Display the error message if there is one */}
        {errorMessage && (
          <div className="alert alert-danger mt-4">{errorMessage}</div>
        )}
      </form>
    </div>
  );
}
