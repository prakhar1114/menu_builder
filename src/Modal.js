import React from 'react';
import './Modal.css';

const Modal = ({ meal, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>
        <p>Content for {meal} will go here.</p>
      </div>
    </div>
  );
};

export default Modal;
