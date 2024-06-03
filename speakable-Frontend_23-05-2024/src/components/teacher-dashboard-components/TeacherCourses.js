import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCourseByID } from '../../store/actions/coursesActions'
import AdminNav from '../admin-dashboard-components/AdminNav'
const TeacherCourses = () => {

  const teacher = useSelector((state) => state.students.user)
  const dispatch = useDispatch()
  console.log(teacher);
  console.log(teacher.Courses_assign)
  const Courses = useSelector((state) => state.courses.CourseByID)
  // console.log(Courses)
  useEffect(() => {
    teacher.Courses_assign.map((course) => {
      dispatch(GetCourseByID(course._id))
    })
  }, [teacher,dispatch])
  

  return (
    <>
      <AdminNav />
      <div className="Student_mainPage_style">
        <div className="Student_header_style">
          <h6 className="text-dark">Your Assigned Courses</h6>
        </div>
        <div className="Course_list_style mt-3">
          {teacher?.Courses_assign?.map((Course) => (
            <div key={Course._id} className="Courses_card p-2">
              <div className="Courses_card_img_div">
                <img
                  src={`https://ik.imagekit.io/8s3jwexmv/${Course.Course_Images}`}
                  alt=""
                />
              </div>
              <h5>{Course.Course_Name}</h5>
              <p>{Course.Description}</p>
              {/* <h6>Teachers Assigned</h6>
              <div className="d-flex flex-wrap justify-content-center w-100">
                {Course?.Teachers_Details?.map((teacher) => (
                  <span
                    className="Courses_card_teacher_span mx-1"
                    key={teacher._id}
                  >
                    {teacher.Username}
                  </span>
                ))}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TeacherCourses