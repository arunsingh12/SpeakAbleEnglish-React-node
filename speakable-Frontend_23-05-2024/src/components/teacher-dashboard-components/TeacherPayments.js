import React from 'react'
import AdminNav from '../admin-dashboard-components/AdminNav'

const TeacherPayments = () => {

  const PaymentData = [
    {Amount:"25000", Course_Name:"General English", Teacher_Name:"Teacher1",Method:"UPI",Status:"Success", Payment_Date:"30/12/23"},
    {Amount:"25000", Course_Name:"Business English", Teacher_Name:"Teacher2",Method:"Net Banking",Status:"Failed", Payment_Date:"31/12/23"},
    {Amount:"25000", Course_Name:"Business English", Teacher_Name:"Teacher2",Method:"UPI",Status:"Success", Payment_Date:"4/1/24"},
    {Amount:"25000", Course_Name:"English for Adults", Teacher_Name:"Teacher3",Method:"Cash",Status:"Success", Payment_Date:"6/1/24"},
    ]



  return (
    <>
    <AdminNav/>
    <div className='Student_mainPage_style'>
    <div className='Student_header_style'>
      <h6 className='text-dark'>Payment Table</h6>
    </div>
    <div className='Student_list_style mt-3'>
      <table className="table table-hover table-responsive table-borderless">
        <thead className='table-transparent'>
          <tr>
            <th className='th'>Course Name</th>
            <th className='th'>Teacher's Name</th>
            <th className='th'>Status</th>
            <th className='th'>Amount</th>
            <th className='th'>Method</th>
            <th className='th'>Scheduled Date</th>
            {/* Add more table headers based on your schema */}
          </tr>
        </thead>
        <tbody>
          {PaymentData?.map((payment,index) => (
            <tr style={{ boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}  key={index}>
              <td className='td'>{payment.Course_Name}</td>
              <td className='td'>{payment.Teacher_Name}</td>
              <td className='td'>{payment.Status}</td>
              <td className='td'>{payment.Amount}</td>
              <th className='td'>{payment.Method}</th>
              <td className='td'>{payment.Payment_Date}</td>
              {/* Add more table data based on your schema */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </>
  )
}

export default TeacherPayments