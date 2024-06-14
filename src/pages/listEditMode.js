// import { useState } from "react";
import "../ListMode.css"
import { tabularData } from "../WeeklyMenu";
import { useState, useEffect, useContext } from "react";
import { getWeekMapping } from "../utils";


// const ListMode = () => {
//     return (
//         <h1>
//             Hi, I will become list mode.
//         </h1>
//     )
// }


// export default ListMode;

import React from 'react';
import { useInView } from 'react-intersection-observer';

const TextHighlighter = ({ text }) => {
  const { ref, inView } = useInView({
    threshold: 1,  // Adjust this threshold based on when you want the text to highlight
  });

  return (
    <div ref={ref} style={{ color: inView ? 'red' : 'black' }}>
      {text}
    </div>
  );
};

const ListMode = () => {
  const texts = ["Hello", "World", "This", "Is", "A", "Test","A","B","C","D","E","F"];
  return (
    <div style={{"fontSize": "8rem"}}>
      {texts.map((text, index) => (
        <TextHighlighter key={index} text={text} />
      ))}
    </div>
  );
};

// export default ListMode;
export default MealCard;

// function MealCard({mealTitle, mealContents}) {
  function MealCard() {
    const [userMenu, setUserMenu] = useState(tabularData);
    const mealList = ["Breakfast", "Lunch", "Dinner"];
    const weekdayMapping = getWeekMapping();

    return (
      <div className="week-food-data">
        {userMenu.map((row, index) => {
          return (
            <div className = 'daymealCard'>
              <div className = 'day'>
                {weekdayMapping[row.Day]} , {row.Day}
              </div>

              <div className = "all-meals-container">
                {mealList.map((meal)=> {
                    return (
                    <div className="meals">
                      <div className='mealTitle'>
                        {meal}
                      </div>
                      <div className='mealContents'>
                        {row[meal]}
                      </div>
                    </div>
                    )
                  })}
              </div>
            </div>
            )
        })}
      </div>
    )
}