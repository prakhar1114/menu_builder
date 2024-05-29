import React, { useState, useEffect } from "react";
// import foodItems from "../FoodItems";
// import weeklyMenu from "../WeeklyMenu";
import { tabularData } from "../WeeklyMenu";
import "../tableView.css";
import foodItems from "../FoodItems";
import Fuse from 'fuse.js';


function TableView() {

  const defaultMealState = tabularData.map(
    (val) => ({
      Day: val.Day,
      Breakfast: false,
      Lunch: false,
      Dinner: false,
    })
  );

  const [seachResults, setSearchResults] = useState([])
  const [userMenu, setUserMenu] = useState(tabularData);
  const [mealSelectedArray, setMealSelected] = useState(defaultMealState);
  const [currentRowIndex, setCurrentRowIndex] = useState(-1)
  const [mealTime, setMealTime] = useState("")

  const options = {
    includeScore: true, // Include the score in the result
    findAllMatches: true, // When true, will continue searching even after a perfect match is found.
    threshold: 0.5 // Threshold for matching, with 0 being a perfect match and 1 matching nothing.
  };
  const fuse = new Fuse(foodItems, options);


  const toggleMealSelected = (index, field, value) => {
    // console.log("Toggling others off")

    const toggleOffEverything = [...defaultMealState];

    setCurrentRowIndex(index);
    setMealTime(field);
    
    toggleOffEverything[index][field] = value;
    setMealSelected(toggleOffEverything);
    setSearchResults([])
  };

    // Function to handle changes in input fields
  const handleChange = (index, field, value) => {
    // console.log("Now I am changed")
    const updatedMenu = [...userMenu];
    updatedMenu[index] = { ...updatedMenu[index], [field]: value };

    const items = value.split(',');
    const currentItem = items[items.length - 1].trim();

    const results = fuse.search(currentItem).map(entry => entry.item).slice(0, 5);;
    setSearchResults(results)

    console.log(`Searching with ${currentItem}`)
    console.log(results);

    setUserMenu(updatedMenu);
  };

  const appendFoodItem = (item) => {
    console.log("I am clicked")
    const updatedMenu = [...userMenu];

    const values = updatedMenu[currentRowIndex][mealTime].split(',');
    values[values.length - 1] = item + ',';
    const newValue = values.join(',');

    updatedMenu[currentRowIndex][mealTime] = newValue;
    setUserMenu(updatedMenu);
    setSearchResults([]);
    toggleMealSelected(currentRowIndex, mealTime, true)
  }

  const saveToDB = () => {
    toggleMealSelected(currentRowIndex, mealTime, false)
    console.log("Trying to Save to DB")
  }

  const mealList = ["Breakfast", "Lunch", "Dinner"];

  return (
    <div className="Table">
    <table>
      <thead>
        <tr>
            <th>Day</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
        </tr>
      </thead>
      <tbody>
        {userMenu.map((val, index) => {
              return (
                  <tr key={val.Day}>
                      <td>{val.Day}</td>
                      {
                        mealList.map((meal) => {
                              return (
                                  <td>
                                    <SingleMeal 
                                      row={val} 
                                      mealTime={meal}
                                      handleChange={handleChange}
                                      index={index}
                                      isFocused={mealSelectedArray[index][meal]}
                                      toggleMealSelected={toggleMealSelected}
                                    />
                                  </td>
                              )})
                      }
                  </tr>
              )
          })}
      </tbody>
    </table>
    <div className="button-container">
      <button 
        className="save-btn"
        onClick={saveToDB}
      >
        Save
      </button>
      <button className="add-btn">Add Next Item</button>
    </div>
    <div className="search-container">
      {seachResults.length > 0 && (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {seachResults.map((item, index) => (
                <li 
                className="search-items" 
                key={index} 
                style={{ cursor: "pointer" }}
                onClick={()=>appendFoodItem(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

    </div>
</div>
  );
}
export default TableView;

function SingleMeal({
  row, mealTime, handleChange, index, isFocused, toggleMealSelected
}) {
  if (!isFocused) {
    return (
      <input
        className="meal-input"
        type="text"
        value={row[mealTime]}
        readOnly
        // onChange={(e) => handleChange(index, mealTime, e.target.value)}
        onSelect={() => toggleMealSelected(index, mealTime, true)}
      />
    );
  } else {
    // console.log("Now a text area");
    // console.log(row[mealTime]);
    return (
      <>
        <textarea
          className="meal-input-focus"
          value={row[mealTime]}
          onChange={(e) => handleChange(index, mealTime, e.target.value)}
          // onBlur={() => toggleMealSelected(index, mealTime, false)}
        />
      </>
    )
  }

}