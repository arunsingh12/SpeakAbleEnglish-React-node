


import AdminNav from "../admin-dashboard-components/AdminNav";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GetExistingTeacherAvailability,
  Updatebooking,
  fetchAllbookings,
} from "../../store/actions/bookingActions";

const EditBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BookingID } = useParams();
  const [status, setStatus] = useState("");
  const booking = useSelector((state) => state.bookings.Allbookinglist);
  const CurrentAvailableSlots = useSelector(
    (state) => state.bookings.Teacher_Availabile_Booking_Slots
  );
  const currentbooking = booking.find((booking) => booking?._id === BookingID);
  const [SelectedSlot, setSelectedSlot] = useState([]);
  const [Availability, setAvailability] = useState([]);

  useEffect(() => {
    dispatch(fetchAllbookings());
    dispatch(GetExistingTeacherAvailability(BookingID));
  }, []);

  useEffect(() => {
    if (currentbooking) {
      setStatus(currentbooking.Status);
      setAvailability(CurrentAvailableSlots);
    }
  }, [currentbooking, CurrentAvailableSlots]);

  // const handleSlotSelection = (date, slot) => {
  //   console.log(date, slot);
  //   setSelectedSlot({
  //     [date]: [slot]
  //   });
  //   setSelectedSlot([SelectedSlot])
  // };
  const handleSlotSelection = (date, slot) => {
    const newSelectedSlot = { [date]: [slot] };
  
    // Check if the selected slot is already in the state
    const isSelected = Object.keys(SelectedSlot).some(
      (dateKey) => dateKey === date
    );
  
    // If the selected slot is already in the state, deselect it
    if (isSelected) {
      setSelectedSlot({});
    } else {
      // If not, select the new slot
      setSelectedSlot([newSelectedSlot]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = "Rescheduled";
    const updatedData = { status, SelectedSlot };
    try {
      console.log(updatedData);
      await dispatch(Updatebooking({ BookingID, updatedData }));
      navigate("/Student-dashboard/Bookings");
    } catch (error) {
      console.error("Error updating meeting status:", error);
    }
  };

  // console.log(Availability);

  return (
    <>
      <AdminNav />
      <div className="Student_mainPage_style">
        <div className="Student_header_style">
          <h6 className="text-dark">
            ReSchedule Booking in Which Teacher are Available
          </h6>
        </div>
        <div className="Student_list_style mt-3">
          <form onSubmit={handleSubmit}>
            {Availability?.map((dateSlots, index) => {
              // console.log(dateSlots);
              return (
                <div key={index}>
                  {Object.entries(dateSlots).map(
                    ([date, slots], innerIndex) => (
                      <div key={innerIndex}>
                        <h4>{date}</h4>
                        {slots.map((slot, slotIndex) => (
                          <div key={slotIndex}>
                            <input
                              type="checkbox"
                              id={`${index}-${slotIndex}`}
                              onChange={() => handleSlotSelection(date, slot)}
                            />
                            <label htmlFor={`${index}-${slotIndex}`}>
                              {slot.start} - {slot.end}
                            </label>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              );
            })}
            <button type="submit" className="btn btn-outline-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBooking;
