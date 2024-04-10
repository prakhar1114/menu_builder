import React, { useState } from "react";
import foodItems from "./FoodItems";
import "./App.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function menuBoard() {}

function SingleMeal() {
  const [title, setTitle] = useState("Lunch");
  const [mealItems, setmealItems] = useState(foodItems);
  const [foodItemList, setFoodItems] = useState(foodItems);
  function clearItem(index) {
    setmealItems(mealItems.filter((_, idx) => idx !== index));
  }

  function handleInputChange(value, index) {
    let updatedFoodItemList = [...mealItems];
    updatedFoodItemList[index] = value;
    setmealItems(updatedFoodItemList);

    // 1. check the need to update food item list and update if needed ---- NOO DO THIS LATER: only update when saving everything (implement save button)

    // 2. autocomplete options:
  }

  return (
    <div className="meal-component">
      <div className="meal-title">{title}</div>
      <div className="food-item-list">
        {mealItems.map((foodName, index) => (
          <FoodItem
            key={index}
            index={index}
            foodName={foodName}
            clearItem={clearItem}
            handleInputChange={handleInputChange}
          />
        ))}
        {/* <FoodItem foodName={""} /> */}
        <SelectFoodItem
          foodItemList={foodItemList}
          updatedFoodItemList={setFoodItems}
          mealItems={mealItems}
          setmealItems={setmealItems}
        />
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

function SelectFoodItem({
  foodItemList,
  updatedFoodItemList,
  mealItems,
  setmealItems,
}) {
  const [currentStr, setCurrentStr] = useState("");

  const handleOnSearch = (string, results) => {
    console.log(string, results);
    setCurrentStr(string);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    setmealItems([...mealItems, item.name]);
    console.log(item);
  };

  const updateList = () => {
    setmealItems([...mealItems, currentStr]);
    if (!foodItemList.includes(currentStr)) {
      updatedFoodItemList([...foodItemList, currentStr]);
      console.log("new food item added");
    } else {
      console.log("food item already exists");
    }
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  const formatResult = (item) => {
    console.log(item);
    return (
      <div className="result-wrapper">
        <span className="result-span">id: {item.id}</span>
        <span className="result-span">name: {item.name}</span>
      </div>
    );
  };

  var items = foodItemList.map((food, i) => ({ id: i, name: food }));
  // console.log(items)
  return (
    <div className="add-items">
      <ReactSearchAutocomplete
        items={items}
        // inputSearchString={"Pizza"}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        onClear={handleOnClear}
        styling={{
          zIndex: 4,
          borderRadius: "",
          height: "10%",
          padding: 0,
          margin: 0,
        }} // To display it on top of the search box below
        className="food-item"
        autoFocus
      />
      {currentStr && (
        <button className="plus-button" onClick={updateList}>
          {" "}
          +{" "}
        </button>
      )}
    </div>
  );
}
