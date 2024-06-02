import "./App.css";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/login";
import { useEffect, useState, createContext } from "react";
import Success from "./pages/success";
import { MenuBoardOffline } from "./pages/menuBoard";
import TodaysMeals from "./pages/todaysMeals";
import TableView from "./pages/tableView";
import { createClient } from "@supabase/supabase-js";
import StoreAuth from "./AuthStore";


const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const AuthContextMain = createContext(null);

function App() {
  const [session, setSession] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentPage = "/menu-table-view"
  console.log(`main page ${isLoggedIn} ${session}`)
  // console.log(session)
  // console.log(isLoggedIn)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("Updating login state, place 3")
        console.log(session)
        setSession(session);
        setIsLoggedIn(true);

        StoreAuth.update((store) => {
          store.session = session;
          store.supabase = supabase;
          store.isLoggedIn = true;
        });
      }

    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {

      if (session) {
        console.log("Updating login state, place 4")
        console.log(session)
        setSession(session);
        setIsLoggedIn(true);
  
        StoreAuth.update((store) => {
          store.session = session;
          store.supabase = supabase;
          store.isLoggedIn = true;
        });
      }

    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <AuthContextMain.Provider value={{ session, setSession, supabase, isLoggedIn, setIsLoggedIn }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/success" element={<Success />}/>
            <Route path="/menu" element={<MenuBoardOffline />}/>
            <Route path="/menu-table-view" element={<TableView />}/>
            <Route path="/todays-meals" element={<TodaysMeals />}/>
            {/* <Route path="*" element={<Navigate to={currentPage}/>}/> */}
          </Routes>
        </Router>
    </AuthContextMain.Provider>
  </div>

  );
}

export default App;