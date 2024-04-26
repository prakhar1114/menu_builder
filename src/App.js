import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/login";
import Success from "./pages/success";
import { MenuBoardOffline } from "./pages/menuBoard";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <Router>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/success" element={<Success />}/>
            <Route path="/menu" element={<MenuBoardOffline />}/>
          </Routes>
        </Router>

    {/* </header> */}
  </div>
  );
}


export default App;