import React, { useState ,useEffect} from "react";
import Search_bar from "../Search_bar/Search_bar";
import Categorys from "../Categorys/Categorys";
import Nav from '../Navi Component/Nav'
import Footer from "../Footer/Footer";
import { Link, useNavigate } from 'react-router-dom';
import Sign_In from "../SignIn/SignIn";
import secureLocalStorage from "react-secure-storage";
export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [username, setUsername] = useState('')



  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginPopup(false);
  };
  const handlePostAddClick = () => {
    if (isLoggedIn) {
      navigate('/PostAdd');
    } else {
      setShowLoginPopup(true);
    }
  };
  useEffect(() => {
    const token = secureLocalStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true); // User is logged in
      const userData = JSON.parse(secureLocalStorage.getItem("userData"));
      setUsername(userData.f_name); // Set the username from user data
    }
  }, []);
  

  return (
    <div>
      <Search_bar />
      <Categorys />

      <div className="post-add-button">
        <button className="btn  btn-block" onClick={handlePostAddClick}><i className="bi bi-plus-circle"></i> Post Add</button>
      </div>

      {showLoginPopup && (
        <Sign_In show={showLoginPopup} handleClose={() => setShowLoginPopup(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
