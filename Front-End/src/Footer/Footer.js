import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer text-white py-3" id='fot_back'>
      <div className="container">
        <div className="row">
          <div className="col-sm-4"  style={{marginTop:30,color:'black'}}>
            <h6>Connect with us</h6>
            <div style={{marginTop:20}} >
            <a href="https://www.facebook.com/"  style={{color:"white"}}><i class="bi bi-facebook"></i></a>
            <a href="https://www.facebook.com/"  style={{color:"white",marginLeft:20}}><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>
          <div className="col-sm-4" style={{marginTop:30 ,color:'black'}}>
            <h6>Help & Support</h6>
            <div style={{marginTop:20}}>
            <a href="/FAQ" style={{textDecoration:"none"}}>FAQ</a>
            </div>
            <div>
            <a href="/" style={{textDecoration:"none"}}>How to use this?</a>
            </div>
          </div>
          <div className="col-sm-4"  style={{marginTop:30,color:'black'}}>
            <h6>About us</h6>
            <div style={{marginTop:20}}>
            <p>Some information about your company.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center" style={{marginTop:100,color:"black",fontSize:14}}>
            <p>&copy; {new Date().getFullYear()}<span style={{cursor:"pointer"}}> LankaTech Innovations.</span>All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
