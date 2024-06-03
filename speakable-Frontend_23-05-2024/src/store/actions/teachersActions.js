import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";

export const fetch5Teachers = createAsyncThunk(
  "teacher/fetch5Teachers",
  async () => {
    const response = await axios.get(`Fetch5Teachers`);
    console.log(response)
    return response.data.teacherslist;
  }
);

export const fetchTeacherDetails = createAsyncThunk(
  "teacher/fetchTeacherDetails",
  async (id) => {
    const response = await axios.get(`fetchTeacherDetails/${id}`);
    // console.log(response)
    return response.data.teachersDetails;
  }
);

export const fetch1teacher = createAsyncThunk(
  "teacher/fetch1teacher",
  async () => {
    const response = await axios.get(`Fetch1teacher`);
    console.log(response)
    return response.data.TeacherDetails;
  }
);

export const GetTeachers = createAsyncThunk("teacher/GetTeachers", async () => {
  try {
    const response = await axios.get(`getteachers`);
    console.log(response)
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const imageUpload = createAsyncThunk(
  "property/imageUpload",
  async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await axios.post(`update-image`, formData);
    // console.log(response);
    // console.log(response.data.data)
    return response.data.filename;
  }
);

export const AddNewTeacher = createAsyncThunk(
  "property/AddNewTeacher",
  async (formData) => {
    try {
      const response = await axios.post(`Signup_Teacher`, formData);
      // console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const DeleteTeacher = createAsyncThunk(
  "teacher/deleteTeacher",
  async (teacher_ID) => {
    try {
      const response = await axios.get(`Delete_teacher/${teacher_ID}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "teacher/updateTeacher",
  async ({ teacherId, updatedData }) => {
    console.log(updatedData, "updatedData");
    try {
      const response = await axios.post(
        `Update_Teacher/${teacherId}`,
        updatedData
      );
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const Update_Teacher_By_Availability = createAsyncThunk(
  "teacher/Update_Teacher_By_Availability",
  async ({ teacherId, updatedData }) => {
    try {
      const response = await axios.post(
        `Update_Teacher_By_Availability/${teacherId}`,
        updatedData
      );
      // console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const Signup_Teacher_By_Admin = createAsyncThunk(
  "property/Signup_Teacher_By_Admin",
  async (formData) => {
    // console.log(formData);
    try {
      const response = await axios.post(`Signup_Teacher_By_Admin`, formData);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);




export const GetExistingTeacher_Availability = createAsyncThunk(
  "teacher/GetExistingTeacher_Availability",
  async (teacherid) => {
    // console.log(teacherid);
    try {
      const response = await axios.get(`GetExistingTeacher_Availability/${teacherid}`);
      // console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const Create_CutsomPackage = createAsyncThunk(
  "teacher/Create_CutsomPackage",
  async (formData) => {
    // console.log(formData);
    try {
      const response = await axios.post(`Create_CutsomPackage`,formData);
      // console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);



export const SearchTeacherbyUsername = createAsyncThunk(
  "teacher/SearchTeacherbyUsername",
  async (input) => {
    // console.log(input);
    try {
      const response = await axios.post(`SearchTeacherbyUsername/${input}`);
      // console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err.response.data
    }
  }
);


export const fetchTeacherBookings = createAsyncThunk(
  "teacher/fetchTeacherBookings",
  async (id) => {
    console.log(id);
    try {
      const response = await axios.post(`fetchTeacherBookings/${id}`);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  }
);
