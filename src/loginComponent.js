import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import StoreAuth from "./AuthStore";
import React, { useState, useEffect, useContext } from "react";
import { AuthContextMain } from "./App";

function LoginElement() {

  const { session, setSession, supabase, isLoggedIn, setIsLoggedIn } = useContext(AuthContextMain);
  
  const onLogout= () => {
    supabase.auth.signOut();
      setIsLoggedIn(false);
      setSession(null);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("Updating login state, place 1")
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
        console.log("Updating login state, place 2")
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

  if (!session) {
    return (
      // <div className="login">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
        />
      // </div>
    );
  } else {
    return (
      // <div className="login">
      <div>
        <h1>Logged in as {session.user.email}</h1>
        <button 
          className='done-btn'
          onClick={onLogout}>
          Sign Out
        </button>
      </div>
    );
  }
}

export default LoginElement;
