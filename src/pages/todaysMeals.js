import { useState, useEffect, useContext } from 'react';
import { AuthContextMain } from "../App";
import '../tableView.css';
import '../MealView.css';
import Modal from '../Modal.js';
import breakfast_img from '../data/mealView/Breakfast.webp';
import lunch_img from '../data/mealView/Lunch.webp';
import dinner_img from '../data/mealView/Dinner.webp';
import weeklyMenu, {tabular2DictMenu} from "../WeeklyMenu";
import { useNavigate } from 'react-router-dom';
import { useCheckLogin, LoginModal } from "../loginComponent";
import AuthButton from "../AuthButton";
import useUserMenuAPI from "../ApiCalls";
import getBaseUrl from '../utils.js';


const MealView = () => {
  const { isLoggedIn, currentPage, setCurrentPage } = useContext(AuthContextMain);

  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loginModalOpen, setloginModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(weeklyMenu);
  const {GetUserMenu} = useUserMenuAPI();
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  console.log(`Currently on ${currentPage}`)
  
  const base_url = getBaseUrl();
  setCurrentPage(base_url, '/todays-meals')
  useCheckLogin();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[currentDate.getDay()];

  const background_image = {
    Breakfast: breakfast_img,
    Lunch: lunch_img,
    Dinner: dinner_img,
  }
  const navigate = useNavigate();

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setShowModal(false);
    }
  };

  // Effect to add and remove the event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    console.log("Attempting to get user menu");
    GetUserMenu().then(data => {
      if (data !== null) {
        setCurrentMenu(tabular2DictMenu(data));
        console.log(`Updating menu ${data}`)
      }
  }).catch(error => {
      console.error('Failed to fetch user menu:', error);
  });

    if (! isLoggedIn) {
      setCurrentMenu(weeklyMenu);
    }

      }, [isLoggedIn]);


  return (
    <div className="meal-view">
      <div className="header">
        <h1>Good Morning, Unknown</h1>
        <h1>{formattedDate}</h1>
      </div>
      <div className="meal-tabs">
        {Object.keys(currentMenu[dayName]).map((meal) => (
          <div key={meal}
            className="meal-tab" 
            onClick={() => handleMealClick(meal)}
          >
            <div 
              className="image-holder"
              style={{
                backgroundImage: `url(${background_image[meal]})`
              }}
            ></div>
            <div className="meal-name">{meal.toUpperCase()}</div>
            <div className="food-items">{currentMenu[dayName][meal].join(', ')}</div>
          </div>
        ))}
      </div>
      {showModal && <Modal mealtime={selectedMeal} meals={currentMenu[dayName]}  onClose={() => setShowModal(false)} imgPaths={background_image}/>}
      <div className='tr-button-container'>
        <div>
          <AuthButton
          setModalIsOpen = {setloginModal}
          />
        </div>
        <button className="edit-menu-btn" onClick={()=>navigate('/menu-table-view')} > Edit Menu </button>
      </div>
      <LoginModal
        modalIsOpen={loginModalOpen}
        setModalOpen={setloginModal}
      >
    </LoginModal>
    </div>
  );
};

export default MealView;
