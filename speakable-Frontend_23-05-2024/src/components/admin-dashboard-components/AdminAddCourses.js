import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetTeachers, imageUpload } from '../../store/actions/teachersActions';
import { CreateCourse } from '../../store/actions/coursesActions';
import AdminNav from './AdminNav';
import { useNavigate } from 'react-router-dom';

const AdminAddCourses = () => {
  const teachers = useSelector((state) => state.teachers.Teacherslist);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(GetTeachers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Course_Name: '',
    Description: '',
    Purchase_Price: '',
    Teachers_Details: [],
    Course_Images:[] 
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(CreateCourse(formData));
      navigate('/Admin-Dashboard/Courses');
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  const handleCheckboxChange = (teacherId) => {
    setFormData((prevData) => {
      const selectedTeachers = prevData.Teachers_Details.includes(teacherId)
        ? prevData.Teachers_Details.filter((id) => id !== teacherId)
        : [...prevData.Teachers_Details, teacherId];

      return {
        ...prevData,
        Teachers_Details: selectedTeachers,
      };
    });
  };

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      Course_Images: [...formData.Course_Images.filter((img) => img != val)],
    });
        // setMedia([...media.filter((img) => img != val)]);
  };
  
  return (
    <>
        {/* <AdminNav/> */}
        <div className='AddCoursestyle'>
          <h5>Add New Courses</h5>
        <form onSubmit={handleSubmit}>
        <div className='Addteacherimage_box'>
            {formData.Course_Images?.map((md, index) => {
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
        {formData.Course_Images?.length < 10 && (
              <div className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2">
                <div className="card-body">
                  <p style={{fontSize:"12px"}} className="card-text">Select image file to upload.</p>
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
                onChange={handleChange}
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
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="Teachers_Details">Select Teachers</label> &nbsp;&nbsp;
            {teachers?.map((values) => (
              <div key={values._id} className="form-check">
                <input
                  type="checkbox"
                  id={values._id}
                  value={values._id}
                  checked={formData.Teachers_Details.includes(values._id)}
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
                onChange={handleChange}
                required
            />
            </div>
            <button type="submit" className="btn btn-outline-success mt-3 btn-course">
            Submit
            </button>
        </form>
        </div>
    </>
  );
};

export default AdminAddCourses;
