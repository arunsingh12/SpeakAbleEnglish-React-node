import React from 'react'

const TeacherEnquirys = () => {

  const EnquiryData = [
    {
      Name: 'John Doe',
      Email: 'john.doe@example.com',
      Phone_Number: '1234567890',
      Who_Will_Study: 'High School Students',
      What_Is_Your_Learning_Experience: 'Beginner',
      Who_Do_You_Want_To_Study_With: 'Group',
    },
    {
      Name: 'Jane Doe',
      Email: 'jane.doe@example.com',
      Phone_Number: '9876543210',
      Who_Will_Study: 'College Students',
      What_Is_Your_Learning_Experience: 'Intermediate',
      Who_Do_You_Want_To_Study_With: 'Individual',
    },
    // Add more dummy enquiries as needed
  ];



  return (
    <div className='EnquiryStudent_mainPage_style'>
      <div className='EnquiryStudent_header_style'>
        <h6 className='text-dark'>Enquiry Teachers Table</h6>
      </div>
      <div className='EnquiryStudent_list_style d-flex flex-wrap flex-row'>
        <table className="table table-hover table-responsive table-borderless">
          <thead className='table-transparent'>
            <tr>
              <th className='th'>Name</th>
              <th className='th'>Email</th>
              <th className='th'>Phone Number</th>
              <th className='th'>Who Will Study</th>
              <th className='th'>Learning Experience</th>
              <th className='th'>Study With</th>
              {/* Add more table headers based on your schema */}
            </tr>
          </thead>
          <tbody>
            {EnquiryData.map((enquiry, index) => (
              <tr style={{ boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)', borderRadius: "8px" }} key={index}>
                <td className='td'>{enquiry.Name}</td>
                <td className='td'>{enquiry.Email}</td>
                <td className='td'>{enquiry.Phone_Number}</td>
                <td className='td'>{enquiry.Who_Will_Study}</td>
                <td className='td'>{enquiry.What_Is_Your_Learning_Experience}</td>
                <td className='td'>{enquiry.Who_Do_You_Want_To_Study_With}</td>
                {/* Add more table data based on your schema */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherEnquirys