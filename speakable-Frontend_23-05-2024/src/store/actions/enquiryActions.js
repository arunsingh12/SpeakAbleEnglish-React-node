import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";

export const Delete_Enquiry = createAsyncThunk(
  "Enquiry/Delete_Enquiry",
  async (id) => {
    const response = await axios.get(`Delete_Enquiry_Student/${id}`);
    console.log(response)
    return response.data;
  }
);

export const FetchAll_Enquiry = createAsyncThunk(
  "Enquiry/FetchAll_Enquiry",
  async () => {
    const response = await axios.get(`getenquiries`);
    // console.log(response)
    return response.data;
  }
);

export const Create_Enquiry = createAsyncThunk(
  "Enquiry/Create_Enquiry",
  async (data) => {
    const response = await axios.post(`Create_Enquiry`, data);
    // console.log(response)
    return response.data.enquirylist;
  }
);

export const Create_Enquiry_Student = createAsyncThunk(
  "Enquiry/Create_Enquiry_Student",
  async ({enquiryData,student_id}) => {
    // console.log(enquiryData,student_id)
    const response = await axios.post(`Create_Enquiry_Student/${student_id}`,enquiryData);
    // console.log(response);
    return response.data;
  }
);

export const Fetch_Student_Enquiry = createAsyncThunk(
  "Enquiry/Fetch_Student_Enquiry",
  async (Email) => {
    const response = await axios.get(`Fetch_Enquiry_Student/${Email}`);
    // console.log(response)
    return response.data.Enquiry;
  }
);

// SearchEnquirybyStudentUsername
export const SearchEnquirybyStudentUsername = createAsyncThunk(
  "Enquiry/SearchEnquirybyStudentUsername",
  async (input) => {
    try {
      const response = await axios.post(`SearchEnquirybyStudentUsername/${input}`);
      // console.log(response)
      return response;
    } catch (error) {
     console.log(error.response.data.message);
     return error.response.data.message;
    }
  }
);
