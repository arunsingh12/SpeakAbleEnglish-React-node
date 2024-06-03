import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { useDispatch } from "react-redux";
import { async_loaduser } from "./store/actions/studentsActions";
import { Route, Routes } from "react-router-dom";
// --------------------------------------------------------------------------------------- Main  Imports ------------------
import SceduleMeeting from "./components/SceduleMeeting";
import ProtectedRoute from "./helpers/ProtectedRoute";
import TeacherDetails from "./components/TeacherDetails";
import CourseDetails from "./components/CourseDetails";
// --------------------------------------------------------------------------------------- Student Imports ------------------
import Profile from "./components/student-dashboard-components/Profile";
import Courses from "./components/student-dashboard-components/Courses";
// import Meetings from './components/student-dashboard-components/Meetings';
import StudentDashboard from "./components/StudentDashboard";
import StudentDash from "./components/student-dashboard-components/StudentDash";
import Packages from "./components/student-dashboard-components/Packages";
import Bookings from "./components/student-dashboard-components/Bookings";
import Payments from "./components/student-dashboard-components/Payments";
import Enquirys from "./components/student-dashboard-components/Enquirys";
// -----------------------------------------------------------------------------------------Admin Imports ------------------
import AdminDash from "./components/admin-dashboard-components/AdminDash";
import AdminDashboard from "./components/admin-dashboard-components/AdminDashboard";
import AdminTeachers from "./components/admin-dashboard-components/AdminTeachers";
import AdminStudents from "./components/admin-dashboard-components/AdminStudents";
import AdminCourses from "./components/admin-dashboard-components/AdminCourses";
import AdminPackages from "./components/admin-dashboard-components/AdminPackages";
import AdminBookings from "./components/admin-dashboard-components/AdminBookings";
import AdminPayments from "./components/admin-dashboard-components/AdminPayments";
import AdminEnquirys from "./components/admin-dashboard-components/AdminEnquirys";
import AdminSettings from "./components/admin-dashboard-components/AdminSettings";
import AdminAddTeachers from "./components/admin-dashboard-components/AdminAddTeachers";
import AdminAddStudents from "./components/admin-dashboard-components/AdminAddStudents";
import AdminAddCourses from "./components/admin-dashboard-components/AdminAddCourses";
import AdminEditCourse from "./components/admin-dashboard-components/AdminEditPages/AdminEditCourse";
import AdminTeachersDetails from "./components/admin-dashboard-components/AdminEditPages/AdminTeachersDetails";
import AdminEditTeacher from "./components/admin-dashboard-components/AdminEditPages/AdminEditTeacher";
import AdminStudentsDetails from "./components/admin-dashboard-components/AdminEditPages/AdminStudentsDetails";
import AdminEditStudent from "./components/admin-dashboard-components/AdminEditPages/AdminEditStudent";
// -------------------------------------------------------------------------Teachers Import -------------------------------
import TeacherDashboard from "./components/teacher-dashboard-components/TeacherDashboard";
import TeacherDash from "./components/teacher-dashboard-components/TeacherDash";
import TeacherProfile from "./components/teacher-dashboard-components/TeacherProfile";
import TeacherCourses from "./components/teacher-dashboard-components/TeacherCourses";
import TeacherPackages from "./components/teacher-dashboard-components/TeacherPackages";
import TeacherBookings from "./components/teacher-dashboard-components/TeacherBookings";
import TeacherPayments from "./components/teacher-dashboard-components/TeacherPayments";
import TeacherEnquirys from "./components/teacher-dashboard-components/TeacherEnquirys";
import TeacherSetting from "./components/teacher-dashboard-components/TeacherSetting";
// --------------------------------------------------------------------------Accountnat Imports ------------------------------
import AccontantDashboard from "./components/acoountant-dashboard-components/AccontantDashboard";
import AccontantDash from "./components/acoountant-dashboard-components/AccontantDash";
import AccontantPayment from "./components/acoountant-dashboard-components/AccontantPayment";
import AccontantPackage from "./components/acoountant-dashboard-components/AccontantPackage";
import AdminAddPackage from "./components/admin-dashboard-components/AdminAddPackage";
import AdminEditPackages from "./components/admin-dashboard-components/AdminEditPages/AdminEditPackages";
import AdminAddBooking from "./components/admin-dashboard-components/AdminAddBooking";
import AdminEditBooking from "./components/admin-dashboard-components/AdminEditPages/AdminEditBooking";
import AddStudentEnquiry from "./components/student-dashboard-components/AddStudentEnquiry";
import Room from "./components/meeting-components/Room";
import AdminAddAvailability from "./components/admin-dashboard-components/AdminAddAvailability";
import AdminAddAvailabilityTime from "./components/admin-dashboard-components/AdminAddAvailabilityTime";
import AdminEditTeacherEditAvailability from "./components/admin-dashboard-components/AdminEditPages/AdminEditTeacherEditAvailability";
import NotificationTab_Admin from "./components/notifications-component/NotificationTab_Admin";
import NotificationTab_Student from "./components/notifications-component/NotificationTab_Student";
import NotificationTab_Accontant from "./components/notifications-component/NotificationTab_Accontant";
import NotificationTab_Teacher from "./components/notifications-component/NotificationTab_Teacher";
import CheckDetails from "./components/student-dashboard-components/CheckDetails";
import Booknow from "./components/student-dashboard-components/Booknow";
import TeacherEditAvailability from "./components/teacher-dashboard-components/TeacherEditAvailability";
import { ToastContainer } from "react-toastify";
import EditBooking from "./components/student-dashboard-components/EditBooking";
import EditPackageTeacher from "./components/student-dashboard-components/EditPackageTeacher";
import EditStudentProfile from "./components/student-dashboard-components/EditStudentProfile";
import Invoice from "./components/admin-dashboard-components/invoice";
import StudentInvoice from "./components/student-dashboard-components/StudentInvoice";
import AccountantInvoice from "./components/acoountant-dashboard-components/AccountantInvoice";

const App = () => {
  const dispatch = useDispatch();
  // load user
  useEffect(() => {
    dispatch(async_loaduser());
  }, []);

  return (
    <>
      {/* ---------------------------------------------------------------------------------------------------- Main Routes  ------------------------- */}

      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/ConfirmBooking" element={<Booknow />} />
        <Route
          path="/Scedule-Meeting/:TeacherID"
          element={<SceduleMeeting />}
        />
        <Route path="/TeacherDetails/:TeacherID" element={<TeacherDetails />} />
        <Route path="/CourseDetails/:CourseID" element={<CourseDetails />} />

        {/*---------------------------------------------------------------------------------------------- Student Dashboard Routes --------------- */}

        <Route
          path="/Student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/Student-dashboard/dash" element={<StudentDash />} />
          <Route
            path="/Student-dashboard/NotificationTab"
            element={<NotificationTab_Student />}
          />
          <Route path="/Student-dashboard/profile" element={<Profile />} />
          <Route
            path="/Student-dashboard/profile/edit-studentProfile/:id"
            element={<EditStudentProfile />}
          />
          <Route path="/Student-dashboard/Courses" element={<Courses />} />

          <Route path="/Student-dashboard/Packages" element={<Packages />} />
          <Route
            path="/Student-dashboard/Package/:Package_ID"
            element={<EditPackageTeacher />}
          />
          <Route
            path="/Student-dashboard/Packages/:Package_ID"
            element={<CheckDetails />}
          />
          <Route
            path="/Student-dashboard/BookingDetails/:extraorderID"
            element={<Booknow />}
          />
          <Route path="/Student-dashboard/Bookings" element={<Bookings />} />
          <Route
            path="/Student-dashboard/Bookings/edit-Booking/:BookingID"
            element={<EditBooking />}
          />
          <Route path="/Student-dashboard/Payments" element={<Payments />} />
          <Route
            path="/Student-dashboard/Payments/Invoice/:id"
            element={<StudentInvoice />}
          />
          <Route path="/Student-dashboard/Enquirys" element={<Enquirys />} />
          <Route
            path="/Student-dashboard/Enquirys/add-enquirys/:StudentID"
            element={<AddStudentEnquiry />}
          />
        </Route>

        {/* --------------------------------------------------------------------------------------------------------------Teachers Panel Routes ------------- */}

        <Route
          path="/Teacher-dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/Teacher-dashboard/dash" element={<TeacherDash />} />
          <Route
            path="/Teacher-dashboard/NotificationTab"
            element={<NotificationTab_Teacher />}
          />
          <Route
            path="/Teacher-dashboard/profile"
            element={<TeacherProfile />}
          />
          <Route
            path="/Teacher-dashboard/Edit-Availability/:id"
            element={<TeacherEditAvailability />}
          />
          <Route
            path="/Teacher-dashboard/Courses"
            element={<TeacherCourses />}
          />
          <Route
            path="/Teacher-dashboard/Packages"
            element={<TeacherPackages />}
          />
          <Route
            path="/Teacher-dashboard/Bookings"
            element={<TeacherBookings />}
          />
          <Route
            path="/Teacher-dashboard/Payments"
            element={<TeacherPayments />}
          />
          <Route
            path="/Teacher-dashboard/Enquirys"
            element={<TeacherEnquirys />}
          />
          <Route
            path="/Teacher-dashboard/setting"
            element={<TeacherSetting />}
          />
        </Route>

        {/* ------------------------------------------------------------------------------------------------------------- Admin Panel Routes  ---------------  */}

        {/* Admin  Dashboard Routes */}

        <Route
          path="/Admin-Dashboard/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route
            path="/Admin-Dashboard/NotificationTab"
            element={<NotificationTab_Admin />}
          />
          <Route path="/Admin-Dashboard/Dashboard" element={<AdminDash />} />
          <Route path="/Admin-Dashboard/Teachers" element={<AdminTeachers />} />
          <Route
            path="/Admin-Dashboard/Teachers/add-teacher"
            element={<AdminAddTeachers />}
          />
          <Route
            path="/Admin-Dashboard/Teachers/add-teacher/add-availability"
            element={<AdminAddAvailability />}
          />
          <Route
            path="/Admin-Dashboard/Teachers/add-teacher/add-availability/add-time"
            element={<AdminAddAvailabilityTime />}
          />
          <Route
            path="/Admin-Dashboard/Teachers/edit-teacher/:id"
            element={<AdminEditTeacher />}
          />
          <Route
            path="/Admin-Dashboard/Teachers/edit-teacher/add-availability/:id"
            element={<AdminEditTeacherEditAvailability />}
          />
          <Route
            path="/Admin-Dashboard/Teachers/teachersDetails/:id"
            element={<AdminTeachersDetails />}
          />
          <Route path="/Admin-Dashboard/Students" element={<AdminStudents />} />
          <Route
            path="/Admin-Dashboard/Students/add-student"
            element={<AdminAddStudents />}
          />
          <Route
            path="/Admin-Dashboard/Students/edit-student/:id"
            element={<AdminEditStudent />}
          />
          <Route
            path="/Admin-Dashboard/Students/studentsDetails/:id"
            element={<AdminStudentsDetails />}
          />
          <Route path="/Admin-Dashboard/Courses" element={<AdminCourses />} />
          <Route
            path="/Admin-Dashboard/Courses/add-courses"
            element={<AdminAddCourses />}
          />
          <Route
            path="/Admin-Dashboard/Courses/edit-Courses/:id"
            element={<AdminEditCourse />}
          />
          <Route path="/Admin-Dashboard/Packages" element={<AdminPackages />} />
          <Route
            path="/Admin-Dashboard/Packages/add-package"
            element={<AdminAddPackage />}
          />
          <Route
            path="/Admin-Dashboard/Packages/edit-package/:PackageID"
            element={<AdminEditPackages />}
          />
          <Route path="/Admin-Dashboard/Bookings" element={<AdminBookings />} />
          <Route
            path="/Admin-Dashboard/Bookings/add-Booking"
            element={<AdminAddBooking />}
          />
          <Route
            path="/Admin-Dashboard/Bookings/edit-booking/:BookingID"
            element={<AdminEditBooking />}
          />
          <Route path="/Admin-Dashboard/Payments" element={<AdminPayments />} />
          <Route
            path="/Admin-Dashboard/Payments/Invoice/:id"
            element={<Invoice />}
          />
          <Route path="/Admin-Dashboard/Enquirys" element={<AdminEnquirys />} />
          <Route path="/Admin-Dashboard/Settings" element={<AdminSettings />} />
        </Route>

        {/* -----------------------------------------------------------------------------------------------Accoutant Routes */}

        <Route
          path="/Accontant-Dashboard/"
          element={
            <ProtectedRoute>
              <AccontantDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/Accontant-Dashboard/dash" element={<AccontantDash />} />
          <Route
            path="/Accontant-Dashboard/NotificationTab"
            element={<NotificationTab_Accontant />}
          />
          <Route
            path="/Accontant-Dashboard/Payments"
            element={<AccontantPayment />}
          />
          <Route
            path="/Accontant-Dashboard/Payments/Invoice/:id"
            element={<AccountantInvoice />}
          />
          <Route
            path="/Accontant-Dashboard/Package"
            element={<AccontantPackage />}
          />
        </Route>

        <Route path="room/meeting/:id" element={<Room />} />
      </Routes>
      <ToastContainer
        style={{
          zIndex: 9999,
          position: "fixed", // Use 'fixed' instead of 'absolute'
          top: 0,
          right: 0,
        }}
      />
    </>
  );
};

export default App;
