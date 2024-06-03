import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPaymentsByStudentID } from "../../store/actions/paymentActions";
import AdminNav from "../admin-dashboard-components/AdminNav";
import { useNavigate } from "react-router-dom";

const handleDownloadInvoice = (path) => {
  const anchor = document.createElement("a");
  anchor.href = path;
  anchor.download = path.split("/").pop();
  anchor.click();
};

const Payments = () => {
  const student = useSelector((state) => state.students.user);
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments.StudentID_Payments);
  console.log(payments);

  useEffect(() => {
    dispatch(GetPaymentsByStudentID(student?._id));
  }, [student._id, dispatch]);


  const navigate  = useNavigate()
  
  const handleDownloadInvoice = (payment) => {
    if (payment?._id) {
      navigate(`/Student-dashboard/Payments/Invoice/${payment?._id}`, {
        state: payment,
      });
    } else {
      console.error("Payment ID is undefined");
    }
  };


  return (
    <>
      <AdminNav />
      <div className="Student_mainPage_style">
        <div className="Student_header_style">
          <h6 className="text-dark">Payment Table</h6>
        </div>
        <div className="Student_list_style mt-3">
          <table className="table table-hover table-responsive table-borderless">
            <thead className="table-transparent">
              <tr>
                <th className="th">Package Name</th>
                <th className="th">Course Name</th>
                <th className="th">Teacher's Name</th>
                <th className="th">Student Name</th>
                <th className="th">Status</th>
                <th className="th">Amount</th>
                <th className="th">Method</th>
                <th className="th">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment, index) => (
                <tr
                  style={{
                    boxShadow:
                      "0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                  }}
                  key={index}
                >
                  <td className="td">{payment?.Package_ID?.Package_Name}</td>
                  <td className="td">
                    {payment?.Package_ID?.Course_IDs?.map(
                      (val, index) =>
                        `${val?.Course_Name}${
                          index < payment?.Package_ID?.Course_IDs?.length - 1
                            ? ", "
                            : ""
                        }`
                    )}
                  </td>
                  <td className="td">
                    {payment?.Package_ID?.Teacher_IDs?.map(
                      (val, index) =>
                        `${val?.Username}${
                          index < payment?.Package_ID?.Teacher_IDs?.length - 1
                            ? ", "
                            : ""
                        }`
                    )}
                  </td>
                  <td className="td">{payment?.Student_ID?.Username}</td>
                  <td className="td">{payment?.Status}</td>
                  <td className="td">{payment?.Package_ID?.Package_Amount}</td>
                  <td className="td">{payment?.Method}</td>
                  <td className="td">
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleDownloadInvoice(payment)}
                    >
                      Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Payments;
