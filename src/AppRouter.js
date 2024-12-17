import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header.js";

import Footer from "./components/Footer/Footer.js";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp.js";
import LoginAdmin from "./components/LoginAdmin/LoginAdmin.js";
import ContactUs from "./pages/ContactUs.js";
import AboutUsPage from "./pages/AboutUs.js";
import HomeDesign from "./pages/HomeDesign.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import SurveyForm from "./components/UserNewSurveys/UserNewSurveys.js";
import ServeysList from "./components/surveylist/ServeysList.js";
import OneSurvey from "./components/surveylist/OneSurvey.jsx";
import TwoSurvey from "./components/surveylist/Sumbitsurvey.jsx";
import SubmitSurvey from "./components/surveylist/Sumbitsurvey.jsx";
import Objectives from "./pages/Objectives.js";
import Features from "./pages/Features.js";
import StudentsRecommendations from "./pages/StudentRecommendations.js";

import TeachersRecommendations from "./pages/Teachers_Recommendations.js";

const AppRouter = () => {
  const location = useLocation();

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/Dashboard") || location.pathname.startsWith("/admin");

  return (
    <>
      {/* Render header only if not on admin route */}
      {!isAdminRoute && <Header />}

      <Routes>
        <Route path="/" exact element={<HomeDesign />} />
        <Route path="/admin/login" exact element={<LoginAdmin />} />
        <Route path="/home" exact element={<HomeDesign />} />
        <Route path="/contactUs" exact element={<ContactUs />} />
        <Route path="/aboutus" exact element={<AboutUsPage />} />
        {/* <Route path="/NewUserSurveys" exact element={<SurveyForm />} /> */}
        <Route path="/signup" exact element={<LoginSignUp />} />
        <Route path="/st_recommendations" exact element={<StudentsRecommendations />} />
        <Route path="/Tch_recommendations" exact element={<TeachersRecommendations />} />
        
        <Route path="/Features" exact element={<Features />} />
        
        <Route path="/dashboard" exact element={<Dashboard />} />
        {/* <Route path="/surveylist" exact element={<ServeysList />} /> */}
        <Route path="/Objectives" exact element={<Objectives />} />
        <Route path="/onesurvey/:id" exact element={<OneSurvey />} />
        <Route path="/submitsurvey/:id" exact element={<SubmitSurvey />} />
        
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default AppRouter;
