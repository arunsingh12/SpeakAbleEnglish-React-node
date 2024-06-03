import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { imageUpload } from "../../store/actions/teachersActions";
import { Getcourses } from "../../store/actions/coursesActions";
// import AdminNav from "./AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AdminAddTeachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.courseslist);
  // console.log(courses)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formData, setFormData] = useState({
    // teacherName: "",
    password: "",
    phoneNumber: "",
    address: "",
    coursesAssign: [],
    purchasePrice: "",
    description: "",
    shortTitle: "",
    Email: "",
    Profile_Image: [],
    socialLinks: [
      { platform: "facebook", link: "" },
      { platform: "twitter", link: "" },
      { platform: "instagram", link: "" },
      // Add more social media platforms if needed
    ],
  });

  useEffect(() => {
    dispatch(Getcourses());
  }, [dispatch]);

  // Function to check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      //  "teacherName",
      "password",
      "phoneNumber",
      "address",
      "purchasePrice",
      "description",
      "shortTitle",
      "Email",
    ];
    const missingFields = requiredFields.filter(
      (field) => formData[field].trim() === ""
    );
    // if (formData.phoneNumber.replace(/\D/g, "").length < 10) {
    //   missingFields.push("phoneNumber");
    // }
    console.log(missingFields);
    return { isValid: missingFields.length === 0, missingFields };
  };

  const handleCheckboxChange = (course) => {
    setFormData((prevData) => {
      const isSelected = prevData.coursesAssign.includes(course);
      if (isSelected) {
        return {
          ...prevData,
          coursesAssign: prevData.coursesAssign.filter((id) => id !== course),
        };
      } else {
        return {
          ...prevData,
          coursesAssign: [...prevData.coursesAssign, course],
        };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (index, platform, value) => {
    setFormData((prevData) => {
      const updatedSocialLinks = [...prevData.socialLinks];
      updatedSocialLinks[index] = {
        ...updatedSocialLinks[index],
        platform,
        link: value,
      };
      return {
        ...prevData,
        socialLinks: updatedSocialLinks,
      };
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

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      Profile_Image: [...formData.Profile_Image.filter((img) => img != val)],
    });
    // setMedia([...media.filter((img) => img != val)]);
  };

  const NextHandler = (e) => {
    e.preventDefault();
    const { isValid, missingFields } = isFormValid();
    const Alldata = { ...formData, teacherName: `${firstName} ${lastName}` };

    if (isValid) {
      navigate("/Admin-Dashboard/Teachers/add-teacher/add-availability", {
        state: { Alldata },
      });
    } else {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  console.log(formData.phoneNumber, "for");

  return (
    <>
      {/* <AdminNav /> */}
      <div className="Add_Teachers_main_div">
        <h5>Add New Teacher</h5>
        <form>
          {/* Image div */}
          <div className="Addteacherimage_box">
            {formData.Profile_Image?.map((md, index) => {
              return (
                <div
                  className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2 "
                  key={index}
                >
                  <img
                    className="w-100 active"
                    src={"https://ik.imagekit.io/8s3jwexmv/" + md}
                  />

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
            <div className="widthFormField">
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
          <div className="form_group_div  mt-2">
            {/* Teacher Links */}
            <div className="form-group widthFormField">
              {/* <label htmlFor="teacherName"></label> */}
              <input
                type="text"
                className="form-control"
                placeholder="Teacher First Name"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group widthFormField">
              {/* <label htmlFor="teacherName"></label> */}
              <input
                type="text"
                className="form-control"
                placeholder="Teacher Last Name"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            {/* Description Links */}
            <div className="form-group widthFormField">
              {/* <label htmlFor="description"></label> */}
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form_group_div mt-2">
            <div className="form-group widthFormField ">
              {/* <label htmlFor="phoneNumber"></label> */}
              {/* <input
                type="number"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder='Phone Number'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              /> */}
              <PhoneInput
                country={"us"}
                className="mt-2"
                value={formData.phoneNumber}
                name="phoneNumber"
                onChange={(value, country, e, formattedValue) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    phoneNumber: formattedValue,
                  }));
                }}
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  autoFocus: true,
                  className: "form-control teacherphonenumberinput",
                }}
              />
            </div>
            {/* Password Links */}
            <div className="form-group widthFormField ">
              {/* <label htmlFor="Password"></label> */}
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Address Links */}
            <div className="form-group widthFormField">
              {/* <label htmlFor="address"></label> */}
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            {/* Short Title Links */}
          </div>
          <div className="form_group_div mt-2">
            <div className="form-group widthFormField ">
              {/* <label htmlFor="shortTitle"></label> */}
              <input
                type="text"
                className="form-control"
                id="shortTitle"
                placeholder="shortTitle"
                name="shortTitle"
                value={formData.shortTitle}
                onChange={handleChange}
                required
              />
            </div>
            {/* Course Assign Links */}

            {/* Purchase Links */}
            <div className="form-group widthFormField ">
              {/* <label htmlFor="purchasePrice"></label> */}
              <input
                type="number"
                className="form-control"
                id="purchasePrice"
                name="purchasePrice"
                placeholder="Purchase Price"
                value={formData.purchasePrice}
                onChange={handleChange}
                required
              />
            </div>
            {/* Purchase Links */}
            <div className="form-group widthFormField">
              {/* <label htmlFor="purchasePrice"></label> */}
              <input
                type="Email"
                className="form-control"
                id="Email"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* <label>Social Links</label> */}
          <div className="form-group mt-2 form_group_div ">
            {formData.socialLinks.map((socialLink, index) => (
              <div key={index} className="social-link-item widthFormField">
                <div className="form-group justify-content-between">
                  {/* <label>{socialLink.platform}</label> */}
                  <input
                    type="text"
                    className="form-control "
                    placeholder={socialLink.platform}
                    value={socialLink.link}
                    onChange={(e) =>
                      handleSocialLinkChange(
                        index,
                        socialLink.platform,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="form-group widthFormField">
            <label htmlFor="Status">Select Courses</label> &nbsp;&nbsp;
            {courses?.map((values) => (
              <div key={values._id} className="form-check">
                <input
                  type="checkbox"
                  id={values._id}
                  value={values._id}
                  checked={formData.coursesAssign.includes(values._id)}
                  onChange={() => handleCheckboxChange(values._id)}
                  className="form-check-input"
                />
                <label htmlFor={values._id} className="form-check-label">
                  {values.Course_Name}
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={NextHandler}
            className="btn btn-outline-success mt-3 w-100"
          >
            NEXT
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminAddTeachers;
