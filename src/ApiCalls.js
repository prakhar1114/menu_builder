import { useContext } from "react";
import { AuthContextMain } from "./App";


function useUserMenuAPI() {
    const { supabase, session } = useContext(AuthContextMain);

    const GetUserMenu= async() => {
        if (session?.user)  {
            console.log(`Using userid ${session.user.id}`);
    
            const {data: weeks_menu, error} = await supabase
                .from('weeks_menu')
                .select("id, tabular_menu")
                .eq("user_id", session.user.id)
                .order('id', { ascending: false });
    
            if (weeks_menu.length > 0) {
                console.log("Latest Row");
                console.log(weeks_menu[0]);
                return weeks_menu[0].tabular_menu
            } else {
                console.log("No data found, use default menu");
                return null
            }
        } else {
            console.log("Not logged In");
            return null
        }
    }

    const InsertUserMenu = async(tabular_menu) => {
        if (session?.user)  {
            console.log(`Using userid ${session.user.id}`);
    
            const {data: weeks_menu, error} = await supabase
                .from('weeks_menu')
                .insert([
                    {user_id: session.user.id, tabular_menu: tabular_menu}
                ]);
            return {weeks_menu, error};
        } else {
            const error = 'No session user found'; 
            return {error};
        }

    }


    return {GetUserMenu, InsertUserMenu};
}

export default useUserMenuAPI;

