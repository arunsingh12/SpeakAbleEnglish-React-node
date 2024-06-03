import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FindUserByEmail } from "../store/actions/studentsActions";
import FillOTPPopup from "./FillOTPPopup";

const FillEmailPopup = ({ handleClose }) => {
  const dispatch = useDispatch();
  const FoundedUser = useSelector((state) => state.students.FoundedUser);
  // console.log(FoundedUser);
  const [Email, setEmail] = useState("");
  const [FillOTP, setFillOTP] = useState(false);
  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(FindUserByEmail({ Email }));

    // console.log(Username)
    // console.log(Password)
  };
  const closeFillOTPFormPopup = () => {
    setFillOTP(false);
  };

  const openFillOTPFormPopup = () => {
    setFillOTP(true);
  };

  useEffect(() => {
    if (FoundedUser !== null && FoundedUser.length !== 0) {
      console.log("--------opener");
      openFillOTPFormPopup();
    }
  }, [FoundedUser]);

  return (
    <>
      <div className="form-popup">
        <div className="form-popup-content">
          {/* Add your signup form fields here, for example: */}
          <form onSubmit={SubmitHandler}>
            <h5>Please Provide Your Register Email</h5>
            <div className="form-group-sign ">
              {/* <label htmlFor="username">Username:</label> */}
              <input
                type="Email"
                id="Email"
                name="Email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Add other form fields as needed */}
            <div className="d-flex mt-4">
              <button type="submit" className="btn btn-outline-success mx-3">
                Submit
              </button>
              <button
                onClick={handleClose}
                className="btn btn-outline-success mx-3"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      {FillOTP && <FillOTPPopup handleClose={closeFillOTPFormPopup} />}
    </>
  );
};

export default FillEmailPopup;
