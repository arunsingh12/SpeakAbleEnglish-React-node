import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchBookingbyStudentUsername } from "../../store/actions/bookingActions";
import { SearchCoursebyName } from "../../store/actions/coursesActions";
import { SearchEnquirybyStudentUsername } from "../../store/actions/enquiryActions";
import {
  Notifications,
  NotificationsOfAccountant,
  NotificationsOfAdmin,
  NotificationsOfTeacher,
} from "../../store/actions/notificationActions";
import { SearchPackagebyPackageName } from "../../store/actions/packagesActions";
import { SearchPaymentbyStudentUsername } from "../../store/actions/paymentActions";
import { SearchStudentbyUsername } from "../../store/actions/studentsActions";
import { SearchTeacherbyUsername } from "../../store/actions/teachersActions";
import adminImg from "../../assets/Admin-Img.png";

const AdminNav = ({ value, setValue, placeholder }) => {
  const user = useSelector((state) => state.students.user);

  const studentNotifications = useSelector(
    (state) => state.notifications.Student_Notifications
  );

  const allNotifications = useSelector(
    (state) => state.notifications.All_Notifications
  );
  const teacherNotifications = useSelector(
    (state) => state.notifications.Teacher_Notifications
  );
  const accountantNotifications = useSelector(
    (state) => state.notifications.Accountant_Notifications
  );
  const AllStudentsList = useSelector((state) => state.students.studentslist);

  const StudentNameArray = AllStudentsList.map((ele, index) => {
    return ele.Username;
  });

  const [notifyNumber, setNotifyNumber] = useState(0);
  const [Search_Input, setSearch_Input] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLocation, setcurrentLocation] = useState(location.pathname);
  const [displaySearch, setdisplaySearch] = useState(false);

  useEffect(() => {
    if (currentLocation === "/Admin-Dashboard/Dashboard") {
      setShowSearchBar(false);
    }
  }, []);
  useEffect(() => {
    const fetchNotifications = async () => {
      let notificationsAction;
      switch (user.UserType) {
        case "student":
          notificationsAction = Notifications(user._id);
          break;
        case "teacher":
          notificationsAction = NotificationsOfTeacher(user._id);
          break;
        case "accountant":
          notificationsAction = NotificationsOfAccountant();
          break;
        case "admin":
          notificationsAction = NotificationsOfAdmin();
          break;
        default:
          break;
      }

      if (notificationsAction) {
        await dispatch(notificationsAction);
      }
    };

    fetchNotifications();
  }, [dispatch, user]);

  useEffect(() => {
    switch (user.UserType) {
      case "student":
        setNotifyNumber(studentNotifications.length);
        break;
      case "teacher":
        setNotifyNumber(teacherNotifications.length);
        break;
      case "accountant":
        setNotifyNumber(accountantNotifications.length);
        break;
      case "admin":
        setNotifyNumber(allNotifications.length);
        setdisplaySearch(true);
        break;
      default:
        break;
    }
  }, [
    studentNotifications,
    allNotifications,
    teacherNotifications,
    accountantNotifications,
  ]);

  const notifyHandler = () => {
    let destination;
    switch (user.UserType) {
      case "student":
        destination = "/Student-dashboard/NotificationTab";
        break;
      case "teacher":
        destination = "/Teacher-dashboard/NotificationTab";
        break;
      case "accountant":
        destination = "/Accontant-Dashboard/NotificationTab";
        break;
      case "admin":
        destination = "/Admin-Dashboard/NotificationTab";
        break;
      default:
        break;
    }

    if (destination) {
      navigate(destination);
    }
  };
  const trimmedInput = Search_Input.trim();

  const SearchbarHandler = () => {
    const trimmedInputLower = trimmedInput.toLowerCase().toLowerCase();

    if (trimmedInputLower.length > 1) {
      const locationLower = currentLocation.toLowerCase();
      console.log(locationLower);
      switch (locationLower) {
        case "/admin-dashboard/teachers":
          dispatch(SearchTeacherbyUsername(trimmedInput));
          break;
        case "/admin-dashboard/students":
          dispatch(SearchStudentbyUsername(trimmedInput));
          break;
        case "/admin-dashboard/courses":
          dispatch(SearchCoursebyName(trimmedInput));
          break;
        case "/admin-dashboard/bookings":
          dispatch(SearchBookingbyStudentUsername(trimmedInput));
          break;
        case "/admin-dashboard/enquirys":
          dispatch(SearchEnquirybyStudentUsername(trimmedInput));
          break;
        case "/admin-dashboard/payments":
          dispatch(SearchPaymentbyStudentUsername(trimmedInput));
          break;
        case "/admin-dashboard/packages":
          dispatch(SearchPackagebyPackageName(trimmedInput));
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      {displaySearch ? (
        <div
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow:
              "0px 1px 0 rgba(0, 0, 0, 0.2), 0 0px 4px 0 rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="Admin-Dashboard_nav_left_div">
            <i
              style={{ cursor: "pointer" }}
              onClick={notifyHandler}
              className="bi bi-bell-fill"
            ></i>
            <span
              style={{ fontWeight: "900", fontSize: "14px" }}
              className="text-danger"
            >
              {notifyNumber}
            </span>
            <i className="bi bi-envelope-fill"></i>
          </div>
          {showSearchBar ? (
            <div className="Admin-Dashboard_nav_search_div">
              {/* <i className="bi bi-search"></i>
              <input
                name="search_Input"
                value={Search_Input}
                onChange={(e) => setSearch_Input(e.target.value)}
                onKeyUp={SearchbarHandler}
                placeholder="Search by Teacher, Student, Fees more details..."
              /> */}
              <i className="bi bi-search"></i>
              <input
                name="search_Input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyUp={SearchbarHandler}
                placeholder={placeholder}
              />
            </div>
          ) : (
            ""
          )}

          <div className="Admin-Dashboard_nav_right_div">
            <div className="Admin-Dashboard_nav_right_Name_div">
              <span>{user?.Username}</span>
            </div>
            <div className="Admin-Dashboard_nav_right_img_div">
              <img src={adminImg} alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow:
              "0px 1px 0 rgba(0, 0, 0, 0.2), 0 0px 4px 0 rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="Admin-Dashboard_nav_left_div">
            <i
              style={{ cursor: "pointer" }}
              onClick={notifyHandler}
              className="bi bi-bell-fill"
            ></i>
            <span
              style={{ fontWeight: "900", fontSize: "14px" }}
              className="text-danger"
            >
              {notifyNumber}
            </span>
            <i className="bi bi-envelope-fill"></i>
          </div>
          <div className="Admin-Dashboard_nav_right_div">
            <div className="Admin-Dashboard_nav_right_Name_div">
              <span>{user?.Username}</span>
            </div>
            <div className="Admin-Dashboard_nav_right_img_div">
              <img src={adminImg} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNav;
