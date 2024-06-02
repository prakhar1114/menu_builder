import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import MenuBoard from "./menuBoard";
import "../App.css";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const AuthContext = createContext(null);

function Login() {
  const [session, setSession] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoggedIn(true);
      // console.log('found existing session')
      // console.log(session)
      // console.log(session.user.email)
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoggedIn(true);
      // console.log('event listener found a new session')
      // console.log(session)
      // console.log(session.user.email)
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className='login'>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
        />
      </div>
    );
  } else {
    return (
        <AuthContext.Provider value={{ session, setSession, supabase, isLoggedIn, setIsLoggedIn }}>
          <MenuBoard />
        </AuthContext.Provider>
    );
  }
}

export default Login;
