import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "../AdminNav";
import { Modal, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Updatebooking } from "../../../store/actions/bookingActions";
import { toast } from "react-toastify";

const AdminEditBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BookingID } = useParams();
  const [status, setStatus] = useState("");
  const booking = useSelector((state) => state.bookings.Allbookinglist);
  const currentbooking = booking.find((booking) => booking._id === BookingID);
  const [Availability, setAvailability] = useState();
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [editModalIndex, setEditModalIndex] = useState(null);
  const [editModalDate, setEditModalDate] = useState(null);
  const [editModalTimeIndex, setEditModalTimeIndex] = useState(null);

  useEffect(() => {
    if (currentbooking) {
      setStatus(currentbooking.Status);
      const Scedule = currentbooking.Scheduled_Dates;
      setAvailability(...Scedule);
    }
  }, [currentbooking]);
  // console.log(Availability)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { status, Availability };
    // console.log(updatedData);
    try {
      const hasOne = Availability.map((has, index) => has);
      // console.log(hasOne);
      if (hasOne.length > 0) {
        await dispatch(Updatebooking({ BookingID, updatedData }));
        navigate("/Admin-Dashboard/Bookings");
      } else {
        toast.error(
          "You Cannot Delete All the Availability of the Booking, Please try to Delete the Booking itself"
        );
      }
    } catch (error) {
      console.error("Error updating meeting status:", error);
    }
  };

  const handleEditTime = (index, date, timeIndex) => {
    const availability = Availability[index];
    const selectedTimeSlot = availability[date][timeIndex];
    setEditStartTime(selectedTimeSlot.start);
    setEditEndTime(selectedTimeSlot.end);
    setIsEditModalVisible(true);
    // Set the index, date, and timeIndex to the state
    setEditModalIndex(index);
    setEditModalDate(date);
    setEditModalTimeIndex(timeIndex);
  };
  const handleEditModalOk = (index, date, timeIndex) => {
    // Retrieve index, date, and timeIndex from arguments
    // console.log(index, timeIndex, date);

    // Get the array of time slots for the specified date
    const timeSlotsArray = Availability[index][date];
    // console.log(timeSlotsArray);

    // Ensure the array exists and the timeIndex is within bounds
    if (timeSlotsArray && timeIndex >= 0 && timeIndex < timeSlotsArray.length) {
      // Create a new array with the updated time slot
      const updatedTimeSlotsArray = timeSlotsArray.map((timeSlot, idx) => {
        if (idx !== timeIndex) return timeSlot;
        return { ...timeSlot, start: editStartTime, end: editEndTime }; // Assuming timeSlot is an object with 'start' and 'end' properties
      });

      // Create a new object with the updated time slots array
      const updatedAvailability = [...Availability];
      updatedAvailability[index] = {
        ...updatedAvailability[index],
        [date]: updatedTimeSlotsArray,
      };

      // Update the state with the new availability
      setAvailability(updatedAvailability);
    }

    setIsEditModalVisible(false);
  };
  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleDeleteTime = (index, date, timeIndex) => {
    setAvailability((prevFormData) => {
      // console.log(prevFormData);
      const updatedAvailability = [...prevFormData];
      const dateObj = updatedAvailability[index];
      const timeSlots = dateObj[date];

      // Remove the time slot at the specified index
      const newTimeSlots = timeSlots?.filter((time, idx) => idx !== timeIndex);

      // Create a new date object with updated time slots
      const newDateObj = { ...dateObj, [date]: newTimeSlots };
      // console.log(newDateObj);
      // console.log(newTimeSlots)

      // If there are no more time slots for this date, remove the date entry
      if (newTimeSlots === undefined || newTimeSlots.length === 0) {
        // console.log("------------------------ dispatch")
        // delete updatedAvailability[index][date];
        // console.log(updatedAvailability)
        const updatedDateObj = { ...updatedAvailability[index] };
        delete updatedDateObj[date];
        updatedAvailability[index] = updatedDateObj;
        // Check if updatedAvailability[index] exists before accessing its keys
        if (
          updatedAvailability[index] &&
          Object.keys(updatedAvailability[index]).length === 0
        ) {
          updatedAvailability.splice(index, 1);
        }
      } else {
        // If there are still time slots remaining, update the availability with the new date object
        updatedAvailability[index] = newDateObj;
      }
      console.log(updatedAvailability);
      // Update the form data with the updated availability
      return updatedAvailability;
    });
  };

  return (
    <>
      <AdminNav />
      <div className="AddCoursestyle">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Status">Select Status</label> &nbsp;&nbsp;
            <select
              name="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Select Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          {Availability?.map((availability, index) => (
            <div key={index} className="availability-item p-2 mb-2">
              <div className="form-group">
                {Object?.entries(availability)?.map(
                  ([date, times], dateIndex) => (
                    <div className="form-group" key={dateIndex}>
                      <div className="d-flex">
                        <span>{date}</span>
                        {times?.map((time, timeIndex) => (
                          <div className="mx-4 mb-3" key={timeIndex}>
                            <label>
                              {time.start} - {time.end}
                            </label>
                            <button
                              type="button"
                              className="btn btn-primary mx-2 btn-delete-teacher"
                              onClick={() =>
                                handleEditTime(index, date, timeIndex)
                              }
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-delete-teacher"
                              onClick={() =>
                                handleDeleteTime(index, date, timeIndex)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>
          <Modal
            title="Edit Time Slot"
            open={isEditModalVisible} // changed from open to visible
            onOk={() =>
              handleEditModalOk(
                editModalIndex,
                editModalDate,
                editModalTimeIndex
              )
            }
            onCancel={handleEditModalCancel}
          >
            <label htmlFor="editStartTime">Start Time:</label>
            <Input
              type="time"
              id="editStartTime"
              value={editStartTime}
              onChange={(e) => setEditStartTime(e.target.value)}
            />
            <label htmlFor="editEndTime">End Time:</label>
            <Input
              type="time"
              id="editEndTime"
              value={editEndTime}
              onChange={(e) => setEditEndTime(e.target.value)}
            />
          </Modal>
        </form>
      </div>
    </>
  );
};

export default AdminEditBooking;
