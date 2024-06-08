import React, {useContext} from "react";
import { AuthContextMain } from "./App";


function AuthButton({setModalIsOpen }) {

  const {isLoggedIn} = useContext(AuthContextMain);

  return (
    <button className='auth-btn'
      onClick={()=>setModalIsOpen(true)}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
}

export default AuthButton;
