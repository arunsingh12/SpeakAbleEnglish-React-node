import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "./AdminNav";
import {
  Deletebooking,
  fetchAllbookings,
} from "../../store/actions/bookingActions";
// import { getbookings, deleteBooking } from '../../store/actions/bookingAction';

const AdminBookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.bookings.Allbookinglist);
  console.log(booking);
   const [searchInput, setSearchInput] = useState("");


  useEffect(() => {
    dispatch(fetchAllbookings());
  }, [dispatch]);

  const DeleteBooking = (id) => {
    dispatch(Deletebooking(id));
  };

  const EditBooking = (id) => {
    navigate(`/Admin-Dashboard/Bookings/edit-Booking/${id}`);
  };

  const roomHandler = (id) => {
    navigate(`/room/meeting/${id}`);
  };

    const filteredBooking = booking.filter((student) =>
      student.Student_ID.Username.toLowerCase().includes(
        searchInput.toLowerCase()
      )
    );

  return (
    <>
      <AdminNav
        value={searchInput}
        setValue={setSearchInput}
        placeholder="Search by Student Name.."
      />

      <div className="Booking_mainPage_style">
        <div className="Booking_header_style">
          <h6 className="text-dark">Booking Table</h6>
          {/* <Link to="/Admin-Dashboard/Bookings/add-Booking">
            <button className="btn btn-outline-success">Add Booking</button>
          </Link> */}
        </div>
        <div className="Booking_list_style d-flex flex-wrap flex-row">
          {filteredBooking?.length > 0 ? (
            <table className="table table-hover table-responsive table-borderless">
              <thead className="table-transparent">
                <tr>
                  <th className="th">Package Name</th>
                  <th className="th">Student Name</th>
                  <th className="th">Teacher Name</th>
                  {/* <th className='th'>Meeting Link</th> */}
                  <th className="th">Status</th>
                  <th className="th">Scheduled Date</th>
                  {/* <th className="th">TimeSlots</th> */}
                  <th className="th">Actions</th>
                  <th className="th">Join Button</th>
                  {/* Add more table headers based on your schema */}
                </tr>
              </thead>
              <tbody>
                {filteredBooking?.map((booking) => (
                  <tr
                    style={{
                      boxShadow:
                        "0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                    }}
                    key={booking?._id}
                  >
                    <td className="td">{booking?.Package_ID?.Package_Name}</td>
                    <td className="td">{booking?.Student_ID?.Username}</td>
                    <td className="td">
                      {booking?.Teacher_ID?.map((teacher, index) => {
                        return teacher.Username;
                      })}
                    </td>
                    {/* <td className='td'>{booking?.Meeting_ID?.Joining_Url.substring(0,12)}</td> */}
                    <td className="td">{booking?.Status}</td>
                    <td className="td">
                      {booking?.Scheduled_Dates?.map((dateObj, index) => {
                        if (dateObj !== null) {
                          const date = Object?.keys(dateObj)[0]; // Extracting the date
                          const timeSlots = dateObj[date]; // Extracting the array of time slots for the date
                          return (
                            <div key={index}>
                              {Object.keys(timeSlots)?.map((date) => (
                                <div key={date}>
                                  <p>Date: {date}</p>
                                  <ul>
                                    {timeSlots[date]?.map((slot, index) => (
                                      <li key={index}>
                                        {slot.start} - {slot.end}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          );
                        }

                        // return <span>{dateObj}</span>;
                      })}
                    </td>
                    {/* <td className="td">
                      {booking.Time_Slot.map((slot, index) => {
                        return <span>{slot}</span>;
                      })}
                    </td> */}
                    <td>
                      <button
                        className="mx-1"
                        onClick={() => EditBooking(booking._id)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <i class="bi bi-pen-fill"></i>
                      </button>
                      <button
                        onClick={() => DeleteBooking(booking._id)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </td>
                    <td onClick={() => roomHandler(booking._id)} className="td">
                      <button className="btn btn-outline-success meetingbtn">
                        Join Room
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p>No Bookings Available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBookings;
