// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { useNavigate } from "react-router-dom";
// import { GetBookingsByTeacherID } from "../../store/actions/bookingActions";
// import AdminNav from "../admin-dashboard-components/AdminNav";
// const TeacherBookings = () => {
//   const dispatch = useDispatch();
//   const teacher = useSelector((state) => state.students.user);
//   const Bookings = useSelector((state) => state.bookings.Teacher_Bookings);
//   const navigate = useNavigate();
//   // console.log(teacher)
//   // console.log(teacher._id)
//   // console.log(Bookings)

//   useEffect(() => {
//     dispatch(GetBookingsByTeacherID(teacher._id));
//   }, [dispatch, teacher._id]);

//   const roomHandler = (id) => {
//     navigate(`/room/meeting/${id}`);
//   };

//   return (
//     <>
//       <AdminNav />
//       <div className="Student_mainPage_style">
//         <div className="Student_header_style">
//           <h6 className="text-dark">Booking Table</h6>
//         </div>
//         <div className="Student_list_style mt-3">
//           {/* <table className="table table-hover table-responsive table-borderless">
//             <thead className="table-transparent">
//               <tr>
//                 <th className="th">#</th>
//                 <th className="th">Package Name</th>
//                 <th className="th">Student Name</th>
//                 <th className="th">Joining_Url</th>
//                 <th className="th">Scheduled_Date</th>
//                 <th className="th">Start_time</th>
//                 <th className="th">End_time</th>
//                 <th className="th">Status</th>
//                 <th className="th">Join Room</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Bookings ? (
//                 Bookings?.length > 0 ? (
//                   Bookings?.map((Booking, index) => (
//                     <tr
//                       style={{
//                         boxShadow:
//                           "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
//                       }}
//                       key={Booking?._id}
//                     >
//                       <td className="td">{index + 1}</td>
//                       <td className="td">
//                         {Booking?.Package_ID?.Package_Name}
//                       </td>
//                       <td className="td">{Booking?.Student_ID?.Username}</td>
//                       <td
//                         style={{ cursor: "pointer", color: "royalblue" }}
//                         className="td"
//                       >
//                         {Booking?.Meeting_ID?.Joining_Url?.substring(0, 20)}
//                       </td>
//                       <td className="td">{Booking?.Scheduled_Date}</td>
//                       <td className="td">{Booking?.Time_Slot?.Start_time}</td>
//                       <td className="td">{Booking?.Time_Slot?.End_time}</td>
//                       <td className="td">{Booking?.Status}</td>
//                       <td
//                         onClick={() => roomHandler(Booking._id)}
//                         className="td"
//                       >
//                         <button className="btn btn-outline-success meetingbtn">
//                           Join Room
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4">No Bookings available</td>
//                   </tr>
//                 )
//               ) : (
//                 <tr>
//                   <td colSpan="4">No Bookings are available.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table> */}
//           <table className="table table-hover table-responsive table-borderless">
//             <thead className="table-transparent">
//               <tr>
//                 <th className="th">#</th>
//                 <th className="th">Student Name</th>
//                 <th className="th">Scheduled_Dates</th>
//                 <th className="th">Status</th>
//                 <th className="th">Join Button</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Bookings?.length > 0 ? (
//                 Bookings?.map((Booking, index) => (
//                   <tr
//                     style={{
//                       boxShadow:
//                         "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
//                     }}
//                     key={Booking?._id}
//                   >
//                     <td className="td">{index + 1}</td>
//                     <td className="td">
//                       {Booking?.Teacher_ID?.map((teacher, index) => {
//                         return teacher.Username;
//                       })}
//                     </td>
//                     <td className="td">
//                       {Booking?.Scheduled_Dates.map((dateObj, index) => {
//                         const date = Object.keys(dateObj)[0]; // Extracting the date
//                         const timeSlots = dateObj[date]; // Extracting the array of time slots for the date

//                         return (
//                           <div key={index}>
//                             {Object.keys(timeSlots).map((date) => (
//                               <div key={date}>
//                                 <p>Date: {date}</p>
//                                 <ul>
//                                   {timeSlots[date].map((slot, index) => (
//                                     <li key={index}>
//                                       {slot.start} - {slot.end}
//                                     </li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             ))}
//                           </div>
//                         );
//                       })}
//                     </td>
//                     <td className="td">{Booking?.Status}</td>
//                     <td onClick={() => roomHandler(Booking._id)} className="td">
//                       <button className="btn btn-outline-success meetingbtn">
//                         Join Room
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4">No Bookings available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TeacherBookings;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { GetBookingsByTeacherID } from "../../store/actions/bookingActions";
import AdminNav from "../admin-dashboard-components/AdminNav";
const TeacherBookings = () => {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.students.user);
  const Bookings = useSelector((state) => state.bookings.Teacher_Bookings);
  const navigate = useNavigate();
  // console.log(teacher)
  // console.log(teacher._id)
  // console.log(Bookings)

  useEffect(() => {
    dispatch(GetBookingsByTeacherID(teacher._id));
  }, [dispatch, teacher._id]);

  const roomHandler = (id) => {
    navigate(`/room/meeting/${id}`);
  };

  return (
    <>
      <AdminNav />
      <div className="Student_mainPage_style">
        <div className="Student_header_style">
          <h6 className="text-dark">Booking Table</h6>
        </div>
        <div className="Student_list_style mt-3">
  

          {Bookings?.length > 0 ? (
            Bookings?.map((Booking, index) => (
              <table
                className="table table-hover table-responsive table-borderless"
                key={Booking?._id}
              >
                <thead className="table-transparent">
                  <tr>
                    <th className="th">#</th>
                    <th className="th">Student Name</th>
                    <th className="th">Scheduled_Dates</th>
                    <th className="th">Status</th>
                    <th className="th">Join Button</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      boxShadow:
                        "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <td className="td">{index}</td>
                    <td className="td">
                      {Booking?.Teacher_ID?.map((teacher, index) => {
                        return teacher.Username;
                      })}
                    </td>
                    <td className="td">
                      {Booking?.Scheduled_Dates.map((dateObj, index) => {
                        if(dateObj !== null){
                          const date = Object.keys(dateObj)[0]; // Extracting the date
                          const timeSlots = dateObj[date]; // Extracting the array of time slots for the date
                                  return (
                                    <div key={index}>
                                      {Object.keys(timeSlots).map((date) => (
                                        <div key={date}>
                                          <p>Date: {date}</p>
                                          <ul>
                                            {timeSlots[date].map(
                                              (slot, index) => (
                                                <li key={index}>
                                                  {slot.start} - {slot.end}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  );
                        }
                  
                
                      })}
                    </td>
                    <td className="td">{Booking?.Status}</td>
                    <td onClick={() => roomHandler(Booking._id)} className="td">
                      <button className="btn btn-outline-success meetingbtn">
                        Join Room
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Bookings available</td>
            </tr>
          )}
        </div>
      </div>
    </>
  );
};

export default TeacherBookings;
