// Navbar component
import React, { useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Speakableimg from "../../Speakableimg.jpg";
import SignupFormPopup from "../SignupFormPopup";
import SigninFormPopup from "../SigninFormPopup";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [t, i18n] = useTranslation("global");
  const [SignupformPopup, setSignupformPopup] = useState(false);
  const [SigninformPopup, setSigninformPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const navigate = useNavigate();
  const location = useLocation();

  const navigateHandler = () => {
    navigate("/");
  };
  const openSignupFormPopup = () => {
    setSignupformPopup(true);
  };

  const closeSignupFormPopup = () => {
    setSignupformPopup(false);
  };

  const openSigninFormPopup = () => {
    setSigninformPopup(true);
  };

  const closeSigninFormPopup = () => {
    setSigninformPopup(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };


  const scrollTo = (elementId) => {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      scroll.scrollTo(targetElement.offsetTop - 70, {
        smooth: true,
        duration: 500,
      });
    }
  };

  const handleLinkClick = (elementId) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollTo(elementId);
      }, 100);
    } else {
      scrollTo(elementId);
    }
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
    <div className="Navbar_main">
      <div className="Navbar_nav_firstdiv">
        <img
          style={{ cursor: "pointer" }}
          onClick={navigateHandler}
          src={Speakableimg}
          alt=""
        />
      </div>
      <div className="Navbar_nav_div">
        <ScrollLink
          to="Home"
          onClick={() => handleLinkClick("Home")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink "
          activeClass="active"
        >
          {t("header.Home")}
        </ScrollLink>
        <ScrollLink
          to="Courses"
          onClick={() => handleLinkClick("Courses")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink"
          activeClass="active"
        >
          {t("header.Courses")}
        </ScrollLink>
        <ScrollLink
          to="Teacher"
          onClick={() => handleLinkClick("Teacher")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink"
          activeClass="active"
        >
          {t("header.Teacher")}
        </ScrollLink>
        <ScrollLink
          to="About"
          onClick={() => handleLinkClick("About")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink"
          activeClass="active"
        >
          {t("header.About")}
        </ScrollLink>
        <ScrollLink
          to="OurTeachers"
          onClick={() => handleLinkClick("OurTeachers")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink"
          activeClass="active"
        >
          {t("header.OurTeachers")}
        </ScrollLink>
        <ScrollLink
          to="Reviews"
          onClick={() => handleLinkClick("Reviews")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink"
          activeClass="active"
        >
          {t("header.Reviews")}
        </ScrollLink>
        <ScrollLink
          to="Contact"
          onClick={() => handleLinkClick("Contact")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink"
          activeClass="active"
        >
          {t("header.Contact")}
        </ScrollLink>
      </div>
      <div className="Navbar_nav_lastdiv">
        <button
          className="btn btn-outline-success nav-btn-sign "
          onClick={openSignupFormPopup}
        >
          {t("header.Signup")}
        </button>
        <button
          className="btn btn-outline-success nav-btn-sign"
          onClick={openSigninFormPopup}
        >
          {t("header.Signin")}
        </button>
        <button
          className="btn btn-outline-success nav-btn-sign "
          onClick={() => handleChangeLanguage("en")}
        >
         English
        </button>
        <button
          className="btn btn-outline-success nav-btn-sign"
          onClick={() => handleChangeLanguage("pl")}
        >
          {/* Polski */}
          Polish 
        </button>
        <button className="btn btn-outline-success mx-2 menu-button" onClick={toggleMenu}>
        <i class="bi bi-list"></i>
        </button>
      </div>
        {/* Menu button */}
      {SignupformPopup && (
        <SignupFormPopup handleClose={closeSignupFormPopup} />
      )}
      {SigninformPopup && (
        <SigninFormPopup handleClose={closeSigninFormPopup} />
      )}
    </div>
  
       {menuOpen && (
        <div className="responsive-menu">
          <ScrollLink
          to="Home"
          onClick={() => handleLinkClick("Home")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink "
          activeClass="active"
        >
          {t("header.Home")}
        </ScrollLink>
        <ScrollLink
          to="Courses"
          onClick={() => handleLinkClick("Courses")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink mt-2"
          activeClass="active"
        >
          {t("header.Courses")}
        </ScrollLink>
        <ScrollLink
          to="Teacher"
          onClick={() => handleLinkClick("Teacher")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink mt-2"
          activeClass="active"
        >
          {t("header.Teacher")}
        </ScrollLink>
        <ScrollLink
          to="About"
          onClick={() => handleLinkClick("About")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink mt-2"
          activeClass="active"
        >
          {t("header.About")}
        </ScrollLink>
        <ScrollLink
          to="OurTeachers"
          onClick={() => handleLinkClick("OurTeachers")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink mt-2"
          activeClass="active"
        >
          {t("header.OurTeachers")}
        </ScrollLink>
        <ScrollLink
          to="Reviews"
          onClick={() => handleLinkClick("Reviews")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink mt-2"
          activeClass="active"
        >
          {t("header.Reviews")}
        </ScrollLink>
        <ScrollLink
          to="Contact"
          onClick={() => handleLinkClick("Contact")}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
          className="d_center text-decoration-none Navlink mt-2"
          activeClass="active"
        >
          {t("header.Contact")}
        </ScrollLink>
          <button className="btn btn-outline-danger mt-2" onClick={closeMenu}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
