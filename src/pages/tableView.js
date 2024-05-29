import React, { useState, useEffect } from "react";
// import foodItems from "../FoodItems";
// import weeklyMenu from "../WeeklyMenu";
import { tabularData } from "../WeeklyMenu";
import "../tableView.css";


function TableView() {

  const [isFocused, setIsFocused] = useState(false);
  const [userMenu, setUserMenu] = useState(tabularData);

  const defaultMealState = tabularData.map(
    (val) => ({
      Day: val.Day,
      Breakfast: false,
      Lunch: false,
      Dinner: false,
    })
  );

  const [mealSelectedArray, setMealSelected] = useState(defaultMealState);

  const toggleMealSelected = (index, field, value) => {
    console.log("Toggling others off")

    const toggleOffEverything = [...defaultMealState];

    toggleOffEverything[index][field] = value;
    setMealSelected(toggleOffEverything);
  };

    // Function to handle changes in input fields
  const handleChange = (index, field, value) => {
    console.log("Now I am changed")
    const updatedMenu = [...userMenu];
    updatedMenu[index] = { ...updatedMenu[index], [field]: value };
    setUserMenu(updatedMenu);
  };

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
      <button className="save-btn">Save</button>
      <button className="add-btn">Add Next Item</button>
    </div>
</div>
  );
}
export default TableView;

function SingleMeal({
  row, mealTime, handleChange, index, isFocused, toggleMealSelected
}) {
  // const [isFocused, setIsFocused] = useState(false);

  if (!isFocused) {
    return (
      <input
        className="meal-input"
        type="text"
        value={row[mealTime]}
        // onChange={(e) => handleChange(index, mealTime, e.target.value)}
        onSelect={() => toggleMealSelected(index, mealTime, true)}
      />
    );
  } else {
    console.log("Now a text area");
    console.log(row[mealTime]);
    return (
      <textarea
      className="meal-input-focus"
      value={row[mealTime]}
      onChange={(e) => handleChange(index, mealTime, e.target.value)}
      onBlur={() => toggleMealSelected(index, mealTime, false)}
    />
    )
  }

}