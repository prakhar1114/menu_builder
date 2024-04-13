import React, { useState } from "react";
import foodItems from "./FoodItems";
import weeklyMenu from "./WeeklyMenu";
import "./App.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function MenuBoard() {
  const [fullMenu, setFullMenu] = useState(weeklyMenu);
  const [foodItemList, setFoodItems] = useState(foodItems);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const meal_types = ["Breakfast", "Lunch", "Dinner"];

  const updateMenu = (fullMenu, setFullMenu, day, meal_type, items) => {
    let updatedFullMenu = { ...fullMenu };
    updatedFullMenu[day][meal_type] = items;
    setFullMenu(updatedFullMenu);
  };

  return (
    <>
      {days.map((day) => (
        <div className="day-full-menu">
          <div className="day-name">{day}</div>
          <div className="all-meals">
            {meal_types.map((meal_type) => (
              <span className="single-meal">
                {/* {day}, {meal_type} */}
                <SingleMeal
                  title={meal_type}
                  mealItems={fullMenu[day][meal_type]}
                  setmealItems={(items) =>
                    updateMenu(fullMenu, setFullMenu, day, meal_type, items)
                  }
                  foodItemList={foodItemList}
                  setFoodItems={setFoodItems}
                />
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* <SingleMeal
        title={meal_type}
        mealItems={fullMenu[day][meal_type]}
        setmealItems={(items) =>
          updateMenu(fullMenu, setFullMenu, day, meal_type, items)
        }
        foodItemList={foodItemList}
        setFoodItems={setFoodItems}
      /> */}
    </>
  );
}

function SingleMeal({
  title,
  mealItems,
  setmealItems,
  foodItemList,
  setFoodItems,
}) {
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

export default MenuBoard;

function SelectFoodItem({
  foodItemList,
  updatedFoodItemList,
  mealItems,
  setmealItems,
}) {
  const [currentStr, setCurrentStr] = useState("");
  const [autocompleteKey, setAutocompleteKey] = useState(0);

  const handleOnSearch = (string, results) => {
    console.log(string, results);
    setCurrentStr(string);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    if (!mealItems.includes(item.name)) {
      setmealItems([...mealItems, item.name]);
      console.log(item);
    } else {
      console.log(item.name + " exists");
    }
    setCurrentStr("");
    setAutocompleteKey((prevKey) => prevKey + 1);
    handleOnClear();
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
        key={autocompleteKey}
        items={items}
        // inputSearchString={currentStr}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        onClear={handleOnClear}
        styling={{
          // zIndex: 4,
          borderRadius: "",
          height: "10%",
          padding: 0,
          margin: "1%",
          border: "0.5px solid black",
          width: "250px",
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
