import React, { useState, useEffect } from "react";
import Navbar from "./landingcomponents/Navbar";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { Signup_Student_With_Booking } from "../store/actions/studentsActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Search_Free_Package } from "../store/actions/packagesActions";
import { GetExistingTeacher_Availability } from "../store/actions/teachersActions";

const SceduleMeeting = () => {
    const [randomTeacher, setRandomTeacher] = useState(
      localStorage.getItem("RandomTeacherID") || ""
    );
    console.log(randomTeacher);
  const formatDate = (selectedDate, selectedTimeSlot) => {
    const formattedDateString = selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return selectedTimeSlot
      ? `${formattedDateString}, ${selectedTimeSlot}`
      : formattedDateString;
  };
  const [date, setDate] = useState(new Date());
  const [selectedtimeSlot, setSelectedTimeSlot] = useState(null);
  const [formattedDate, setFormattedDate] = useState(
    formatDate(new Date(), null)
  );
  const [showPopup, setShowPopup] = useState(false);
  const [Username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Phone_number, setPhone_number] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Availability, setAvailability] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [SelectedSlot, setSelectedSlot] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.students.isAuthenticated
  );

  const { TeacherID } = useParams();
  console.log(TeacherID);
  const userType = useSelector((state) => state.students.userType);
  const FreePackage = useSelector((state) => state.packages.FreePackage);

  const AvailableAvailability = useSelector(
    (state) => state.teachers.Teacher_Availabile_Slots
  );

  console.log(AvailableAvailability, " AvailableAvailability ------- ");

  useEffect(() => {
    if (isAuthenticated > 0) {
      switch (userType) {
        case "student":
          navigate("/Student-dashboard/dash");
          break;
        case "teacher":
          navigate("/Teacher-dashboard/dash");
          break;
        case "admin":
          navigate("/Admin-Dashboard/Dashboard");
          break;
        case "accountant":
          navigate("/Accontant-Dashboard/dash");
          break;
      }
    } else {
      // navigate("/");
    }
  }, [isAuthenticated, userType, navigate]);

  useEffect(() => {
    dispatch(Search_Free_Package());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetExistingTeacher_Availability(TeacherID));
  }, [dispatch]);

  useEffect(() => {
    if (AvailableAvailability) {
      setAvailability(AvailableAvailability);
    }
  }, [AvailableAvailability]);

  useEffect(() => {
    setFormattedDate(formatDate(date, selectedtimeSlot));
  }, [date, selectedtimeSlot]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedTimeSlot(null);
    const filteredSlots = Availability.map((avail) => {
      const availKeys = Object.keys(avail);
      const matchingKey = availKeys.find(
        (key) => key === newDate.toDateString()
      );
      if (matchingKey) {
        return { [matchingKey]: avail[matchingKey] };
      } else {
        return null; // Return null for non-matching dates
      }
    }).filter((slot) => slot !== null); // Filter out null entries

    // console.log(filteredSlots); // Log filtered availability slots
    // console.log(newDate.toDateString()); // Log the key you're using to access the object
    const matchedObject =
      filteredSlots.length > 0
        ? filteredSlots[0][newDate.toDateString()]
        : null;
    // console.log(matchedObject); // Log the matched object

    if (matchedObject) {
      setFilteredTimeSlots(
        matchedObject.map((time) => `${time.start} - ${time.end}`)
      );
      setSelectedSlot(filteredSlots);
    } else {
      setFilteredTimeSlots([]);
    }
  };

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleNextButtonClick = () => {
    if (formattedDate !== "" && selectedtimeSlot !== null) {
      setShowPopup(true);
    } else {
      toast.warning(
        "Formatted date string and selected time slot cannot be empty."
      );
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const lastCommaIndex = formattedDate.lastIndexOf(", ");
      let datePart = formattedDate.slice(0, lastCommaIndex);
      datePart = datePart.replace(/,/g, "");
      const timePart = formattedDate.slice(lastCommaIndex + 2);
      const [startDate, endDate] = timePart.split(" - ");
      console.log(SelectedSlot);
      console.log(datePart);
      let selectedIndex = SelectedSlot[0];
      // console.log(selectedIndex);
      // console.log(Object.keys(selectedIndex));
      // let matchingSlots = [];
      // for(const Object.keys(selectedIndex) in SelectedSlot ){

      // }

      let matchingSlots = [];

      for (const date in selectedIndex) {
        if (selectedIndex.hasOwnProperty(date)) {
          console.log(date, "date - -"); // Debug log to see the date being processed
          matchingSlots = selectedIndex[date].filter((slot) => {
            const { start, end } = slot;
            return start === startDate && end === endDate;
          });
        }
      }

      console.log(matchingSlots, `----------------matchingslot`);
      const ToFetchData = [
        {
          [datePart]: [...matchingSlots],
        },
      ];
      console.log(ToFetchData, `----- ToFetchData ----`);
      setSelectedSlot();
      await dispatch(
        Signup_Student_With_Booking({
          Username: `${firstName} ${lastName}`,
          firstName: firstName,
          lastName: lastName,
          Nickname: Nickname,
          Phone_Number: Phone_number,
          Password: Password,
          Email: Email,
          Teacher:randomTeacher,
          Scheduled_Dates: ToFetchData,
          Package_ID: FreePackage._id,
        })
      );
      await toast.success(
        "Student signup successfully and a new User in also Created in Our OwnCloud Server with Same Username and Password"
      );
      setUsername("");
      setPhone_number("");
      setPassword("");
      setEmail("");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Error during student signup");
    }
  };

