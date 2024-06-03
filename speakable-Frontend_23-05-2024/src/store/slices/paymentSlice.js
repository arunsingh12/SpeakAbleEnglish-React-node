import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllpayments,
  Add_payment,
  Updatepayment,
  Deletepayment,
  GetPaymentsByStudentID,
  Create_Payment,
  getOrderDetails,
  SearchPaymentbyStudentUsername,
} from "../actions/paymentActions";
import { toast } from "react-toastify";

let intialState = {
  loading: false,
  paymentlist: [],
  Allpaymentlist: [],
  StudentID_Payments: [],
  paymentResponseUrl: [],
  orderId: "",
  orderData: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllpayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllpayments.fulfilled, (state, action) => {
        state.paymentlist = action.payload;
        state.Allpaymentlist = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllpayments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Add_payment.fulfilled, (state, action) => {
        state.Allpaymentlist.push(action.payload);
        state.loading = false;
      })
      .addCase(Add_payment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Deletepayment.fulfilled, (state, action) => {
        state.loading = false;
        state.Allpaymentlist = state.Allpaymentlist.filter(
          (Payment) => Payment._id !== action.payload._id
        );
      })
      .addCase(Deletepayment.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Updatepayment.fulfilled, (state, action) => {
        const { PaymentID, updatedData } = action.payload;
        // console.log(PaymentID,updatedData);
        // console.log(action.payload)
        const updatedPaymentIndex = state.Allpaymentlist.findIndex(
          (Payment) => Payment._id === PaymentID
        );

        if (updatedPaymentIndex !== -1) {
          const updatedBooking = {
            ...state.Allpaymentlist[updatedPaymentIndex],
            ...updatedData,
          };
          state.Allpaymentlist = [
            ...state.Allpaymentlist.slice(0, updatedPaymentIndex),
            updatedBooking,
            ...state.Allpaymentlist.slice(updatedPaymentIndex + 1),
          ];
        }
      })
      .addCase(Updatepayment.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(GetPaymentsByStudentID.fulfilled, (state, action) => {
        state.loading = false;
        state.StudentID_Payments = action.payload;
      })
      .addCase(GetPaymentsByStudentID.rejected, (state, action) => {
        state.loading = true;
      })

      .addCase(Create_Payment.pending, (state) => {
        state.loading = true;
      })
      .addCase(Create_Payment.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.paymentResponseUrl = action.payload.data.paymentResponseUrl;
        state.orderId = action.payload.data.orderId;
        state.loading = false;
      })
      .addCase(Create_Payment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.data) {
          state.orderData = action.payload.data.orderData;
          toast.success("SuccessFully Fetched the Payment Details.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(SearchPaymentbyStudentUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchPaymentbyStudentUsername.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.data) {
          state.Allpaymentlist = action.payload.data.foundedPayment;
          state.loading = false;
        } else {
          state.Allpaymentlist = action.payload.data
          toast.warning(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(SearchPaymentbyStudentUsername.rejected, (state) => {
        state.loading = false;
      })
  },
});

// export const { } = paymentSlice.actions;
export default paymentSlice.reducer;
