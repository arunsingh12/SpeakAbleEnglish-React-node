import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPackageByTeacherID } from "../../store/actions/packagesActions";
import AdminNav from "../admin-dashboard-components/AdminNav";

const TeacherPackages = () => {
  const dispatch = useDispatch();
  const packages = useSelector((state) => state.packages.Teacher_Packages);
  const teacher = useSelector((state) => state.students.user);
  // console.log(packages);

  useEffect(() => {
    dispatch(GetPackageByTeacherID(teacher?._id));
  }, [dispatch, teacher?._id]);

  return (
    <>
      <AdminNav />
      <div className="Package_mainPage_style">
        <div className="Package_header_style">
          <h6 className="text-dark">Packages</h6>
        </div>
        <div className="Package_list_style mt-3">
          {packages && packages.length > 0 ? (
            packages?.map((pack, index) => (
              <div className="Teacher_Package_card">
                <h6 style={{ fontSize: "18px" }}>{pack?.Package_Name}</h6>
                {pack?.Course_IDs.map((val) => (
                  <img
                    className="packagegimg mt-2"
                    src={`https://ik.imagekit.io/8s3jwexmv/${val.Course_Images}`}
                    alt=""
                  />
                ))}
                <h6 className="mt-2">
                  {pack.Course_IDs?.map((val) => val?.Course_Name)}
                </h6>
                <p>
                  {pack?.Course_IDs.map((val) =>
                    val?.Description.substring(0, 220)
                  )}
                </p>
                <div className="d-flex flex-wrap justify-content-center w-100 ">
                  <span className="Courses_card_teacher_span mx-1">
                    Number of Lectures : {pack?.Number_of_Lectures}
                  </span>
                  <span className="Courses_card_teacher_span mx-1">
                    Amount : {pack?.Package_Amount}
                  </span>
                </div>
                <h6 className="mt-3">Teachers Assigned</h6>
                <div className="d-flex flex-wrap justify-content-center w-100">
                  {pack?.Teacher_IDs?.map((teacher) => (
                    <span
                      className="Courses_card_teacher_span mx-1"
                      key={teacher._id}
                    >
                      {teacher.Username}
                    </span>
                  ))}
                </div>

                {/* <button className='btn btn-outline-danger'>Book Now</button>                      */}
              </div>
            ))
          ) : (
            <div>
              <p>No packages available</p>
              {/* You can add more content or styling for the message */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeacherPackages;
