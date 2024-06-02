import { Store } from "pullstate";

const StoreAuth = new Store({
  session: null,
  supabase: null,
  isLoggedIn: false,
});

export default StoreAuth;