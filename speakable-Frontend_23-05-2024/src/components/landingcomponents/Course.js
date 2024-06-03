// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
// import { fetch5courses } from "../../store/actions/coursesActions";

// const Courses = () => {
//   const courses = useSelector((state) => state.courses.courseslist);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetch5courses());
//   }, [dispatch]);

//   const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

//   var sliderSettings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     initialSlide: 0,

//     responsive: [
//       {
//         breakpoint: 1256,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//           dots: true,
//         },
//       },

//       {
//         breakpoint: 700,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//     ],
//   };

//   const toggleDescription = (courseId) => {
//     setExpandedDescriptionId(
//       expandedDescriptionId === courseId ? null : courseId
//     );
//   };

//   const course_main_lower_div = {
//     padding: "50px",
//   };

//   return (
//     <div style={course_main_lower_div} id="Courses">
//       <div className="">
//         <Slider {...sliderSettings}>
//           {courses?.map((course, index) => (
//             <div key={index}>
//               <div className="box-slider-card">
//                 <div className="course_main-Box">
//                   <div className="Home_main_lower_box_circle">
//                     <img
//                       src={`https://ik.imagekit.io/8s3jwexmv/${course.Course_Images}`}
//                       alt=""
//                     />
//                   </div>

//                   <Link
//                     className="course-name Home_main_lower_box_Link"
//                     to={`/CourseDetails/${course._id}`}
//                   >
//                     <p>{course.Course_Name}</p>
//                   </Link>
//                   {expandedDescriptionId === course._id ? (
//                     <div>{course.Description}</div>
//                   ) : (
//                     <div className="text-break">
//                       {course.Description.slice(0, 50)}...
//                     </div>
//                   )}
//                   {/* {course.Description.length > 20 && (
//                     <button onClick={() => toggleDescription(course._id)}>
//                       {expandedDescriptionId === course._id
//                         ? "Read Less"
//                         : "Read More"}
//                     </button>
//                   )} */}
//                   <p className="text-success">${course.Purchase_Price}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default Courses;

// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link } from "react-router-dom";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick-theme.css";
// // import "slick-carousel/slick/slick.css";
// // import { fetch5courses } from "../../store/actions/coursesActions";

// // const Courses = () => {
// //   const courses = useSelector((state) => state.courses.courseslist);
// //   console.log(courses)
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     dispatch(fetch5courses());
// //   }, [dispatch]);

// //   var sliderSettings = {
// //     dots: true,
// //     infinite: false,
// //     speed: 500,
// //     slidesToShow: 4,
// //     slidesToScroll: 4,
// //     initialSlide: 0,

// //     responsive: [
// //       {
// //         breakpoint: 1256,
// //         settings: {
// //           slidesToShow: 3,
// //           slidesToScroll: 3,
// //           infinite: true,
// //           dots: true,
// //         },
// //       },
// //       {
// //         breakpoint: 1024,
// //         settings: {
// //           slidesToShow: 3,
// //           slidesToScroll: 3,
// //           infinite: true,
// //           dots: true,
// //         },
// //       },
// //       {
// //         breakpoint: 992,
// //         settings: {
// //           slidesToShow: 2,
// //           slidesToScroll: 2,
// //           infinite: true,
// //           dots: true,
// //         },
// //       },

// //       {
// //         breakpoint: 700,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //           infinite: true,
// //           dots: true,
// //         },
// //       },
// //       {
// //         breakpoint: 480,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //           infinite: true,
// //           dots: true,
// //         },
// //       },
// //     ],
// //   };

// //   const course_main_lower_div = {
// //     padding: "50px",
// //   };

// //   return (
// //     <div style={course_main_lower_div} id="Courses">
// //       <div className="">
// //         <Slider {...sliderSettings} >
// //           {courses?.map((course, index) => (
// //             <div key={index}>
// //               <div className="box-slider-card">
// //                 <div className="course_main-Box">
// //                   <div className="Home_main_lower_box_circle">
// //                     <img
// //                       src={`https://ik.imagekit.io/8s3jwexmv/${course.Course_Images}`}
// //                       alt=""
// //                     />
// //                   </div>

