import React, { useState, useEffect, useContext } from "react";
import { AuthContextMain } from "../App";
// import foodItems from "../FoodItems";
// import weeklyMenu from "../WeeklyMenu";
import { tabularData } from "../WeeklyMenu";
import "../tableView.css";
import foodItems from "../FoodItems";
import Fuse from 'fuse.js';
import AuthButton from "../AuthButton";
import { useCheckLogin, LoginModal } from "../loginComponent";
import { useNavigate } from 'react-router-dom';


function TableView() {

  const { isLoggedIn, currentPage, setCurrentPage } = useContext(AuthContextMain);

  setCurrentPage('http://localhost:3000/menu-table-view')
  console.log(`Currently on ${currentPage}`)
  useCheckLogin();

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
  const [currentRowIndex, setCurrentRowIndex] = useState(0)
  const [mealTime, setMealTime] = useState("Breakfast")
  const [modalIsOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

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

  // clicking from list
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

  // Add Next Item
  const appendComma = () => {
    console.log('Lets try to append comma')
  }

  // save button
  const saveToDB = () => {
    toggleMealSelected(currentRowIndex, mealTime, false);
    // TODO clear extra commas
    // TODO modal to login to save, attempt to fetch existing credentials

    if (isLoggedIn) {
      // TODO save to DB
      console.log("Trying to Save to DB");

    } else {
      // TODO show modal to login
      setIsOpen(true);
    
    }
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
      <button 
        className="add-btn"
        onClick={appendComma}
      >
        Add Next Item
      </button>
      <button 
      className="done-btn"
      onClick={()=> {
        saveToDB();
        navigate('/todays-meals');

      }}
      >
        Save & Done
      </button>
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
    <LoginModal
        modalIsOpen={modalIsOpen}
        setModalOpen={setIsOpen}
      >
    </LoginModal>
    <div className="tr-button-container">
      <AuthButton
        setModalIsOpen = {setIsOpen}
      />
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
