import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "scenes/navbar";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import LoginPage from "scenes/loginPage";
import SignUpPage from "scenes/signUpPage";
import AboutPage from "scenes/aboutPage";
import ContactUsPage from "scenes/contacUsPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      {/*Routes used for navigation from one page to other page*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/user/:user:id" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