const tileContent = ({ date, view }) => {
  console.log(date, "--date--");
  console.log(view, "--view--");

  if (view === "month") {
    const currentDate = new Date();
    console.log(currentDate, "currentDate");
    const dateString = date.toDateString();
    console.log(dateString, "dateString");
    const isAvailable = Availability?.some((avail) => {
      return Object.keys(avail).some((value) => {
        const availDate = new Date(value);
        console.log(availDate)
        return (
          availDate >= currentDate && availDate.toDateString() === dateString
        );
      });
    });

    return isAvailable ? <p className="bg-success text-white">A</p> : null;
  }
};

  return (
    <>
      <Navbar />
      <div className=" scheduledpage_main_div">
        <div className="scheduledpage_calender_div">
          <h6>Select the Date</h6>
          <Calendar
            onChange={handleDateChange}
            className="scheduledpage_calender"
            value={date}
            prev2Label={false}
            next2Label={false}
            tileContent={tileContent}
          />
        </div>
        {date > new Date() ? (
          <div className="scheduledpage_time_div">
            <h6>Select the time</h6>
            <div className="scheduledpage_timeslot">
              {filteredTimeSlots.length > 0 ? (
                filteredTimeSlots.map((timeSlot) => (
                  <button
                    key={timeSlot}
                    className="btn btn-outline-success p-1"
                    value={timeSlot}
                    onClick={() => handleTimeSlotChange(timeSlot)}
                  >
                    {timeSlot}
                  </button>
                ))
              ) : (
                <p>No availability</p>
              )}
            </div>
          </div>
        ) : (
          <p>Please select a date that is in the future</p>
        )}

        <div className="accordion scheduledpage_display_section">
          <h6>Details</h6>
          <p>Free Meeting</p>
          <p>{formattedDate}</p>
          <p>
            Google Meets meeting - you will receive the link at least{" "}
            <span style={{ color: "#258754" }}>
              <b>5 minutes </b>
            </span>
            before the meeting
          </p>
          <button
            className="btn btn-outline-success px-12"
            onClick={handleNextButtonClick}
          >
            Next
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup_header">
            <h5>Please SignUp!</h5>
          </div>
          <div className="popup_form_div">
            <form method="post" onSubmit={SubmitHandler}>
              {/* <input
                type="text"
                name="Username"
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                required
              /> */}
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="off"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="off"
                required
              />
              <input
                type="text"
                placeholder="Nick Name"
                name="Nickname"
                value={Nickname}
                onChange={(e) => setNickname(e.target.value)}
                autoComplete="off"
                required
              />

              <input
                type="Email"
                placeholder="Email"
                name="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
              <PhoneInput
                country={"us"}
                value={Phone_number}
                onChange={(phone, country, e, formattedValue) => {
                  setPhone_number(formattedValue);
                }}
                inputProps={{
                  name: "Phone_number",
                  required: true,
                  autoFocus: true,
                  style: { marginLeft: "40px" },
                }}
              />
              <input
                type="password"
                placeholder="Password"
                name="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                required
              />
              <>
                <button
                  type="submit"
                  className="btn btn-outline-success popup_closebtn"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success popup_closebtn"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </>
            </form>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default SceduleMeeting;
