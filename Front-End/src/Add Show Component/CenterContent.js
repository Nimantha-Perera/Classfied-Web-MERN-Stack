import React, { useState, useEffect } from "react";
import axios from "axios";
import AdsCard from "./AdsCard";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react"; // Import Lottie from lottie-react
import animationData from "../Lottie_animations/animation_lmydf6ck.json";
import useScrollToTop from "../useScrollToTop";

const Adss = ({ searchQuery, filters, searchQuery2, maim_location }) => {
  const [ads, setAds] = useState([]); // Store the fetched ads
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const adsPerPage = 10; // Number of ads to display per page

  // Get the selected category from the URL parameter using React Router
  const { category } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fetch-adss", {
        // Include query parameters if needed
        params: {
          page: currentPage,
          limit: adsPerPage,
          category,
          searchQuery,
          searchQuery2,
          maim_location,
          ...filters,
        },
      });

      // Handle the response data (e.g., update state with fetched data)
      setAds(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call the fetchData function when needed (e.g., in a useEffect)
  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    searchQuery,
    searchQuery2,
    category,
    filters,
    maim_location,
  ]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to calculate the time elapsed since an ad was posted
  const calculateTimeAgo = (timestamp) => {
    const timestampDate = new Date(timestamp);
    const currentDate = new Date();
    const timeDifferenceMs = currentDate - timestampDate;
    const timeDifferenceMinutes = Math.floor(timeDifferenceMs / (1000 * 60));

    if (timeDifferenceMinutes < 1) {
      return "Just now";
    } else if (timeDifferenceMinutes < 60) {
      return `${timeDifferenceMinutes} minutes ago`;
    } else if (timeDifferenceMinutes < 1440) {
      const hours = Math.floor(timeDifferenceMinutes / 60);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(timeDifferenceMinutes / 1440);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  };
  useScrollToTop();

  // Render the component
  return (
    <div>
      {/* Display the category as a breadcrumb if it exists */}
      {category && (
        <h2 style={{ fontSize: 13, marginTop: 40 }}>Home/{category}</h2>
      )}
      <div style={{ marginTop: 50 }}>
        {/* Display ads if there are ads to show */}
        {ads.length > 0 ? (
          ads.map((ad) => (
            <AdsCard
              key={ad.id}
              img={ad.img}
              adId={ad.id}
              title={`${ad.brand || ad.institute_name ||""} ${
                ad.title
              }`}
              price={ad.main_category + ", " + ad.sub_category}
              location={ad.disthrick}
              description={`Rs ${ad.price}`}
              postedTime={calculateTimeAgo(ad.created_at)}
              // Handle card click
            />
          ))
        ) : (
          // Display a message if there are no ads to show
          <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Lottie
    animationData={animationData} // Pass your animation data here
    loop={true} // Optionally, set if the animation should loop
    style={{ width: 200, height: 200 }} // Set the desired width and height
  />
</div>

        )}
        {/* Button to load the next page of ads */}
        <button
          onClick={handleNextPage}
          style={{ marginTop: 10, marginBottom: 20 }}
          disabled={ads.length < adsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Adss;
