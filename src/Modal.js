import React from 'react';
import './Modal.css';

const Modal = ({ mealtime, meals, onClose, imgPaths }) => {
  return (
    <div className="modal"  onClick={onClose}>
      <div className="modal-content">
        <span 
        className='background-img'
        style={{
          backgroundImage: `url(${imgPaths[mealtime]})`
        }}></span>

        <span className='meal-info'>
          <div className='mealname'>{mealtime.toUpperCase()}</div>
          <div className='mealitems'>
            <ul>
              {
                meals[mealtime].map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Modal;
