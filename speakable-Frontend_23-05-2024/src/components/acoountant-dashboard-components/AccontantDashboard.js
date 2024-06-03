import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate, Outlet } from "react-router-dom";
import { async_removeuser } from "../../store/actions/studentsActions";

const AccontantDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(async_removeuser());
    // console.log('---------------------logout accountant -------')
  };
  const [menuInactive, setMenuInactive] = useState(false);

  useEffect(() => {
    navigate("/Accontant-Dashboard/dash");
  }, []);

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
          to="/Accontant-Dashboard/dash"
          className="Admin-Dashboard_main_left_header_div"
        >
          <h5>Speakable English</h5>
          <h6 style={{ fontSize: "12px" }}>Welcome to Accountnat Panel !</h6>
        </NavLink>
        {!menuInactive ? (
          <div className="Admin-Dashboard_main_left_router_div">
            <NavLink
              to="/Accontant-Dashboard/dash"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Accontant-Dashboard/dash"
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
              to="/Accontant-Dashboard/Payments"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Accontant-Dashboard/Payments"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-currency-dollar"></i>
              </span>
              <span>Payments</span>
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
              to="/Accontant-Dashboard/dash"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Accontant-Dashboard/dash"
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
              to="/Accontant-Dashboard/Payments"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Accontant-Dashboard/Payments"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-currency-dollar"></i>
              </span>
              <span>Payments</span>
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
              className="Admin-Dashboard_router_col_3"
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

export default AccontantDashboard;
