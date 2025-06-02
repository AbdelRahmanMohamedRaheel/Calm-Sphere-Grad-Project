import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Nav = () => {
  const { user, logoutUser } = useContext(AuthContext); // Get user and logout function
  const [collapse, setCollapse] = useState("");
  const { pathname } = useLocation();
  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  useEffect(() => {
    setCollapse("collapse");
  }, [pathname]);

  const changeCollapseState = () => {
    setCollapse("");
  };

  return (
    <>
      {/* Topbar Start */}
      <div
        className="container-fluid bg-light p-0 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-map-marker-alt text-primary me-2" />
              <small> Maadi - Cairo,Egypt </small>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-phone-alt text-primary me-2" />
              <small>31335</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <a
                className="btn btn-square rounded-circle bg-white text-primary me-1"
                target="_blank"
                href="https://www.facebook.com/"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-square rounded-circle bg-white text-primary me-1"
                target="_blank"
                href="https://www.x.com/"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="btn btn-square rounded-circle bg-white text-primary me-1"
                target="_blank"
                href="https://www.linkedin.com/"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                className="btn btn-square rounded-circle bg-white text-primary me-0"
                target="_blank"
                href="https://www.instagram.com/"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
      {/* Navbar Start */}
      <nav
        className={`navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn`}
        data-wow-delay="0.1s"
      >
        <NavLink
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h1 className="m-0 text-primary">
            <img src="..\..\public\body2.png" alt="Brain Icon" className="me-3" style={{ width: 63 , height: 75 }} />
            Calm Sphere
          </h1>
        </NavLink>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${collapse} navbar-collapse`} id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <NavLink
              to="/"
              className={`nav-item nav-link ${linkClass}`}
              onClick={changeCollapseState}
            >
              Home
            </NavLink>
            <NavLink
              to="/chatbot"
              className={`nav-item nav-link ${linkClass}`}
              onClick={changeCollapseState}
            >
              Chat
            </NavLink>
            <NavLink
              to="/article"
              className={`nav-item nav-link ${linkClass}`}
              onClick={changeCollapseState}
            >
              Article
            </NavLink>
            <NavLink
              to="/meditation"
              className={`nav-item nav-link ${linkClass}`}
              onClick={changeCollapseState}
            >
              Meditation
            </NavLink>
            <NavLink
              to="/quotes"
              className={`nav-item nav-link ${linkClass}`}
              onClick={changeCollapseState}
            >
              Quotes
            </NavLink>
            <NavLink
              to="/about"
              className={`nav-item nav-link ${linkClass}`}
              onClick={changeCollapseState}
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              className={`nav-item nav-link ${linkClass}`}
              onClick={changeCollapseState}
            >
              Service
            </NavLink>
            <NavLink
              to="/doctors"
              className={`nav-item nav-link ${linkClass}`}
              onClick={changeCollapseState}
            >
              Doctors
            </NavLink>
            
            {user ? (
              // Patient Profile Default
              user.role == "PATIENT" ? (
                <NavLink
                  to={`/profile/${user.profile_id}`}
                  className={`nav-item nav-link ${linkClass}`}
                  onClick={changeCollapseState}
                >
                  Profile
                </NavLink>
              ) : // Doctor Profile
              user.role == "DOCTOR" ? (
                <NavLink
                  to={`/doctor/${user.profile_id}`}
                  className={`nav-item nav-link ${linkClass}`}
                  onClick={changeCollapseState}
                >
                  {user.username}
                </NavLink>
              ) : (
                // Admin No Profile
                <NavLink
                  className={`nav-item nav-link ${linkClass}`}
                  onClick={logoutUser}
                >
                  Admin
                </NavLink>
              )
            ) : (
              <NavLink
                to={`/login`}
                className={`nav-item nav-link ${linkClass}`}
                onClick={changeCollapseState}
              >
                Login
              </NavLink>
            )}
          </div>
          {user ? (

          <NavLink
            to={`/appointment/${user.profile_id}`}
            className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
          >
            Appointment
            <i className="fa fa-arrow-right ms-3" />
          </NavLink>
          ):(
          <NavLink
            to={`/login`}
            className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
          >
            Appointment
            <i className="fa fa-arrow-right ms-3" />
          </NavLink>

          )}
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
};

export default Nav;
