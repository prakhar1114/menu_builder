import React, { useState } from 'react';
import '../MealView.css';
import Modal from '../Modal.js';

const MealView = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const meals = {
    breakfast: ['A', 'B', 'C'],
    lunch: ['A', 'B', 'C'],
    dinner: ['A', 'B', 'C']
  };

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  return (
    <div className="meal-view">
      <div className="header">
        <h1>Good Morning, Unknown</h1>
        <p>{formattedDate}</p>
      </div>
      <div className="meal-tabs">
        {Object.keys(meals).map((meal) => (
          <div key={meal} className="meal-tab" onClick={() => handleMealClick(meal)}>
            <h2>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>
            <div className="food-items">{meals[meal].join(', ')}</div>
          </div>
        ))}
      </div>
      {showModal && <Modal meal={selectedMeal} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MealView;
