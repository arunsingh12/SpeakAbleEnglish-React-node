import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteStudent, fetchStudentDetails } from '../../../store/actions/studentsActions';
import { GetBookingsByStudentID } from '../../../store/actions/bookingActions';

const AdminStudentsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentData = useSelector((state) => state.students.studentDetails);

  console.log(studentData);
  const StudentBooking = useSelector(
    (state) => state.bookings.StudentID_Booking
  );
  console.log(StudentBooking);

  const totalLectures = StudentBooking?.length;
  // Function to count completed sessions
  function countCompletedSessions(StudentBooking) {
    if (!StudentBooking) {
      return 0;
    }

    let completedSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of StudentBooking) {
      // Check if the status is "Completed"
      if (Booking.Status === "Completed") {
        completedSessionsCount++;
      }
    }
    return completedSessionsCount;
  }

  const completedSessions = countCompletedSessions(StudentBooking);

  // Function to count sessions with "Pending" or "Scheduled" status
  function countPendingOrScheduledSessions(StudentBooking) {
    if (!StudentBooking) {
      return 0;
    }

    let pendingOrScheduledSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of StudentBooking) {
      // Check if the status is either "Pending" or "Scheduled"
      if (Booking.Status === "Rescheduled" || Booking.Status === "Scheduled") {
        pendingOrScheduledSessionsCount++;
      }
    }
    return pendingOrScheduledSessionsCount;
  }

  // Call the function with your bookings data
  const pendingOrScheduledSessions = countPendingOrScheduledSessions(
    StudentBooking
  );

  // Function to count sessions with "Cancelled" status
  function countCancelledSessions(StudentBooking) {
    if (!StudentBooking) {
      return 0;
    }

    let cancelledSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of StudentBooking) {
      // Check if the status is "Cancelled"
      if (Booking.Status === "Cancelled") {
        cancelledSessionsCount++;
      }
    }
    return cancelledSessionsCount;
  }

  // Call the function with your bookings data
  const cancelledSessions = countCancelledSessions(StudentBooking);

  // --------------------------------------------------------------------------

  useEffect(() => {
    dispatch(fetchStudentDetails(id));
    dispatch(GetBookingsByStudentID(id));
  }, [dispatch, id]);

  const EditStudentHandler = (id) => {
    // console.log(id)
    // e.preventDefault()
    navigate(`/Admin-Dashboard/Students/edit-student/${id}`);
  };

  const DeleteStudentHandler = (id) => {
    // console.log(id)
    dispatch(DeleteStudent(id));
    navigate(`/Admin-Dashboard/Students`);
  };

  return (
    <div className="Admin_teachers_detail_main_page">
      {/* <AdminNav /> */}
      {studentData && (
        <div className="Admin_teachers_detail_section w-100">
          <h5>Student Details</h5>
          <div className="Admin_teachers_detail_section_header_div">
            {studentData?.Profile_Image?.length !== 0 ? (
              <div className="Admin_teachers_detail_section_img_div">
                <img
                  src={`https://ik.imagekit.io/8s3jwexmv/${studentData?.Profile_Image}`}
                  alt=""
                />
              </div>
            ) : (
              <div className="Admin_teachers_detail_section_no_img">
                {studentData?.firstName?.slice(0, 1)?.toUpperCase()}
              </div>
            )}

            <div className="Admin_teachers_detail_section_header">
              <div className="Admin_teachers_detail_section_header_name">
                <p className="font-weight-bold pTag">{studentData?.Username}</p>
                <p className="font-weight-bold pTag">
                  FirstName : {studentData?.firstName}
                </p>
                <p className="font-weight-bold pTag">
                  LastName : {studentData.lastName}
                </p>
                {/* LastName : {studentData.lastName} */}
                <p className="font-weight-bold pTag">
                  Nickname : {studentData?.Nickname}
                </p>
                <p className="pTag">{studentData?.Email}</p>
                <p className="pTag">{studentData?.Phone_Number}</p>
                {studentData?.Courses_assign?.map((course) => (
                  <span key={course?._id}>
                    <p className="teacher_card_course_span_details pTag">
                      {course?.Course_Name}
                    </p>
                  </span>
                ))}
              </div>
            </div>
            <div className="Admin_teachers_detail_section_col">
              <div className="Admin_teachers_detail_section_col_text text-center">
                <h6>Total Sessions</h6>
                <span>{totalLectures}</span>
              </div>
              <div className="Admin_teachers_detail_section_col_text text-center">
                <h6>Completed Sessions</h6>
                <span className="text-success">{completedSessions}</span>
              </div>
              <div className="Admin_teachers_detail_section_col_text text-center">
                <h6>Remaining Sessions</h6>
                <span className="text-warning">
                  {pendingOrScheduledSessions}
                </span>
              </div>
              <div className="Admin_teachers_detail_section_col_text text-center">
                <h6>Cancelled Sessions</h6>
                <span className="text-danger">{cancelledSessions}</span>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex mt-2 justify-content-end">
            <button
              onClick={(e) => EditStudentHandler(studentData?._id)}
              className="btn btn-outline-success mx-3 w-25"
            >
              Edit your profile
            </button>
            <button
              onClick={(e) => DeleteStudentHandler(studentData?._id)}
              className="btn btn-outline-danger w-25 "
            >
              Delete Student
            </button>
          </div>
          {/* Add other properties as needed */}
        </div>
      )}
    </div>
  );
}

export default AdminStudentsDetails