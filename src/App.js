import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/login";
import Success from "./pages/success";
import { MenuBoardOffline } from "./pages/menuBoard";
import TableView from "./pages/tableView";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/success" element={<Success />}/>
            <Route path="/menu" element={<MenuBoardOffline />}/>
            <Route path="/menu-table-view" element={<TableView />}/>
          </Routes>
        </Router>
  </div>
  );
}

export default App;