import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Navi Component/Nav';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search_bar from './Search_bar/Search_bar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Categorys from './Categorys/Categorys';
import Footer from './Footer/Footer';
import Home from './Main_Pages/Home';
import Post_Youre_Add from './Main_Pages/Post_Youre_Add';
import Profile_main from './Profile View Section/Profile_main';
import All_ads from './Add Show Component/All_ads';
import AdDetails from '../src/Ad_Details/AdDetails';
import Faq from './FAQ/Faq';
import Loading from '../src/Loading/Loading';
import axios from 'axios'; // Import Axios
import AdminPage from './Profile View Section/Admin';
import ProfileView from './Profile View Section/ProfileView';
import Snowfall from 'react-snowfall'; // Import Snowfall
import CheckModal from './SuccessErrorModal/CheckModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false); // To track user's login status

  // Simulate loading for a few seconds (remove this in production)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/check-login', { withCredentials: true })
      .then(response => {
        if (response.data.loggedIn) {
          // User is logged in
          setLoggedIn(true);
          console.log('User is logged in');
        } else {
          // User is not logged in
          setLoggedIn(false);
          console.log('User is not logged in');
        }
      })
      .catch(error => {
        console.error('Error checking login status:', error);
        setLoggedIn(false); // Set to false in case of an error
      });
  }, []);

  return (
    <Router>
      <div className="App sec1">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Nav />
            {/* <CheckModal/> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/PostAdd" element={<Post_Youre_Add />} />
              <Route path='/Dashboard' element={<ProfileView />} />
              <Route path='/allads' element={<All_ads />} />
              <Route path='/FAQ' element={<Faq />} />
              <Route path="/ad/:adId" element={<AdDetails />} />
              <Route path='/search/:query' element={<All_ads />} />
              <Route path="/category/:category" element={<All_ads />} />
              <Route path='/Admin' element={<AdminPage/>}/>
            </Routes>
            {/* <Snowfall snowflakeCount={100} snowflakePosition="all" /> */}
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
