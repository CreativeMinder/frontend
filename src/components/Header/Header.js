import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark px-0 py-3 text-dark" style={{ backgroundColor: "#fff" }}>
        <div className="container-xl">
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/COMSATS_new_logo.jpg" className="navbar-brand rounded-circle" style={{ width: "50px", borderRadius: "50%" }}/>
            <p style={{ marginTop: "5px", textAlign: "center" }}>COMSATS University <br/> Islamabad Attock campus</p>
          </div>


{/* <a className="navbar-brand" href="#">
            Logo here
          </a> */}
          {/* Navbar toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Collapse */}
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {/* Nav */}
            <div className="navbar-nav mx-lg-auto">
              <a
                className="nav-item nav-link active"
                href="#"
                aria-current="page"
              >
                <Link 
                
                to="/home"  className={`nav-link nav-item ${activeLink === "/home" ? "active-link" : ""}`}                onClick={() => handleLinkClick("/home")}
>
                  Home
                </Link>
              </a>
              <a className="nav-item nav-link" href="#">
                <Link to="/aboutus"  className={`nav-link nav-item ${activeLink === "/aboutus" ? "active-link" : ""}`}                onClick={() => handleLinkClick("/aboutus")}
>
                  About
                </Link>
              </a>
              <a className="nav-item nav-link" href="#">
                <Link to="/contactUs"  className={`nav-link nav-item ${activeLink === "/contactUs" ? "active-link" : ""}`}                onClick={() => handleLinkClick("/contactUs")}
>
                  ContactUs
                </Link>
              </a>
              {/* <a className="nav-item nav-link" href="#"                 onClick={() => handleLinkClick("/NewUserSurveys")}
>
                <Link
                  to="/NewUserSurveys"
                  className={`nav-link nav-item ${activeLink === "/NewUserSurveys" ? "active-link" : ""}`}                  href="#"
                >
                  Create New Survey
                </Link>
              </a> */}
              {/* <a className="nav-item nav-link" href="#">
                <Link to="/surveylist"  className={`nav-link nav-item ${activeLink === "/surveylist" ? "active-link" : ""}`}href="#"                 onClick={() => handleLinkClick("/surveylist")}
>
                  Survey List
                </Link>
              </a> */}
              <a className="nav-item nav-link" href="#">
                <Link to="/Objectives"  className={`nav-link nav-item ${activeLink === "/Objectives" ? "active-link" : ""}`}href="#"                 onClick={() => handleLinkClick("/Objectives")}
>
                  Objectives
                </Link>
              </a>
              <a className="nav-item nav-link" href="#">
                <Link to="/Features"  className={`nav-link nav-item ${activeLink === "/Features" ? "active-link" : ""}`}href="#"                 onClick={() => handleLinkClick("/Features")}
>
                  Features
                </Link>
              </a>
            </div>
            {/* Right navigation */}
            {/* Action */}
            {localStorage.getItem("token") ? (
              <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("Userrole");
                    localStorage.removeItem("IsAdmin");
                    navigate("/signup");
                  }}
                  className="btn btn-sm  w-full w-lg-auto text-white"
                  style={{ backgroundColor: "#ff004e" }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Link
                  to="/signup"
                  className="btn btn-sm  w-full w-lg-auto text-white"
                  style={{ backgroundColor: "#ff004e" }}
                >
                  Register
                </Link>
              </div>
            )}
            {/* <div className="navbar-nav ms-lg-4">
              <a className="nav-item nav-link" href="#">Sign in</a>
            </div> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
