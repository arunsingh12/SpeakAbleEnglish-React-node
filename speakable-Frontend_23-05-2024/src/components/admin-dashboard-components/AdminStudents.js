// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import AdminNav from "./AdminNav";
// import { fetchAllstudents } from "../../store/actions/studentsActions";

// const AdminStudents = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const students = useSelector((state) => state.students.studentslist);
//   console.log(students);
//   useEffect(() => {
//     dispatch(fetchAllstudents());
//   }, [dispatch]);

//   const ProfileHandler = (id) => {
//     navigate(`/Admin-Dashboard/Students/studentsDetails/${id}`);
//   };

//  const [Search_Input, setSearch_Input] = useState("");

//   return (
//     <>
//       {/* <AdminNav /> */}

//       <div className="Student_mainPage_style">
//         <div className="Student_header_style">
//           <h6 className="text-dark">Students Table</h6>
//           <Link to="/Admin-Dashboard/Students/add-student">
//             <button className="btn btn-outline-success">Add Students</button>
//           </Link>
//         </div>
//         <div className="Teacher_list_style mt-3">
//           <div>
//             <i className="bi bi-search"></i>
//             <input
//               name="search_Input"
//               value={Search_Input}

//               placeholder="Search by Teacher, Student, Fees more details..."
//             />
//           </div>

//           {students?.length > 0 ? (
//             students?.map((Student) => (
//               <div key={Student._id} className="teacher_card">
//                 {Student.Profile_Image.length > 0 ? (
//                   <div className="teacher_card_img_div">
//                     <img
//                       src={`https://ik.imagekit.io/8s3jwexmv/${Student.Profile_Image}`}
//                       alt=""
//                     />
//                   </div>
//                 ) : (
//                   <div className="teacher_card_img_div">
//                     {Student.Username.slice(0, 1).toUpperCase()}
//                   </div>
//                 )}
//                 <h5>{Student.Username}</h5>
//                 <h6>{Student.UserType}</h6>
//                 <div className="d-flex flex-wrap w-100 justify-content-center flex-column align-items-center">
//                   {Student?.Courses_assign?.map((course) => (
//                     <span
//                       className="teacher_card_course_span mt-1"
//                       key={course._id}
//                     >
//                       {course.Course_Name}
//                     </span>
//                   ))}
//                 </div>
//                 <button
//                   onClick={(e) => ProfileHandler(Student._id)}
//                   className="btn btn-outline-success"
//                 >
//                   Profile
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No students available.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminStudents;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import { fetchAllstudents } from "../../store/actions/studentsActions";

const AdminStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students.AllStudentlist);
  console.log(students);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(fetchAllstudents());
  }, [dispatch]);

  const profileHandler = (id) => {
    navigate(`/Admin-Dashboard/Students/studentsDetails/${id}`);
  };


  

  const filteredStudents = students.filter((student) =>
    student.Username.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {}, [filteredStudents]);

  return (
    <>
      <AdminNav
        value={searchInput}
        setValue={setSearchInput}
        placeholder="Search by Student Name.."
      />
      <div className="Student_mainPage_style">
        <div className="Student_header_style">
          <h6 className="text-dark">Students Table</h6>
          <Link to="/Admin-Dashboard/Students/add-student">
            <button className="btn btn-outline-success">Add Students</button>
          </Link>
        </div>
        <div className="Teacher_list_style mt-3">
          {filteredStudents?.length > 0 ? (
            filteredStudents?.map((student) => (
              <div key={student?._id} className="teacher_card">
                {student?.Profile_Image?.length > 0 ? (
                  <div className="teacher_card_img_div">
                    <img
                      src={`https://ik.imagekit.io/8s3jwexmv/${student?.Profile_Image}`}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="teacher_card_img_div">
                    {student?.Username?.slice(0, 1)?.toUpperCase()}
                  </div>
                )}
                <p>{student?.Username}</p>
                <h6>{student?.UserType}</h6>
                <div className="d-flex flex-wrap w-100 justify-content-center flex-column align-items-center">
                  {student?.Courses_assign?.map((course) => (
                    <span
                      className="teacher_card_course_span mt-1"
                      key={course?._id}
                    >
                      {course?.Course_Name}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => profileHandler(student?._id)}
                  className="btn btn-outline-success"
                >
                  Profile
                </button>
              </div>
            ))
          ) : (
            <p>No students available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminStudents;
