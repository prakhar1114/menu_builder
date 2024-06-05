import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import StoreAuth from "./AuthStore";
import React, { useState, useEffect, useContext } from "react";
import { AuthContextMain } from "./App";

function LoginElement() {
  const { session, setSession, supabase, isLoggedIn, setIsLoggedIn, currentPage, setCurrentPage } =
    useContext(AuthContextMain);

  const onLogout = () => {
    supabase.auth.signOut();
    setIsLoggedIn(false);
    setSession(null);
  };
  console.log(`Currently on ${currentPage}`)

  useEffect(() => {
    console.log("Login btn container");
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("Updating login state, place 1");
        console.log(session);
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
        console.log("Updating login state, place 2");
        console.log(session);
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
        redirectTo={currentPage}
      />
      // </div>
    );
  } else {
    return (
      // <div className="login">
      <div>
        <h1>Logged in as {session.user.email}</h1>
        <button className="done-btn" onClick={onLogout}>
          Sign Out
        </button>
      </div>
    );
  }
}



function useCheckLogin() {
  const { session, setSession, supabase, isLoggedIn, setIsLoggedIn, currentPage, setCurrentPage } =
  useContext(AuthContextMain);

  // useEffect(() => {
  //   console.log("Login btn container");
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     console.log(`inside session ${session}`)
  //     if (session) {
  //       console.log("Updating login state, place 1");
  //       console.log(session);
  //       setSession(session);
  //       setIsLoggedIn(true);

  //       StoreAuth.update((store) => {
  //         store.session = session;
  //         store.supabase = supabase;
  //         store.isLoggedIn = true;
  //       });
  //     }
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     if (session) {
  //       console.log("Updating login state, place 2");
  //       console.log(session);
  //       setSession(session);
  //       setIsLoggedIn(true);

  //       StoreAuth.update((store) => {
  //         store.session = session;
  //         store.supabase = supabase;
  //         store.isLoggedIn = true;
  //       });
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { sessioncheck } }) => {
      setSession(sessioncheck);
      if (sessioncheck) {
        setIsLoggedIn(true);
        console.log('found existing session')
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, sessioncheck) => {
      setSession(sessioncheck);
      if (sessioncheck) {
        setIsLoggedIn(true);
        console.log('event listener found a new session')
      }
    });
    return () => subscription.unsubscribe();
  }, []);

}

export default LoginElement;
export  { useCheckLogin };