import React, { useState, useEffect } from 'react';
import { GetTeachers, imageUpload } from '../../../store/actions/teachersActions';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from '../AdminNav'
import { updateCourse } from '../../../store/actions/coursesActions';

const AdminEditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teachers = useSelector((state) => state.teachers.AllTeacherlist);
  const courses = useSelector((state) => state.courses.AllCourseslist);
  // 
  const currentCourse = courses.find((course) => course._id === id);
  // console.log(currentCourse)

  useEffect(() => {
    dispatch(GetTeachers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Course_Name: '',
    Description: '',
    Purchase_Price: '',
    Teachers_Details: [],
    Course_Images:[],
  });

  useEffect(() => {
    if (currentCourse) {
      setFormData(currentCourse);
      // console.log(formData)
    }

  }, [currentCourse]);

  const handleCheckboxChange = (teacherId) => {
    setFormData((prevData) => {
      const isSelected = prevData.Teachers_Details.some((teacher) => teacher._id === teacherId);

      if (isSelected) {
        return {
          ...prevData,
          Teachers_Details: prevData.Teachers_Details.filter((teacher) => teacher._id !== teacherId),
        };
      } else {
        return {
          ...prevData,
          Teachers_Details: [...prevData.Teachers_Details, { _id: teacherId }],
        };
      }
    });
  };

  const handleFileUpload = async (event) => {
    const image = event.target.files[0];
    const uploadResult = await dispatch(imageUpload(image));
    setFormData({
      ...formData,
      Course_Images: formData.Course_Images?.length
        ? [...formData.Course_Images, uploadResult.payload]
        : [uploadResult.payload],
    });
  };

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      Course_Images: [...formData.Course_Images.filter((img) => img !== val)],
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseId = id;
    const updatedData = formData;
    // console.log(updateCourse)
    try {
      await dispatch(updateCourse({ courseId, updatedData }));
      navigate('/Admin-Dashboard/Courses');
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  return (
    <>
    <AdminNav/>
    <div className='EditCoursestyle'>
      <form onSubmit={handleSubmit}>
      <div className='Addteacherimage_box'>
            {formData.Course_Images?.map((md, index) => {
              return (
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
          {formData.Course_Images?.length < 10 && (
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
          <label htmlFor="Course_Name">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="Course_Name"
            name="Course_Name"
            value={formData.Course_Name}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, Course_Name: e.target.value }))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            className="form-control"
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, Description: e.target.value }))}
            required
          />
        </div>
        <div className="form-group" >
          <label htmlFor="Teachers_Details">Select Teachers</label> &nbsp;&nbsp;
          {teachers?.map((values) => (
            <div key={values._id} className="form-check">
              <input
                type="checkbox"
                id={values._id}
                value={values._id}
                checked={formData.Teachers_Details.some((teacher) => teacher._id === values._id)}
                onChange={() => handleCheckboxChange(values._id)}
                className="form-check-input"
              />
              <label htmlFor={values._id} className="form-check-label">
                {values.Username}
              </label>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="Purchase_Price">Purchase Price</label>
          <input
            type="text"
            className="form-control"
            id="Purchase_Price"
            name="Purchase_Price"
            value={formData.Purchase_Price}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, Purchase_Price: e.target.value }))}
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

export default AdminEditCourse;
