import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MatchOTP } from "../store/actions/studentsActions";
import FillResetPasswordPopup from "./FillResetPasswordPopup";

const FillOTPPopup = ({ handleClose }) => {
  const dispatch = useDispatch();
  const FoundedUser = useSelector((state) => state.students.FoundedUser);
  const Message = useSelector((state) => state.students.Message);
  // console.log(Message);
  const [Otp, setOtp] = useState("");
  const [FillResetPassword, setFillResetPassword] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    if (Otp.trim() === "") {
      // Add validation for OTP field
      alert("Please enter OTP.");
      return;
    }
    dispatch(MatchOTP({ Otp, FoundedUser }));
    // handleClose(); // Close the popup after submitting
  };

  const closeFillResetPasswordFormPopup = () => {
    setFillResetPassword(false);
  };

  const openFillResetPasswordFormPopup = () => {
    setFillResetPassword(true);
  };

  useEffect(() => {
    if (Message !== null && Message.length !== 0) {
        openFillResetPasswordFormPopup();
    }
  }, [Message]);

  return (
    <>
      <div className="form-popup">
        <div className="form-popup-content">
          <form onSubmit={submitHandler}>
            <h5>Please Provide Your OTP</h5>
            <div className="form-group-sign">
              <input
                type="text" // Change type to text if OTP can contain characters
                id="OTP"
                name="OTP"
                placeholder="Enter OTP"
                value={Otp}
                onChange={(e) => setOtp(e.target.value)}
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
      {FillResetPassword && <FillResetPasswordPopup handleClose={closeFillResetPasswordFormPopup} />}
    </>
  );
};

export default FillOTPPopup;
