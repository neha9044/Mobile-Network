import React, { useState } from "react";
import HomeScreen from "../screens/Landingpage";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EnterCodeScreen from "../screens/EnterCodeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import CreatePasswordScreen from "../screens/CreatePasswordScreen";

type Route =
  | "landing"
  | "login"
  | "register"
  | "enter-code"
  | "forgot-password"
  | "create-password";

export default function App() {
  // App starts from landing page
  const [route, setRoute] = useState<Route>("landing");

  switch (route) {
    case "landing":
      return (
        <HomeScreen
          onLogin={() => setRoute("login")}
          onSignUp={() => setRoute("register")}
        />
      );

    case "register":
      return (
        <RegisterScreen
          // Flow: register -> enter code
          onEnterCode={() => setRoute("enter-code")}
          onBack={() => setRoute("landing")}
        />
      );

    case "enter-code":
      return (
        <EnterCodeScreen
          // Flow: enter code -> login
          onSuccess={() => setRoute("login")}
          onBack={() => setRoute("register")}
        />
      );

    case "login":
      return (
        <LoginScreen
          // Flow: login button triggers no further screen
          onLoginAction={() => console.log("Logging in...")}
          onForgotPassword={() => setRoute("forgot-password")}
          onBack={() => setRoute("landing")}
        />
      );

    case "forgot-password":
      return (
        <ForgotPasswordScreen
          // Flow: forgot password -> create password
          onSent={() => setRoute("create-password")}
          onBack={() => setRoute("login")}
        />
      );

    case "create-password":
      return (
        <CreatePasswordScreen
          // Flow: create password -> login
          onComplete={() => setRoute("login")}
        />
      );

    default:
      return null;
  }
}