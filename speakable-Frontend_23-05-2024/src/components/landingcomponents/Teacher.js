import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Search_Free_Package } from "../../store/actions/packagesActions";
import { fetch1teacher } from "../../store/actions/teachersActions";
import noimage from "../../assets/No-Image-Placeholder.svg.webp";

const Teacher = () => {
  const [randomTeacher, setRandomTeacher] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NavigationHandler = (id) => {
    navigate(`/Scedule-Meeting/${id}`);
  };

  useEffect(() => {
    dispatch(Search_Free_Package());
    // dispatch(fetch1teacher());
  }, [dispatch]);

  const Free_PackageDetails = useSelector(
    (state) => state.packages.FreePackage
  );
  console.log(Free_PackageDetails);

  const TeacherDetails = useSelector((state) => state.teachers.Teacher);

  console.log(TeacherDetails);

  useEffect(() => {
    if (Free_PackageDetails === null || Free_PackageDetails === undefined) {
      dispatch(fetch1teacher());
    }
  }, [Free_PackageDetails]);

  const teachers = useSelector((state) => state.teachers.Teacherslist);

  // Ensure randomTeacher is properly set before accessing its properties
  useEffect(() => {
    if (Free_PackageDetails !== null && Free_PackageDetails !== undefined) {
      const teachers = Free_PackageDetails?.Teacher_IDs;
      if (teachers && teachers.length > 0) {
        const randomIndex = Math.floor(Math.random() * teachers.length);
        const selectedTeacher = teachers[randomIndex];
        setRandomTeacher(selectedTeacher);
        localStorage.setItem("RandomTeacherID", selectedTeacher._id);
      }
    }
  }, [Free_PackageDetails]);
  console.log(randomTeacher);

  return (
    <div id="Teacher">
      {Free_PackageDetails === null || Free_PackageDetails === undefined
        ? TeacherDetails.map((teacher, index) => (
            <div
              key={index}
              className="d-flex justify-content-center align-items-center teachers_main_div"
            >
              <div className="d-flex justify-content-center align-items-center teacher-data">
                <div className="teachers_left_div">
                  <img
                    src={
                      teacher.Profile_Image && teacher.Profile_Image.length > 0
                        ? `https://ik.imagekit.io/8s3jwexmv/${teacher.Profile_Image}`
                        : noimage
                    }
                    alt={teacher.Profile_Image || "Course Image"}
                  />
                </div>
                <div className="teachers_right_div">
                  <Link
                    to={`/TeacherDetails/${teacher?._id}`}
                    className="teachers_right_div_link"
                  >
                    <h3>{teacher?.Username.split(" ")}</h3>
                  </Link>
                  <p>{teacher?.Description}</p>
                </div>
              </div>
            </div>
          ))
        : null}

      {randomTeacher && (
        <div className="d-flex justify-content-center align-items-center teachers_main_div">
          <div className="d-flex justify-content-center align-items-center teacher-data">
            <div className="teachers_left_div">
              <img
                src={`https://ik.imagekit.io/8s3jwexmv/${randomTeacher.Profile_Image}`}
                alt=""
              />
            </div>
            <div className="teachers_right_div">
              <Link
                to={`/TeacherDetails/${randomTeacher._id}`}
                className="teachers_right_div_link"
              >
                <h3>{randomTeacher.Username.split(" ")}</h3>
              </Link>
              <p>{randomTeacher.Description}</p>
              <button
                onClick={() => NavigationHandler(randomTeacher._id)}
                className="btn btn-outline-success teachers_right_div_btn"
              >
                Book a free trial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {Free_PackageDetails !== null || Free_PackageDetails !== undefined
        ? Free_PackageDetails?.Teacher_IDs?.map((teacher, index) => (
            <div
              key={index}
              className="d-flex justify-content-center align-items-center teachers_main_div"
            >
              <div className="d-flex justify-content-center align-items-center teacher-data">
                <div className="teachers_left_div">
                  <img
                    src={`https://ik.imagekit.io/8s3jwexmv/${teacher.Profile_Image[0]}`}
                    alt=""
                  />
                </div>
                <div className="teachers_right_div">
                  <Link
                    to={`/TeacherDetails/${teacher?._id}`}
                    className="teachers_right_div_link"
                  >
                    <h3>{teacher?.Username.split(" ")}</h3>
                  </Link>
                  <p>{teacher?.Description}</p>
                  <button
                    onClick={NavigationHandler}
                    className="btn btn-outline-success teachers_right_div_btn"
                  >
                    Book a free trial
                  </button>
                </div>
              </div>
            </div>
          ))
        : null} */}
    </div>
  );
};

export default Teacher;