// //                   <Link
// //                     className="course-name Home_main_lower_box_Link"
// //                     to={`/CourseDetails/${course._id}`}
// //                   >
// //                     <p>{course.Course_Name}</p>
// //                   </Link>
// //                   <div className="text-break">{course.Description}</div>

// //                   <p className="text-success">${course.Purchase_Price}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </Slider>
// //       </div>
// //     </div>
// //   );

// // };

// // export default Courses;

// // import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetch5courses } from '../../store/actions/coursesActions';
// // import { Link } from 'react-router-dom';
// // import Slider from 'react-slick';
// // import 'slick-carousel/slick/slick.css';
// // import 'slick-carousel/slick/slick-theme.css';

// // const Courses = () => {
// //   const courses = useSelector((state) => state.courses.courseslist);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     dispatch(fetch5courses());
// //   }, [dispatch]);

// //   // Slick slider settings
// //   const sliderSettings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: courses.length <= 3 ? courses.length : 3, // Adjust the number of slides to show based on courses length
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 2000,
// //   };

// //   return (
// //     <div className='course-main-lower-div'>
// //       <div className='slider-div'>
// //         <Slider {...sliderSettings}>
// //           {courses.map((course, index) => (
// //             <div key={index} className='home-main-lower-box'>
// //               <div className='home-main-lower-box-circle'>
// //                 <img src={`https://ik.imagekit.io/8s3jwexmv/${course.Course_Images}`} alt='' />
// //               </div>
// //               <Link className='home-main-lower-box-link' to={`/CourseDetails/${course._id}`}>{course.Course_Name}</Link>
// //               <p>{course.Description}</p>
// //               <p className='text-success'>${course.Purchase_Price}</p>
// //             </div>
// //           ))}
// //         </Slider>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Courses;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { fetch5courses } from "../../store/actions/coursesActions";
import noimage from "../../assets/No-Image-Placeholder.svg.webp";

const Courses = () => {
  const courses = useSelector((state) => state.courses.courseslist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch5courses());
  }, [dispatch]);

  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  var sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1256,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const toggleDescription = (courseId) => {
    setExpandedDescriptionId(
      expandedDescriptionId === courseId ? null : courseId
    );
  };

  const course_main_lower_div = {
    padding: "50px",
  };

  return (
    <div style={course_main_lower_div} id="Courses">
      <div className="">
        <Slider {...sliderSettings}>
          {courses?.map((course, index) => (
            <div key={index}>
              <div className="box-slider-card">
                <div className="course_main-Box">
                  <div className="Home_main_lower_box_circle">
                    {/* <img
                      src={`https://ik.imagekit.io/8s3jwexmv/${course.Course_Images}`}
                      alt=""
                    /> */}
                    <img
                      src={
                        course.Course_Images && course.Course_Images.length > 0
                          ? `https://ik.imagekit.io/8s3jwexmv/${course.Course_Images}`
                          : noimage
                      }
                      alt={course.Course_Name || "Course Image"}
                    />
                  </div>

                  <Link
                    className="course-name Home_main_lower_box_Link"
                    to={`/CourseDetails/${course._id}`}
                  >
                    <p>{course.Course_Name}</p>
                  </Link>
                  {expandedDescriptionId === course._id ? (
                    <div>{course.Description}</div>
                  ) : (
                    <div className="text-break">
                      {course.Description.slice(0, 50)}...
                    </div>
                  )}
                  {/* {course.Description.length > 20 && (
                    <button onClick={() => toggleDescription(course._id)}>
                      {expandedDescriptionId === course._id
                        ? "Read Less"
                        : "Read More"}
                    </button>
                  )} */}
                  <p className="text-success">${course.Purchase_Price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Courses;

