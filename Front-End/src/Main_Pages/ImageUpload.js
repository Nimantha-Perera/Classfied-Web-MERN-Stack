import React, { useState, useEffect } from "react";
import firebase from "./Firebase";
import secureLocalStorage from 'react-secure-storage';
import { BsXCircle } from "react-icons/bs";

const ImageUpload = ({ onImagesSelected }) => {
  const [selectedImages, setSelectedImages] = useState(Array(5).fill(null));
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(""); // Store the user's ID
  const storage = firebase.storage();

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      // Create a reference to the Firebase storage location where you want to upload the image
      const storageRef = storage.ref().child(`${userId}/${file.name}`);

      // Upload the image to Firebase Storage
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          const updatedImages = [...selectedImages];
          updatedImages[index] = downloadURL;
          setSelectedImages(updatedImages);
          onImagesSelected(updatedImages);
        });
      });
    }
  };

  const handleImageDelete = (indexToDelete) => {
    const updatedImages = selectedImages.map((image, index) =>
      index === indexToDelete ? null : image
    );
    setSelectedImages(updatedImages);
    onImagesSelected(updatedImages);
  };

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");

    if (token) {
      const userData = JSON.parse(secureLocalStorage.getItem("userData"));
      setUsername(userData);
      setUserId(userData.f_name);

      // Fetch ads for the logged-in user
      // Add your fetch logic here
    }
  }, []);

  return (
    <div>
      <div className="row" style={{padding:12}}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="col-md-4"
            style={{
              border: "2px dashed #ccc",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center horizontally
              justifyContent: "center", // Center vertically
            }}
          >
            {selectedImages[index] ? (
              <div style={{ position: "relative" }}>
                <img
                  src={selectedImages[index]}
                  alt={`Image ${index + 1}`}
                  className="selected_imgs"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <button
                  className="btn btn-danger delete-icon"
                  onClick={() => handleImageDelete(index)}
                >
                  <BsXCircle size={24} />
                </button>
              </div>
            ) : (
              <>
                <label htmlFor={`imageInput-${index}`}>
                  <i
                    className="bi bi-plus-circle"
                    style={{
                      fontSize: "36px",
                      color: "#fbd408",
                      marginBottom: "10px",
                    }}
                  ></i>
                  <p style={{fontSize:10}}>Click to upload</p>
                </label>
                <input
                  type="file"
                  id={`imageInput-${index}`}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageChange(e, index)}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
