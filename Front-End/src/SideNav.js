import React, { useState, useEffect } from "react";
import { Nav, Button } from "react-bootstrap";
import "./SideNav.css";
import Hamburger from "hamburger-react";
import SignIn from "../src/SignIn/SignIn";
import { useNavigate } from "react-router-dom";
import logo2 from "../src/SVG/logoipsum-211.svg";
import secureLocalStorage from "react-secure-storage";

const SideNav = ({ showSideNav, handleSideNavCloseClick }) => {
  const [activeLink, setActiveLink] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const [username, setUsername] = useState("");

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
    // Close the side navigation when a link is clicked
    handleSideNavCloseClick();
  };

  const handleSignInLinkClick = () => {
    setShowSignInModal(true);
    // Close the side navigation when the sign-in link is clicked
    handleSideNavCloseClick();
  };

  const handleOpenAllAds = () => {
    navigate("/AllAds");
    // Close the side navigation when the "All Ads" link is clicked
    handleSideNavCloseClick();
  };

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true); // Set login status to true if token exists
      const userData = JSON.parse(secureLocalStorage.getItem("userData"));
      setUsername(userData.f_name);
    }
  }, []);

  return (
    <div className={`side-nav ${showSideNav ? "open" : ""}`}>
      <div className="logo_sidenav">
        <h3 style={{ color: "white" }}>
          <img src={logo2} alt="Logo" />
        </h3>
      </div>

      <Nav className="flex-column">
        <Button
          className="close-btn nv-sides"
          style={{ color: "white" }}
          onClick={handleSideNavCloseClick}
        >
          <div className="hamburger-icon close">
            <Hamburger
              style
              toggled={showSideNav}
              toggle={handleSideNavCloseClick}
              className="icon_ss"
            />
          </div>
        </Button>

        <Nav.Link
          className="nv-sides"
          style={{
            marginTop: 40,
            color: activeLink === 1 ? "#fbd408" : "#adadad",
          }}
          onClick={() => {
            handleLinkClick(1);
            handleOpenAllAds();
          }}
        >
          <i
            className={`bi bi-bookmark-fill ${
              activeLink === 1 ? "active" : ""
            }`}
          ></i>{" "}
          All Ads
        </Nav.Link>

        <hr style={{ color: "white" }} />

        {/* Hide the login link when isLoggedIn is true */}
        {!isLoggedIn && (
          <Nav.Link
            className="nv-sides"
            style={{ color: activeLink === 2 ? "#fbd408" : "#adadad" }}
            onClick={() => {
              handleLinkClick(2);
              handleSignInLinkClick();
            }}
          >
            <i
              className={`bi bi-person-fill ${
                activeLink === 2 ? "active" : ""
              }`}
            ></i>{" "}
            Login
          </Nav.Link>
        )}

        <hr style={{ color: "white" }} />

        <Nav.Link
          className="nv-sides"
          href="/FAQ"
          style={{
            color: activeLink === 3 ? "#fbd408" : "#adadad",
            marginBottom: 10,
          }}
          onClick={() => handleLinkClick(3)}
        >
          <i
            className={`bi bi-exclamation-circle-fill ${
              activeLink === 3 ? "active" : ""
            }`}
          ></i>{" "}
          FAQ
        </Nav.Link>

        <Nav.Link
          className="nv-sides"
          href="/link3"
          style={{
            color: activeLink === 4 ? "#fbd408" : "#adadad",
            marginBottom: 10,
          }}
          onClick={() => handleLinkClick(4)}
        >
          <i
            className={`bi bi-cash-coin ${activeLink === 4 ? "active" : ""}`}
          ></i>{" "}
          How to sell fast?
        </Nav.Link>

        <Nav.Link
          className="nv-sides"
          href="/link3"
          style={{ color: activeLink === 5 ? "#fbd408" : "#adadad" }}
          onClick={() => handleLinkClick(5)}
        >
          <i
            className={`bi bi-patch-check-fill ${
              activeLink === 5 ? "active" : ""
            }`}
          ></i>{" "}
          Stay safe?
        </Nav.Link>
      </Nav>

      <SignIn
        show={showSignInModal}
        handleClose={() => setShowSignInModal(false)}
      />
    </div>
  );
};

export default SideNav;
