import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Create_Owncloud_Action } from "../../store/actions/studentsActions";

const OwncloudSignupFormPopup = ({ handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.students.user);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  // console.log(user);

  useEffect(() => {
    if (user) {
      setUsername(user.Username);
    }
  }, [user]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(Username, Password);
     await  dispatch(
        Create_Owncloud_Action({
          Username: Username,
          Password: Password,
        })
      );
      handleClose()
  };

  return (
    <>
      <div className="form-popup">
        <div className="form-popup-content">
          {/* Add your signup form fields here, for example: */}
          <form onSubmit={SubmitHandler}>
            <h5>Please Signin into Our Owncloud</h5>
            <div className="form-group-sign ">
              {/* <label htmlFor="username">Username:</label> */}
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                id="Password"
                name="Password"
                placeholder="Set Owncloud Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
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
    </>
  );
};

export default OwncloudSignupFormPopup;
