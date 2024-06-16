// import { useState } from "react";
import "../ListMode.css"
import { tabularData } from "../WeeklyMenu";
import { useState, useEffect, useContext, useRef } from "react";
import { getWeekMapping } from "../utils";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { MdEdit } from "react-icons/md";
import { fuse } from "../utils";
import { IoSendSharp } from "react-icons/io5";


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
    const [showModal, setShowModal] = useState(false);
    const [editWhichDay, setEditWhichDay] = useState('Monday');
    const [editWhichMeal, setEditWhichMeal] = useState('Breakfast');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [seachResults, setSearchResults] = useState([])
    const mealList = ["Breakfast", "Lunch", "Dinner"];

    const weekdayMapping = getWeekMapping();

    const inputRef = useRef(null);
    const scrollToInput = () => {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleChange = (value) => {
      const updatedMenu = [...userMenu];
      updatedMenu[selectedIndex][editWhichMeal] = value;

      const items = value.split(',');
      const currentItem = items[items.length - 1].trim();

      const results = fuse.search(currentItem).map(entry => entry.item).slice(0, 5);;
      setSearchResults(results)

      setUserMenu(updatedMenu);
    }

    const handleInput = (event) => {
      const textarea = event.target;
      textarea.style.height = "auto";  // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`;  // Set to scroll height
    };

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
                        <button className="edit-this-meal-btn" 
                        onClick={()=> {
                          setShowModal(true);
                          setEditWhichDay(row.Day);
                          setEditWhichMeal(meal);
                          setSelectedIndex(index);
                          }}>
                          {row[meal]} <MdEdit color="gray" fontSize="80%"/>
                        </button>
                      </div>
                    </div>
                    )
                  })}
              </div>
            </div>
            )
        })}
        <Modal 
          open={showModal} 
          onClose={() => setShowModal(false)}
          // blockScroll={false}
          styles={{
            modal: {
              bottom: 'auto',
              top: 'auto',
              transform: 'translateY(-50%)',
              position: 'fixed',
              width: '100%', // You might adjust this as needed
              maxWidth: '100%', // Prevents modal from exceeding the screen width
              minHeight: '1%', // Adjust based on your content
              height: 'auto',
              left: 0,
              right: 0,
              margin: 'auto'
            },
            overlay: {
              height: '100vh', // Ensures the overlay covers full screen height
              overflowY: 'auto' // Allows scrolling if content is taller than the screen
            }
          }}
          // center
        >
          <div className='support-text'>Edit {editWhichMeal} plan for {editWhichDay}</div>
          <div className='edit-meal-container'>
            <textarea
              className="edit-meal-area"
              ref={inputRef}
              onFocus={scrollToInput}
              value={userMenu[selectedIndex][editWhichMeal]}
              onChange={(e) => handleChange(e.target.value)}
              onInput={handleInput}
            />
            <button 
              className="update-text-btn"
              onClick={() => setShowModal(false)}>
              <IoSendSharp fontSize="300%"/>
            </button>
          </div>
        </Modal>
      </div>
    )
}