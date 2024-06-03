import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";

// ACTIONS : api calls
export const fetchAllpayments = createAsyncThunk(
  "payments/getpayments",
  async () => {
    const response = await axios.get(`getpayments`);
    // console.log(response)
    return response.data;
  }
);

export const Add_payment = createAsyncThunk(
  "payments/Add_payment",
  async () => {
    const response = await axios.post(`/Add_Payment`);
    // console.log(response.data)
    return response.data;
  }
);

export const Deletepayment = createAsyncThunk(
  "payments/Deletepayment",
  async (PaymentID) => {
    // console.log(PaymentID);
    try {
      const response = await axios.get(`Delete_Payment/${PaymentID}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const Updatepayment = createAsyncThunk(
  "payments/Updatepayment",
  async ({ PaymentID, updatedData }) => {
    // console.log(PaymentID);
    try {
      const response = await axios.post(
        `Update_Payment/${PaymentID}`,
        updatedData
      );
      // console.log(response.data);
      return response.data;
      // return { student_ID, updatedData };
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const GetPaymentsByStudentID = createAsyncThunk(
  "payments/GetPaymentsByStudentID",
  async (id) => {
    // console.log(id);
    try {
      const response = await axios.get(`GetPaymentsByStudentID/${id}`);
      // console.log(response);
      return response.data.Payments;
    } catch (error) {
      console.error("Error fetching meetings:", error);
      throw error; // Propagate the error to be caught by Redux Toolkit
    }
  }
);

export const Create_Payment = createAsyncThunk(
  "packages/Create_Payment",
  async (formData) => {
    try {
      console.log(formData)
      const response = await axios.post(`Make-Payment`, formData);
      document.cookie = `orderId=${response.data.orderId}; path=/`; // Set orderId in cookies
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "packages/getOrderDetails",
  async (orderId) => {
    try {
      // console.log(orderId);
      const response = await axios.get(`authorizePayment/${orderId}`);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);


// SearchPaymentbyStudentUsername
export const SearchPaymentbyStudentUsername = createAsyncThunk(
  "packages/SearchPaymentbyStudentUsername",
  async (input) => {
    try {
      // console.log(input);
      const response = await axios.post(`SearchPaymentbyStudentUsername/${input}`);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// FindInvoice
// export const FindInvoice = createAsyncThunk(
//   "packages/FindInvoice",
//   async (invoiceName) => {
//     try {
//       // console.log(input);
//       const response = await axios.post(`FindInvoice/${invoiceName}`);
//       console.log(response);
//       return response;
//     } catch (error) {
//       console.log(error.response.data.message);
//       return error.response.data.message;
//     }
//   }
// );
