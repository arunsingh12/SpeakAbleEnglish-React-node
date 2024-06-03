import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBookingsByStudentID } from "../../store/actions/bookingActions";
// import {Link } from 'react-router-dom'
import AdminNav from "../admin-dashboard-components/AdminNav";
import { useNavigate } from "react-router-dom";
const Bookings = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.students.user);
  const Bookings = useSelector((state) => state.bookings.StudentID_Booking);
  const navigate = useNavigate();
  console.log(Bookings);

  useEffect(() => {
    dispatch(GetBookingsByStudentID(student?._id));
  }, [student._id, dispatch]);

  const roomHandler = (id) => {
    navigate(`/room/meeting/${id}`);
  };

  
  const EditBooking = (id) => {
    navigate(`/Student-dashboard/Bookings/edit-Booking/${id}`);
  };


  return (
    <>
      <AdminNav />
      <div className="Student_mainPage_style">
        <div className="Student_header_style">
          <h6 className="text-dark">Booking Table</h6>
        </div>
        <div className="Student_list_style mt-3">
          <table className="table table-hover table-responsive table-borderless">
            <thead className="table-transparent">
              <tr>
                <th className="th">#</th>
                <th className="th">Package Name</th>
                <th className="th">Teacher Name</th>
                <th className="th">Scheduled_Dates</th>
                <th className="th">Status</th>
                <th className="th">Join Button</th>
                <th className="th">Action</th>
              </tr>
            </thead>
            <tbody>
              {Bookings?.length > 0 ? (
                Bookings?.map((Booking, index) => (
                  <tr
                    style={{
                      boxShadow:
                        "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
                    }}
                    key={Booking?._id}
                  >
                    <td className="td">{index + 1}</td>
                    <td className="td">{Booking?.Package_ID?.Package_Name}</td>
                    <td className="td">
                      {Booking?.Teacher_ID?.map((teacher, index) => {
                        return teacher?.Username;
                      })}
                    </td>
                    <td className="td">
                      {Booking?.Scheduled_Dates?.map((dateObj, index) => {
                        if(dateObj !== null) {
                          const date = Object?.keys(dateObj)[0]; // Extracting the date
                          const timeSlots = dateObj[date]; // Extracting the array of time slots for the date
                               return (
                                 <div key={index}>
                                   {Object?.keys(timeSlots)?.map((date) => (
                                     <div key={date}>
                                       <p>Date: {date}</p>
                                       <ul>
                                         {timeSlots[date]?.map((slot, index) => (
                                           <li key={index}>
                                             {slot?.start} - {slot?.end}
                                           </li>
                                         ))}
                                       </ul>
                                     </div>
                                   ))}
                                 </div>
                               );
                        }
                   
                      })}
                    </td>
                    <td className="td">{Booking?.Status}</td>
                    <td onClick={() => roomHandler(Booking?._id)} className="td">
                      <button className="btn btn-outline-success meetingbtn">
                        Join Room
                      </button>
                    </td>
                    <td>
                      <button
                        className="mx-1"
                        onClick={() => EditBooking(Booking?._id)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <i class="bi bi-pen-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No Bookings available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Bookings;
