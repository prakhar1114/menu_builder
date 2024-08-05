// import { useState } from "react";
import "../ListMode.css"
import { tabularData, remove_extra_commas } from "../WeeklyMenu";
import { useState, useEffect, useContext, useRef } from "react";
import { useInView } from 'react-intersection-observer';
import { getWeekMapping } from "../utils";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { fuse } from "../utils";
import { MdEdit, MdSave } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
// import { MdOutlineArrowDropDownCircle } from "react-icons/rx";
// import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { AuthContextMain } from "../App";
import getBaseUrl from "../utils";
import { useCheckLogin } from "../loginComponent";
import LoginElement from "../loginComponent";
import useUserMenuAPI from "../ApiCalls";


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
    const { isLoggedIn, currentPage, setCurrentPage } = useContext(AuthContextMain);
    const base_url = getBaseUrl();
    setCurrentPage(base_url, '/editable-list-mode')
    console.log(`Currently on ${currentPage}`)
    useCheckLogin();

    const mealList = ["Breakfast", "Lunch", "Dinner"];
    const [seachResults, setSearchResults] = useState([]);
    const [userMenu, setUserMenu] = useState(tabularData);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editWhichDay, setEditWhichDay] = useState('Monday');
    const [editWhichMeal, setEditWhichMeal] = useState('Breakfast');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [ddisOpen, setDDIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const {GetUserMenu, InsertUserMenu} = useUserMenuAPI();

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
    };

    const handleInput = (event) => {
      const textarea = event.target;
      textarea.style.height = "auto";  // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`;  // Set to scroll height
    };

    const appendFoodItem = (item) => {
      const updatedMenu = [...userMenu];
  
      const values = updatedMenu[selectedIndex][editWhichMeal].split(',');
      values[values.length - 1] = item + ',';
      const newValue = values.join(', ');
  
      updatedMenu[selectedIndex][editWhichMeal] = newValue;
      setUserMenu(updatedMenu);
      setSearchResults([]);
      inputRef.current.focus();
    }

    const saveToDB = async () => {
      const updated_menu = remove_extra_commas(userMenu);
      setUserMenu(updated_menu);
      if (isLoggedIn) {
        console.log("Trying to Save to DB");
        InsertUserMenu(updated_menu).then(response => {
          if (response.error) {
            console.log('Error: ', response.error)
          } else {
            console.log('Menu inserted successfully')
          }}).catch(
          error => console.error('Unexpected error:', error)
        )
        alert("Saved to your profile");
      } else {
        setShowLoginModal(true);
      }
    }

    useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setDDIsOpen(false);  // Close the dropdown if click is outside
          }
      };

      // Add when the dropdown is open and remove when it's closed
      if (ddisOpen) {
          document.addEventListener('mousedown', handleClickOutside);
          document.addEventListener('touchstart', handleClickOutside);
      } else {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('touchstart', handleClickOutside);
      }

      // Clean up
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('touchstart', handleClickOutside);
      };
    }, [ddisOpen]);

    useEffect(() => {
      console.log("Attempting to get user menu");
      GetUserMenu().then(data => {
        if (data !== null) {
            setUserMenu(data);
            console.log(`Updating menu ${data}`)
        }
        }).catch(error => {
            console.error('Failed to fetch user menu:', error);
        });
  
        if (! isLoggedIn) {
          setUserMenu(tabularData);
        }
  
        }, [isLoggedIn]);

    return (
      <div id="listPage">
        {/* <div className="top-bar"> */}
        <h2> Let's do meal planning!</h2>
        <div ref={dropdownRef}>
          <button className="fixed-dropdown" onClick={()=> setDDIsOpen(!ddisOpen)}><IoMdArrowDropdown  fontSize="400%" color="white"/></button>
          {ddisOpen && (
                  <ul className="dropdown-content">
                      <li onClick={() => setShowLoginModal(true)}>{isLoggedIn ? "Logout" : "Login"}</li>
                      {/* <li onClick={() => alert('Item 2 clicked')}>Item 2</li> */}
                  </ul>
              )}
        </div>
        <div className="week-food-data">
          {
          // userMenu.map((row, index) => {
            Object.keys(weekdayMapping).map((currentDay, index) => {
            const row = userMenu.find(row => row.Day.toLowerCase() === currentDay.toLowerCase());
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
                            setShowEditModal(true);
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
          {/* Edit Meal modal */}
          <Modal 
            open={showEditModal} 
            onClose={() => setShowEditModal(false)}
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
                onClick={() => setShowEditModal(false)}>
                <IoSendSharp fontSize="300%"/>
              </button>
            </div>
          </Modal>
          {/* Login Modal */}
          <Modal
            open={showLoginModal} 
            onClose={() => setShowLoginModal(false)}
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
          >
            <div style={{color:"black"}}>
              <LoginElement />
            </div>
          </Modal>

        </div>
        <button className="fixed-save" onClick={saveToDB}>Save <MdSave  fontSize="100%" color="white"/></button>
      </div>
    )
}