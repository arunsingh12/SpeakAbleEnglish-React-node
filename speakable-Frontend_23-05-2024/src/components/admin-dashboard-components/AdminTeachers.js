import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GetTeachers } from '../../store/actions/teachersActions';
import AdminNav from './AdminNav';

const AdminTeachers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const teachers = useSelector((state) => state?.teachers?.AllTeacherlist);
  console.log(teachers)
   const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(GetTeachers())
  }, [dispatch])
  
  const ProfileHandler = (id) =>{
    navigate(`/Admin-Dashboard/Teachers/teachersDetails/${id}`)
  }
 
  const filteredTeacher = teachers?.filter((teacher) =>
    teacher.Username.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <>
      <AdminNav
        value={searchInput}
        setValue={setSearchInput}
        placeholder="Search by Teacher Name.."
      />
      <div className="Teacher_mainPage_style ">
        <div className="Teacher_header_style ">
          <h6 className="text-dark">Teachers Table</h6>
          <Link to="/Admin-Dashboard/Teachers/add-teacher">
            <button className="btn btn-outline-success">Add Teachers</button>
          </Link>
        </div>
        <div className="Teacher_list_style mt-3">
          {Array.isArray(filteredTeacher) && filteredTeacher.length > 0 ? (
            filteredTeacher.map((teacher) => (
              <div key={teacher?._id} className="teacher_card">
                {teacher?.Profile_Image != "" ? (
                  <div className="teacher_card_img_div">
                    <img
                      src={`https://ik.imagekit.io/8s3jwexmv/${teacher?.Profile_Image}`}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="teacher_card_img_div">
                    {" "}
                    {teacher?.Username.slice(0, 1).toUpperCase()}{" "}
                  </div>
                )}
                <h5>{teacher?.Username}</h5>
                <h6>{teacher?.UserType}</h6>
                <div className="d-flex flex-wrap w-100 justify-content-center flex-column align-items-center">
                  {teacher?.Courses_assign?.map((course) => (
                    <span
                      className="teacher_card_course_span mt-1"
                      key={course?._id}
                    >
                      {" "}
                      {course?.Course_Name}{" "}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => ProfileHandler(teacher?._id)}
                  className="btn btn-outline-success"
                >
                  Profile
                </button>
              </div>
            ))
          ) : (
            <p>No teachers available.</p> // or some other fallback UI
          )}
        </div>
      </div>
    </>
  );
}

export default AdminTeachers