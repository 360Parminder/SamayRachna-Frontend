import React, { useContext } from "react";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";
import { AuthContext } from "../Context/Auth";

const AuthStack = () => {
  const { authenticated } = useContext(AuthContext) || {};

  return authenticated ? <AppNavigation /> : <AuthNavigation />;
};

export default AuthStack;
