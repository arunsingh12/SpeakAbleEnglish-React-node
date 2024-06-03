import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const Profile = () => {
      const navigate = useNavigate();
  const student = useSelector((state) => state.students.user);
  console.log(student)
  
    const handleEditStudentProfile = (id) => {
      navigate(`/Student-dashboard/profile/edit-studentProfile/${id}`);
    };

  return (
    <>
      <div className="StudentProfile_mainPage_style">
        <div className="StudentProfile_header_style">
          <div className="Profile_header_imgdiv">
            <img
              src={`https://ik.imagekit.io/8s3jwexmv/${student?.Profile_Image}`}
              alt=""
            />
          </div>
        </div>

        <div className="row StudentName_style ">
          <h1 className="studentName">{student?.Username}</h1>
          <p className="studenttext">{student?.UserType}</p>
        </div>
        {/* -*-------------------------------------------------------------------------------------------------------- */}
        <div className="row">
          <div className="col-md-6 col-xs-12 ">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-person userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">FirstName:</p>
                <p className="userDetailTextData">{student?.firstName}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-geo-alt userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">LastName:</p>
                <p className="userDetailTextData">{student?.lastName}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-telephone userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Nickname:</p>
                <p className="userDetailTextData">{student?.Nickname}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-telephone userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">hasOwncloudAccount:</p>
                <p className="userDetailTextData">
                  {student?.hasOwncloudAccount ? ("Yes - With Same Credentails") : ("No - Create one on click of Your Material Button")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------------------------------- */}
        <div className="row">
          <div className="col-md-6 col-xs-12 ">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-person userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Email:</p>
                <p className="userDetailTextData">{student?.Email}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-geo-alt userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Address:</p>
                <p className="userDetailTextData">{student?.Address}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-telephone userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Phone:</p>
                <p className="userDetailTextData">{student?.Phone_Number}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-telephone userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Student Id:</p>
                <p className="userDetailTextData">{student?._id}</p>
              </div>
            </div>
          </div>
        </div>
        {/* ---------------------------------------------------------------------------------------------------------- */}
        <button
          className="btn btn-outline-success m-4"
          onClick={() => handleEditStudentProfile(student._id)}
        >
          Edit Your Profile
        </button>
      </div>
    </>
  );
};

export default Profile;
