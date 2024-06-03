import { createSlice } from "@reduxjs/toolkit";
import { DeleteNotification, Notifications, NotificationsOfAccountant, NotificationsOfAdmin, NotificationsOfTeacher } from "../actions/notificationActions";

let intialState = {
  Student_Notifications:[],
  Accountant_Notifications:[],
  All_Notifications:[],
  Teacher_Notifications:[],
  loading: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState: intialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(Notifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(Notifications.fulfilled, (state, action) => {
        state.Student_Notifications = action.payload
        state.loading = false;
      })
      .addCase(Notifications.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DeleteNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteNotification.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.All_Notifications = state.All_Notifications.filter((notify) => notify._id !== action.payload._id);
        state.loading = false;
      })
      .addCase(DeleteNotification.rejected, (state) => {
        state.loading = false;
      })
      .addCase(NotificationsOfAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(NotificationsOfAdmin.fulfilled, (state, action) => {
        state.All_Notifications = action.payload
        state.loading = false;
      })
      .addCase(NotificationsOfAdmin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(NotificationsOfAccountant.pending, (state) => {
        state.loading = true;
      })
      .addCase(NotificationsOfAccountant.fulfilled, (state, action) => {
        state.Accountant_Notifications = action.payload
        state.loading = false;
      })
      .addCase(NotificationsOfAccountant.rejected, (state) => {
        state.loading = false;
      })
      .addCase(NotificationsOfTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(NotificationsOfTeacher.fulfilled, (state, action) => {
        state.Teacher_Notifications = action.payload
        state.loading = false;
      })
      .addCase(NotificationsOfTeacher.rejected, (state) => {
        state.loading = false;
      })
      
  },
});

// export const { } = coursesSlice.actions;
export default notificationSlice.reducer;
