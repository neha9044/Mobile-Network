import React, { useState } from "react";
import HomeScreen from "../screens/Landingpage";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EnterCodeScreen from "../screens/EnterCodeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import CreatePasswordScreen from "../screens/CreatePasswordScreen";
import InternetCVScreen from "../screens/InternetCVScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

type Route =
  | "landing"
  | "login"
  | "register"
  | "enter-code"
  | "forgot-password"
  | "create-password"
  | "internet-cv"
  | "edit-profile"; // Added route

type EditSection = "basic" | "experience" | "education" | "links";

import { INITIAL_PROFILE_DATA } from "../constants/profileData";

export default function App() {
  // App starts from landing page
  const [route, setRoute] = useState<Route>("internet-cv");
  const [editSection, setEditSection] = useState<EditSection>("basic");
  const [profileData, setProfileData] = useState(INITIAL_PROFILE_DATA);

  const handleSaveProfile = (updatedData: any) => {
      // Merge updated data. For simplicity, assume updatedData matches structure or section key.
      // If EditProfile returns partial object like { profile: { ... } } or { experience: [...] }
      setProfileData(prev => ({ ...prev, ...updatedData }));
      setRoute("internet-cv");
  };

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
          onLoginAction={() => setRoute("internet-cv")}
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

    case "internet-cv":
      return (
        <InternetCVScreen 
          data={profileData}
          onEdit={(section: any) => {
             setEditSection(section);
             setRoute("edit-profile");
          }}
        />
      );

    case "edit-profile":
      return (
        <EditProfileScreen
          section={editSection}
          data={profileData}
          onBack={() => setRoute("internet-cv")}
          onSave={handleSaveProfile}
        />
      );

    default:
      return null;
  }
}