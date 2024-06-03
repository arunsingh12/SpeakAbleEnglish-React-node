import { createSlice } from "@reduxjs/toolkit";
import { Create_Enquiry, Create_Enquiry_Student, Delete_Enquiry, FetchAll_Enquiry, Fetch_Student_Enquiry, SearchEnquirybyStudentUsername } from "../actions/enquiryActions";
import { toast } from "react-toastify";

let intialState = {
  enquirylist:[],
  enquiryDetails:[],
  Student_Enquiry:[],
  loading: false,
};

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: intialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(Delete_Enquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(Delete_Enquiry.fulfilled, (state, action) => {
        // state.enquirylist = action.payload
        // Delete_Enquiry
         state.enquirylist = state.enquirylist.filter(
           (enquiry) => enquiry._id !== action.payload.DeletedEnquiry._id
         );
        state.loading = false;
      })
      .addCase(Delete_Enquiry.rejected, (state) => {
        state.loading = false;
      })
      .addCase(FetchAll_Enquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchAll_Enquiry.fulfilled, (state, action) => {
        state.enquirylist = action.payload
        state.loading = false;
      })
      .addCase(FetchAll_Enquiry.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Create_Enquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(Create_Enquiry.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(Create_Enquiry.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Fetch_Student_Enquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(Fetch_Student_Enquiry.fulfilled, (state, action) => {
        state.Student_Enquiry = action.payload
        state.loading = false;
      })
      .addCase(Fetch_Student_Enquiry.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Create_Enquiry_Student.pending, (state) => {
        state.loading = true;
      })
      .addCase(Create_Enquiry_Student.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(Create_Enquiry_Student.rejected, (state) => {
        state.loading = false;
      })
      // SearchEnquirybyStudentUsername
      .addCase(SearchEnquirybyStudentUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchEnquirybyStudentUsername.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.enquirylist = action.payload.data.foundedEnquiry          
          state.loading = false;
        } else {
          state.enquirylist = action.payload.data
          toast.warning(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(SearchEnquirybyStudentUsername.rejected, (state) => {
        state.loading = false;
      })
      
  },
});

// export const { } = coursesSlice.actions;
export default enquirySlice.reducer;
