import React, { useRef, useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { fetchAllbookings } from "../../store/actions/bookingActions";

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.Allbookinglist);
  // console.log(bookings);
  const filteredBooking = bookings.find((booking) => booking._id === id);
  // console.log(filteredBooking);
  const meetingContainerRef = useRef(null);

  const myMeeting = (element) => {
    const appID = 1414565783;
    const serverSecret = "a8ddb8d2eb2e30f1adf4dd84c89c43e9";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      filteredBooking?._id.toString(),
      uuidv4(),
      uuidv4()
    );
    const zcInstance = ZegoUIKitPrebuilt.create(kitToken);
    zcInstance.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: window.location.origin + window.location.pathname,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllbookings());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (meetingContainerRef.current && filteredBooking) {
      myMeeting(meetingContainerRef.current);
    }
  }, [filteredBooking]);

  return (
    <div>
      <div ref={meetingContainerRef} />
    </div>
  );
};

export default Room;
