// Layout component
import React, { useEffect, useState } from 'react';
import Navbar from './landingcomponents/Navbar';
import Ourteacher from './landingcomponents/Ourteacher';
import Home from './landingcomponents/Home';
import About from './landingcomponents/About';
import Courses from './landingcomponents/Courses';
import Reviews from './landingcomponents/Reviews';
import Contact from './landingcomponents/Contact';
import Foot from './landingcomponents/Foot';
import Teacher from './landingcomponents/Teacher';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatBotButton from './landingcomponents/ChatBotButton';
import Course from './landingcomponents/Course'

const Layout = () => {
  const isAuthenticated = useSelector((state) => state.students.isAuthenticated);
  const navigate = useNavigate();
  const userType = useSelector((state) => state.students.userType);
  const [ChatPopUp , setChatPopUp] = useState(false)

  useEffect(() => {
    if (isAuthenticated > 0) {
      switch (userType) {
        case 'student':
          navigate('/Student-dashboard/dash');
          break;
        case 'teacher':
          navigate('/Teacher-dashboard/dash');
          break;
        case 'admin':
          navigate('/Admin-Dashboard/Dashboard');
          break;
        case 'accountant':
          navigate('/Accontant-Dashboard/dash');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [isAuthenticated, userType, navigate]);

 const onLetsChatClick =()=>{
 setChatPopUp(!ChatPopUp)
 }

  return (
    <>
      <div>
        <Navbar />
        {/* <br />
        <br />
        <br /> */}
        <Home id="Home" onLetsChatClick={onLetsChatClick} />
        <Course id="Courses" />
        {/* <Courses id='Courses_2' /> */}
        <Teacher id="Teacher" />
        <About id="About" />
        <Ourteacher id="OurTeachers" />
        <Reviews id="Reviews" />
        <Contact id="Contact" />
        <Foot id="Foot" />
        <ChatBotButton
          onLetsChatClick={onLetsChatClick}
          ChatPopUp={ChatPopUp}
        />
        <ToastContainer
          style={{
            zIndex: 9999,
            position: "fixed", // Use 'fixed' instead of 'absolute'
            top: 0,
            right: 0,
          }}
        />
      </div>
    </>
  );
}

export default Layout;
