// import React, { useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Signup_Student } from '../store/actions/studentsActions';
// import { useNavigate } from 'react-router-dom';
// import ReCAPTCHA from "react-google-recaptcha";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

// const SignupFormPopup = ({ handleClose }) => {

//   const dispatch = useDispatch()
//   const [Username, setUsername] = useState("")
//   const [Password, setPassword] = useState("")
//   const [Email, setEmail] = useState("")
//   const [Phone_Number, setPhone_Number] = useState("")
//   const [verified, setverified] = useState(false)
//   const [recaptcha, setrecaptcha] = useState('')
//   const [firstName , setFirstName]= useState("")
//   const [lastName , setLastName] = useState("")
//   const recaptchref = useRef()

// const SubmitHandler = (e) =>{
//   console.log()
//   e.preventDefault()
//   dispatch(
//     Signup_Student({
//       Username: `${firstName} ${lastName}`,
//       Email: Email,
//       Phone_Number: Phone_Number,
//       Password: Password,
//       recaptcha,
//     })
//   );
//   recaptchref.current.reset()

//   // console.log("----------Student SignUp successful from the landing page ---------")
// }

// const onChange = (value) => {
//   // console.log("Captcha value:", value);
//   setrecaptcha(value)
//   setverified(true)
// }

//   return (
//     <div className="form-popup">
//       <div className="form-popup-content">
//         {/* Add your signup form fields here, for example: */}
//         <form onSubmit={SubmitHandler}>
//           <h5>Please SignUp!</h5>
//           <div className="form-group-sign">
//             {/* <label htmlFor="username">Username:</label> */}

//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               placeholder="firstName"
//               autoComplete="off"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               placeholder="lastName"
//               autoComplete="off"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//             />
//             <input
//               type="Email"
//               id="Email"
//               name="Email"
//               placeholder="Email"
//               autoComplete="off"
//               value={Email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <PhoneInput
//               country={"us"}
//               className="mt-2"
//               value={Phone_Number}
//               onChange={(phone, country, e, formattedValue) => {
//                 // console.log(formattedValue)
//                 setPhone_Number(formattedValue);
//               }}
//               inputProps={{
//                 name: "Phone_number",
//                 required: true,
//                 autoFocus: true,
//                 style: { marginLeft: "40px", width: "260px" },
//               }}
//               required
//             />
//             <input
//               type="Password"
//               id="Password"
//               name="Password"
//               placeholder="Password"
//               autoComplete="off"
//               value={Password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <ReCAPTCHA
//               sitekey="6Ldw99wpAAAAAM1w_AA6wpfmzjdhZtlQfPkCSVOl"
//               onChange={onChange}
//               ref={recaptchref}
//             />
//           </div>
//           <div className="d-flex mt-4">
//             <button
//               type="submit"
//               disabled={!verified}
//               className="btn btn-outline-success mx-3"
//             >
//               SignUp
//             </button>
//             <button
//               onClick={handleClose}
//               className="btn btn-outline-success mx-3"
//             >
//               Close
//             </button>
//           </div>
//         </form>
//         {/* Add other form fields as needed */}
//       </div>
//     </div>
//   );
// };

// export default SignupFormPopup;

//-------------------------------------------------------------------------------------with validation

import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Signup_Student } from "../store/actions/studentsActions";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignupFormPopup = ({ handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recaptchref = useRef(null);

  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone_Number, setPhone_Number] = useState("");
  const [verified, setVerified] = useState(false);
  const [recaptcha, setRecaptcha] = useState("");
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Nickname, setNickname] = useState("");

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = "firstName is required";
      isValid = false;
    }
    if (!lastName.trim()) {
      errors.lastName = "lastName is required";
      isValid = false;
    }

    if (!Nickname.trim()) {
      errors.Nickname = "Nickname is required";
      isValid = false;
    }

    if (!Email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!Phone_Number.trim()) {
      errors.phone_number = "Phone number is required";
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
        Signup_Student({
          firstName: firstName,
          lastName: lastName,
          Nickname: Nickname,
          Username: `${firstName} ${lastName}`,
          Email: Email,
          Phone_Number: Phone_Number,
          Password: Password,
          recaptcha,
        })
      )
        .then(() => {
          // Redirect or any other action after successful signup
          navigate("/Student-dashboard"); // Redirect to success page
        })
        .catch((error) => {
          console.log(error);
        });
      recaptchref.current.reset();
    }
  };

  const onChange = (value) => {
    setRecaptcha(value);
    setVerified(true);
  };

  return (
    <div className="form-popup">
      <div className="form-popup-content">
        <form>
          <h5>Please SignUp!</h5>
          <div className="form-group-sign">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="firstName"
              autoComplete="off"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="lastName"
              autoComplete="off"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}

            <input
              type="text"
              id="Nickname"
              name="Nickname"
              placeholder="Nickname"
              autoComplete="off"
              value={Nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />

            {errors.Nickname && (
              <span className="error">{errors.Nickname}</span>
            )}

            <input
              type="email"
              id="Email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <PhoneInput
              country={"us"}
              className="mt-2"
              value={Phone_Number}
              onChange={(phone, country, e, formattedValue) => {
                setPhone_Number(formattedValue);
              }}
              inputProps={{
                name: "Phone_number",
                required: true,
                autoFocus: true,
                style: { marginLeft: "40px", width: "260px" },
              }}
              required
            />
            {errors.phone_number && (
              <span className="error">{errors.phone_number}</span>
            )}
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              autoComplete="off"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChange}
              ref={recaptchref}
            />
          </div>
          <div className="d-flex mt-4">
            <button
              type="submit"
              // disabled={!verified}
              className="btn btn-outline-success mx-3"
              onClick={SubmitHandler}
            >
              SignUp
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
  );
};

export default SignupFormPopup;
