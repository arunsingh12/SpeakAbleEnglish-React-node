import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";


// ACTIONS : api calls
export const Notifications = createAsyncThunk(
  "notifications/Notifications",
  async (id) => {
    const response = await axios.get(`Get_Notifications/${id}`);
    // console.log(response)
    return response.data.notifications ;
  }
);

export const NotificationsOfTeacher = createAsyncThunk(
  "notifications/NotificationsOfTeacher",
  async (id) => {
    const response = await axios.get(`Get_Notifications/${id}`);
    // console.log(response)
    return response.data.notifications ;
  }
);



export const DeleteNotification = createAsyncThunk(
  "notifications/DeleteNotification",
  async (id) => {
    // console.log(id)
    const response = await axios.get(`DeleteNotification/${id}`);
    // console.log(response)
    return response.data.notifications ;
  }
);

export const NotificationsOfAdmin = createAsyncThunk(
  "notifications/NotificationsOfAdmin",
  async () => {
    const response = await axios.get(`NotificationsOfAdmin`);
    // console.log(response)
    return response.data.notifications ;
  }
);


export const NotificationsOfAccountant = createAsyncThunk(
  "notifications/NotificationsOfAccountant",
  async () => {
    const response = await axios.get(`NotificationsOfAccountant`);
    // console.log(response)
    return response.data.notifications;
  }
);









