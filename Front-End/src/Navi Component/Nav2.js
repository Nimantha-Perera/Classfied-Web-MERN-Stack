import React, { useState } from 'react';
import { Navbar, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import './Nav.css';
import SideNav from '../SideNav';
import Search_bar from '../Search_bar/Search_bar';
import Hamburger from 'hamburger-react';
import CreateAc from '../Create Account Component/CreateAc';
import PostAdd from '../Main_Pages/Post_add'; // Step 2: Import the PostAdd component
import { Link, useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [showCreateAc, setShowCreateAc] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [showPostAdd, setShowPostAdd] = useState(false); // Step 3: Add a state variable for PostAdd
  const navigate = useNavigate();


  const handleMenuButtonClick = () => {
    setShowSideNav(!showSideNav);
  };





  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleSideNavCloseClick = () => {
    setShowSideNav(false);
  };

  const handleCloseCreateAc = () => {
    setShowCreateAc(false);
  };
  const handleMyAccountClick =()=>{
    navigate('/Dashboard');

  }

  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container col-md-7">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant=""
              className="menu-btn d-lg-none ml-3 float-lg-start"
              style={{ color: 'white' }}
              onClick={handleMenuButtonClick}
            >
              <FaBars />
            </Button>
            <a className="navbar-brand" href="/" style={{ color: 'white' }}>
              Your Logo
            </a>
           
          </div>

          <div className="ml-auto btns">
            <button
              className="btn btn-primary creat_acc"
              id="create_acc_btn"
              onClick={handleMyAccountClick}

            //   styles on my account button
            style={{background:"none"}}
            >
              <i className="bi bi-person-fill" style={{ marginRight: '10px' }}></i>
              My Account
            </button>

           
          </div>
        </div>
      </Navbar>

      {/* Search Bar */}
      {/* Render your Search_bar component here */}

      {/* SideNav Bar */}
      <SideNav
        showSideNav={showSideNav}
        handleSideNavCloseClick={handleSideNavCloseClick}
      />

      {/* CreateAc Popup Form */}
      {showCreateAc && <CreateAc show={showCreateAc} handleClose={handleCloseCreateAc} />}

      {/* PostAdd Popup Form */}
      {showPostAdd && <PostAdd show={showPostAdd} handleClose={() => setShowPostAdd(false)} />}
    </>
  );
};

export default NavbarComponent;
