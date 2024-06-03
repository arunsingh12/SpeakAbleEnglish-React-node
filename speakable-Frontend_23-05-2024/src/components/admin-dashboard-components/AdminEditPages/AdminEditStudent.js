// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   fetchAllstudents,
//   updateStudent,
// } from "../../../store/actions/studentsActions";
// import { imageUpload } from "../../../store/actions/teachersActions";
// import PhoneInput from "react-phone-input-2";

// const AdminEditStudent = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const students = useSelector((state) => state.students.AllStudentlist);
//   const currentStudent = students.find((student) => student._id === id);
//   const navigate = useNavigate();

//   console.log(currentStudent);
//   const [formData, setFormData] = useState({
//     Username: "",
//     Password: "",
//     firstName: "",
//     lastName: "",
//     Nickname: "",
//     Phone_Number: "",
//     Address: "",
//     Email: "",
//     Enquiry_Student: [],
//     Profile_Image: [],
//   });

//   useEffect(() => {
//     dispatch(fetchAllstudents());
//   }, []);

//   useEffect(() => {
//     if (currentStudent) {
//       setFormData({ ...currentStudent });
//     }
//   }, [currentStudent]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const student_ID = id;
//   await setFormData({
//       ...formData,
//       Username: `${formData.firstName} ${formData.lastName}`,
//     });

//     try {
//       console.log(formData);
//       await dispatch(updateStudent({ student_ID, formData }));
//       navigate("/Admin-Dashboard/Students");
//     } catch (error) {
//       console.error("Error editing student:", error);
//     }
//   };

//   const handleImageRemoval = async (val) => {
//     setFormData({
//       ...formData,
//       Profile_Image: [...formData.Profile_Image.filter((img) => img !== val)],
//     });
//   };

//   const handleFileUpload = async (event) => {
//     const image = event.target.files[0];
//     const uploadResult = await dispatch(imageUpload(image));
//     setFormData({
//       ...formData,
//       Profile_Image: formData.Profile_Image?.length
//         ? [...formData.Profile_Image, uploadResult.payload]
//         : [uploadResult.payload],
//     });
//   };

//   return (
//     <>
//       <div className="Edit_Teachers_main_div">
//         <h5>Edit Student Details</h5>
//         <form onSubmit={handleSubmit}>
//           {/* ------------------------ */}
//           <div className="Addteacherimage_box">
//             {formData.Profile_Image?.map((md, index) => {
//               return (
//                 <div
//                   className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2"
//                   key={index}
//                 >
//                   <a href="#">
//                     <img
//                       className="w-100 active"
//                       src={"https://ik.imagekit.io/8s3jwexmv/" + md}
//                       alt={`Image ${index + 1}`}
//                     />
//                   </a>
//                   <span
//                     className="badge bg-danger badge-pill badge-round ml-1"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       handleImageRemoval(md);
//                     }}
//                   >
//                     Delete
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//           {/* Image input Links */}
//           {formData.Profile_Image?.length < 10 && (
//             <div className="widthFormField">
//               <div className="card-body">
//                 <p style={{ fontSize: "12px" }} className="card-text">
//                   Select image file to upload.
//                 </p>
//                 {/* Basic file uploader */}
//                 <input
//                   className="form-control widthFormField"
//                   encType="multipart/form-data"
//                   type="file"
//                   name="images"
//                   id="formFile"
//                   onChange={handleFileUpload}
//                 />
//               </div>
//             </div>
//           )}
//           {/* ------------- */}
//           <div className="form-group">
//             <label htmlFor="firstName">Student First Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="firstName"
//               name="firstName"
//               value={formData.firstName}
//               onChange={(e) => handleChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Student Last Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="lastName"
//               name="lastName"
//               value={formData.lastName}
//               onChange={(e) => handleChange(e)}
//               required
//             />
//           </div>
//           {/* Nickname */}
//           <div className="form-group">
//             <label htmlFor="lastName">Student Nickname</label>
//             <input
//               type="text"
//               className="form-control"
//               id="Nickname"
//               name="Nickname"
//               value={formData.Nickname}
//               onChange={(e) => handleChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="Email">Email</label>
//             <input
//               type="Email"
//               className="form-control"
//               id="Email"
//               name="Email"
//               value={formData.Email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="Password">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="Password"
//               name="Password"
//               value={formData.Password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="Phone_Number">Phone Number</label>
//             <PhoneInput
//               country={"us"}
//               className="mt-2"
//               value={formData.Phone_Number}
//               onChange={(phone, country, e, formattedValue) => {
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   Phone_Number: formattedValue,
//                 }));
//               }}
//               inputProps={{
//                 name: "Phone_Number",
//                 required: true,
//                 autoFocus: true,
//                 style: { marginLeft: "40px", width: "260px" },
//               }}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="Address">Address</label>
//             <input
//               type="text"
//               className="form-control"
//               id="Address"
//               name="Address"
//               value={formData.Address}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           {/* Submit button */}
//           <button type="submit" className="btn btn-outline-success mt-3">
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AdminEditStudent;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAllstudents,
  updateStudent,
} from "../../../store/actions/studentsActions";
import { imageUpload } from "../../../store/actions/teachersActions";
import PhoneInput from "react-phone-input-2";

const AdminEditStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.AllStudentlist);
  const currentStudent = students.find((student) => student._id === id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    firstName: "",
    lastName: "",
    Nickname: "",
    Phone_Number: "",
    Address: "",
    Email: "",
    Enquiry_Student: [],
    Profile_Image: [],
  });

  useEffect(() => {
    dispatch(fetchAllstudents());
  }, [dispatch]);

  useEffect(() => {
    if (currentStudent) {
      setFormData({ ...currentStudent });
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "firstName" || name === "lastName"
        ? { Username: `${prevData.firstName} ${prevData.lastName}` }
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student_ID = id;
    const updatedFormData = {
      ...formData,
      Username: `${formData.firstName} ${formData.lastName}`,
    };

    try {
      await dispatch(updateStudent({ student_ID, formData: updatedFormData }));
      navigate("/Admin-Dashboard/Students");
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  const handleImageRemoval = (val) => {
    setFormData((prevData) => ({
      ...prevData,
      Profile_Image: prevData.Profile_Image.filter((img) => img !== val),
    }));
  };

  const handleFileUpload = async (event) => {
    const image = event.target.files[0];
    const uploadResult = await dispatch(imageUpload(image));
    setFormData((prevData) => ({
      ...prevData,
      Profile_Image: prevData.Profile_Image?.length
        ? [...prevData.Profile_Image, uploadResult.payload]
        : [uploadResult.payload],
    }));
  };

  return (
    <div className="Edit_Teachers_main_div">
      <h5>Edit Student Details</h5>
      <form onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="Addteacherimage_box">
          {formData.Profile_Image?.map((md, index) => (
            <div
              className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2"
              key={index}
            >
              <a href="#">
                <img
                  className="w-100 active"
                  src={"https://ik.imagekit.io/8s3jwexmv/" + md}
                  alt={`Image ${index + 1}`}
                />
              </a>
              <span
                className="badge bg-danger badge-pill badge-round ml-1"
                style={{ cursor: "pointer" }}
                onClick={() => handleImageRemoval(md)}
              >
                Delete
              </span>
            </div>
          ))}
        </div>
        {formData.Profile_Image?.length < 10 && (
          <div className="widthFormField">
            <div className="card-body">
              <p style={{ fontSize: "12px" }} className="card-text">
                Select image file to upload.
              </p>
              <input
                className="form-control widthFormField"
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
          <label htmlFor="firstName">Student First Name</label>
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
        <div className="form-group">
          <label htmlFor="lastName">Student Last Name</label>
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
        <div className="form-group">
          <label htmlFor="Nickname">Student Nickname</label>
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
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
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
  );
};

export default AdminEditStudent;
