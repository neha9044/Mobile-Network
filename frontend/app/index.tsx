import React, { useState } from "react";
import HomeScreen from "../screens/Landingpage";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EnterCodeScreen from "../screens/EnterCodeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import CreatePasswordScreen from "../screens/CreatePasswordScreen";
import ChatScreen from "@/screens/ChatScreen";
type Route =
  | "landing"
  | "login"
  | "register"
  | "enter-code"
  | "forgot-password"
  | "create-password";

export default function App() {
  // App starts from landing page
  return(<ChatScreen/>);
}