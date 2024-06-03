import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DeleteTeacher,
  fetchTeacherBookings,
  fetchTeacherDetails,
} from "../../../store/actions/teachersActions";

const AdminTeachersDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teacherData = useSelector((state) => state.teachers.TeacherDetails);
  console.log(teacherData);
  const Teachers_Bookings_Status = useSelector(
    (state) => state.teachers.Teachers_Bookings_Status
  );
  console.log(Teachers_Bookings_Status);

  useEffect(() => {
    dispatch(fetchTeacherDetails(id));
    dispatch(fetchTeacherBookings(id));
  }, [dispatch, id]);



  const totalLectures = Teachers_Bookings_Status?.length;
  // Function to count completed sessions
  function countCompletedSessions(Teachers_Bookings_Status) {
    if (!Teachers_Bookings_Status) {
      return 0;
    }

    let completedSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of Teachers_Bookings_Status) {
      // Check if the status is "Completed"
      if (Booking.Status === "Completed") {
        completedSessionsCount++;
      }
    }
    return completedSessionsCount;
  }

  const completedSessions = countCompletedSessions(Teachers_Bookings_Status);

  // Function to count sessions with "Pending" or "Scheduled" status
  function countPendingOrScheduledSessions(Teachers_Bookings_Status) {
    if (!Teachers_Bookings_Status) {
      return 0;
    }

    let pendingOrScheduledSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of Teachers_Bookings_Status) {
      // Check if the status is either "Pending" or "Scheduled"
      if (Booking.Status === "Rescheduled" || Booking.Status === "Scheduled") {
        pendingOrScheduledSessionsCount++;
      }
    }
    return pendingOrScheduledSessionsCount;
  }

  // Call the function with your bookings data
  const pendingOrScheduledSessions = countPendingOrScheduledSessions(
    Teachers_Bookings_Status
  );

  // Function to count sessions with "Cancelled" status
  function countCancelledSessions(Teachers_Bookings_Status) {
    if (!Teachers_Bookings_Status) {
      return 0;
    }

    let cancelledSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of Teachers_Bookings_Status) {
      // Check if the status is "Cancelled"
      if (Booking.Status === "Cancelled") {
        cancelledSessionsCount++;
      }
    }
    return cancelledSessionsCount;
  }

  // Call the function with your bookings data
  const cancelledSessions = countCancelledSessions(Teachers_Bookings_Status);

  // --------------------------------------------------------------------------

  const [incomeOfTeacher, setIncomeOfTeacher] = useState(0);
  const PurchasePrice = teacherData?.Purchase_Price;
  useEffect(() => {
    const totalIncomeOfTeacher = () => {
      setIncomeOfTeacher(completedSessions * PurchasePrice);
    };

    totalIncomeOfTeacher();
  }, [completedSessions, PurchasePrice]);
  console.log(completedSessions, PurchasePrice);

  // --------------------------------------------------------------------------

  const EditTeacherHandler = (id) => {
    // console.log(id)
    // e.preventDefault()
    navigate(`/Admin-Dashboard/Teachers/edit-teacher/${id}`);
  };

  const DeleteTeacherHandler = (id) => {
    // console.log(id)
    dispatch(DeleteTeacher(id));
    navigate(`/Admin-Dashboard/Teachers`);
  };

  return (
    <div className="Admin_teachers_detail_main_page">
      {teacherData && (
        <div className="Admin_teachers_detail_section w-100">
          <h5>Teacher Details</h5>
          <div className="Admin_teachers_detail_section_header_div">
            {teacherData?.Profile_Image != "" ? (
              <div className="Admin_teachers_detail_section_img_div">
                <img
                  src={`https://ik.imagekit.io/8s3jwexmv/${teacherData?.Profile_Image}`}
                  alt=""
                />
              </div>
            ) : (
              <div className="Admin_teachers_detail_section_no_img">
                {teacherData.Username.slice(0, 1).toUpperCase()}
              </div>
            )}

            <div className="Admin_teachers_detail_section_header">
              <div className="Admin_teachers_detail_section_header_name">
                <p className="font-weight-bold">{teacherData.Username}</p>
                <p>{teacherData.Email}</p>
                <p>{teacherData.Phone_Number}</p>
                <div className="sociallink_div">
                  <Link
                    to={
                      teacherData?.SocialLinks &&
                      teacherData.SocialLinks[0]?.link
                    }
                  >
                    <i
                      style={{ textDecoration: "none", color: "black" }}
                      className="bi bi-facebook"
                    ></i>
                  </Link>
                  <Link
                    to={
                      teacherData?.SocialLinks &&
                      teacherData.SocialLinks[1]?.link
                    }
                  >
                    <i
                      style={{ textDecoration: "none", color: "black" }}
                      className="bi bi-twitter"
                    ></i>
                  </Link>
                  <Link
                    to={
                      teacherData?.SocialLinks &&
                      teacherData.SocialLinks[2]?.link
                    }
                  >
                    <i
                      style={{ textDecoration: "none", color: "black" }}
                      className="bi bi-instagram"
                    ></i>
                  </Link>
                </div>
                <h6 className="mt-3 mb-1"> Courses Assigned</h6>
                <ul>
                  {teacherData?.Courses_assign?.map((course) => (
                    <li key={course._id}>
                      <p className="text-start assigntedCourseTeacher">
                        {course.Course_Name}
                      </p>
                    </li>

                    // <span className='teacher_card_course_span_details' key={course._id}>{course.Course_Name}</span>
                  ))}
                </ul>
              </div>
            </div>
            <div className="Admin_teachers_detail_section_col">
              <div className="Admin_teachers_detail_section_col_text text-center">
                <h6>Total Earning</h6>
                <span>${incomeOfTeacher}</span>
              </div>
              <div className="Admin_teachers_detail_section_col_text text-center">
                <h6>Total Sessions</h6>
                <span>{totalLectures}</span>
              </div>
              <div className="Admin_teachers_detail_section_col_text text-center">
                <h6>Completed Sessions</h6>
                <span className="text-success">{completedSessions}</span>
              </div>
              <div className="Admin_teachers_detail_section_col_text text-center">
                <h6>Pending Sessions</h6>
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
          <div className="Admin_teachers_detail_section_about_div mt-3 ">
            <h6>About ME</h6>
            <p>{teacherData.Description}</p>
          </div>
          <div className="w-100 d-flex mt-2 justify-content-end">
            <button
              onClick={(e) => EditTeacherHandler(teacherData._id)}
              className="btn btn-outline-success mx-3 "
            >
              Edit Teacher
            </button>
            <button
              onClick={(e) => DeleteTeacherHandler(teacherData._id)}
              className="btn btn-outline-danger  "
            >
              Delete Teacher
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeachersDetails;
