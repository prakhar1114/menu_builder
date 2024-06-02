import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { ThemeMinimal } from "@supabase/auth-ui-shared";
import StoreAuth from "./AuthStore";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function LoginElement() {
  const [session, setSession] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoggedIn(true);
      // console.log('found existing session')
      // console.log(session)
      // console.log(session.user.email)

      StoreAuth.update((store) => {
        store.session = session;
        store.supabase = supabase;
        store.isLoggedIn = true;
        // store.email = session.user.email;
      });

    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoggedIn(true);
      // console.log('event listener found a new session')
      // console.log(session)
      // console.log(session.user.email)

      StoreAuth.update((store) => {
        store.session = session;
        store.supabase = supabase;
        store.isLoggedIn = true;
        // store.email = session.user.email;
      });
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
          onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    );
  }
}

export default LoginElement;
