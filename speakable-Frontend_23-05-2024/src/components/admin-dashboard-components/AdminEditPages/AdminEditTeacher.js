import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Getcourses } from "../../../store/actions/coursesActions";
import {
  GetTeachers,
  imageUpload,
  updateTeacher,
} from "../../../store/actions/teachersActions";
import AdminNav from "../AdminNav";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import Deleteimage from "../Delete.png";
import { useLocation } from "react-router-dom";

const AdminEditTeacher = () => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courseslist);
  const teachers = useSelector((state) => state.teachers.AllTeacherlist);
  const currentTeacher = teachers.find((teacher) => teacher._id === id);
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editModalIndex, setEditModalIndex] = useState(null);
  const [editModalDate, setEditModalDate] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editModalTimeIndex, setEditModalTimeIndex] = useState(null);
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to open the edit modal and populate with existing time slot
  const handleEditTime = (index, date, timeIndex) => {
    const availability = formData.Availability[index];
    const selectedTimeSlot = availability[date][timeIndex];
    setEditStartTime(selectedTimeSlot.start);
    setEditEndTime(selectedTimeSlot.end);
    setIsEditModalVisible(true);
    setEditModalIndex(index);
    setEditModalDate(date);
    setEditModalTimeIndex(timeIndex);
  };

  const handleEditModalOk = (index, date, timeIndex) => {
    const timeSlotsArray = formData.Availability[index][date];
    if (timeSlotsArray && timeIndex >= 0 && timeIndex < timeSlotsArray.length) {
      const updatedTimeSlotsArray = timeSlotsArray.map((timeSlot, idx) => {
        if (idx !== timeIndex) return timeSlot;
        return { ...timeSlot, start: editStartTime, end: editEndTime };
      });
      const updatedAvailability = [...formData.Availability];
      updatedAvailability[index] = {
        ...updatedAvailability[index],
        [date]: updatedTimeSlotsArray,
      };
      console.log(updatedAvailability, "---- updatedAvailability --");
      setFormData({ ...formData, Availability: updatedAvailability });
    }
    setIsEditModalVisible(false);
  };

  // Function to handle cancellation of edit modal
  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Phone_Number: "",
    Address: "",
    Courses_assign: [],
    Purchase_Price: "",
    Description: "",
    Short_Title: "",
    Email: "",
    Availability: [],
    Profile_Image: [],
    SocialLinks: [
      { platform: "facebook", link: "" },
      { platform: "twitter", link: "" },
      { platform: "instagram", link: "" },
    ],
  });

  useEffect(() => {
    if (currentTeacher) {
      const [first, ...last] = currentTeacher.Username.split(" ");
      setFirstName(first);
      setLastName(last.join(" "));
      setFormData({ ...currentTeacher, Username: `${first} ${last}` });
    }
  }, []);
  console.log(formData);

  useEffect(() => {
    dispatch(Getcourses());
    dispatch(GetTeachers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (courseid) => {
    setFormData((prevData) => {
      const isSelected = prevData.Courses_assign.some(
        (course) => course._id === courseid
      );
      if (isSelected) {
        return {
          ...prevData,
          Courses_assign: prevData.Courses_assign.filter(
            (course) => course._id !== courseid
          ),
        };
      } else {
        return {
          ...prevData,
          Courses_assign: [...prevData.Courses_assign, { _id: courseid }],
        };
      }
    });
  };

  const handleFileUpload = async (event) => {
    const image = event.target.files[0];
    const uploadResult = await dispatch(imageUpload(image));
    setFormData({
      ...formData,
      Profile_Image: formData.Profile_Image?.length
        ? [...formData.Profile_Image, uploadResult.payload]
        : [uploadResult.payload],
    });
  };

  const handleSocialLinkChange = (index, platform, value) => {
    setFormData((prevData) => {
      const updatedSocialLinks = [...prevData.SocialLinks];
      updatedSocialLinks[index] = {
        ...updatedSocialLinks[index],
        platform,
        link: value,
      };
      return {
        ...prevData,
        SocialLinks: updatedSocialLinks,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherId = id;
    const newUsername = `${firstName} ${lastName}`;
    // Update formData with new username and other data
    const updatedData = { ...formData, Username: newUsername };
    console.log(updatedData, "------- befor submit");
    try {
      // console.log(formData);
      await dispatch(
        updateTeacher({
          teacherId,
          updatedData,
        })
      );
      // navigate("/Admin-Dashboard/Teachers");
    } catch (error) {
      console.error("Error editing teacher:", error);
    }
  };

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      Profile_Image: [...formData.Profile_Image.filter((img) => img !== val)],
    });
  };

  const handleDeleteAvailability = () => {
    setFormData((prevData) => ({
      ...prevData,
      Availability: [],
    }));
  };

  const handleAddAvailability = (id) => {
    const newUsername = `${firstName} ${lastName}`;
    const updatedData = { ...formData, Username: newUsername };
    navigate(`/Admin-Dashboard/Teachers/edit-teacher/add-availability/${id}`, {
      state: { updatedData },
    });
  };

  const handleDeleteTime = (index, date, timeIndex) => {
    setFormData((prevFormData) => {
      const updatedAvailability = [...prevFormData.Availability];
      const dateObj = updatedAvailability[index];
      const timeSlots = dateObj[date];
      const newTimeSlots = timeSlots?.filter((time, idx) => idx !== timeIndex);
      const newDateObj = { ...dateObj, [date]: newTimeSlots };
      if (newTimeSlots === undefined || newTimeSlots.length === 0) {
        const updatedDateObj = { ...updatedAvailability[index] };
        delete updatedDateObj[date];
        updatedAvailability[index] = updatedDateObj;
        if (
          updatedAvailability[index] &&
          Object.keys(updatedAvailability[index]).length === 0
        ) {
          updatedAvailability.splice(index, 1);
        }
      } else {
        updatedAvailability[index] = newDateObj;
      }
      return {
        ...prevFormData,
        Availability: updatedAvailability,
      };
    });
  };

  const hasAvailability = formData.Availability.length > 0;
  console.log(formData.Availability);

  useEffect(() => {
    let availability = formData.Availability;
    setTimeSlots(...availability, timeSlots);
    console.log(availability);
  }, [formData.Availability]);

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

  // const handleDeleteSlot = (index) => {
  //   const updatedTimeSlots = { ...timeSlots };
  //   const dateKey = selectedDate.toDateString();
  //   updatedTimeSlots[dateKey].splice(index, 1);
  //   setTimeSlots(updatedTimeSlots);
  // };

  // const handleRepeatSlots = () => {
  //   if (startTime && endTime) {
  //     const selectedWeekday = selectedDate.getDay();
  //     const selectedMonth = selectedDate.getMonth();
  //     const selectedYear = selectedDate.getFullYear();
  //     const daysInMonth = new Date(
  //       selectedYear,
  //       selectedMonth + 1,
  //       0
  //     ).getDate();
  //     const updatedTimeSlots = { ...timeSlots };

  //     for (let day = 1; day <= daysInMonth; day++) {
  //       const currentDate = new Date(selectedYear, selectedMonth, day);
  //       if (currentDate.getDay() === selectedWeekday) {
  //         const dateKey = currentDate.toDateString();
  //         if (!updatedTimeSlots[dateKey]) {
  //           updatedTimeSlots[dateKey] = [];
  //         }
  //         updatedTimeSlots[dateKey].push({ start: startTime, end: endTime });
  //       }
  //     }

  //     setTimeSlots(updatedTimeSlots);
  //     setModalOpen(false);
  //   } else {
  //     alert("Please select both start and end time before repeating.");
  //   }
  // };

  const handleCalendarClick = (value) => {
    setSelectedDate(value);
    setModalOpen(true);
  };

  // const formatTime = (time) => {
  //   const [hours, minutes] = time.split(":");
  //   const formattedHours = parseInt(hours) % 12 || 12;
  //   const ampm = parseInt(hours) < 12 ? "AM" : "PM";
  //   return `${formattedHours}:${minutes} ${ampm}`;
  // };

  const tileClassName = ({ date }) => {
    const dateKey = date.toDateString();
    return timeSlots[dateKey] && timeSlots[dateKey].length > 0
      ? "has-slots"
      : null;
  };

  // const slotsForSelectedDate = timeSlots[selectedDate.toDateString()] || [];

  // const handleSubmitCalendar = async (e) => {
  //   e.preventDefault();
  //   const teacherId = id;
  //   try {
  //     // console.log(formData);
  //     await dispatch(
  //       updateTeacher({
  //         teacherId,
  //         updatedData: {
  //           Username: formData.Username,
  //           Password: formData.Password,
  //           Phone_Number: formData.Phone_Number,
  //           Address: formData.Address,
  //           Courses_assign: formData.Courses_assign,
  //           Description: formData.Description,
  //           Short_Title: formData.Short_Title,
  //           Purchase_Price: formData.Purchase_Price,
  //           Availability_Date: [timeSlots],
  //           Profile_Image: formData.Profile_Image,
  //           SocialLinks: formData.SocialLinks,
  //           Email: formData.Email,
  //         },
  //       })
  //     );
  //     navigate("/Admin-Dashboard/Teachers");
  //   } catch (error) {
  //     console.error("Error editing teacher:", error);
  //   }
  // };

  return (
    <>
      {/* <AdminNav /> */}
      <div className="Add_Teachers_main_div">
        <h5>Edit Teacher Profile</h5>
        <form onSubmit={handleSubmit}>
          {/* Image div */}
          <div className="Addteacherimage_box">
            {formData.Profile_Image?.map((md, index) => {
              return (
                <div
                  className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2"
                  key={index}
                >
                  <a href="#">
                    <img
                      className="w-100 active"
                      src={"https://ik.imagekit.io/8s3jwexmv/" + md}
                      alt={`Image ${index + 1}`}
                    />
                  </a>
                  <span
                    className="badge bg-danger badge-pill badge-round ml-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleImageRemoval(md);
                    }}
                  >
                    Delete
                  </span>
                </div>
              );
            })}
          </div>
          {/* Image input Links */}
          {formData.Profile_Image?.length < 10 && (
            <div className="widthFormField">
              <div className="card-body">
                <p style={{ fontSize: "12px" }} className="card-text">
                  Select image file to upload.
                </p>
                {/* Basic file uploader */}
                <input
                  className="form-control widthFormField"
                  encType="multipart/form-data"
                  type="file"
                  name="images"
                  id="formFile"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}
          <div className="form_group_div  mt-2">
            {/* Teacher Links */}
            <div className="form-group  widthFormField">
              <input
                type="text"
                className="form-control"
                placeholder="Teacher First Name"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group widthFormField">
              <input
                type="text"
                className="form-control"
                placeholder="Teacher Last Name"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            {/* Description Links */}
            <div className="form-group widthFormField ">
              <input
                type="text"
                className="form-control"
                id="Description"
                name="Description"
                placeholder="Description"
                value={formData.Description}
                onChange={handleChange}
                required
              />
            </div>
            {/* Phone number Links */}
          </div>
          <div className="form_group_div mt-2">
            {/* Password Links */}
            <div className="form-group widthFormField">
              <PhoneInput
                country={"us"}
                className="mt-2"
                value={formData.Phone_Number}
                onChange={(phone, country, e, formattedValue) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    Phone_Number: formattedValue,
                  }));
                }}
                inputProps={{
                  name: "Phone_Number",
                  required: true,
                  autoFocus: true,
                  style: { marginLeft: "40px", width: "260px" },
                }}
                required
              />
            </div>
            <div className="form-group widthFormField">
              <input
                type="Password"
                className="form-control"
                id="Password"
                name="Password"
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Address Links */}
            <div className="form-group widthFormField">
              <input
                type="text"
                className="form-control"
                id="Address"
                name="Address"
                placeholder="Address"
                value={formData.Address}
                onChange={handleChange}
                required
              />
            </div>
            {/* Short Title Links */}
          </div>
          <div className="form_group_div mt-2">
            {/* Course Assign Links */}
            <div className="form-group widthFormField">
              <input
                type="text"
                className="form-control"
                id="Short_Title"
                placeholder="Short_Title"
                name="Short_Title"
                value={formData.Short_Title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Purchase Links */}
            <div className="form-group widthFormField">
              <input
                type="number"
                className="form-control"
                id="Purchase_Price"
                name="Purchase_Price"
                placeholder="Purchase Price"
                value={formData.Purchase_Price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group widthFormField">
              <input
                type="text"
                className="form-control"
                id="Email"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email Links */}
          </div>
          {/* Social Links */}

          <div className="form_group_div mt-2">
            {formData.SocialLinks?.map((socialLink, index) => (
              <div key={index} className="social-link-item widthFormField">
                <div className="form-group justify-content-between">
                  <input
                    type="text"
                    className="form-control "
                    placeholder={socialLink.platform}
                    value={socialLink.link}
                    onChange={(e) =>
                      handleSocialLinkChange(
                        index,
                        socialLink.platform,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="form-group widthFormField">
            <label htmlFor="Status">Select Courses</label> &nbsp;&nbsp;
            {courses?.map((values) => (
              <div key={values._id} className="form-check">
                <input
                  type="checkbox"
                  id={values._id}
                  value={values._id}
                  checked={formData.Courses_assign.some(
                    (course) => course._id === values._id
                  )}
                  onChange={() => handleCheckboxChange(values._id)}
                  className="form-check-input"
                />
                <label htmlFor={values._id} className="form-check-label">
                  {values.Course_Name}
                </label>
              </div>
            ))}
          </div>
          {/* Availability Links */}

          <div className="form-group mt-2">
            <div className="font-weight-bold"> Select the Date</div>

            <div className="calendar">
              <Calendar
                onChange={handleCalendarClick}
                value={selectedDate}
                tileClassName={tileClassName}
              />
            </div>

            <label htmlFor="availability">Availability</label>
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
                                <div className="TimeItemBox" key={timeIndex}>
                                  <label>
                                    {time.start} - {time.end}
                                  </label>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-delete-teacher"
                                    onClick={() =>
                                      handleEditTime(index, date, timeIndex)
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-delete-teacher"
                                    onClick={() =>
                                      handleDeleteTime(index, date, timeIndex)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    }
                  )}
                </div>
                <div className="d-flex flex-column">
                  <button
                    type="button"
                    className="btn btn-outline-success btn-delete-teacher delete-time mb-3"
                    onClick={() => handleAddAvailability(id)}
                  >
                    Add More Availability
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-delete-teacher delete-time"
                    onClick={() => handleDeleteAvailability(index)}
                  >
                    Delete Entire Availability
                  </button>
                </div>
              </div>
            ))}

            {!hasAvailability && (
              <button
                type="button"
                onClick={() => handleAddAvailability(id)}
                className="btn btn-outline-success mt-3 w-100"
              >
                Add Availability
              </button>
            )}
          </div>

          {/* Submit button */}
          {hasAvailability && (
            <button
              type="submit"
              className="btn btn-outline-success mt-3 w-100"
            >
              Submit
            </button>
          )}
          <Modal
            title="Edit Time Slot"
            open={isEditModalVisible} // changed from open to visible
            onOk={() =>
              handleEditModalOk(
                editModalIndex,
                editModalDate,
                editModalTimeIndex
              )
            }
            onCancel={handleEditModalCancel}
          >
            <label htmlFor="editStartTime">Start Time:</label>
            <Input
              type="time"
              id="editStartTime"
              value={editStartTime}
              onChange={(e) => setEditStartTime(e.target.value)}
            />
            <label htmlFor="editEndTime">End Time:</label>
            <Input
              type="time"
              id="editEndTime"
              value={editEndTime}
              onChange={(e) => setEditEndTime(e.target.value)}
            />
          </Modal>
        </form>
      </div>
    </>
  );
};

export default AdminEditTeacher;
