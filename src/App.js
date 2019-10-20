import React, { useState, useEffect } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import GamePage from "./components/GamePage";
import SignInPage from "./components/SignInPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("fbLogin");
    if (currentUser !== null) {
      setCurrentUser(JSON.parse(currentUser));
    }
  }, []);

  const responseFacebook = response => {
    console.log("response", response);
    try {
      if (response) {
        localStorage.setItem("fbLogin", JSON.stringify(response));
        setCurrentUser(JSON.stringify(response));
      }
    } catch (error) {
      console.log("errorrrrrrr", error);
    }
  };

  const onSignOut = () => {
    localStorage.removeItem("fbLogin");
    setCurrentUser(null);
  };

  const renderAppropriateScreen = () => {
    if (currentUser !== null) {
      return <GamePage onSignOut={onSignOut} currentUser={currentUser} />;
    }
    return <SignInPage responseFacebook={responseFacebook} />;
  };

  console.log("currentUser", currentUser);

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container d-flex flex-column justify-content-center">
        {renderAppropriateScreen()}
      </div>
    </div>
  );
}
