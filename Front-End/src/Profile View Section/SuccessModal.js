// SuccessModal.js
import React from 'react';

const SuccessModal = ({ show, onHide, message }) => (
  <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Success</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onHide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {message}
        </div>
      </div>
    </div>
  </div>
);

export default SuccessModal;
