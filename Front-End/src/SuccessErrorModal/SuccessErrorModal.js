import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SuccessErrorModal = ({ show, onHide, type, message }) => {  

  return (
<Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{type === 'success' ? 'Success' : 'Error'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessErrorModal;
