import React, { useState } from 'react';
import '../MealView.css';
import Modal from '../Modal.js';
import breakfast_img from '../data/mealView/Breakfast.webp';
import lunch_img from '../data/mealView/Lunch.webp';
import dinner_img from '../data/mealView/Dinner.webp';
import weeklyMenu from "../WeeklyMenu";


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

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[currentDate.getDay()];

  const meals = weeklyMenu[dayName];
  const background_image = {
    Breakfast: breakfast_img,
    Lunch: lunch_img,
    Dinner: dinner_img,
  }

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  return (
    <div className="meal-view">
      <div className="header">
        <h1>Good Morning, Unknown</h1>
        <h1>{formattedDate}</h1>
      </div>
      <div className="meal-tabs">
        {Object.keys(meals).map((meal) => (
          <div key={meal}
            className="meal-tab" 
            onClick={() => handleMealClick(meal)}
          >
            <div 
              className="image-holder"
              style={{
                backgroundImage: `url(${background_image[meal]})`
              }}
            ></div>
            <div className="meal-name">{meal.toUpperCase()}</div>
            <div className="food-items">{meals[meal].join(', ')}</div>
          </div>
        ))}
      </div>
      {showModal && <Modal meal={selectedMeal} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MealView;
