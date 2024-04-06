import React, { useState } from "react";
import foodItems from "./FoodItems";
import "./App.css";

function menuBoard() {}

function SingleMeal() {
  const [title, setTitle] = useState("Lunch");

  const [foodItemList, setFoodItems] = useState(foodItems);
  function clearItem(index) {
    setFoodItems(foodItemList.filter((_, idx) => idx !== index));
  }

  function handleInputChange(value, index) {
    let updatedFoodItemList = [...foodItemList];
    updatedFoodItemList[index] = value;
    setFoodItems(updatedFoodItemList);

    // 1. check the need to update food item list and update if needed ---- NOO DO THIS LATER: only update when saving everything (implement save button)

    // 2. autocomplete options:
  }

  return (
    <div className="meal-component">
      <div className="meal-title">{title}</div>
      <div className="food-item-list">
        {foodItemList.map((foodName, index) => (
          <FoodItem
            key={index}
            index={index}
            foodName={foodName}
            clearItem={clearItem}
            handleInputChange={handleInputChange}
          />
        ))}
        <FoodItem foodName={""} />
      </div>
    </div>
  );
}

function FoodItem({ index, foodName, clearItem, handleInputChange }) {
  return (
    <div className="food-item-component">
      <input
        className="food-item"
        value={foodName}
        placeholder="Enter food"
        onChange={(e) => handleInputChange(e.target.value, index)}
      />
      {foodName && (
        <button className="x-button" onClick={() => clearItem(index)}>
          X
        </button>
      )}
    </div>
  );
}

export default SingleMeal;
