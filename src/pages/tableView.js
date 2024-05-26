import React, { useState, useEffect } from "react";
// import foodItems from "../FoodItems";
// import weeklyMenu from "../WeeklyMenu";
import { tabularData } from "../WeeklyMenu";
import "../tableView.css";


function TableView() {

  const [userMenu, setTabularData] = useState(tabularData);

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
        {userMenu.map((val) => {
              return (
                  <tr key={val.Day}>
                      <td>{val.Day}</td>
                      <td>{val.Breakfast}</td>
                      <td>{val.Lunch}</td>
                      <td>{val.Dinner}</td>
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

function singleMeal({row, mealTime}) {

}