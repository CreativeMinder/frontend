import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer-4" className="p-5 mt-5 w-100 bg-dark text-white">
      <div className="row py-2">
        <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-3">
          <h3>About Us</h3>
          <p
            className="bg-white rounded"
            style={{ width: "4rem", height: "3px" }}
          ></p>
          <p className="text-secondary">
            A recommender system for OBE paradigm" is a comprehensive tool
            designed to enhance Outcome-Based Education (OBE) by integrating
            survey data from students, alumni, employers, and faculty. It aims
            to address challenges in data collection, analysis, and continuous
            quality improvement (CQI) for universities.
          </p>
          <div className="w-100 m-0 h5 d-flex gap-2 py-3">
            <a href="#">
              <i className="p-1 text-dark rounded-circle bg-secondary me-3 far fa-facebook"></i>
            </a>
            <a href="#">
              <i className="p-1 text-dark rounded-circle bg-secondary me-3 fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="p-1 text-dark rounded-circle bg-secondary me-3 fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="p-1 text-dark rounded-circle bg-secondary fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-3 text-secondary">
          <h3 className="text-white">Get in Touch</h3>
          <p
            className="bg-white rounded"
            style={{ width: "4rem", height: "3px" }}
          ></p>

          <div className="h6 mb-3">
            <i className="fas fa-user rounded me-3"></i>
            Aghna Rasool
          </div>
          <div className="h6 mb-3">
            <i className="fas fa-map-marker-alt rounded me-3"></i>
            Attock, Pakistan
          </div>
          <div className="h6 mb-3">
            <i className="fas fa-envelope rounded me-3"></i>
            obe.recommendations@gmail.com
          </div>
          {/* <div className="h6 mb-5">
            <i className="fas fa-globe rounded me-3"></i>
            www.loremipsum.com
          </div> */}
        </div>
        <div className="col-12 col-md-2 col-lg-2 col-xl-2 col-sm-2 text-secondary">
          <h3 className="text-white">Useful links</h3>
          <p
            className="bg-white rounded"
            style={{ width: "4rem", height: "3px" }}
          ></p>
          <ul className="list-unstyled">
            <li>
              {" "}
              <a className="text-decoration-none">
                <Link className="text-decoration-none text-light" to="/aboutus">
                  About Us{" "}
                </Link>{" "}
              </a>
            </li>
            <li>
              {" "}
              <a className="text-decoration-none">
                <Link
                  className="text-decoration-none text-light"
                  to="/contactUs"
                >
                  Contact Us{" "}
                </Link>{" "}
              </a>
            </li>
            <li>
              {" "}
              <a className="text-decoration-none">
                <Link
                  className="text-decoration-none text-light"
                  to="/Objectives"
                >
                  Objectives{" "}
                </Link>{" "}
              </a>
            </li>
            <li>
              {" "}
              <a className="text-decoration-none">
                <Link
                  className="text-decoration-none text-light"
                  to="/Features"
                >
                  Features{" "}
                </Link>{" "}
              </a>
            </li>
          </ul>
        </div>
        <div
          className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-4"
          style={{ maxWidth: "30rem" }}
        >
          <h3 className="text-white">Services</h3>
          <p
            className="bg-white rounded"
            style={{ width: "4rem", height: "3px" }}
          ></p>
          {/* <div className="d-flex flex-wrap gap-2">
            
            <img src="https://img.freepik.com/free-photo/group-positive-young-people-posing-together_23-2148431344.jpg?w=740&t=st=1693716749~exp=1693717349~hmac=6b66b92050c3a7f1e90641b123dcc36046c8b6403292e922654824b32830b1a4" style={{ height: '4rem', width: '6rem' }} alt="Image 1" />
            <img src="https://img.freepik.com/free-photo/adult-man-woman-posing-together_23-2148431394.jpg?w=740&t=st=1693716782~exp=1693717382~hmac=748d8d96a2517d927436f1059942f6fe5c8128ab1f4b8d29baf22a304d471811" style={{ height: '4rem', width: '6rem' }} alt="Image 2" />
            <img src="https://img.freepik.com/free-photo/interior-home-decor-with-photo-frames_23-2149514001.jpg?w=740&t=st=1693716799~exp=1693717399~hmac=add194c4583c122f6df0ad3f0ed73a755bf7bc50a163b2dd6ee62d2aae4ae872" style={{ height: '4rem', width: '6rem' }} alt="Image 3" />
            <img src="https://img.freepik.com/free-photo/multiracial-business-people-standing-office-discuss-together-diverse-group-employees-formal-wear_627829-973.jpg?w=740&t=st=1693716829~exp=1693717429~hmac=dcd6834a0f5a2efcc37db2d16d156a3f8f4e78403be690739400612d516e08d5" style={{ height: '4rem', width: '6rem' }} alt="Image 4" />
            <img src="https://img.freepik.com/free-photo/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working_146671-13569.jpg?w=740&t=st=1693716861~exp=1693717461~hmac=68be58c2175814c25e7cf5850a006f3979196f0ba7a3bef76ed30bb8195dcfdf" style={{ height: '4rem', width: '6rem' }} alt="Image 5" />
            <img src="https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg?w=740&t=st=1693716402~exp=1693717002~hmac=42b85674d28b66e93fd435a3d823248ca78d891640f7359a6e98e7d5571f12d9" style={{ height: '4rem', width: '6rem' }} alt="Image 6" />
          </div> */}
          <div>
            <p className="text-secondary">
              Conducting surveys .
            </p>
            <p className="text-secondary">
              Checking invitations and tracking participants responses.
            </p>
            <p className="text-secondary">
              Generating graphical representations.
            </p>
            <p className="text-secondary">Assessing the CQI of university.</p>
            <p className="text-secondary">
              Recommend practical actions.
            </p>
          </div>

          {/* <div className="h6 mb-3">
            <i className="fas fa-user rounded me-3"></i>
            Ravia Iqbal         </div>
          <div className="h6 mb-3">
            <i className="fas fa-map-marker-alt rounded me-3"></i>
            Attock, Pakistan
          </div>
          <div className="h6 mb-3">
            <i className="fas fa-envelope rounded me-3"></i>
            obe.recommendations@gmail.com
          </div> */}
        </div>
      </div>
      <p className="text-center w-50 mx-auto text-secondary">
        A web-based application automates survey management, data integration,
        and reporting, making OBE implementation more efficient. .
      </p>

      <div className="d-flex flex-wrap justify-content-center gap-2 w-50 mx-auto py-2">
        <input
          type="text"
          className="form-control"
          placeholder="Your name"
          style={{ width: "10rem" }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Your Email"
          style={{ width: "10rem" }}
        />
        <button
          type="submit"
          className="btn text-white"
          style={{ width: "10rem", backgroundColor: "#ff004e" }}
        >
          SUBSCRIBE
        </button>
      </div>
      <hr />
      {/* <div className="row">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-sm-3">
          <p>
            @ Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-sm-6">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
