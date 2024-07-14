// SocialLogin.js

import React from "react";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login";

const SocialLogin = ({ socialLogin }) => {
  return (
    <div>
      <h2>Sign in with Social Media</h2>
      <GoogleLoginButton onClick={() => socialLogin("google")} />
      <FacebookLoginButton onClick={() => socialLogin("facebook")} />
    </div>
  );
};

export default SocialLogin;
