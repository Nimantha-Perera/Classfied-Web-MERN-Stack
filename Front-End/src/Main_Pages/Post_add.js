import React, { useState, useEffect } from "react";
import "./PostAdd.css"; // Import the custom CSS file
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal"; // Import the Modal component
import { Tooltip } from "bootstrap"; // Make sure to import Bootstrap Tooltip
import { FaQuestionCircle } from "react-icons/fa";
import VerificationComponent from "../VerificationComponent/VerificationComponent";
import Lottie from "lottie-react";
import animationData from "../Lottie_animations/animation_lmpnemdo.json";
import ImageUpload from "./ImageUpload";
import secureLocalStorage from "react-secure-storage";
import Tumbnaail_Img from "./Tumbnaail_Img";
import Mobile_Number from "./Mobile_Number";
import SuccessErrorModal from "../SuccessErrorModal/SuccessErrorModal";
import EmojiPicker from "emoji-picker-react";

const PostAdd = () => {
  const [selectedImages, setSelectedImages] = useState(Array(5).fill(null));

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [showBrandsSubcategory, setShowBrandsSubcategory] = useState(false);
  const [showInstituteName, setShowInstituteName] = useState(false);
  const [propertyType, setPropertyType] = useState("sell"); // Initialize propertyType state
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubTown, setSelectedSubTown] = useState("");
  const [perches, setPerches] = useState(""); // Declare perches state
  const [acres, setAcres] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  // Add state for mobile number and verification code


  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [showSuccessModal2, setShowSuccessModal2] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  //Masg error and succes
  const [showMessage, setMessage] = useState("");

  const [selectedImagesCount, setSelectedImagesCount] = useState(0);



  const [isChecked, setIsChecked] = useState(false);
  const [verifiedNumber, setVerifiedNumber] = useState('');

  const handleIsCheckedChange = (isCheckedValue) => {
    setVerifiedNumber(isCheckedValue);
  };

  const handleVerifiedNumberChange = (newVerifiedNumber) => {
    setVerifiedNumber(newVerifiedNumber);
  };

  const handleCloseSuccessModal2 = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  // Function to format the number with commas
  const formatPriceWithCommas = (value) => {
    // Remove existing commas and other non-numeric characters
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Parse the input as a number (assuming it's numeric)
    const parsedValue = parseFloat(numericValue);

    // Check if the parsed value is a valid number
    if (!isNaN(parsedValue)) {
      // Format the number with commas and return it
      return parsedValue.toLocaleString();
    }

    // If the input is not a valid number, return it as is
    return value;
  };

  const handlePriceChange = (e) => {
    // Get the user-entered value
    const inputValue = e.target.value;

    // Format the value with commas and set it as the new price
    setPrice(formatPriceWithCommas(inputValue));
  };

  // Function to handle the uploaded image URL
  const handleImageUploaded = (url) => {
    setUploadedImageURL(url);
  };

  // Function to handle selected images
  const handleSelectedImages = (images) => {
    setSelectedImages(images);
    setSelectedImagesCount(images.filter((image) => image !== null).length);
  };

  // Define a callback function to receive the verified number
  const handleVerificationSuccess = (verifiedNumberWithoutPrefix) => {
    setVerifiedNumber(verifiedNumberWithoutPrefix);
  };

  const [token, setToken] = useState(""); // Define 'token'
  const [user_id, setId] = useState(""); // Define 'id'
  const [l_name, setLName] = useState(""); // Define 'l_name'
  const [f_name, setFName] = useState(""); // Define 'f_name

  const [username, setUsername] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");

    if (token) {
      const userData = JSON.parse(secureLocalStorage.getItem("userData"));
      setId(userData.id);
      setFName(userData.f_name);
      setLName(userData.l_name);
    }
  }, []); // This effect runs once on component mount

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Sub-Category:", selectedSubCategory);
    console.log("brand:", selectedBrand);
    console.log("Selected District:", selectedDistrict);
    console.log("Selected Sub-Town:", selectedSubTown);
    console.log("Institute Name:", instituteName);
    console.log("Title:", title);
    console.log("condition:", condition);
    console.log("Description:", description);
    console.log("area (acres):", acres);
    console.log("area (perches):", perches);
    console.log("property type:", propertyType);
    console.log("Price:", price);
    console.log("Selected Images:", selectedImages);
    console.log("user id:", user_id);
    console.log("user f_name:", f_name);
    console.log("user l_name:", l_name);
    console.log("user number:", verifiedNumber);
    console.log("tumb url:", uploadedImageURL);

    // Perform validation checks
    if (!selectedCategory || !selectedSubCategory) {
      setShowErrorModal(true);
      setMessage("Please select both Category and Subcategory.");

      return;
    }
    if (!uploadedImageURL) {
      setShowErrorModal(true);
      setMessage("Please select tumbnail img.");

      return;
    }
    if (!verifiedNumber){
      setShowErrorModal(true);
      setMessage("Please select or verified and add new mobile number");
       
      return;
    }

    if (showInstituteName && !instituteName.trim()) {
      // alert("Please enter the Name of Institute.");
      setShowErrorModal(true);
      setMessage("Please enter the Name of Institute.");
      return;
    }

    if (!selectedDistrict || !selectedSubTown) {
      // alert("Please select both District and Sub-town.");
      setShowErrorModal(true);
      setMessage("Please select both District and Sub-town.");
      return;
    }

    if (!title.trim() || !description.trim() || !price.trim()) {
      // alert(
      //   "Please fill in all the required fields (Title, Description, and Price)."
      // );
      setShowErrorModal(true);
      setMessage(
        "Please fill in all the required fields (Title, Description, and Price)"
      );
      return;
    }
    if (!selectedImages || selectedImages.every((image) => image === null)) {
      setShowErrorModal(true);
      setMessage("Please select at least one image.");
      return;
    }
    if (selectedImagesCount < 3) {
      setShowErrorModal(true);
      setMessage("Please select at least 3 images.");
      return;
    }

    // Form data is valid, continue with submission logic
    // try {
    //   // Upload images first
    //   const imageFormData = new FormData();
    //   selectedImages.forEach((image) => {
    //     imageFormData.append("selectedImages", image);
    //   });

    //   const imageResponse = await fetch("http://localhost:5000/upload-images", {
    //     method: "POST",
    //     body: imageFormData,
    //   });

    //   if (!imageResponse.ok) {
    //     console.log("Error uploading images.");
    //     return;
    //   }

    //   const imageResult = await imageResponse.json();

    // Insert the ad with uploaded image URLs
    const adResponse = await fetch("http://localhost:5000/insert-ad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token for authentication if needed
      },
      body: JSON.stringify({
        selectedCategory,
        selectedSubCategory,
        selectedBrand,
        selectedDistrict,
        selectedSubTown,
        instituteName,
        title,
        condition,
        description,
        price,
        verifiedNumber,
        propertyType,
        acres,
        perches,
        selectedImages,
        user_id, // Assuming you have an 'id' variable available
        l_name, // Replace with the actual last name value
        f_name,
        uploadedImageURL, // Replace with the actual first name value
      }),
    });

    if (adResponse.ok) {
      // Clear all form fields upon success

      setShowSuccessModal(true);

      // Clear all form fields upon success

      // ... Additional logic if needed
    } else {
      console.log("Error inserting data.");
    }
    // } catch (error) {
    //   console.error("An error occurred:", error);
    // }
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload(); // This line reloads the page
  };

  const handleDistrictChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDistrict(selectedValue);
    setSelectedSubTown(""); // Reset selected sub-town when a new district is selected
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    setSelectedSubCategory("");
    setShowSubcategory(selectedValue !== "");
    setShowBrandsSubcategory(false);
    setShowInstituteName(false);
  };

  const handleSubCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSubCategory(selectedValue);

    const isMobileOrLaptop = brandsSubcategories.hasOwnProperty(selectedValue);
    setShowBrandsSubcategory(isMobileOrLaptop);

    const isEducationSubCategory =
      selectedValue === "Higher Education" ||
      selectedValue === "Tution" ||
      selectedValue === "Vocational Institutes";
    setShowInstituteName(isEducationSubCategory);
  };

  //Save FireBase User Uploaded Img And Get Url

  // const handleImageChange = async (event) => {
  //   const selectedFiles = event.target.files;
  //   const formData = new FormData();

  //   for (let i = 0; i < selectedFiles.length; i++) {
  //     formData.append("selectedImages", selectedFiles[i]);
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5000/upload-images", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const uploadedImages = await response.json();
  //       setSelectedImages([...selectedImages, ...uploadedImages]);
  //     } else {
  //       console.log("Error uploading images.");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const categories = [
    "Electronics",
    "Vehicles",
    "Home & Garden",
    "Services",
    "Jobs",
    "Education",
    "Animals",
    "Property",
    "Fashion & Beauty",
    "Other",
  ];

  const subcategoriesByCategory = {
    Electronics: [
      "Mobile Phones",
      "Laptops",
      "Tablets",
      "PC",
      "Computer Accessories",
      "TVs",
      "Mobile Phone Accessories",
      "TV & Video Accessories",
      "Cameras & Camcorders",
      "Audio & MP3",
      "Electronic Home Appliances",
      "Video Games & Consoles",
      "Other Electronics",
    ],
    Vehicles: ["Cars", "Motorcycles", "Bicycles", "Other Vehicles"],
    "Home & Garden": ["Furniture", "Appliances", "Other Home & Garden"],
    Services: ["Plumbing", "Electrician", "Carpenter", "Other Services"],
    Jobs: ["Full-time", "Part-time", "Freelance", "Other Jobs"],
    Education: [
      "Higher Education",
      "Tution",
      "Vocational Institutes",
      "Other Education",
    ],
    Animals: ["Pets", "Livestock", "Other Animals"],
    Property: ["For Sale", "For Rent", "Other Property"],
    "Fashion & Beauty": [
      "Clothing",
      "Beauty Products",
      "Other Fashion & Beauty",
    ],
    Other: ["Other Sub-category"],
  };

  const brandsSubcategories = {
    "Mobile Phones": [
      "Apple",
      "Samsung",
      "Google",
      "OnePlus",
      "Xiaomi",
      "Huawei",
    ],
    Tablets: ["Apple (iPad)", "Samsung (Galaxy Tab)", "Microsoft (Surface)", "Lenovo (Tab series)", "Amazon (Fire Tablets)", "Huawei (MediaPad)", "ASUS (ZenPad)", "Google (Pixel Slate)", "Sony (Xperia Tablet)", "Acer (Iconia)"],
    PC: ["Apple", "Dell", "HP (Hewlett-Packard)", "Lenovo", "Acer", "ASUS", "Microsoft", "Alienware", "MSI (Micro-Star International)", "Sony (VAIO)"],
    Laptops: ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer"],
    TVs: ["Samsung", "LG", "Sony", "TCL", "Panasonic", "Vizio"],
    "Computer Accessories": [
      "Apple",
      "Lenovo",
      "Dell",
      "Asus",
      "HP",
      "Microsoft",
    ],
    "TV & Video Accessories": [
      "Mounts & Stands",
      "Cables & Adapters",
      "Remote Controls",
      "Antennas",
      "TV Tuners",
    ],
    "Audio & MP3": [
      "Sony",
      "JBL",
      "Bose",
      "Sennheiser",
      "Beats",
      "Audio-Technica",
    ],
    "Video Games & Consoles": [
      "PlayStation",
      "Xbox",
      "Nintendo",
      "PC Gaming",
      "Accessories",
    ],
    Cars: [
      "Toyota",
      "Honda",
      "Ford",
      "BMW",
      "Mercedes-Benz",
      "Nissan",
      "Mitsubishi",
    ],
    Motorcycles: [
      "Harley-Davidson",
      "Honda",
      "Yamaha",
      "Kawasaki",
      "Suzuki",
      "BMW",
    ],
    Bicycles: [
      "Trek",
      "Giant",
      "Specialized",
      "Cannondale",
      "Scott",
      "Schwinn",
    ],
    "Other Vehicles": ["Boats", "RVs", "Trucks", "ATVs", "Aircraft", "Other"],
  };

  const districts = [
    {
      name: "Colombo",
      subTowns: [
        "Colombo",
        "Dehiwala",
        "Mount Lavinia",
        "Moratuwa",
        "Sri Jayawardenepura Kotte",
      ],
    },
    {
      name: "Gampaha",
      subTowns: ["Gampaha", "Negombo", "Kelaniya", "Sri Jayawardenepura Kotte"],
    },
    {
      name: "Kalutara",
      subTowns: ["Kalutara", "Panadura", "Horana", "Beruwala"],
    },
    {
      name: "Kandy",
      subTowns: ["Kandy", "Peradeniya", "Katugastota", "Gampola"],
    },
    {
      name: "Kurunegala",
      subTowns: ["Kurunegala", "Mawathagama", "Wariyapola", "Kuliyapitiya"],
    },
    {
      name: "Galle",
      subTowns: ["Galle", "Hikkaduwa", "Unawatuna", "Ambalangoda"],
    },
    {
      name: "Matara",
      subTowns: ["Matara", "Weligama", "Mirissa", "Dondra"],
    },
    {
      name: "Badulla",
      subTowns: ["Badulla", "Bandarawela", "Ella", "Haputale"],
    },
    {
      name: "Anuradhapura",
      subTowns: ["Anuradhapura", "Medawachchiya", "Tambuttegama", "Kekirawa"],
    },
    {
      name: "Polonnaruwa",
      subTowns: ["Polonnaruwa", "Hingurakgoda", "Kaduruwela", "Medirigiriya"],
    },
    {
      name: "Trincomalee",
      subTowns: ["Trincomalee", "Nilaveli", "Kinniya", "Kantalai"],
    },
    {
      name: "Batticaloa",
      subTowns: ["Batticaloa", "Kattankudy", "Eravur", "Valaichchenai"],
    },
    {
      name: "Jaffna",
      subTowns: ["Jaffna", "Point Pedro", "Chavakachcheri", "Nallur"],
    },
    {
      name: "Kilinochchi",
      subTowns: ["Kilinochchi", "Pallai", "Kandarodai", "Poonakari"],
    },
    {
      name: "Mannar",
      subTowns: ["Mannar", "Adampan", "Talaimannar", "Nanaddan"],
    },
    {
      name: "Matale",
      subTowns: ["Matale", "Dambulla", "Sigiriya", "Palapathwela"],
    },
    {
      name: "Nuwara Eliya",
      subTowns: ["Nuwara Eliya", "Hatton", "Haputale", "Talawakele"],
    },
    {
      name: "Puttalam",
      subTowns: ["Puttalam", "Chilaw", "Kalpitiya", "Wennappuwa"],
    },
    {
      name: "Ratnapura",
      subTowns: ["Ratnapura", "Embilipitiya", "Balangoda", "Kuruwita"],
    },
    {
      name: "Kegalle",
      subTowns: ["Kegalle", "Mawanella", "Rambukkana", "Dehiowita"],
    },
    {
      name: "Hambantota",
      subTowns: ["Hambantota", "Tangalle", "Ambalantota", "Suriyawewa"],
    },
    {
      name: "Monaragala",
      subTowns: ["Monaragala", "Wellawaya", "Bibile", "Kataragama"],
    },
    {
      name: "Mullaitivu",
      subTowns: ["Mullaitivu", "Oddusuddan", "Puthukkudiyiruppu", "Mankulam"],
    },
    {
      name: "Vavuniya",
      subTowns: ["Vavuniya", "Nedunkeni", "Pambaimadu", "Chettikulam"],
    },
    {
      name: "Mannar",
      subTowns: ["Mannar", "Adampan", "Talaimannar", "Nanaddan"],
    },
    // Add more districts with sub-towns as needed
  ];

  return (
    <div className="container container-center ads_cont">
      {/* Success Modal */}

      <form onSubmit={handleFormSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="category-nav mb-3">
              <label htmlFor="category" className="form-label">
                <i
                  class="bi bi-bookmark-fill"
                  style={{ marginRight: 10, color: "#fbd408" }}
                ></i>
                Select Category
              </label>
              <select
                className="form-control"
                id="category"
                onChange={handleCategoryChange}
                style={{ boxShadow: "none", fontSize: 12 }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {showSubcategory && (
              <div className="mb-3">
                <label htmlFor="subcategory" className="form-label">
                  Select Sub category
                </label>
                <select
                  className="form-control"
                  id="subcategory"
                  onChange={handleSubCategoryChange}
                  style={{ boxShadow: "none", fontSize: 12 }}
                >
                  <option value="">Select Sub-category</option>
                  {selectedCategory &&
                    subcategoriesByCategory[selectedCategory].map(
                      (subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory}
                        </option>
                      )
                    )}
                </select>
              </div>
            )}
            {selectedSubCategory === "For Sale" && propertyType === "sell" && (
              <div className="mb-3">
                <label htmlFor="perches" className="form-label">
                  Perches
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="perches"
                  value={perches}
                  onChange={(e) => setPerches(e.target.value)}
                  style={{ boxShadow: "none", fontSize: 12 }}
                />
              </div>
            )}
            {selectedSubCategory === "For Sale" && propertyType === "sell" && (
              <div className="mb-3">
                <label htmlFor="acres" className="form-label">
                  Acres
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="acres"
                  value={acres}
                  onChange={(e) => setAcres(e.target.value)}
                  style={{ boxShadow: "none", fontSize: 12 }}
                />
              </div>
            )}
            {showBrandsSubcategory && (
              <div className="mb-3">
                <label htmlFor="brandsSubcategory" className="form-label">
                  Brands
                </label>
                <select
                  className="form-control"
                  id="brandsSubcategory"
                  style={{ boxShadow: "none", fontSize: 12 }}
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">Select Brand</option>
                  {brandsSubcategories[selectedSubCategory].map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showInstituteName && (
              <div className="mb-3">
                <label htmlFor="instituteName" className="form-label">
                  Name of Institute
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="instituteName"
                  style={{ boxShadow: "none", fontSize: 12 }}
                  value={instituteName} // Bind the value to the state
                  onChange={(e) => setInstituteName(e.target.value)} // Update the state on input change
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="district" className="form-label">
                <i
                  class="bi bi-geo-alt-fill"
                  style={{ marginRight: 10, color: "#fbd408" }}
                ></i>
                Select District (Sri Lanka)
              </label>
              <select
                style={{ boxShadow: "none", fontSize: 12 }}
                className="form-control"
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.name} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Add the sub-town selection dropdown */}
            <div className="mb-3">
              <label htmlFor="subTown" className="form-label">
                <i
                  class="bi bi-geo-fill"
                  style={{ marginRight: 10, color: "#fbd408" }}
                ></i>
                Select Sub-town
              </label>
              <select
                style={{ boxShadow: "none", fontSize: 12 }}
                className="form-control"
                id="subTown"
                value={selectedSubTown}
                onChange={(e) => setSelectedSubTown(e.target.value)}
              >
                <option value="">Select Sub-town</option>
                {selectedDistrict &&
                  districts
                    .find((district) => district.name === selectedDistrict)
                    .subTowns.map((subTown) => (
                      <option key={subTown} value={subTown}>
                        {subTown}
                      </option>
                    ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                <i
                  className="bi bi-card-heading"
                  style={{ marginRight: 10, color: "#fbd408" }}
                ></i>
                Title
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Add Your Show Title Ex (Electronics,Mobile,Samsung,(Title: Add Your Modal Number))"
                >
                  <FaQuestionCircle
                    style={{
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      color: "#666",
                    }}
                  />
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Add your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ boxShadow: "none", fontSize: 12 }}
              />
            </div>

            {/* <div className="mb-3">
              <label htmlFor="condition" className="form-label">
                <i
                  class="bi bi-emoji-sunglasses"
                  style={{ marginRight: 10, color: "#fbd408" }}
                ></i>
                Used/New
              </label>
              <select
                className="form-control"
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                style={{ boxShadow: "none", fontSize: 12 }}
              >
                <option value="">Select Condition</option>
                <option value="used">Used</option>
                <option value="new">New</option>
              </select>
            </div> */}

            {["Electronics", "Vehicles"].includes(selectedCategory) && (
              <div className="mb-3">
                <label htmlFor="condition" className="form-label">
                  <i
                    className="bi bi-emoji-sunglasses"
                    style={{ marginRight: 10, color: "#fbd408" }}
                  ></i>
                  Used/New
                </label>
                <select
                  className="form-control"
                  id="condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  style={{ boxShadow: "none", fontSize: 12 }}
                >
                  <option value="">Select Condition</option>
                  <option value="used">Used</option>
                  <option value="new">New</option>
                </select>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <i
                  class="bi bi-card-list"
                  style={{ marginRight: 10, color: "#fbd408" }}
                ></i>
                Description (Add Description Line by Line)
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="12"
                value={description}
                placeholder="Ex:   **For Sale: 2023 SwiftStream GT-2000**

                Unleash the power of luxury with the 2023 SwiftStream GT-2000! 🚗💨
                
                ✅ Sleek, Modern Design
                ✅ 250 HP Turbocharged Engine
                ✅ Leather Interior with Heating/Ventilation
                ✅ Advanced Safety Features
                ✅ 30 MPG Highway
                
                Upgrade your daily drive. Contact us today and hit the road in style! 🌟 #SwiftStreamGT2000 #LuxuryCars #ForSale"
                onChange={(e) => setDescription(e.target.value)}
                style={{ boxShadow: "none", fontSize: 12 }}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                <i
                  className="bi bi-tags-fill"
                  style={{ marginRight: 10, color: "#fbd408" }}
                ></i>
                Price (LKR)
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={handlePriceChange}
                style={{ boxShadow: "none", fontSize: 12 }}
              />
            </div>

            {/* Mobile Number Shown */}

            <Mobile_Number  isCheckedProp={isChecked}
  verifiedNumberProp={verifiedNumber}
  onVerifiedNumberChange={handleVerifiedNumberChange}
  onIsCheckedChange={handleIsCheckedChange} />

            {/* Verify number */}

            {/* {!isChecked && (
              <VerificationComponent
                onVerificationSuccess={handleVerificationSuccess}
              />
            )} */}

            {/* Tumbnail Img */}

            <Tumbnaail_Img onTumbnailImage={handleImageUploaded} />

            {/* Get Images Input */}
            <ImageUpload onImagesSelected={handleSelectedImages} />

            <button
              type="submit"
              className="btn posted_add"
              style={{
                backgroundColor: "#fbd408",
                borderRadius: 20,
                marginTop: 50,
                float: "right",
              }}
            >
              Post Your Add
            </button>
          </div>
        </div>
      </form>

      <SuccessErrorModal
        show={showSuccessModal2}
        onHide={() => {
          handleCloseSuccessModal2();

          setShowSuccessModal2(false);
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

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Success! Your post has been added. It is currently pending approval.
          You will receive a notification once it's approved. Thank you for your
          patience.
          {/* Add the Lottie animation here */}
          <div style={{ width: 100 }}>
            <Lottie animationData={animationData} autoplay loop={false} />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostAdd;
