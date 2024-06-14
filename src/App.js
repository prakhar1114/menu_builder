import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import { useEffect, useState, createContext } from "react";
import Success from "./pages/success";
import { MenuBoardOffline } from "./pages/menuBoard";
import MealView from "./pages/todaysMeals";
import TableView from "./pages/tableView";
import { createClient } from "@supabase/supabase-js";
import StoreAuth from "./AuthStore";
import ListMode from "./pages/listEditMode";


const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const AuthContextMain = createContext(null);

function App() {
  const [session, setSession] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("http://localhost:3000/")
  const mobileView = window.innerWidth < 768 ;

  return (
    <div className="App">
      <AuthContextMain.Provider
        value={{ 
          session,
          setSession, 
          supabase,
          isLoggedIn, 
          setIsLoggedIn,
          currentPage, 
          setCurrentPage }}
      >
        <Router>
          <Routes>

            <Route path="/menu-table-view" element={<TableView />} />
            <Route path="/todays-meals" element={<MealView />} />
            <Route path="/editable-list-mode" element={<ListMode />}/>
            {mobileView ? (
              <Route path="/" element={<ListMode />}/>
            ) : (
              <Route path="/" element={<TableView />}/>
            )
            }

            {/* <Route path="/" element={<Login />}/>
            <Route path="/success" element={<Success />} />
            <Route path="/menu" element={<MenuBoardOffline />} /> */}
          </Routes>
        </Router>
      </AuthContextMain.Provider>
    </div>
  );
}

export default App;
