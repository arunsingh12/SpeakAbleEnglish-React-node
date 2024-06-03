import { configureStore } from "@reduxjs/toolkit";
import  studentsSlice from './slices/studentsSlice'
import teacherSlice from './slices/teacherSlice'
import coursesSlice from "./slices/coursesSlice";
import enquirySlice from "./slices/enquirySlice";
import packagesSlice from "./slices/packagesSlice";
import paymentSlice from "./slices/paymentSlice";
import bookingSlice from "./slices/bookingSlice";
import notificationSlice from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    students: studentsSlice,
    teachers: teacherSlice,
    courses:  coursesSlice,
    enquirys: enquirySlice,
    packages: packagesSlice,
    payments: paymentSlice,
    bookings: bookingSlice,
    notifications : notificationSlice, 
  },
});
 