import React, { useEffect } from 'react'
import Calendar from 'react-calendar';
import AdminNav from './AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllstudents } from '../../store/actions/studentsActions';
import { GetTeachers } from '../../store/actions/teachersActions';
import { fetchAllpayments } from '../../store/actions/paymentActions';
// import 'react-calendar/dist/Calendar.css';

const AdminDash = () => {
  
  const dispatch = useDispatch()
  const students = useSelector((state) => state.students.studentslist  )
//   console.log(students)
  const teachers = useSelector((state) => state.teachers.Teacherslist )
//   console.log(teachers)
  const PaymentData = useSelector((state) => state.payments.Allpaymentlist)
  console.log(PaymentData)

  useEffect(() => {
    dispatch(fetchAllstudents())
    dispatch(GetTeachers())
    dispatch(fetchAllpayments())
  }, [dispatch])

  const totalIncome = PaymentData.reduce((total, payment) => {
    if (payment.Purchase_Amount && !isNaN(payment.Purchase_Amount)) {
        return total + payment.Purchase_Amount;
    }
    return total;
}, 0);


  return (
    <>
        <AdminNav/>
    <div className='Admin-Dash_main_div'>
        <h6>My Dashboard</h6>
        <div className='Admin-Dash_contnet_box'>
            <div className='Admin-Dash_contnet_div'>
                <span className='Admin-Dash_contnet_div_span1'>Welcome To Speakable English</span>
                <img className='Admin-Dash_contnet_div_img'
                      src='https://img.freepik.com/free-vector/university-student-cap-mortar-board-diploma_3446-334.jpg?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=sph'
                      alt=''
                />
                <span className='Admin-Dash_contnet_div_span2'>12th Top Of the Year, 2023</span>
            </div>
            <div className='Admin-Dash_contnet_section_div'>
                    <img className='Admin-Dash_contnet_head_div_img'
                        src='https://cdn-icons-png.flaticon.com/128/9517/9517233.png?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=ais'
                        alt=''
                    />
                    <span className='Admin-Dash_contnet_head_div_span'>Students</span>
                    <span style={{color:"grey"}}>{students.length}</span>
            </div>
            <div className='Admin-Dash_contnet_section_div'>
                    <img className='Admin-Dash_contnet_head_div_img'
                        src='https://cdn-icons-png.flaticon.com/128/609/609183.png?uid=R132339509&ga=GA1.2.1941482743.1703671287'
                        alt=''
                    />
                    <span className='Admin-Dash_contnet_head_div_span'>Teachers</span>
                    <span style={{color:"grey"}}>{teachers.length}</span>
            </div>
            <div className='Admin-Dash_contnet_section_div'>
         
                    <img className='Admin-Dash_contnet_head_div_img'
                        src='https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287'
                        alt=''
                    />
                    <span className='Admin-Dash_contnet_head_div_span'>Total Income</span>
                    <span style={{color:"grey"}}>${totalIncome}</span>
            </div>
        </div>
        <div className='Admin-Dash_list_box'>
            <div className='Admin-Dash_student_list_box'>
                <h6>Student List</h6>
                 <div className='Admin-Dash_student_list_div'>
                    <table className="table table-hover table-responsive table-borderless">
                        <thead className='table-transparent'>
                            <tr>
                                <th className='th'>#</th>
                                <th className='th'>Name</th>
                                <th className='th'>Email</th>
                                <th className='th'>Phone Number</th>
                            </tr>
                        </thead>
                            <tbody >
                                {students?.map((student,index) => (
                                <tr style={{boxShadow:'0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)'}} key={student._id}>
                                    <td className='td'>{index + 1}</td>
                                    <td className='td'>
                                    {student.Profile_Image.length > 0
                                    ? <img src={`https://ik.imagekit.io/8s3jwexmv/${student.Profile_Image[0]}`} alt=""
                                    className='td_img'
                                />
                                    :<span className='td_no_img'>{student.Username.slice(0,1).toUpperCase()}</span> }
                                            
                                    {student?.Username}
                                    </td>
                                    <td className='td'>{student?.Email}</td>
                                    <td className='td'>{student?.Phone_Number}</td>
                                </tr>
                                ))}
                            </tbody>
                    </table>
                 </div>   
            </div>
            {/* <div className='Admin-Dash_student_calender_box'>
            <h6>Events - 2023 to 2024</h6>
            <br/>
              <Calendar/>                      
            </div> */}
        </div>
    </div>
    </>
  )
}

export default AdminDash