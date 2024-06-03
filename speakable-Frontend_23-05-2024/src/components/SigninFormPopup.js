
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Signin_user } from "../store/actions/studentsActions";
import { Link, useNavigate } from "react-router-dom";
import FillEmailPopup from "./FillEmailPopup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const SigninFormPopup = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [FillEmail, setFillEmail] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate()


  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!Email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!Password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (Password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(Password)) {
      errors.password =
        "Password must contain at least one number and one special character";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(
        Signin_user({
          Email: Email,
          Password: Password,
        })
      )
        // .then(() => {
        //   // // Redirect or any other action after successful signup
        //   toast.success("You have Signin !")
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
    }
  };

  const closeFillEmailFormPopup = () => {
    setFillEmail(false);
  };

  const openFillEmailFormPopup = () => {
    setFillEmail(true);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="form-popup">
        <div className="form-popup-content">
          {/* Add your signup form fields here, for example: */}
          <form>
            <h5>Sign In</h5>
            <div className="form-group-sign ">
              {/* <label htmlFor="username">Username:</label> */}
              <input
                type="email"
                id="Email"
                name="Email"
                placeholder="Email"
                value={Email}
                // onChange={(e) => setUsername(e.target.value.trim())}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <label className="text-end">
                hide{" "}
                <span onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </label>

              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <label>
              Forgot Password ?
              <Link onClick={openFillEmailFormPopup}> Recover Now</Link>
            </label>
            {/* Add other form fields as needed */}
            <div className="d-flex mt-4">
              <button
                type="submit"
                className="btn btn-outline-success mx-3"
                onClick={SubmitHandler}
              >
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
      {FillEmail && <FillEmailPopup handleClose={closeFillEmailFormPopup} />}
    </>
  );
};

export default SigninFormPopup;
