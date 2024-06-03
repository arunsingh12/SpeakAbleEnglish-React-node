import React, { useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../admin-dashboard-components/Calendar.css";

const AccountantInvoice = () => {
  const location = useLocation();
  const paymentData = location.state;
  console.log("paymentData", paymentData);
  const { id } = useParams(); // Access the payment ID from route parameters
  const invoiceRef = useRef(null);

  const downloadInvoice = () => {
    if (invoiceRef.current) {
      html2canvas(invoiceRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("invoice.pdf");
      });
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="w-100">
      <div className=" " style={{ width: "800px" }} ref={invoiceRef}>
        <div className="d-flex justify-content-between m-4">
          <div>Issued on {formatDate(paymentData?.createdAt)}, Białystok</div>
          <div style={{ width: "380px" }}>
            <div className="fs-3 fw-bold">
              Invoice No. {formatDate(paymentData?.createdAt)}
            </div>
            <div className="d-flex justify-content-between">
              <div>Sale date: </div>
              <div>{formatDate(paymentData?.createdAt)}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Method of payment: </div>
              <div>{paymentData?.Method}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Date of payment: </div>
              <div>{formatDate(paymentData?.createdAt)}</div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between m-4">
          <div>
            <div className="fs-3 fw-bold">Seller:</div>
            <div className="d-flex justify-content-between">
              <div style={{ width: "255px" }}>
                Speakable English Francis Prominski FRANCIS PROMINSKI
                <br />
                Aleja Jana Pawła II 61C/102
                <br />
                15-704 Białystok
                <br />
                NIP 5423343721
              </div>
            </div>
          </div>
          <div style={{ width: "380px" }}>
            <div className="fs-3 fw-bold">Buyer:</div>
            <div className="d-flex justify-content-between">
              <div style={{ width: "255px" }}>
                {paymentData?.Student_ID?.Username}
                <br />
                {paymentData?.Student_ID?.Email}
                <br />
                {paymentData?.Student_ID?.Address}
              </div>
            </div>
          </div>
        </div>
        <div className="border-1 border-dark m-4">
          <div className="fs-3 fw-bold">INVOICE ITEMS</div>
          <table className="table table-bordered">
            <thead className="bg-dark text-light">
              <tr>
                <th>No</th>
                <th>Name of the product or service</th>
                <th>Base legal</th>
                <th>Quantity Units</th>
                <th>Price unit gross</th>
                <th>Value gross</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{paymentData.Package_ID.Package_Name}</td>
                <td>Amount</td>
                <td>1</td>
                <td>{paymentData.Package_ID.Package_Amount}</td>
                <td>{paymentData.Package_ID.Package_Amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border-1 border-dark m-4">
          <div className="fs-3 fw-bold">SUMMARY</div>
          <div className="table-responsive border-2 ">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td></td>
                  <td>Gross value</td>
                </tr>
                <tr>
                  <td className="fw-bold">Together:</td>
                  <td>{paymentData.Package_ID.Package_Name}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Paid: </td>
                  <td>{paymentData.Package_ID.Package_Amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex m-4 justify-content-between">
          <div style={{ fontSize: "15px" }}>
            Invoice without the recipient's signature
          </div>
          <div style={{ fontSize: "15px", textAlign: "center" }}>
            The person authorized to issue an invoice
            <br />
            <span className="fw-bold">FRANCIS PROMINSKI</span>
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-success m-4"
          onClick={downloadInvoice}
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default AccountantInvoice;
