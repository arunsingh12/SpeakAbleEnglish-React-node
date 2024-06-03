import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAllstudents,
  updateStudent,
} from "../../store/actions/studentsActions";
import { imageUpload } from "../../store/actions/teachersActions";

const EditStudentProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.AllStudentlist);
  // console.log(students)
  const currentStudent = students.find((student) => student._id === id);
  console.log(currentStudent);
  console.log(currentStudent?.Username);
  console.log(id);

  const navigate  = useNavigate()

  const [formData, setFormData] = useState({
    Username: "",
    firstName: "",
    lastName: "",
    Nickname: "",
    Password: "",
    Phone_Number: "",
    Address: "",
    Email: "",
    Enquiry_Student: [],
    Profile_Image: [],
  });

  useEffect(() => {
    dispatch(fetchAllstudents());
  }, []);

  useEffect(() => {
    if (currentStudent) {
      setFormData(currentStudent);
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = async (event) => {
    const image = event.target.files[0];
    const uploadResult = await dispatch(imageUpload(image));
    setFormData({
      ...formData,
      Profile_Image: formData.Profile_Image?.length
        ? [...formData.Profile_Image, uploadResult.payload]
        : [uploadResult.payload],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student_ID = id;
    const updatedData = {
      ...formData,
      Username: `${formData.firstName} ${formData.lastName}`,
    };
    try {
      console.log(updatedData);
      await dispatch(updateStudent({ student_ID, updatedData }));
        // navigate("/Student-dashboard/profile");
      window.location.reload();
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      Profile_Image: [...formData.Profile_Image.filter((img) => img !== val)],
    });
  };

  return (
    <>
      <div className="Edit_Teachers_main_div">
        <form>
          {/* Display existing images with delete option */}
          {formData.Profile_Image?.map((md, index) => (
            <div
              className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2"
              key={index}
            >
              <a href="#">
                <img
                  className="w-100 active"
                  src={`https://ik.imagekit.io/8s3jwexmv/${md}`}
                  alt={`Image ${index}`}
                />
              </a>
              <span
                className="badge bg-danger badge-pill badge-round ml-1"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleImageRemoval(md);
                }}
              >
                Delete
              </span>
            </div>
          ))}
          {/* File upload input for adding new images */}
          {formData.Profile_Image?.length < 10 && (
            <div className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2">
              <div className="card-body">
                <p className="card-text">Select image file to upload.</p>
                <input
                  className="form-control"
                  encType="multipart/form-data"
                  type="file"
                  name="images"
                  id="formFile"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}
          {/* Other form fields for updating student information */}
          {/* --------- FirstName ------ */}
          <div className="form-group">
            <label htmlFor="FirstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          {/* ---------------------last Name ------- */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          {/* --------------------------- NickName ------------- */}
          <div className="form-group">
            <label htmlFor="Nickname">Nick Name</label>
            <input
              type="text"
              className="form-control"
              id="Nickname"
              name="Nickname"
              value={formData.Nickname}
              onChange={handleChange}
              required
            />
          </div>

          {/* ---------------------------Email ---------------- */}
          <div className="form-group">
            <label htmlFor="Email">Email</label>
            <input
              type="Email"
              className="form-control"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Phone_Number">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="Phone_Number"
              name="Phone_Number"
              value={formData.Phone_Number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Address">Address</label>
            <input
              type="text"
              className="form-control"
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-outline-success mt-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditStudentProfile;
