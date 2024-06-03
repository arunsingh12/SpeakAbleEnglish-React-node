import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllpayments } from "../../store/actions/paymentActions";
import { useNavigate } from "react-router-dom";

const AdminPayments = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments.Allpaymentlist);
  console.log(payments);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllpayments());
  }, [dispatch]);

  const handleDownloadInvoice = (payment) => {
    if (payment._id) {
      navigate(`/Admin-Dashboard/Payments/Invoice/${payment._id}`, {
        state: payment,
      });
    } else {
      console.error("Payment ID is undefined");
    }
  };

  const filteredPayments = payments.filter((payment) =>
    payment.Student_ID.Username.toLowerCase().includes(
      searchInput.toLowerCase()
    )
  );

  return (
    <>
      <AdminNav
        value={searchInput}
        setValue={setSearchInput}
        placeholder="Search by Student Name.."
      />
      <div className="Payments_mainPage_style">
        <div className="Payments_header_style">
          <h6 className="text-dark">Payments Table</h6>
        </div>
        <div className="Payments_list_style d-flex flex-wrap flex-row">
          {filteredPayments && filteredPayments?.length > 0 ? (
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
                {filteredPayments?.map((payment, index) => (
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
                          `${val.Course_Name}${
                            index < payment?.Package_ID?.Course_IDs?.length - 1
                              ? ", "
                              : ""
                          }`
                      )}
                    </td>
                    <td className="td">
                      {payment?.Package_ID?.Teacher_IDs?.map(
                        (val, index) =>
                          `${val.Username}${
                            index < payment?.Package_ID?.Teacher_IDs?.length - 1
                              ? ", "
                              : ""
                          }`
                      )}
                    </td>
                    <td className="td">{payment?.Student_ID?.Username}</td>
                    <td className="td">{payment?.Status}</td>
                    <td className="td">
                      {payment?.Package_ID?.Package_Amount}
                    </td>
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
          ) : (
            <p>No payments available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPayments;
