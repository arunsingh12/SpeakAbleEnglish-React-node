import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Input } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import Deleteimage from "./Delete.png";
import { useNavigate } from "react-router-dom";
import { Signup_Teacher_By_Admin } from "../../store/actions/teachersActions";
import { useDispatch } from "react-redux";

const AdminAddAvailability = () => {
  const location = useLocation();
  const formData = location.state.Alldata;
  console.log(formData, "all");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddSlot = () => {
    if (startTime && endTime) {
      const newSlot = {
        start: startTime,
        end: endTime,
      };
      const updatedTimeSlots = { ...timeSlots };
      const dateKey = selectedDate.toDateString();
      updatedTimeSlots[dateKey] = [
        ...(updatedTimeSlots[dateKey] || []),
        newSlot,
      ];
      setTimeSlots(updatedTimeSlots);
      setStartTime("");
      setEndTime("");
    }
  };

  const handleDeleteSlot = (index) => {
    const updatedTimeSlots = { ...timeSlots };
    const dateKey = selectedDate.toDateString();
    updatedTimeSlots[dateKey].splice(index, 1);
    setTimeSlots(updatedTimeSlots);
  };

  const handleRepeatSlots = () => {
    if (startTime && endTime) {
      const selectedWeekday = selectedDate.getDay();
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();
      const daysInMonth = new Date(
        selectedYear,
        selectedMonth + 1,
        0
      ).getDate();
      const updatedTimeSlots = { ...timeSlots };

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(selectedYear, selectedMonth, day);
        if (currentDate.getDay() === selectedWeekday) {
          const dateKey = currentDate.toDateString();
          if (!updatedTimeSlots[dateKey]) {
            updatedTimeSlots[dateKey] = [];
          }
          updatedTimeSlots[dateKey].push({ start: startTime, end: endTime });
        }
      }

      setTimeSlots(updatedTimeSlots);
      setModalOpen(false);
    } else {
      alert("Please select both start and end time before repeating.");
    }
  };

  const handleCalendarClick = (value) => {
    setSelectedDate(value);
    // console.log(value);
    setModalOpen(true);
  };

  // console.log(isModalOpen);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) < 12 ? "AM" : "PM";
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const tileClassName = ({ date }) => {
    const dateKey = date.toDateString();
    return timeSlots[dateKey] && timeSlots[dateKey].length > 0
      ? "has-slots"
      : null;
  };

  // console.log(timeSlots);
  const slotsForSelectedDate = timeSlots[selectedDate.toDateString()] || [];

  const AddTeacherHandler = async () => {
    await dispatch(
      Signup_Teacher_By_Admin({
        Username: formData.teacherName,
        Password: formData.password,
        Phone_Number: formData.phoneNumber,
        Address: formData.address,
        Description: formData.description, // Add the correct field name
        Short_Title: formData.shortTitle, // Add the correct field name
        Purchase_Price: formData.purchasePrice,
        Availability_Date: [timeSlots],
        Profile_Image: formData.Profile_Image,
        SocialLinks: formData.socialLinks,
        Courses_assign: formData.coursesAssign,
        Email: formData.Email,
      })
    );
    // console.log();
    navigate("/Admin-Dashboard/Teachers");
  };

  return (
    <>
      {/* <AdminNav /> */}
      <div className="Add_Teachers_main_div d-flex flex-column align-items-center">
        <h5>Add Teacher Availability</h5>
        <div className="calendar">
          <Calendar
            onChange={handleCalendarClick}
            value={selectedDate}
            tileClassName={tileClassName}
          />
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Time Slots for {selectedDate.toDateString()}</h2>
              <ul>
                {slotsForSelectedDate.map((slot, index) => (
                  <li key={index}>
                    {formatTime(slot.start)} - {formatTime(slot.end)}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteSlot(index)}
                    >
                      <img src={Deleteimage} alt={Deleteimage} />
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <label htmlFor="start">Start Time:</label>
                <Input
                  type="time"
                  id="start"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <label htmlFor="end">End Time:</label>
                <Input
                  type="time"
                  id="end"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <div className="Add-btn">
                  <button onClick={handleAddSlot}>Add Time Slot</button>
                  <button onClick={handleRepeatSlots}>Repeat Weekly</button>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-outline-danger"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {Object.keys(timeSlots).length > 0 && (
          <button
            className="btn btn-outline-success"
            onClick={AddTeacherHandler}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default AdminAddAvailability;
