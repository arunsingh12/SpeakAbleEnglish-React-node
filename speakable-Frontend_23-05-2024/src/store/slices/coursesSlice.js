import { createSlice } from "@reduxjs/toolkit";
import {
  CreateCourse,
  DeleteCourses,
  GetCourseByID,
  Getcourses,
  SearchCoursebyName,
  fetch5courses,
  fetchcourseDetails,
  updateCourse,
} from "../actions/coursesActions";
import { toast } from "react-toastify";
let intialState = {
  courseslist: [],
  courseDetails: [],
  AllCourseslist: [],
  CourseByID: [],
  loading: false,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch5courses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch5courses.fulfilled, (state, action) => {
        state.courseslist = action.payload;
        state.loading = false;
      })
      .addCase(fetch5courses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchcourseDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchcourseDetails.fulfilled, (state, action) => {
        state.courseDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchcourseDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Getcourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(Getcourses.fulfilled, (state, action) => {
        state.courseslist = action.payload;
        state.AllCourseslist = action.payload;
        state.loading = false;
      })
      .addCase(Getcourses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DeleteCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteCourses.fulfilled, (state, action) => {
        console.log(action.payload);

        state.AllCourseslist = state.AllCourseslist.filter(
          (teacher) => teacher._id !== action.payload.CourseDeleted._id
        );
        state.loading = false;
      })
      .addCase(DeleteCourses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(CreateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateCourse.fulfilled, (state, action) => {
        state.AllCourseslist.push(action.payload);
        state.loading = false;
      })
      .addCase(CreateCourse.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const { courseId, updatedData } = action.payload;
        console.log(courseId, " courseId");
        console.log(updatedData, " updatedData");
        const updatedCourseIndex = state.AllCourseslist.findIndex(
          (course) => course.id === courseId
        );
        if (updatedCourseIndex !== -1) {
          const updatedCourse = {
            ...state.AllCourseslist[updatedCourseIndex],
            ...updatedData,
          };
          state.AllCourseslist = [
            ...state.AllCourseslist.slice(0, updatedCourseIndex),
            updatedCourse,
            ...state.AllCourseslist.slice(updatedCourseIndex + 1),
          ];
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(GetCourseByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCourseByID.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.CourseByID = action.payload;
        state.loading = false;
      })
      .addCase(GetCourseByID.rejected, (state) => {
        state.loading = false;
      })
      // SearchCoursebyName
      .addCase(SearchCoursebyName.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchCoursebyName.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.data) {
          state.courseslist = action.payload.data.founded_Course;
          state.loading = false;
        } else {
          state.courseslist = action.payload.data;
          toast.warning(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(SearchCoursebyName.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const { } = coursesSlice.actions;
export default coursesSlice.reducer;
