import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { createContext } from 'react';
import MenuBoard from "./menuBoard";


const supabase = createClient(
  "https://simggheqbtucnadaqtsh.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpbWdnaGVxYnR1Y25hZGFxdHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwMzczMTQsImV4cCI6MjAyODYxMzMxNH0.hNu8JoYlIXR1frZY8KJwFmoaETL_opFgKqs6TvVvtLE"
);

export const AuthContext = createContext(null);

function Login() {

  const [session, setSession] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsLoggedIn(true)
      // console.log('found existing session')
      // console.log(session)
      // console.log(session.user.email)
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsLoggedIn(true)
      // console.log('event listener found a new session')
      // console.log(session)
      // console.log(session.user.email)
    });

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth 
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }} 
      providers={["google"]}
      />)
  }
  else {
    return (
    <>
    <AuthContext.Provider value={{session, setSession, supabase, isLoggedIn, setIsLoggedIn}}>
      {/* <div>{session.user.email.split('@')[0]} you are logged in!</div>
        <button className="go-to-menu" onClick={() => navigate('/menu')} >
          Go to Menu
        </button> */}
        <MenuBoard />
    </AuthContext.Provider>
    </>
  )
  };

}

export default Login;
