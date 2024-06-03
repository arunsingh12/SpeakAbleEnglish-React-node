import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

import { useDispatch, useSelector } from "react-redux";
import {
  GetBookingsByStudentID,
  UpdatetheBookingStatus,
} from "../../store/actions/bookingActions";
import { useNavigate } from "react-router-dom";
import { FaQuestionCircle, FaRegQuestionCircle } from "react-icons/fa";
import { Tooltip } from "antd";
import OwncloudSignupFormPopup from "./OwncloudSignupFormPopup";

const StudentDash = ({ dateObj }) => {
  const [times, setTimes] = useState({ startTime: "", endTime: "" });
  const student = useSelector((state) => state.students.user);
  const Bookings = useSelector((state) => state.bookings.StudentID_Booking);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [OwncloudFormPopup, setOwncloudSignupFormPopup] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fillterBookingData, setFillterBookingData] = useState(false);
  const [fillterDataValue, setFillterDataValue] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scheduledDate, setScheduledDate] = useState(null);
  const [scheduledStartTime, setScheduledStartTime] = useState(null);
  const [scheduledEndTime, setScheduledEndTime] = useState(null);
  console.log(Bookings);
  console.log(scheduledDate);
  console.log(scheduledStartTime);
  console.log(scheduledEndTime);

  useEffect(() => {
    if (dateObj && dateObj.length > 0) {
      const firstEntry = dateObj[0];
      const dateKey = Object.keys(firstEntry)[0];
      const timeEntries = firstEntry[dateKey];

      if (timeEntries && timeEntries.length > 0) {
        const { start, end } = timeEntries[0];
        setTimes({ startTime: start || "", endTime: end || "" });
      }
    }
  }, [dateObj]);

  useEffect(() => {
    dispatch(GetBookingsByStudentID(student._id));
  }, [student._id, dispatch]);

  useEffect(() => {
    if (Bookings?.length > 0) {
      UpdateBooking_Status(Bookings);
    }
  }, [Bookings]);

  //---------------------------------------------------------------------------------------------- Total number of lectures -----------------
  const totalLectures = Bookings?.length;
  // --------------------------------------------------------------------------------------------- Completed Sessions  ----------------------
  function countCompletedSessions(Bookings) {
    let completedSessionsCount = 0;
    for (const Booking of Bookings) {
      if (Booking?.Status === "Completed") {
        completedSessionsCount++;
      }
    }
    return completedSessionsCount;
  }
  const completedSessions = countCompletedSessions(Bookings);
  // ---------------------------------------------------------------------------------------------- Pending Sessions -------------------------
  function countPendingOrScheduledSessions(Bookings) {
    let pendingOrScheduledSessionsCount = 0;
    for (const Booking of Bookings) {
      if (Booking?.Status === "Rescheduled" || Booking?.Status === "Scheduled") {
        pendingOrScheduledSessionsCount++;
      }
    }
    return pendingOrScheduledSessionsCount;
  }
  const pendingOrScheduledSessions = countPendingOrScheduledSessions(Bookings);
  // ------------------------------------------------------------------------------------------------ Cancelled Sessions ----------------------
  function countCancelledSessions(Bookings) {
    let cancelledSessionsCount = 0;
    for (const Booking of Bookings) {
      if (Booking?.Status === "Cancelled") {
        cancelledSessionsCount++;
      }
    }
    return cancelledSessionsCount;
  }
  const cancelledSessions = countCancelledSessions(Bookings);
  // ---------------------------------------------------------------------------------------------------------------------------------------------

  const roomHandler = (id) => {
    navigate(`/room/meeting/${id}`);
  };

  const DispatchHandler = async () => {
    if (student?.hasOwncloudAccount) {
      window.open("https://cloud.speakable.online/", "_blank");
    } else {
      openOwncloudSignupFormPopup();
    }
  };

  const closeOwncloudSignupFormPopup = () => {
    setOwncloudSignupFormPopup(false);
  };

  const openOwncloudSignupFormPopup = () => {
    setOwncloudSignupFormPopup(true);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date?.toDateString();
      for (const booking of Bookings) {
        if (booking?.Scheduled_Dates) {
          if (booking?.Scheduled_Dates[0] !== null) {
            for (const scheduledDateObj of booking?.Scheduled_Dates) {
              for (const scheduledDates of scheduledDateObj) {
                const scheduledDate = Object?.keys(scheduledDates);
                for (const Dates of scheduledDate) {
                  const scheduledDateString = new Date(Dates)?.toDateString();
                  if (scheduledDateString === dateString) {
                    return <p className="bg-success text-white">L</p>;
                  }
                }
              }
            }
          }
        }
      }
    }
    return null;
  };

  const handleCalendarClick = (value) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    const formattedDate = value.toLocaleDateString("en-US", options);
    const formattedDateWithoutComma = formattedDate.replace(/,/g, "");
    setFillterBookingData(true);
    setFillterDataValue(formattedDateWithoutComma);
  };

  const UpdateBooking_Status = async (Bookings) => {
    const FoundedBooking = await Bookings.filter(
      (booking) => booking.Status === "Scheduled"
    );
    console.log(FoundedBooking);
    const TodayDate = new Date();
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    const formattedTodayDate = TodayDate.toLocaleDateString("en-US", options);
    const formattedTodayDateWithoutComma = formattedTodayDate.replace(/,/g, "");
    console.log(formattedTodayDateWithoutComma);
    for (const booking of FoundedBooking) {
      if (booking?.Scheduled_Dates) {
        if (booking?.Scheduled_Dates[0] !== null) {
          for (const scheduledDateObj of booking?.Scheduled_Dates) {
            for (const scheduledDates of scheduledDateObj) {
              const scheduledDate = Object?.keys(scheduledDates);
              for (const Dates of scheduledDate) {
                console.log(Dates);
                let date = new Date(Dates);
                let todayDate = new Date(formattedTodayDateWithoutComma);
                if (todayDate > date) {
                  console.log("Today's date is greater than both date");
                  console.log(booking);
                  dispatch(UpdatetheBookingStatus(booking._id));
                } else {
                  console.log("Today's date is not greater than both date");
                }
              }
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [buttonStates, setButtonStates] = useState([]);

  const isWithinScheduledTime = (scheduledDate, startTime, endTime) => {
    if (!startTime || !endTime) {
      console.error("startTime or endTime is undefined", {
        startTime,
        endTime,
      });
      return false;
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const scheduledDateTimeStart = new Date(scheduledDate);
    const scheduledDateTimeEnd = new Date(scheduledDate);

    scheduledDateTimeStart.setHours(startHour, startMinute);
    scheduledDateTimeEnd.setHours(endHour, endMinute);

    const tenMinutesBefore = new Date(scheduledDateTimeStart);
    tenMinutesBefore.setMinutes(tenMinutesBefore.getMinutes() - 10);

    const currentTime = new Date();

    console.log("Current Time:", currentTime);
    console.log("Scheduled Date:", scheduledDate);
    console.log("Scheduled Start Time:", scheduledDateTimeStart);
    console.log("Scheduled End Time:", scheduledDateTimeEnd);
    console.log("Ten Minutes Before Start Time:", tenMinutesBefore);

    return (
      currentTime >= tenMinutesBefore && currentTime <= scheduledDateTimeEnd
    );
  };

  useEffect(() => {
    const newButtonStates = Bookings?.map((booking) => {
      let isEnabled = false;
      for (let dateArray of booking?.Scheduled_Dates) {
        for (let dateObj of dateArray) {
          const date = Object.keys(dateObj)[0];
          const timeSlots = dateObj[date];
          if (timeSlots && timeSlots.length > 0) {
            const slot = timeSlots[0];
            if (slot && slot?.start && slot?.end) {
              if (isWithinScheduledTime(date, slot?.start, slot?.end)) {
                isEnabled = true;
                break;
              }
            }
          }
        }
        if (isEnabled) break;
      }
      return isEnabled;
    });
    setButtonStates(newButtonStates);
  }, [Bookings]);

  return (
    <>
      <div className="Dash_mainPage_style">
        <h6>Student Dashboard</h6>
        <div className="Admin-Dash_contnet_box">
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_div_img"
              src="https://img.freepik.com/free-vector/university-student-cap-mortar-board-diploma_3446-334.jpg?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=sph"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Total Lectures
            </span>
            <span style={{ color: "grey" }}>{totalLectures}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/9517/9517233.png?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=ais"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Complete Sessions
            </span>
            <span style={{ color: "grey" }}>{completedSessions}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/609/609183.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Remaining Sessions
            </span>
            <span style={{ color: "grey" }}>{pendingOrScheduledSessions}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Cancelled Sessions
            </span>
            <span style={{ color: "grey" }}>{cancelledSessions}</span>
          </div>
        </div>
        <div className="Admin-Dash_list_box">
          <div className="Admin-Dash_student_list_box">
            <h6>Meetings</h6>
            <div className="Admin-Dash_student_list_div">
              <table className="table  table-responsive table-borderless">
                <thead className="table-transparent">
                  <tr>
                    <th className="th">#</th>
                    <th className="th">Teacher Name</th>
                    <th className="th">Scheduled_Dates</th>
                    <th className="th">Status</th>
                    <th className="th">Join Button</th>
                  </tr>
                </thead>
                <tbody>
                  {fillterBookingData ? (
                    <>
                      {Bookings?.length > 0 ? (
                        Bookings?.map((Booking, index) => {
                          const isDateMatched = Booking?.Scheduled_Dates?.some(
                            (dateObj) => {
                              console.log(dateObj);
                              if (dateObj !== null && dateObj !== undefined) {
                                for (const [key, value] of Object?.entries(
                                  dateObj
                                )) {
                                  for (const innerKey in value) {
                                    if (typeof value[innerKey] === "object") {
                                      if (innerKey === fillterDataValue) {
                                      }
                                    }
                                    return innerKey === fillterDataValue;
                                  }
                                }
                              }
                            }
                          );
                          if (isDateMatched) {
                            return (
                              <tr
                                style={{
                                  boxShadow:
                                    "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
                                }}
                                key={Booking?._id}
                              >
                                <td className="td">{index + 1}</td>
                                <td className="td">
                                  {Booking?.Teacher_ID?.map(
                                    (teacher, index) => {
                                      return teacher?.Username;
                                    }
                                  )}
                                </td>
                                <td className="td">
                                  {Booking?.Scheduled_Dates?.map(
                                    (dateObj, index) => {
                                      if (dateObj !== null) {
                                        const date = Object.keys(dateObj)[0];
                                        const timeSlots = dateObj[date];

                                        return (
                                          <div key={index}>
                                            {Object?.keys(timeSlots).map(
                                              (date) => (
                                                <div key={date}>
                                                  <p>Date: {date}</p>
                                                  <ul>
                                                    {timeSlots[date].map(
                                                      (slot, index) => (
                                                        <li key={index}>
                                                          {slot?.start} -{" "}
                                                          {slot?.end}
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </td>
                                <td className="td">{Booking?.Status}</td>
                                <td className="tdexternal">
                                  <div
                                    key={Booking?._id}
                                    className="d-flex flex-row-reverse gap-1 align-items-center"
                                  >
                                    <button
                                      onClick={() => roomHandler(Booking?._id)}
                                      className={`btn meetingbtn w-100 ${
                                        buttonStates[index] // Check individual button's state
                                          ? "btn-outline-success" // Green outline if enabled
                                          : "btn-secondary" // Grey background if disabled
                                      }`}
                                      disabled={!buttonStates[index]} // Disable button based on individual state
                                    >
                                      Join Room
                                    </button>
                                    {!buttonStates[index] && (
                                      <>
                                        <Tooltip title="The Join Room button will be enabled 10 minutes before the meeting starts.">
                                          <FaRegQuestionCircle
                                            className="fs-5"
                                            data-tip
                                            data-for="joinRoomTooltip"
                                          />
                                        </Tooltip>
                                      </>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => DispatchHandler()}
                                    className="btn btn-outline-warning meetingbtn mt-2"
                                  >
                                    Your Material
                                  </button>
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })
                      ) : (
                        <tr>
                          <td colSpan="4">No Bookings available</td>
                        </tr>
                      )}
                    </>
                  ) : (
                    <>
                      {Bookings?.length > 0 ? (
                        Bookings.map((Booking, index) => (
                          <tr
                            className={
                              Booking?.Status === "Cancelled"
                                ? "cancelled-row"
                                : ""
                            }
                            style={{
                              boxShadow:
                                "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
                            }}
                            key={Booking?._id}
                          >
                            <td className="td">{index + 1}</td>
                            <td className="td">
                              {Booking?.Teacher_ID?.map(
                                (teacher) => teacher?.Username
                              ).join(", ")}
                            </td>
                            <td className="td">
                              {Booking?.Scheduled_Dates?.map(
                                (dateObj, dateIndex) => {
                                  if (dateObj !== null) {
                                    const date = Object.keys(dateObj)[0];
                                    const timeSlots = dateObj[date];

                                    return (
                                      <div key={dateIndex}>
                                        {Object?.keys(timeSlots).map((date) => (
                                          <div key={date}>
                                            <p>Date: {date}</p>
                                            <ul>
                                              {timeSlots[date].map(
                                                (slot, index) => {
                                                  return (
                                                    <li key={index}>
                                                      {slot?.start} - {slot?.end}
                                                    </li>
                                                  );
                                                }
                                              )}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  }
                                  return null;
                                }
                              )}
                            </td>
                            <td
                              className={
                                Booking?.Status === "Cancelled"
                                  ? "td cancelled-status"
                                  : "td"
                              }
                            >
                              {Booking?.Status}
                            </td>
                            <td className="tdexternal">
                              <div
                                key={Booking?._id}
                                className="d-flex flex-row-reverse gap-1 align-items-center"
                              >
                                <button
                                  onClick={() => roomHandler(Booking?._id)}
                                  style={{ width: "90%" }}
                                  className={`btn meetingbtn  ${
                                    buttonStates[index] // Check individual button's state
                                      ? "btn-outline-success" // Green outline if enabled
                                      : "btn-secondary" // Grey background if disabled
                                  }`}
                                  disabled={!buttonStates[index]} // Disable button based on individual state
                                >
                                  Join Room
                                </button>
                                {!buttonStates[index] && (
                                  <>
                                    <Tooltip title="The Join Room button will be enabled 10 minutes before the meeting starts.">
                                      <FaRegQuestionCircle
                                        className="fs-5"
                                        data-tip
                                        data-for="joinRoomTooltip"
                                      />
                                    </Tooltip>
                                  </>
                                )}
                              </div>
                              <div className="text-end">
                                <button
                                  onClick={() => DispatchHandler()}
                                  style={{ width: "90%" }}
                                  className="btn btn-outline-warning meetingbtn mt-2"
                                >
                                  Your Material
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">No bookings available</td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="Admin-Dash_student_calender_box">
            <h6>Events - 2023 to 2024</h6>
            <br />
            <Calendar
              value={date}
              prev2Label={false}
              next2Label={false}
              tileContent={tileContent}
              onChange={handleCalendarClick}
            />
          </div>
        </div>
      </div>
      {OwncloudFormPopup && (
        <OwncloudSignupFormPopup handleClose={closeOwncloudSignupFormPopup} />
      )}
    </>
  );
};

export default StudentDash;
