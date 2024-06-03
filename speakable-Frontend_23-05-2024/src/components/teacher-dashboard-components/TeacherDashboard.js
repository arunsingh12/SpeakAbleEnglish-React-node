import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { async_removeuser } from "../../store/actions/studentsActions";

const TeacherDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuInactive, setMenuInactive] = useState(false);
  // console.log(menuInactive);
  useEffect(() => {
    navigate("/Teacher-dashboard/dash");
  }, []);

  const logoutHandler = () => {
    dispatch(async_removeuser());
    // console.log(" --------------------Teacher logout")
  };

  const menuHandler = () => {
    // Toggle menu's inactive/active status
    setMenuInactive(!menuInactive);
  };

  const closeMenuHandler = (e) => {
    e.preventDefault(); // Prevent default behavior of NavLink
    setMenuInactive(!menuInactive); // Close the menu
  };

  return (
    <div className="col-md-12  Admin-Dashboard_main_div">
      <div className="Admin-Dashboard_main_left_div">
        <NavLink
          to="/Teacher-dashboard/dash"
          className="Admin-Dashboard_main_left_header_div"
        >
          <h5>Speakable English</h5>
          <h6 style={{ fontSize: "12px" }}>Welcome to Teachers Panel !</h6>
        </NavLink>
        {!menuInactive ? (
          <div className="Admin-Dashboard_main_left_router_div">
            <NavLink
              to="/Teacher-dashboard/dash"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Teacher-dashboard/dash"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/Teacher-dashboard/profile"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Teacher-dashboard/profile"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>Profile</span>
            </NavLink>
            <NavLink
              to="/Teacher-dashboard/Courses"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Teacher-dashboard/Courses"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>Courses</span>
            </NavLink>
            {/* <NavLink
              to="/Teacher-dashboard/Packages"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Teacher-dashboard/Packages"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-basket3-fill"></i>
              </span>
              <span>Packages</span>
            </NavLink> */}
            <NavLink
              to="/Teacher-dashboard/Bookings"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Teacher-dashboard/Bookings"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-bookmark-dash-fill"></i>
              </span>
              <span>Bookings</span>
            </NavLink>

            <NavLink
              onClick={logoutHandler}
              className={`Admin-Dashboard_router_col_ inactive `}
            >
              <span>
                <i className="bi bi-box-arrow-right"></i>
              </span>
              <span>Logout</span>
            </NavLink>
            <NavLink
              className="Admin-Dashboard_router_col_2"
              onClick={menuHandler}
            >
              <span>
                <i class="bi bi-list"></i>
              </span>
              <span>Menu</span>
            </NavLink>
          </div>
        ) : (
          <div className="Admin-Dashboard_main_left_router_div_2">
            <NavLink
              to="/Teacher-dashboard/dash"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Teacher-dashboard/dash"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/Teacher-dashboard/profile"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Teacher-dashboard/profile"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>Profile</span>
            </NavLink>
            <NavLink
              to="/Teacher-dashboard/Courses"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Teacher-dashboard/Courses"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>Courses</span>
            </NavLink>
            <NavLink
              to="/Teacher-dashboard/Packages"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Teacher-dashboard/Packages"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-basket3-fill"></i>
              </span>
              <span>Packages</span>
            </NavLink>
            <NavLink
              to="/Teacher-dashboard/Bookings"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Teacher-dashboard/Bookings"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-bookmark-dash-fill"></i>
              </span>
              <span>Bookings</span>
            </NavLink>

            <NavLink
              onClick={logoutHandler}
              className={`Admin-Dashboard_router_col_3 inactive `}
            >
              <span>
                <i className="bi bi-box-arrow-right"></i>
              </span>
              <span>Logout</span>
            </NavLink>
            <NavLink
              className="Admin-Dashboard_router_col_2"
              onClick={closeMenuHandler}
            >
              <span>
                <i class="bi bi-x-square"></i>
              </span>
              <span>Close</span>
            </NavLink>
          </div>
        )}
      </div>
      <div className="Admin-Dashboard_main_right_div">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherDashboard;
