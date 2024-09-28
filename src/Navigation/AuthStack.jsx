import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";
import { useState } from "react";

const AuthStack = () => {
  const [auth, setAuth] = useState(true);

  return (
    auth ? <AppNavigation /> : <AuthNavigation />
  );
};

export default AuthStack;
