import StoreAuth from "./AuthStore";
import { useStoreState } from "pullstate";

import React, { useState, useEffect, useContext } from "react";
import { AuthContextMain } from "./App";


function AuthButton({handleLogin, handleLogout }) {

    const { session, setSession, supabase, isLoggedIn, setIsLoggedIn } = useContext(AuthContextMain);

  return (
    <button className='auth-btn'
      onClick={isLoggedIn ? handleLogout : handleLogin}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
}

export default AuthButton;
