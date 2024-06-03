import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllbookings,
  Add_booking,
  Updatebooking,
  Deletebooking,
  GetBookingsByStudentID,
  GetBookingsByTeacherID,
  GetExistingTeacherAvailability,
  GetExistingTeacherAvailability__oF_Package,
  SearchBookingbyStudentUsername,
} from "../actions/bookingActions";
import { toast } from "react-toastify";

let intialState = {
  loading: false,
  bookinglist: [],
  Allbookinglist: [],
  StudentID_Booking: [],
  Teacher_Bookings: [],
  Teacher_Availabile_Booking_Slots: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllbookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllbookings.fulfilled, (state, action) => {
        state.bookinglist = action.payload;
        state.Allbookinglist = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllbookings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Add_booking.fulfilled, (state, action) => {
        // state.Allbookinglist = action.payload;
        // console.log(action.payload)
        state.Allbookinglist.push(action.payload);
        state.loading = false;
      })
      .addCase(Add_booking.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Deletebooking.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload)
        state.Allbookinglist = state.Allbookinglist.filter(
          (Booking) => Booking._id !== action.payload._id
        );
      })
      .addCase(Deletebooking.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Updatebooking.fulfilled, (state, action) => {
        const { BookingID, updatedData } = action.payload;
        // console.log(BookingID,updatedData);
        // console.log(action.payload)
        const updatedBookingIndex = state.Allbookinglist.findIndex(
          (Booking) => Booking._id === BookingID
        );

        if (updatedBookingIndex !== -1) {
          const updatedBooking = {
            ...state.Allbookinglist[updatedBookingIndex],
            ...updatedData,
          };
          state.Allbookinglist = [
            ...state.Allbookinglist.slice(0, updatedBookingIndex),
            updatedBooking,
            ...state.Allbookinglist.slice(updatedBookingIndex + 1),
          ];
        }
      })
      .addCase(Updatebooking.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      })
      .addCase(GetBookingsByStudentID.fulfilled, (state, action) => {
        state.loading = false;
        state.StudentID_Booking = action.payload;
      })
      .addCase(GetBookingsByStudentID.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(GetBookingsByTeacherID.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetBookingsByTeacherID.fulfilled, (state, action) => {
        state.Teacher_Bookings = action.payload;
        state.loading = false;
      })
      .addCase(GetBookingsByTeacherID.rejected, (state) => {
        state.loading = false;
      })
      .addCase(GetExistingTeacherAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetExistingTeacherAvailability.fulfilled, (state, action) => {
        if (action.payload && action.payload.data.AvailableTimeSlots) {
          state.Teacher_Availabile_Booking_Slots =
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
      .addCase(GetExistingTeacherAvailability.rejected, (state) => {
        state.loading = false;
      })   .addCase(GetExistingTeacherAvailability__oF_Package.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetExistingTeacherAvailability__oF_Package.fulfilled, (state, action) => {
        if (action.payload && action.payload.data.AvailableTimeSlots) {
          state.Teacher_Availabile_Booking_Slots =
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
      .addCase(GetExistingTeacherAvailability__oF_Package.rejected, (state) => {
        state.loading = false;
      })
    // Add other cases if needed
    // foundedBooking
     .addCase(SearchBookingbyStudentUsername.pending, (state) => {
      state.loading = true;
    })
    .addCase(SearchBookingbyStudentUsername.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.Allbookinglist =
          action.payload.data.foundedBooking;
         state.loading = false;
      } else {
        state.Allbookinglist = action.payload.data
        toast.warning("No Bookings are Available For this Student Username", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        });
      }
    })
    .addCase(SearchBookingbyStudentUsername.rejected, (state) => {
      state.loading = false;
    });

  },
});

// export const { } = bookingSlice.actions;
export default bookingSlice.reducer;
