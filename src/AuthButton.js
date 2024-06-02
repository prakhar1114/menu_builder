import StoreAuth from "./AuthStore";
import { useStoreState } from "pullstate";
import { useEffect, useState } from "react";


function AuthButton({ isLoggedIn, handleLogin, handleLogout }) {

// const [isLoggedIn, setIsLoggedIn] = useState(false);

// useEffect(() => {

//     const { login_status } = useStoreState(StoreAuth, (s) => ({
//         login_status: s.isLoggedIn,
//         }));

//     setIsLoggedIn(login_status);

// }, [isLoggedIn]);


  return (
    <button
      onClick={isLoggedIn ? handleLogout : handleLogin}
      style={buttonStyle}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
}

// Inline CSS for the button
const buttonStyle = {
  position: "fixed",
  right: "20px",
  top: "20px",
  padding: "10px 20px",
  background: "blue",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "2rem",
  margin: "0 10px",
};

export default AuthButton;
