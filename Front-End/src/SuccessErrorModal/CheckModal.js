import React, { useState } from 'react';
import SuccessErrorModal from './SuccessErrorModal';

export default function CheckModal() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleShowSuccessModal = () => {
    setShowSuccessModal(true);
    setSuccessMessage('Operation was successful!');
  };

  const handleShowErrorModal = () => {
    setShowErrorModal(true);
    setErrorMessage('An error occurred.');
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="App">
      <button onClick={handleShowSuccessModal}>Show Success Modal</button>
      <button onClick={handleShowErrorModal}>Show Error Modal</button>

      <SuccessErrorModal
        show={showSuccessModal}
        onHide={handleCloseSuccessModal}
        type="success"
        message={successMessage}
      />

      <SuccessErrorModal
        show={showErrorModal}
        onHide={handleCloseErrorModal}
        type="error"
        message={errorMessage}
      />
    </div>
  );
}
