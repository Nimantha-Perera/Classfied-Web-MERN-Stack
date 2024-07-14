// ReCaptcha.js

import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Recaptcha = ({ onChange }) => {
  return (
    <div style={{ marginTop:10, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={onChange}
      />
    </div>
  );
};

export default Recaptcha;
