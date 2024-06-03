import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTeachers,
  fetchTeacherDetails,
} from "../../store/actions/teachersActions";
import { fetchAllstudents } from "../../store/actions/studentsActions";
import { fetchAllpackages } from "../../store/actions/packagesActions";
import { ToastContainer, toast } from "react-toastify";
import { Add_booking } from "../../store/actions/bookingActions";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";

const AdminAddBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teachers = useSelector((state) => state.teachers.AllTeacherlist);
  const teacherbyID = useSelector((state) => state.teachers.TeacherDetails);
  // console.log(teacherbyID);
  const packages = useSelector((state) => state.packages.packageslist);
  const students = useSelector((state) => state.students.AllStudentlist);

  useEffect(() => {
    dispatch(GetTeachers());
    dispatch(fetchAllstudents());
  }, [dispatch]);

  const [note_for_Teacher, setNote_for_Teacher] = useState("");
  const [teacher_ID, setTeacher_ID] = useState("");
  const [package_ID, setPackage_ID] = useState("");
  const [student_ID, setStudent_ID] = useState("");
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState(new Date());
  const [status, setStatus] = useState("");
  const [requiredMeetings, setRequiredMeetings] = useState([]);
  // console.log(teacherbyID);
  useEffect(() => {
    dispatch(fetchTeacherDetails(teacher_ID));
    dispatch(fetchAllpackages());
  }, [dispatch, teacher_ID]);

  useEffect(() => {
    // const required = meetings.filter((meeting)=> meeting.Teacher_ID.includes(teacher_ID) )
    // console.log(required)
    // setRequiredMeetings(required)
  }, [teacher_ID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any of the fields are empty
    if (
      !note_for_Teacher ||
      !student_ID ||
      !teacher_ID ||
      !package_ID ||
      !scheduledDate ||
      !timeSlot ||
      !status
    ) {
      // Find the name of the empty field
      const emptyFieldName = !note_for_Teacher
        ? "Note for Teacher"
        : !student_ID
        ? "Student"
        : !teacher_ID
        ? "Teacher"
        : !package_ID
        ? "Package"
        : !scheduledDate
        ? "Scheduled Date"
        : !timeSlot
        ? "Time Slot"
        : !status
        ? "Status"
        : "Meeting ID";

      // Display a toast with the name of the empty field
      toast.error(`Please fill in the ${emptyFieldName} field`);
      return;
    }
    const formData = {
      Note_for_teacher: note_for_Teacher,
      Student_ID: student_ID,
      Teacher_ID: teacher_ID,
      Package_ID: package_ID,
      Status: status,
      Scheduled_Date: scheduledDate,
      Time_Slot: timeSlot,
    };
    // console.log(formData)
    try {
      await dispatch(Add_booking(formData));
      // Display a success toast after successful submission
      toast.success("Booking created successfully");
    } catch (error) {
      console.error("Error creating booking:", error);
      // Display an error toast if there's an error
      toast.error("Error creating booking");
    }

    // Reset form fields after submission
    setNote_for_Teacher("");
    setStudent_ID("");
    setTeacher_ID("");
    setPackage_ID("");
    setScheduledDate(new Date());
    setTimeSlot(new Date());
    setStatus("");

    // Redirect to the desired location
    navigate("/Admin-Dashboard/Bookings");
  };

  return (
    <>
      <AdminNav />
      <div className="AddCoursestyle">
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="note_for_Teacher">Note for teacher</label>
            <input
              type="text"
              className="form-control"
              id="note_for_Teacher"
              name="note_for_Teacher"
              value={note_for_Teacher}
              onChange={(e) => setNote_for_Teacher(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="student_ID">Select Student</label> &nbsp;&nbsp;
            <select
              value={student_ID}
              onChange={(e) => setStudent_ID(e.target.value)}
            >
              <option value="">Select Student</option>
              {students?.map((values, index) => {
                return (
                  <option key={values._id} value={values._id}>
                    {values.Username}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="teacher_ID">Select Teacher</label> &nbsp;&nbsp;
            <select
              value={teacher_ID}
              onChange={(e) => setTeacher_ID(e.target.value)}
            >
              <option value="">Select Teacher</option>
              {teachers?.map((values) => {
                return (
                  <option key={values._id} value={values._id}>
                    {values.Username}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="package_ID">Select Package</label> &nbsp;&nbsp;
            <select
              value={package_ID}
              onChange={(e) => setPackage_ID(e.target.value)}
            >
              <option value="">Select Package</option>
              {packages?.map((values, index) => {
                return (
                  <option key={values._id} value={values._id}>
                    {values.Package_Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="scheduledDate">Schedule Date</label>&nbsp;&nbsp;
            <select
              value={scheduledDate}
              onChange={(e) => {
                setScheduledDate(e.target.value);
              }}
            >
              <option>Select Date</option>
              {teacherbyID?.Availability?.map((values, index) =>
                Object.keys(values).map((date, innerIndex) => (
                  <option key={innerIndex} value={date}>
                    {date}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timeSlot">Time Slot</label> &nbsp;&nbsp;
            <select
              value={timeSlot}
              onChange={(e) => {
                setTimeSlot(e.target.value);
              }}
            >
              <option>Select Time Slot</option>
              {teacherbyID?.Availability?.map((values, index) =>
                Object.keys(values).map((date, index) =>
                  values[date].map((slot, slotIndex) => (
                    <option
                      key={`${date}-${slotIndex}`}
                      value={`${date} ${slot.start}`}
                    >
                      {`${date} ${slot.start} - ${slot.end}`}
                    </option>
                  ))
                )
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="Status">Select Status</label> &nbsp;&nbsp;
            <select
              name="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Select Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminAddBooking;
