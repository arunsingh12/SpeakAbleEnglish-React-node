import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fetch_Student_Enquiry } from '../../store/actions/enquiryActions';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../admin-dashboard-components/AdminNav'
const Enquirys = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const student = useSelector((state) => state.students.user)
  const EnquiryData = useSelector((state) => state.enquirys.Student_Enquiry)
  
  useEffect(() => {
    dispatch(Fetch_Student_Enquiry(student?.Email))
  }, [dispatch,student?.Email])
  
  const NavigateHandler = (id) => {
    navigate(`/Student-dashboard/Enquirys/add-enquirys/${id}`)
  }

  return (
    <>
    <AdminNav/>
    <div className='EnquiryStudent_mainPage_style'>
      <div className='EnquiryStudent_header_style'>
        <h6 className='text-dark'>Enquiry Students Table</h6>
        <button onClick={() => NavigateHandler(student?._id)} className='btn btn-outline-success'>Add Enquiry</button>
      </div>
      <div className='EnquiryStudent_list_style d-flex flex-wrap flex-row'>
        <table className="table table-hover table-responsive table-borderless">
          <thead className='table-transparent'>
            <tr>
              <th className='th'>Name</th>
              <th className='th'>Email</th>
              <th className='th'>Message</th>
            </tr>
          </thead>
          <tbody>
                {EnquiryData?.map((enquiry, index) => (
                  <tr style={{ boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)', borderRadius: "8px" }} key={index}>
                    <td className='td'>{enquiry?.Name}</td>
                    <td className='td'>{enquiry?.Email}</td>
                    <td className='td'>{enquiry?.Message}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Enquirys;
