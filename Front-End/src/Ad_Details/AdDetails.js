import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useSwipeable } from "react-swipeable";
import { useParams } from "react-router-dom"; // Import useParams for routing
import axios from "axios"; // Import axios for making API requests
import useScrollToTop from "../useScrollToTop";
import "./Ad.css";

import ShowMoreText from "react-show-more-text";

const Advertisement = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { adId } = useParams();
  const [adDetails, setAdDetails] = useState({});
  const [showDescription, setShowDescription] = useState(false); // State to control the description visibility

  useEffect(() => {
    // Make an API request to fetch ad details
    axios
      .get(`http://localhost:5000/api/ad/${adId}`)
      .then((response) => {
        setAdDetails(response.data);

        // Assuming the API returns image URLs in fields img, img1, img2, img3, img4, img5
        const imageUrls = [];
        for (let i = 0; i <= 5; i++) {
          const imageUrl = response.data[`img${i}`];
          if (imageUrl) {
            imageUrls.push(imageUrl);
          }
        }
        setImages(imageUrls);
      })
      .catch((error) => {
        console.error("Error fetching ad details:", error);
      });
  }, [adId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImageIndex === images.length - 1) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }, 3000); // Change image every 3 seconds (adjust as needed)

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex, images]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeLeft(),
    onSwipedRight: () => handleSwipeRight(),
  });

  const handleSwipeLeft = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleShareClick = () => {
    // Implement the logic to share the advertisement here
    // You can use browser APIs or external libraries to implement sharing.
    // Example: window.navigator.share() or a third-party sharing library
  };

  const handleReportClick = () => {
    // Implement the logic to report the advertisement here
    // You can open a modal or navigate to a report page.
  };

  useScrollToTop();

  // Function to toggle the description display
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleMobileNumber = () => {
    // Implement your logic for handling mobile number here

    // For a simple example, let's assume you want to open the user's phone dialer
    // with the mobile number pre-filled when the user clicks on it.

    // You can use the following code to open the phone dialer:
    const mobileNumber = adDetails.mobile_num; // Replace with the actual mobile number
    const phoneNumber = `tel:${mobileNumber}`;

    window.location.href = phoneNumber;
  };

  const handleWhatsAppNumber = () => {
    // Implement your logic for handling WhatsApp number here

    // For example, you can open the WhatsApp app with a pre-filled message
    // when the user clicks on the WhatsApp number.

    // You can use the following code to open WhatsApp:
    const whatsappNumber = adDetails.mobile_num; // Replace with the actual WhatsApp number
    const message = "Hello, I'm interested in your ad."; // Replace with your desired message
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink);
  };

  return (
    <div
      className="container mx-auto  col-md-7"
      style={{ marginTop: 70, marginBottom: 70 }}
    >
      <div className="card">
        <div
          className="container text-center"
          style={{
            backgroundColor: "#e3e2e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "300px",
          }}
        >
          <img
            src={images[currentImageIndex] || "placeholder-image-url.jpg"}
            alt="Advertisement"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div
          className="card-body"
          style={{
            background: "linear-gradient(to left, #f5ec42,150px, transparent)",
          }}
        >
          <div className="row">
            <div className="col-md-8">
              <h2
                className="card-title h3"
                style={{ color: "#6b6b6b", fontWeight: 300 }}
              >
                {adDetails.title + " " + adDetails.sub_town}
              </h2>

              <div className="mt-4">
                {/* <p className="card-text numb-card">
                  <button
                    onClick={handleMobileNumber}
                    className="mob-num"
                    style={{
                      backgroundColor: "#079bf7",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "20px",
                      marginRight: "10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <i className="bi bi-telephone-fill"></i>{" "}
                    {adDetails.mobile_num}
                  </button>
                  <button
                    onClick={handleWhatsAppNumber}
                    className="what-num"
                    style={{
                      backgroundColor: "#25d366",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <i className="bi bi-whatsapp"></i> {adDetails.mobile_num}
                  </button>
                </p> */}
                {/* Add other contact details here */}
              </div>
              <div>
                {adDetails.condition !== null ? (
                  <h5>
                    Condition : <span>{adDetails.condition}</span>
                  </h5>
                ) : null}
              </div>

              <div
                className="container"
                style={{ marginTop: 50, fontSize: 13, cursor: "pointer" }}
              >
                {adDetails && adDetails.description && (
                  <ShowMoreText
                    lines={5}
                    more="Show more..."
                    less="Hide more"
                    anchorClass="card-text"
                    onClick={toggleDescription}
                    expanded={showDescription}
                  >
                    {adDetails.description.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </ShowMoreText>
                )}
              </div>

              <div className="mt-4">
                <button
                  className="btn btn-danger"
                  onClick={handleReportClick}
                  style={{ marginTop: 50 }}
                >
                  <i className="bi bi-flag-fill"></i> Report
                </button>
              </div>
            </div>
            <div
              className="col-md-4"
              id="owner-det"
              style={{
                padding: 10,
                borderRadius: 10,
              }}
            >
              <div
                className="text-right "
                style={{ fontSize: 13, marginTop: 100, marginLeft: -20 }}
              >
                <p>
                  <span style={{ fontWeight: 500 }}>Sell by</span>{" "}
                  <span
                    style={{
                      backgroundColor: "#f56042",
                      padding: 5,
                      color: "white",
                      borderRadius: 10,
                    }}
                  >
                    {adDetails.first_name} {adDetails.last_name}
                  </span>
                </p>

                <p>Posted in {adDetails.disthrick}</p>
                <p>
                  Posted on {new Date(adDetails.created_at).toLocaleString()}
                </p>

                <button
                  onClick={handleMobileNumber}
                  className="mob-num"
                  style={{
                    backgroundColor: "#079bf7",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    marginRight: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-telephone-fill"></i>{" "}
                  {adDetails.mobile_num}
                </button>
                <button
                  onClick={handleWhatsAppNumber}
                  className="what-num"
                  style={{
                    backgroundColor: "#25d366",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-whatsapp"></i> {adDetails.mobile_num}
                </button>

                <button
                  className="btn btn-primary mr-2"
                  id="share-btnx"
                  style={{
                    background: "none",
                    color: "black",
                    border: "none",
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    marginBottom: 10,
                  }}
                  onClick={handleShareClick}
                >
                  <i className="bi bi-share-fill"></i> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
