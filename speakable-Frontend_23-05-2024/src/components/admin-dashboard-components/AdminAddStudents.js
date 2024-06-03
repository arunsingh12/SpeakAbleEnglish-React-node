import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Signup_Student_By_Admin } from "../../store/actions/studentsActions";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import { imageUpload } from "../../store/actions/teachersActions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AdminAddStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formData, setFormData] = useState({
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

  console.log()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await dispatch(
        Signup_Student_By_Admin({
          ...formData,
          Username: `${formData.firstName} ${formData.lastName}`,
        })
      );
      setFormData({
        ...formData,
        Username: `${firstName} ${lastName}`,
        firstName: "",
        lastName: "",
        Nickname: "",
        Password: "",
        Phone_Number: "",
        Address: "",
        Email: "",
        Enquiry_Student: [],
        media: [],
      });
      navigate("/Admin-Dashboard/Students");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  console.log(formData, "formdata ----------- ");
  console.log(formData.Username , "------------------------ Username ---------");

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

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      Profile_Image: [...formData.Profile_Image.filter((img) => img != val)],
    });
    // setMedia([...media.filter((img) => img != val)]);
  };

  return (
    <>
      {/* <AdminNav/> */}
      <div className="AddStudentstyle">
        <h4>Add New Student</h4>
        <form onSubmit={handleSubmit}>
          <div className="Addteacherimage_box">
            {formData.Profile_Image?.map((md, index) => {
              return (
                <div
                  className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2 "
                  key={index}
                >
                  <a href="#">
                    <img
                      className="w-100 active"
                      src={"https://ik.imagekit.io/8s3jwexmv/" + md}
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
              );
            })}
          </div>
          {/* Image input Links */}
          {formData.Profile_Image?.length < 10 && (
            <div className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2">
              <div className="card-body">
                <p style={{ fontSize: "12px" }} className="card-text">
                  Select image file to upload.
                </p>
                {/* Basic file uploader */}
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
          <div className="form-group">
            <label htmlFor="Username">Student First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              // onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label htmlFor="Username">Student Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              // onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label htmlFor="Username">Nick Name</label>
            <input
              type="text"
              className="form-control"
              id="Nickname"
              name="Nickname"
              value={formData.Nickname}
              onChange={handleChange}
              // onChange={(e) => setNickName(e.target.value)}
              required
            />
            <label htmlFor="Password">Email</label>
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
            <PhoneInput
              country={"us"}
              className="mt-2"
              value={formData.Phone_Number}
              onChange={(phone, country, e, formattedValue) => {
                setFormData((prevData) => ({
                  ...prevData,
                  Phone_Number: formattedValue,
                }));
              }}
              inputProps={{
                name: "Phone_Number",
                required: true,
                autoFocus: true,
                style: { marginLeft: "40px", width: "260px" },
              }}
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
          <button type="submit" className="btn btn-outline-success mt-3">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminAddStudents;