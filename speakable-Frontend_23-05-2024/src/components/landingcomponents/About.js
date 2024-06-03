import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux"; // Added import
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Signup_Student } from "../../store/actions/studentsActions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const About = () => {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone_Number, setPhone_Number] = useState("");
  const [verified, setverified] = useState(false);
  const [recaptcha, setrecaptcha] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Nickname, setNickname] = useState("");

  const [errors, setErrors] = useState({
    Username: "",
    firstName: "",
    lastName: "",
    Nickname: "",
    Password: "",
    Email: "",
    Phone_Number: "",
    recaptcha: "",
  });

  const recaptcheref = useRef();

  const validateEmail = (email) => {
    // Email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Password validation: At least 6 characters
    return password.length >= 6;
  };

  const validateUsername = (username) => {
    // Username validation: At least 3 characters
    return username.length >= 3;
  };
  const validateFirstname = (firstName) => {
    // Username validation: At least 3 characters
    return firstName.length >= 3;
  };

  const validatelastName = (lastName) => {
    // Username validation: At least 3 characters
    return lastName.length >= 3;
  };

  const validateNickname = (Nickname) => {
    // Username validation: At least 3 characters
    return Nickname.length >= 3;
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Phone number validation: Check if it's a valid phone number
    return phoneNumber.length > 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = {};

    //  Validate Firstname
    if (!validateFirstname(firstName)) {
      // alert("Username must be at least 3 characters long")
      toast.warning("firstName must be at least 3 characters long");
      // newErrors.Username = "Username must be at least 3 characters long";
      formValid = false;
    } else {
      //  alert( newErrors.Username)
      newErrors.firstName = "";
    }

    //  Validate Firstname
    if (!validatelastName(lastName)) {
      // alert("Username must be at least 3 characters long")
      toast.warning("lastName must be at least 3 characters long");
      // newErrors.Username = "Username must be at least 3 characters long";
      formValid = false;
    } else {
      //  alert( newErrors.Username)
      newErrors.lastName = "";
    }

    // validateNickname;
    if (!validateNickname(Nickname)) {
      // alert("Username must be at least 3 characters long")
      toast.warning("Nickname must be at least 3 characters long");
      // newErrors.Username = "Username must be at least 3 characters long";
      formValid = false;
    } else {
      //  alert( newErrors.Username)
      newErrors.Nickname = "";
    }

    // Validate Username

    // Validate Email
    if (!validateEmail(Email)) {
      toast.warning("Invalid email address");
      // newErrors.Email = "Invalid email address";
      formValid = false;
    } else {
      // newErrors.Email = "";
    }

    // Validate Password
    if (!validatePassword(Password)) {
      toast.warning("Password must be at least 6 characters long");
      // newErrors.Password = "Password must be at least 6 characters long";
      formValid = false;
    } else {
      newErrors.Password = "";
    }

    // Validate Phone Number
    if (!validatePhoneNumber(Phone_Number)) {
      toast.warning("Please enter a valid phone number");
      //newErrors.Phone_Number = "Please enter a valid phone number";
      formValid = false;
    } else {
      newErrors.Phone_Number = "";
    }

    // Validate ReCAPTCHA
    if (!verified) {
      alert("Please complete the reCAPTCHA verification");
      //newErrors.recaptcha = "Please complete the reCAPTCHA verification";
      formValid = false;
    } else {
      newErrors.recaptcha = "";
    }

    if (formValid) {
      await dispatch(
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
      );
      await recaptcheref.current.reset();
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Add a delay of 1 second (1000 milliseconds) before reloading
    } else {
      setErrors(newErrors);
    }
  };

  const onChange = (value) => {
    setrecaptcha(value);
    setverified(true);
    setErrors((prevState) => ({
      ...prevState,
      recaptcha: "",
    }));
  };

  return (
    <div className=" About_main_div" id="About">
      <div className="About_main_column_div">
        <div className=" About_main_column_left_div">
          <h2>{t("About.leftheading")}</h2>
          <div className="w-100 About_main_column_left_div_col">
            <span>
              <i class="bi bi-people-fill"></i>
            </span>
            <div className="About_main_column_left_div_col_right">
              <h3>{t("About.leftSub1")}</h3>
              <p>{t("About.leftSubpara1")}</p>
            </div>
          </div>
          <div className="w-100 About_main_column_left_div_col mt-2">
            <span>
              <i class="bi bi-people-fill"></i>
            </span>
            <div className="About_main_column_left_div_col_right">
              <h3>{t("About.leftSub2")}</h3>
              <p>{t("About.leftSubpara2")}</p>
            </div>
          </div>
          <div className="w-100 About_main_column_left_div_col mt-2">
            <span>
              <i class="bi bi-people-fill"></i>
            </span>
            <div className="About_main_column_left_div_col_right">
              <h3>{t("About.leftSub3")}</h3>
              <p>{t("About.leftSubpara3")}</p>
            </div>
          </div>
        </div>
        <div className="About_main_column_right_div">
          <div className="About_main_column_right_form_div mt-2">
            <h2>{t("About.Signuptoday")}</h2>
            <form>
              <input
                // Username input
                className=" w-100 input_style"
                placeholder={t("About.FirstName")}
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="off"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <div className="error">{errors.firstName}</div>
              )}
              {/* ----------------------------------------- */}
              <input
                // Username input
                className=" w-100 input_style"
                placeholder={t("About.lastName")}
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="off"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <div className="error">{errors.lastName}</div>
              )}
              {/* Input fields with error messages */}
              <input
                // Username input
                className=" w-100 input_style"
                placeholder={t("About.NickName")}
                type="text"
                id="Nickname"
                name="Nickname"
                autoComplete="off"
                value={Nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              {errors.Nickname && (
                <div className="error">{errors.Nickname}</div>
              )}
              {/* ----------------------------------------- */}

              {/* Email input */}
              <input
                className=" w-100 input_style"
                placeholder={t("About.YourEmailaddress")}
                type="Email"
                id="Email"
                name="Email"
                autoComplete="off"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.Email && <div className="error">{errors.Email}</div>}
              {/* Phone number input */}
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
                  className: "form-control phonenumberinput",
                }}
              />
              {errors.Phone_Number && (
                <div className="error">{errors.Phone_Number}</div>
              )}
              {/* Password input */}
              <input
                className=" w-100 input_style"
                placeholder={t("About.YourPassowrd")}
                type="Password"
                id="Password"
                name="Password"
                autoComplete="off"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.Password && (
                <div className="error">{errors.Password}</div>
              )}
              {/* ReCAPTCHA */}
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
                ref={recaptcheref}
              />
              {errors.recaptcha && (
                <div className="error">{errors.recaptcha}</div>
              )}
              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-outline-light mt-3"
                onClick={onSubmit}
              >
                {t("About.GetStarted")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
