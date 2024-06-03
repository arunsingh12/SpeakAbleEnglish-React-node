import React, { useEffect } from 'react';
import Navbar from './landingcomponents/Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcourseDetails } from '../store/actions/coursesActions';

const CourseDetails = () => {
  const navigate = useNavigate();
  const { CourseID } = useParams();
  const dispatch = useDispatch();
  const CourseData = useSelector((state) => state.courses.courseDetails);

  // const NavigationHandler = () => {
  //   navigate('/Scedule-Meeting');
  // };

  useEffect(() => {
    dispatch(fetchcourseDetails(CourseID));
    // console.log(CourseID)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    
  }, [dispatch, CourseID]);

  return (
    <>
      <Navbar />
    
      {CourseData ? (
        <>
          <div className='CourseDetails_main_div'>
            <div className='CourseDetails_left_col'>
                <div className='CourseDetails_left_img_col'>
                  <img src={`https://ik.imagekit.io/8s3jwexmv/${CourseData.Course_Images}`} alt='' />
                </div>
            </div>
            <div className='CourseDetails_right_col'>
                <div>
                  <h2>{CourseData.Course_Name}</h2>
                  <div className='CourseDetails_right_col_line'></div>
                </div>
                <p>{CourseData.Description}</p>
                {/* <button
                  onClick={NavigationHandler}
                  className='btn btn-outline-success p-2 w-25 mt-3'
                >
                  Book Now
                </button> */}
            </div>
          </div>
          <div className='Courserelated_main_div'>
              <span>Related Teachers</span>
              <div className='Courserelated_box_div mt-5'>
                {CourseData?.Teachers_Details?.map((Teachers_Details) => (
                  <div className='Courserelated_card_div' key={Teachers_Details.id}>
                    <div className='Courserelated_card_img_div'>
                      <img src={`https://ik.imagekit.io/8s3jwexmv/${Teachers_Details.Profile_Image}`} alt='' />
                    </div>
                    <Link className='Courserelated_card_div_Link' to={`/TeacherDetails/${Teachers_Details._id}`}>
                      {Teachers_Details.Username.split(' ')[0]}
                    </Link>
                    <p>{Teachers_Details.Short_Title}</p>
                  </div>
                ))}
              </div>
          </div>
        </>
      ) : (
        <p>Loading course data...</p>
      )}
    </>
  );
};

export default CourseDetails;
