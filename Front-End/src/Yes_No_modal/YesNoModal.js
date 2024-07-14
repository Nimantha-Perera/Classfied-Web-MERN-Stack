import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function YesNoModal({ show, handleClose, handleYesClick, message }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation Delection</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={handleYesClick}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default YesNoModal;