import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';


const supabase = createClient(
);

function Login() {

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log('found existing session')
      // console.log(session)
      console.log(session.user.email)
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log('event listener found a new session')
      // console.log(session)
      console.log(session.user.email)
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
    <div>Logged in!</div>
  )
  };

  // const navigate = useNavigate();

  // supabase.auth.onAuthStateChange(async (event) => {
  //   if (event === "SIGNED_IN") {
  //     navigate("/success")
  //   } else {
  //     navigate("/")
  //   }
  // })

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <Auth 
  //         supabaseClient={supabase}
  //         appearance={{theme: ThemeSupa}}
  //         theme="dark"
  //         providers={["google"]}
  //       />
  //     </header>
  //   </div>
  // )
}

export default Login;
