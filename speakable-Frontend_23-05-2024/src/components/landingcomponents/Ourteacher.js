import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { fetch5Teachers } from '../../store/actions/teachersActions';
import noimage from "../../assets/No-Image-Placeholder.svg.webp";


const Ourteacher = () => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const teachersData = useSelector((state) => state.teachers.Teacherslist);
  console.log(teachersData)

  useEffect(() => {
    dispatch(fetch5Teachers());
  }, [dispatch]);

  // var sliderSettings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   initialSlide: 0,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         initialSlide: 0,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 764,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 0,
  //         // initialSlide: 2
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };


  var sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    //  slidesToScroll: 4,
    initialSlide: 0,

    responsive: [
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
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  const course_main_lower_div = {
    padding: "50px",


  }



  return (
    <div className=' ourteacher_main_page_div' id='OurTeachers'>
      <div className='ourteacher_main_upper_div'>
        <h2>{t("header.OurTeachers")}</h2>
        <small>{t("header.Meetourteam")}</small>
      </div>
      <div className='teacher-data-main-page'>
        <div>
          <Slider {...sliderSettings}>
            {teachersData?.map((teacher) => (
              <div className='d-flex justify-content-center align-items-center flex-column'>


                <div key={teacher._id} className=' ourteacher_main_lower_box'>
                  <div >
                    <div className='ourteacher_main_lower_div_img'>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={
                          teacher.Profile_Image && teacher.Profile_Image.length > 0
                            ? `https://ik.imagekit.io/8s3jwexmv/${teacher.Profile_Image}`
                            : noimage
                        }
                        alt={teacher.Profile_Image || "Course Image"}
                      />
                    </div>

                    <div className='ourteacher_main_lower_box_div'>
                      <Link to={`/TeacherDetails/${teacher._id}`} style={{ textDecoration: 'none', color: '#252020' }}>
                         {/* <h3 >{teacher.Username}</h3>  */}
                        <h3 className='ourteacher_main_lower_box_Link_h3' >{teacher.Username.split(' ')[0]}</h3>
                      </Link>
                      <small>{teacher.Short_Title}</small>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </div>
  );
};

export default Ourteacher;
