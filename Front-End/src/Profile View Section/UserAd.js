import React from "react";
import { Link } from "react-router-dom";

const UserAd = ({
  adId,
  title,
  price,
  location,
  description,
  postedTime,
  img,
  onDelete,
  onView,
  ad_status,
}) => {
  const handleDeleteClick = () => {
    onDelete(adId);
  };

  const handleViewClick = () => {
    onView(adId);
  };

  // Define a CSS class based on adStatus
  const statusClass = ad_status === "approved" ? "text-success" : "";

  return (
    <div className="card mb-3" style={{ marginTop: "10px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          
            <div
              className="image-container"
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
              }}
            >
              <img
                src={img}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
         
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <Link
              to={`/ad/${adId}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h5 className="card-title">{title}</h5>
            </Link>
            <p className="card-text price_vv">{price}</p>
            <p className="card-text" style={{ fontSize: "14px" }} id="des_loc">
              {location}
            </p>

            <p className="card-text" style={{ fontSize: "14px" }}>
              {description}
            </p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-danger"
                style={{ fontSize: 10 }}
                onClick={handleDeleteClick}
              >
                Delete
              </button>
              <p className={`card-text ${statusClass}`} style={{ fontSize: "14px" }}>
             {ad_status === "approved" ? "Published" : "Pending"}
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAd;
