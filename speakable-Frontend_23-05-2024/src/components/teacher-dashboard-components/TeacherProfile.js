import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../admin-dashboard-components/AdminNav";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { Input, Modal } from "antd";

const TeacherProfile = () => {
  const student = useSelector((state) => state.students.user);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState({});
  const navigate = useNavigate();
  console.log(student);

  useEffect(() => {
    let availability = student?.Availability;
    setTimeSlots(...availability, timeSlots);
    console.log(availability);
  }, [student]);

  const formData = student;
  const handleEditAvailability = (id) => {
    navigate(`/Teacher-dashboard/Edit-Availability/${id}`, {
      state: { formData },
    });
  };
  const handleCalendarClick = (value) => {
    console.log(value);
    setSelectedDate(value);
   
  };

  console.log(selectedDate);
  const tileClassName = ({ date }) => {
    const dateKey = date.toDateString();
    return timeSlots[dateKey] && timeSlots[dateKey].length > 0
      ? "has-slots"
      : null;
  };

  return (
    <>
      <AdminNav />
      <div className="StudentProfile_mainPage_style">
        <div className="StudentProfile_header_style">
          <div className="Profile_header_imgdiv">
            <img
              src={`https://ik.imagekit.io/8s3jwexmv/${student?.Profile_Image}`}
              alt=""
            />
          </div>
        </div>

        <div className="row StudentName_style">
          <h1 className="studentName">{student?.Username}</h1>
          <p className="studenttext">{student?.UserType}</p>
        </div>

        <div className="row">
          <div className="col-md-6 col-xs-12 ">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-person userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Email:</p>
                <p className="userDetailTextData">{student?.Email}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-geo-alt userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Address:</p>
                <p className="userDetailTextData">{student?.Address}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-telephone userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Phone:</p>
                <p className="userDetailTextData">{student?.Phone_Number}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-box-arrow-right userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Description</p>
                <p className="userDetailTextData">{student?.Description}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-box-arrow-right userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Short Title</p>
                <p className="userDetailTextData">{student?.Short_Title}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-box-arrow-right userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Availability</p>
                <p className="userDetailTextData">
                  <div className="calendar">
                    <Calendar
                      onChange={handleCalendarClick}
                      value={selectedDate}
                      tileClassName={tileClassName}
                    />
                    {formData?.Availability?.map((availability, index) => (
                      <div key={index} className="availability-item p-2 mb-2">
                        <div className="form-group">
                          {Object?.entries(availability)?.map(
                            ([date, times], dateIndex) => {
                              if (date === selectedDate.toDateString()) {
                                return (
                                  <div className="form-group" key={dateIndex}>
                                    <span>{date}</span>
                                    <div className="d-flex flex-wrap justify-content-center TimeListBox">
                                      {times?.map((time, timeIndex) => (
                                        <div
                                          className="TimeItemBox"
                                          key={timeIndex}
                                        >
                                          <ul>
                                            <li>
                                              {time.start} - {time.end}
                                            </li>
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              }
                            }
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </p>
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleEditAvailability(student._id)}
                >
                  Edit Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherProfile;
