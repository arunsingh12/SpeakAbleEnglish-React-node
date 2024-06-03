import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchAllstudents,
  Signup_Student,
  async_loaduser,
  async_removeuser,
  fetchStudentDetails,
  DeleteStudent,
  updateStudent,
  Signin_user,
  Signup_Student_By_Admin,
  FindUserByEmail,
  MatchOTP,
  Reset_Password,
  Signup_Student_With_Booking,
  Create_Owncloud_Action,
  SearchStudentbyUsername,
} from "../actions/studentsActions";

let intialState = {
  studentslist: [],
  studentDetails: [],
  AllStudentlist: [],
  userType: null,
  loading: false,
  user: null,
  isAuthenticated: false,
  FoundedUser: [],
  Message: [],
};

const studentsSlice = createSlice({
  name: "students",
  initialState: intialState,
  reducers: {
    loaduser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.userType = action.payload.UserType;
    },
    removeuser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userType = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllstudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllstudents.fulfilled, (state, action) => {
        state.studentslist = action.payload;
        state.AllStudentlist = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllstudents.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Signup_Student.pending, (state) => {
        state.loading = true;
      })
      .addCase(Signup_Student.fulfilled, (state, action) => {
        // console.log(action.payload)
        if (action.payload && action.payload.data) {
          state.studentDetails = action.payload;
          state.AllStudentlist.push(action.payload);
          state.user = action.payload;
          state.userType = action.payload.UserType;
          state.isAuthenticated = true;
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Signup_Student.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Signup_Student_By_Admin.pending, (state) => {
        state.loading = true;
      })
      .addCase(Signup_Student_By_Admin.fulfilled, (state, action) => {
        console.log(action.payload)
          if (action.payload && action.payload.data) {
              state.AllStudentlist.push(action.payload.data.newStudent);
              state.loading = false;
          } else {
            toast.error(action.payload, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
            });
          }
      })
      .addCase(Signup_Student_By_Admin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(async_loaduser.pending, (state) => {
        state.loading = true;
      })
      .addCase(async_loaduser.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.userType = action.payload.UserType;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(async_loaduser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(async_removeuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(async_removeuser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.userType = null;
        state.loading = false;
      })
      .addCase(async_removeuser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchStudentDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.studentDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudentDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DeleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.AllStudentlist = state.AllStudentlist.filter(
          (teacher) => teacher.id !== action.payload
        );
      })
      .addCase(DeleteStudent.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const { student_ID, updatedData } = action.payload;
        console.log(action.payload ,"------------------------------")
        const updatedStudentIndex = state.AllStudentlist.findIndex(
          (student) => student.id === student_ID
        );

        console.log(updatedStudentIndex)
        if (updatedStudentIndex !== -1) {
          const updatedStudent = {
            ...state.AllStudentlist[updatedStudentIndex],
            ...updatedData,
          };
          state.AllStudentlist = [
            ...state.AllStudentlist.slice(0, updatedStudentIndex),
            updatedStudent,
            ...state.AllStudentlist.slice(updatedStudentIndex + 1),
          ];
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(Signin_user.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.userType = action.payload.data.UserType;
          state.user = action.payload.data;
          state.loading = false;
          state.isAuthenticated = true;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Signin_user.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(FindUserByEmail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(FindUserByEmail.fulfilled, (state, action) => {
        if (action.payload && action.payload.user) {
          state.FoundedUser = action.payload.user;
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(FindUserByEmail.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(MatchOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(MatchOTP.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.message) {
          state.Message = action.payload.message;
          state.loading = false;
          toast.success("OTP Matched SuccessFully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(MatchOTP.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Reset_Password.pending, (state) => {
        state.loading = true;
      })
      .addCase(Reset_Password.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.data) {
          state.user = action.payload.data;
          state.userType = action.payload.data.UserType;
          state.loading = false;
          toast.success("Password Changed SuccessFully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
          state.isAuthenticated = true;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Reset_Password.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Signup_Student_With_Booking.pending, (state) => {
        state.loading = true;
      })
      .addCase(Signup_Student_With_Booking.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.data) {
          state.studentDetails = action.payload.data.data;
          state.AllStudentlist.push(action.payload.data.data);
          state.user = action.payload.data.data;
          state.userType = action.payload.data.data.UserType;
          state.isAuthenticated = true;
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          })
        }
      })
      .addCase(Signup_Student_With_Booking.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Create_Owncloud_Action.pending, (state) => {
        state.loading = true;
      })
      .addCase(Create_Owncloud_Action.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.data) {
          toast.success(action.payload.data.message)
          window.open("https://cloud.speakable.online/", "_blank");
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          })
        }
      })
      .addCase(Create_Owncloud_Action.rejected, (state) => {
        state.loading = false;
      })
    // SearchStudentbyUsername
    .addCase(SearchStudentbyUsername.pending, (state) => {
      state.loading = true;
    })
    .addCase(SearchStudentbyUsername.fulfilled, (state, action) => {
      // console.log(action.payload);
      if (action.payload && action.payload.data) {
        state.studentslist = action.payload.data.founded_Student
        state.loading = false;
      } else {
        state.studentslist = action.payload.data;
        toast.warning(action.payload, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        })
      }
    })
    .addCase(SearchStudentbyUsername.rejected, (state) => {
      state.loading = false;
    })
  },
});

export const { loaduser, removeuser } = studentsSlice.actions;
export default studentsSlice.reducer;
