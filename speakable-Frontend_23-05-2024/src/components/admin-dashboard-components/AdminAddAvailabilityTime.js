import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import { useDispatch } from "react-redux";
import { Signup_Teacher_By_Admin } from "../../store/actions/teachersActions";

const AdminAddAvailabilityTime = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const formData = location.state.formDataFromPreviousComponent;
  const Dates = location.state.timeSlots;
  const navigate = useNavigate();
  // console.log(Dates);

  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

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
        Availability_Date: [
          {
            Date: {
              Start_Date: Dates.start,
              End_Date: Dates.end,
            },
            Time: [selectedTimeSlots],
          },
        ],
        Profile_Image: formData.Profile_Image,
        SocialLinks: formData.socialLinks,
        Courses_assign: formData.coursesAssign,
        Email: formData.Email,
      })
    );
    navigate("/Admin-Dashboard/Teachers");
  };

  const handleTimeSlotChange = (timeSlot) => {
    if (!selectedTimeSlots.includes(timeSlot)) {
      setSelectedTimeSlots((prevTimeSlots) => [...prevTimeSlots, timeSlot]);
    } else {
      setSelectedTimeSlots((prevTimeSlots) =>
        prevTimeSlots.filter((slot) => slot !== timeSlot)
      );
    }
  };

  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
    "9:00 PM - 10:00 PM",
    "10:00 PM - 11:00 PM",
    "11:00 PM - 12:00 AM",
    "12:00 AM - 1:00 AM",
    "1:00 AM - 2:00 AM",
    "2:00 AM - 3:00 AM",
    "3:00 AM - 4:00 AM",
    "4:00 AM - 5:00 AM",
    "5:00 AM - 6:00 AM",
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
  ];
  return (
    <>
      <AdminNav />
      <div className="w-100 d-flex flex-column align-items-center mt-2">
        <h6>Select the Time Slots</h6>
        <div className="timeslot_div">
          {timeSlots.map((timeSlot) => (
            <button
              key={timeSlot}
              className={`btn ${
                selectedTimeSlots.includes(timeSlot)
                  ? "btn-outline-success active"
                  : "btn-outline-success"
              } p-1`}
              value={timeSlot}
              onClick={() => handleTimeSlotChange(timeSlot)}
            >
              {timeSlot}
            </button>
          ))}
        </div>
        {selectedTimeSlots}
        <button
          type="submit"
          onClick={AddTeacherHandler}
          className="btn btn-outline-success w-100 mt-2"
        >
          Submit the form
        </button>
      </div>
    </>
  );
};

export default AdminAddAvailabilityTime;
