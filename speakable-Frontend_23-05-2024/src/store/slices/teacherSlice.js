import { createSlice } from "@reduxjs/toolkit";
import {
  AddNewTeacher,
  DeleteTeacher,
  fetch1teacher,
  fetch5Teachers,
  fetchTeacherBookings,
  fetchTeacherDetails,
  GetExistingTeacher_Availability,
  GetTeachers,
  imageUpload,
  SearchTeacherbyUsername,
  Signup_Teacher_By_Admin,
  Update_Teacher_By_Availability,
  updateTeacher,
} from "../actions/teachersActions";
import { toast } from "react-toastify";

let intialState = {
  Teacherslist: [],
  TeacherDetails: [],
  AllTeacherlist: [],
  Teacher: [],
  Teacher_Bookings: [],
  Teacher_Availabile_Slots: [],
  Teachers_Bookings_Status: [],
  loading: false,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch5Teachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch5Teachers.fulfilled, (state, action) => {
        state.Teacherslist = action.payload;
        state.loading = false;
      })
      .addCase(fetch5Teachers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchTeacherDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeacherDetails.fulfilled, (state, action) => {
        state.TeacherDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeacherDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetch1teacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch1teacher.fulfilled, (state, action) => {
        state.Teacher = action.payload;
        state.loading = false;
      })
      .addCase(fetch1teacher.rejected, (state) => {
        state.loading = false;
      })
      .addCase(GetTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetTeachers.fulfilled, (state, action) => {
        state.Teacherslist = action.payload;
        state.AllTeacherlist = action.payload;
        state.loading = false;
      })
      .addCase(GetTeachers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(AddNewTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddNewTeacher.fulfilled, (state, action) => {
        state.Teacherslist = action.payload;
        state.AllTeacherlist.push(action.payload);
        state.loading = false;
      })
      .addCase(AddNewTeacher.rejected, (state) => {
        state.loading = false;
      })
      .addCase(imageUpload.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(imageUpload.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DeleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.AllTeacherlist = state.AllTeacherlist.filter(
          (teacher) => teacher.id !== action.payload
        );
      })
      .addCase(DeleteTeacher.rejected, (state, action) => {
        // state.status = 'failed';
        state.loading = false;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const { teacherId, updatedTeacher } = action.payload;
        console.log(teacherId, "teacherId");
        console.log("updateTeacher", updatedTeacher);
        const updatedTeacherIndex = state.AllTeacherlist.findIndex(
          (teacher) => teacher._id === teacherId
        );

        if (updatedTeacherIndex !== -1) {
          const updateTeacher = {
            ...state.AllTeacherlist[updatedTeacherIndex],
            ...updatedTeacher,
          };
          state.AllTeacherlist = [
            ...state.AllTeacherlist.slice(0, updatedTeacherIndex),
            updateTeacher,
            ...state.AllTeacherlist.slice(updatedTeacherIndex + 1),
          ];
        }
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Update_Teacher_By_Availability.fulfilled, (state, action) => {
        const { teacherId, updatedData } = action.payload;
        const updatedTeacherIndex = state.AllTeacherlist.findIndex(
          (teacher) => teacher._id === teacherId
        );

        if (updatedTeacherIndex !== -1) {
          const updatedTeacher = {
            ...state.AllTeacherlist[updatedTeacherIndex],
            ...updatedData,
          };
          state.AllTeacherlist = [
            ...state.AllTeacherlist.slice(0, updatedTeacherIndex),
            updatedTeacher,
            ...state.AllTeacherlist.slice(updatedTeacherIndex + 1),
          ];
        }
      })
      .addCase(Update_Teacher_By_Availability.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Signup_Teacher_By_Admin.pending, (state) => {
        state.loading = true;
      })
      .addCase(Signup_Teacher_By_Admin.fulfilled, (state, action) => {
          if (action.payload && action.payload.data) {
             state.Teacherslist = action.payload.data.newTeacher;
             state.AllTeacherlist.push(action.payload.data.newTeacher);
             state.loading = false;
          } else {
            toast.warning(action.payload, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
            });
          }
      })
      .addCase(Signup_Teacher_By_Admin.rejected, (state) => {
        state.loading = false;
      })
      // ---------------------
      .addCase(GetExistingTeacher_Availability.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetExistingTeacher_Availability.fulfilled, (state, action) => {
        if (action.payload && action.payload.data.AvailableTimeSlots) {
          state.Teacher_Availabile_Slots =
            action.payload.data.AvailableTimeSlots;
          state.loading = false;
        } else {
          toast.error("No Bookings are Available For Now", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(GetExistingTeacher_Availability.rejected, (state) => {
        state.loading = false;
      })
      // SearchTeacherbyUsername
      .addCase(SearchTeacherbyUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTeacherbyUsername.fulfilled, (state, action) => {
        // console.log(action.payload)
        if (action.payload && action.payload.data) {
          state.Teacherslist = action.payload.data.founded_teacher;
          state.loading = false;
        } else {
          state.Teacherslist = action.payload;
          toast.warning("No Teacher were Founded with this Username", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(SearchTeacherbyUsername.rejected, (state) => {
        state.loading = false;
      })
      // fetchTeacherBookings;
      .addCase(fetchTeacherBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeacherBookings.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload && action.payload.data) {
          state.Teachers_Bookings_Status = action.payload.data.TeacherBookings;
          state.loading = false;
        } else {
          state.Teacherslist = action.payload;
          toast.warning("This Teacher have no bookings yet", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(fetchTeacherBookings.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const { } = teacherSlice.actions;
export default teacherSlice.reducer;
