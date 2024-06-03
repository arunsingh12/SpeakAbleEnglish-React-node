import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";
import { toast } from "react-toastify";

// ACTIONS : api calls
export const fetchAllstudents = createAsyncThunk(
  "student/fetchAllStudent",
  async () => {
    const response = await axios.get(`FetchAll_students`);
    return response.data.studentslist;
  }
);

export const Signup_Student = createAsyncThunk(
  "student/Signup_Student",
  async (data) => {
    try {
      const response = await axios.post(`Signup_Student`, data);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const FindUserByEmail = createAsyncThunk(
  "student/FindUserByEmail",
  async (data) => {
    try {
      const response = await axios.post(`FindUserByEmail`, data);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const MatchOTP = createAsyncThunk("student/MatchOTP", async (data) => {
  try {
    const response = await axios.post(`MatchOTP`, data);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
});

export const Reset_Password = createAsyncThunk(
  "auth/Reset_Password",
  async (data) => {
    try {
      const response = await axios.post(`Reset_Password`, data);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const async_loaduser = createAsyncThunk(
  "student/async_loaduser",
  async () => {
    const response = await axios.post(`me`);
    // console.log(response);
    return response.data.user;
  }
);

export const async_removeuser = createAsyncThunk(
  "student/async_removeuser",
  async () => {
    const response = await axios.get(`signout`);
    // console.log(response)
    return response;
  }
);

export const fetchStudentDetails = createAsyncThunk(
  "student/fetchStudentDetails",
  async (id) => {
    const response = await axios.get(`fetchStudentDetails/${id}`);
    // console.log(response)
    return response.data.StudentDetails;
  }
);

export const DeleteStudent = createAsyncThunk(
  "student/DeleteStudent",
  async (student_ID) => {
    try {
      const response = await axios.get(`Delete_student/${student_ID}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async ({ student_ID, updatedData }) => {
    console.log(student_ID, "studentID");
    console.log(updatedData, "updatedData");
    try {
      const response = await axios.post(
        `Update_Student/${student_ID}`,
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

export const Signin_user = createAsyncThunk(
  "student/Signin_user",
  async (data) => {
    try {
      const response = await axios.post(`Signin_user`, data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const Signup_Student_By_Admin = createAsyncThunk(
  "student/Signup_Student_By_Admin",
  async (data) => {
    try {
      console.log(data)
        const response = await axios.post(`Signup_Student_By_Admin`, data);
        return response;
    } catch (error) {
       console.log(error.response.data.message);
       return error.response.data.message;
    }
  }
);



export const Signup_Student_With_Booking = createAsyncThunk(
  "student/Signup_Student_With_Booking",
  async (data) => {
    console.log(data)
    try {
      const response = await axios.post(`Signup_Student_With_Booking`, data);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);



export const Create_Owncloud_Action = createAsyncThunk(
  "student/Create_Owncloud_Action",
  async (data) => {
    // console.log(data)
    try {
      const response = await axios.post(`Create_Owncloud_Account`, data);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);



export const SearchStudentbyUsername = createAsyncThunk(
  "student/SearchStudentbyUsername",
  async (input) => {
    // console.log(input)
    try {
      const response = await axios.post(`SearchStudentbyUsername/${input}`);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const Configure_RecieveEmail = createAsyncThunk(
  "student/Configure_RecieveEmail",
  async (Email)=> {
    console.log(Email)

    try {
      const response = await axios.get(`Configure_RecieveEmail/${Email}`);
      console.log(response);
      toast.success(response.data.message)
      // return response;
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);