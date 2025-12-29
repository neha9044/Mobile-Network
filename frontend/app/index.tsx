import React, { useEffect, useState } from "react";
import HomeScreen from "../screens/Landingpage";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EnterCodeScreen from "../screens/EnterCodeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import CreatePasswordScreen from "../screens/CreatePasswordScreen";
import { getToken } from "../utils/auth";

import ChatScreen from "@/screens/ChatScreen";
type Route =
  | "landing"
  | "login"
  | "register"
  | "enter-code"
  | "forgot-password"
  | "create-password"
  | "chat";

export default function App() {
  // App starts from landing page
  const [route, setRoute] = useState<Route>("landing");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [passwordResetEmail, setPasswordResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [otpMode, setOtpMode] = useState<"register" | "forgot-password">(
    "register"
  );

  const [isBooting, setIsBooting] = useState(true); //auto save login state

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const token = await getToken();

        if (token) {
          // user already logged in
          setRoute("landing"); // later → dashboard/home
        }
      } finally {
        setIsBooting(false);
      }
    }; //auto login

    bootstrapAuth();
  }, []);

  if (isBooting) {
    return null; // or a splash screen
  }

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
          onEnterCode={(email: string) => {
            setRegisteredEmail(email);
            setOtpMode("register");
            setRoute("enter-code");
          }}
          onBack={() => setRoute("landing")}
        />
      );

    case "enter-code":
      return (
        <EnterCodeScreen
          email={otpMode === "register" ? registeredEmail : passwordResetEmail}
          mode={otpMode}
          onSuccess={(otp) => {
            if (otpMode === "register") {
              setRoute("login");
            } else {
              setResetOtp(otp!);
              setRoute("create-password");
            }
          }}
          onBack={() =>
            setRoute(otpMode === "register" ? "register" : "forgot-password")
          }
        />
      );

   
       case "login":
  return (
    <LoginScreen
      onLoginAction={() => {
        console.log("Logging in...");
        setRoute("chat"); 
      }}
      onForgotPassword={() => setRoute("forgot-password")}
      onBack={() => setRoute("landing")}
    />
  );

    case "forgot-password":
      return (
        <ForgotPasswordScreen
          onSent={(email) => {
            setPasswordResetEmail(email);
            setOtpMode("forgot-password");
            setRoute("enter-code");
          }}
          onBack={() => setRoute("login")}
        />
      );

    case "create-password":
      return (
        <CreatePasswordScreen
          email={passwordResetEmail}
          otp={resetOtp}
          onComplete={() => setRoute("login")}
        />
      );
    
      case "chat":
  return(
<ChatScreen onExit={() => setRoute("landing")} />
  ) ;


    default:
      return null;
  }
}


