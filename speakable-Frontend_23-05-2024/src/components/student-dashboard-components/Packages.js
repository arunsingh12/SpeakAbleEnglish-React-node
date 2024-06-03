import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllpackages } from "../../store/actions/packagesActions";
// import {Link } from 'react-router-dom'
import AdminNav from "../admin-dashboard-components/AdminNav";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const dispatch = useDispatch();
  const [studentIDMatched, setStudentIdMatched] = useState(false);
  const navigate = useNavigate();
  const packages = useSelector((state) => state.packages.packageslist);
  console.log(packages);
  // console.log(packages.Student_ID);
  const student = useSelector((state) => state.students.user);
  console.log(student._id);

  const CheckPageHandler = (Package_ID) => {
    navigate(`/Student-dashboard/Package/${Package_ID}`);
  };
  // if(student._id=== )

  const checkALreadyPurchased = () => {
    const studentid = packages?.map((item, index) => {
      // console.log(item?.Student_ID);
      if (item?.Student_ID === student?._id) {
        setStudentIdMatched(true);
      }
    });
    return studentid;
  };

  useEffect(() => {
    checkALreadyPurchased();
    dispatch(fetchAllpackages());
  }, [dispatch]);

  return (
    <>
      <AdminNav />
      <div className="Package_mainPage_style">
        <div className="Package_header_style">
          <h6 className="text-dark">Packages</h6>
        </div>
        <div className="Package_list_style mt-3">
          {packages?.map((pack, index) => {
            return (
              <div className="Package_card" key={index}>
                <h6 style={{ fontSize: "18px" }}>{pack?.Package_Name}</h6>
                {pack?.Course_IDs?.map((val, idx) => (
                  <div key={idx}>
                    <h6 className="text-center mt-3">{val?.Course_Name}</h6>
                    <br />
                    <p style={{margin:"auto"}} className="text-center w-75">{val?.Description?.substring(0, 220)}</p>
                  </div>
                ))}
                <h6 className="mt-4">Teachers Assigned</h6>
                <div className="d-flex flex-wrap justify-content-center w-100 flexGAp">
                  {pack?.Teacher_IDs?.map((teacher) => (
                    <span
                      className="Courses_card_teacher_span mx-1"
                      key={teacher?._id}
                    >
                      {teacher?.Username}
                    </span>
                  ))}
                </div>
                <div className="d-flex flex-wrap justify-content-center w-100 mt-3 flexGAp">
                  <span className="Courses_card_teacher_span mx-1">
                    Number of Lectures : {pack?.Number_of_Lectures}
                  </span>
                  <span className="Courses_card_teacher_span mx-1">
                    Amount : {pack?.Package_Amount}
                  </span>
                </div>
                <button
                  onClick={() => CheckPageHandler(pack?._id)}
                  className="btn btn-outline-danger"
                  disabled={pack?.Student_ID === student?._id}
                >
                  {pack?.Student_ID === student?._id ? (
                    <>Already Purchased</>
                  ) : (
                    <>Book Now</>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Packages;
