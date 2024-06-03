import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Reset_Password } from "../store/actions/studentsActions";

const FillResetPasswordPopup = ({ handleClose }) => {
  const FoundedUser = useSelector((state) => state.students.FoundedUser);
  const id = FoundedUser._id;
  const dispatch = useDispatch();
  const [New_Password, setNew_Password] = useState("");
  const [Confirm_New_Password, setConfirm_New_Password] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (New_Password.trim() === "") {
      // Add validation for OTP field
      alert("Please enter New Password.");
      return;
    }
    if (Confirm_New_Password.trim() === "") {
      // Add validation for OTP field
      alert("Please Confirm New Password.");
      return;
    }

    if (New_Password === Confirm_New_Password) {
      dispatch(Reset_Password({ New_Password, Confirm_New_Password, id }));
    } else {
      toast.error("New Password and Confirm New Password Doesn't Matched");
    }
    // dispatch(MatchOTP({ Otp, FoundedUser }));
    // handleClose(); // Close the popup after submitting
  };






  return (
    <div className="form-popup">
      <div className="form-popup-content">
        <form onSubmit={submitHandler}>
          <h5>Please Reset Your Password</h5>
          <div className="form-group-sign">
            <input
              type="text" // Change type to text if OTP can contain characters
              id="New_Password"
              name="New_Password"
              placeholder="Enter New_Password"
              value={New_Password}
              onChange={(e) => setNew_Password(e.target.value)}
            />
          </div>
          <div className="form-group-sign">
            <input
              type="text" // Change type to text if OTP can contain characters
              id="Confirm_New_Password"
              name="Confirm_New_Password"
              placeholder="Confirm New Password"
              value={Confirm_New_Password}
              onChange={(e) => setConfirm_New_Password(e.target.value)}
            />
          </div>
          <div className="d-flex mt-4">
            <button type="submit" className="btn btn-outline-success mx-3">
              Submit
            </button>
            <button
              type="button" // Change type to button
              onClick={handleClose}
              className="btn btn-outline-success mx-3"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FillResetPasswordPopup;
