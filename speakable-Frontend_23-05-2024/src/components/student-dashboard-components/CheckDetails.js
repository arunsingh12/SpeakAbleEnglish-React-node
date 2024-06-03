// import React, { useEffect, useState } from "react";
// import AdminNav from "../admin-dashboard-components/AdminNav";
// import { useLocation, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPackage } from "../../store/actions/packagesActions";
// import { Create_Payment } from "../../store/actions/paymentActions";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
//   LanguageSelect,
// } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";

// const CheckDetails = () => {
//   const { Package_ID } = useParams();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0); // Initialize with 0
//   const [companyName, setCompanyName] = useState("");
//   const [nip, setNip] = useState("");
//   const [street, setStreet] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [city, setCity] = useState("");
//   const [countryid, setCountryid] = useState(0);
//   const [stateid, setstateid] = useState(0);
//   const user = useSelector((state) => state.students.user);
//   const pack = useSelector((state) => state.packages.currentPackage);

//   console.log(pack);

//   const location = useLocation();
//   const totalCount = location.state;

//   const calculateTotalAmount = async () => {
//     let total_Amount = 0;
//     if (pack && pack.Course_IDs && pack.Course_IDs.length > 0) {
//       await Promise.all(
//         pack.Course_IDs.map(async (course) => {
//           if (!isNaN(course.Purchase_Price)) {
//             // Check if Purchase_Price is not NaN
//             total_Amount += course.Purchase_Price;
//           }
//         })
//       );
//     }
//     total_Amount *= totalCount; // Multiply by totalCount
//     setTotalAmount(total_Amount);
//   };

//   const paymentResponseUrl = useSelector(
//     (state) => state.payments.paymentResponseUrl
//   );

//   const PackageName = pack?.Package_Name;
//   const Desciption = pack?.Package_Name;
//   const Email = user?.Email;
//   const Phone = user?.Phone_Number;
//   const StudentName = user?.Username;

//   useEffect(() => {
//     const fetchPackageData = async () => {
//       try {
//         await dispatch(fetchPackage(Package_ID));
//         await calculateTotalAmount();
//       } catch (error) {
//         console.error("Error fetching package:", error.message);
//       }
//     };
//     fetchPackageData();
//   }, [Package_ID, dispatch]);

//   useEffect(() => {
//     if (paymentResponseUrl.length > 0) {
//       setLoading(false);
//       window.location.href = paymentResponseUrl;
//     }
//   }, [paymentResponseUrl]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await dispatch(
//         Create_Payment({
//           Package_ID,
//           Desciption: PackageName,
//           totalAmount,
//           Email,
//           Phone,
//           StudentName,
//           // Street:street,
//           // zipCode:zipCode,
//           // city:city
//         })
//       );
//     } catch (error) {
//       console.error("Payment failed:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <AdminNav />
//       <form className="Student_mainPage_style" onSubmit={submitHandler}>
//         <h2>Order Details</h2>
//         <div className="d-flex flex-wrap confirm-Box">
//           <div className="PersonalInfo">
//             <h5>User Info</h5>

//             <div class="form-group">
//               <label for="exampleInputPassword1"> Username</label>
//               <input
//                 type="text"
//                 class="form-control"
//                 aria-label="Username"
//                 aria-describedby="basic-addon1"
//                 value={StudentName}
//                 required
//               />
//             </div>

//             <div class="form-group">
//               <label for="exampleInputPassword1"> Name of Company</label>
//               <input
//                 type="text"
//                 class="form-control"
//                 aria-label="Username"
//                 aria-describedby="basic-addon1"
//                 value={companyName}
//                 onChange={(e) => setCompanyName(e.target.value)}
//                 required
//               />
//             </div>

//             <div class="form-group">
//               <label for="exampleInputPassword1"> NIP</label>
//               <input
//                 type="text"
//                 class="form-control"
//                 aria-label="Username"
//                 aria-describedby="basic-addon1"
//                 value={companyName}
//                 onChange={(e) => setNip(e.target.value)}
//                 required
//               />
//             </div>

//             <div class="form-group">
//               <label for="exampleInputPassword1"> Country</label>
//               {/* <input
//                 type="text"
//                 class="form-control"
//                 aria-label="Username"
//                 aria-describedby="basic-addon1"
//                 value={companyName}
//                 onChange={(e) => setNip(e.target.value)}
//                 required
//               /> */}
//               <CountrySelect
//                 onChange={(e) => {
//                   setCountryid(e.id);
//                 }}
//                 placeHolder="Select Country"
//                 value={countryid}
//                 showFlag="true"
//               />
//             </div>
//           </div>

//           <div className="OrderInfo">
//             <h5>Your Order</h5>
//             <div class="input-group mb-3">
//               <div class="input-group-prepend">
//                 <span class="input-group-text" id="basic-addon1">
//                   Package Name
//                 </span>
//               </div>
//               <input
//                 type="text"
//                 class="form-control"
//                 placeholder="Email"
//                 aria-label="Username"
//                 aria-describedby="basic-addon1"
//                 value={PackageName}
//                 disabled
//               />
//             </div>
//             <div class="input-group mb-3">
//               <div class="input-group-prepend">
//                 <span class="input-group-text" id="basic-addon1">
//                   Amount Payable
//                 </span>
//               </div>
//               <input
//                 type="text"
//                 class="form-control"
//                 placeholder="Email"
//                 aria-label="Username"
//                 aria-describedby="basic-addon1"
//                 value={totalAmount}
//                 disabled
//               />
//             </div>
//           </div>
//         </div>

//         <div class="custom-control custom-checkbox">
//           <input
//             type="checkbox"
//             class="custom-control-input"
//             id="customCheck1"
//             required
//           />
//           <label class="custom-control-label" for="customCheck1">
//             I Read and accept Rules
//           </label>
//         </div>
//         <div class="custom-control custom-checkbox">
//           <input
//             type="checkbox"
//             class="custom-control-input"
//             id="customCheck1"
//             required
//           />
//           <label class="custom-control-label" for="customCheck1">
//             I read and confirm you agree to our privacy policy.
//           </label>
//         </div>

//         <button
//           type="submit"
//           className={`btn btn-outline-success ${loading ? "loading" : ""}`}
//           disabled={loading}
//         >
//           {loading ? "Confirming..." : "Confirm"}
//         </button>
//       </form>
//       <div>
//         <h6>Country</h6>
//         <CountrySelect
//           onChange={(e) => {
//             setCountryid(e.id);
//           }}
//           placeHolder="Select Country"
//         />
//         <h6>State</h6>
//         <StateSelect
//           countryid={countryid}
//           onChange={(e) => {
//             setstateid(e.id);
//           }}
//           placeHolder="Select State"
//         />
//         <h6>City</h6>
//         <CitySelect
//           countryid={countryid}
//           stateid={stateid}
//           onChange={(e) => {
//             console.log(e);
//           }}
//           placeHolder="Select City"
//         />
//         <h6>Language</h6>
//         <LanguageSelect
//           onChange={(e) => {
//             console.log(e);
//           }}
//           placeHolder="Select Language"
//         />
//       </div>
//     </>
//   );
// };

// export default CheckDetails;

import React, { useEffect, useState } from "react";
import AdminNav from "../admin-dashboard-components/AdminNav";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackage } from "../../store/actions/packagesActions";
import { Create_Payment } from "../../store/actions/paymentActions";
import { Country, State, City } from "country-state-city";
import Select from "react-select";

const CheckDetails = () => {
  const { Package_ID } = useParams();
  const dispatch = useDispatch();
  const [ loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // Initialize with 0
  const [companyName, setCompanyName] = useState("");
  const [nip, setNip] = useState("");
  const [street, setStreet] = useState("");

  const user = useSelector((state) => state.students.user);
  const pack = useSelector((state) => state.packages.currentPackage);

  console.log(pack);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  // useEffect(() => {
  //   console.log(selectedCountry);
  //   console.log(selectedCountry?.isoCode);
  //   console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  // }, [selectedCountry]);


  console.log(selectedCountry?.name);
  console.log(selectedState?.name)
  console.log(selectedCity?.name)
  // console.log(selectedCountry?.isoCode);
  // console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  const location = useLocation();
  const totalCount = location.state;

  const calculateTotalAmount = async () => {
    let total_Amount = 0;
    if (pack && pack.Course_IDs && pack.Course_IDs.length > 0) {
      await Promise.all(
        pack.Course_IDs.map(async (course) => {
          if (!isNaN(course.Purchase_Price)) {
            // Check if Purchase_Price is not NaN
            total_Amount += course.Purchase_Price;
          }
        })
      );
    }
    total_Amount *= totalCount; // Multiply by totalCount
    setTotalAmount(total_Amount);
  };
  console.log(totalAmount);

  const paymentResponseUrl = useSelector(
    (state) => state.payments.paymentResponseUrl
  );

  const PackageName = pack?.Package_Name;
  // const Desciption = pack?.Package_Name;
  const Email = user?.Email;
  const Phone = user?.Phone_Number;
  const StudentName = user?.Username;

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        await dispatch(fetchPackage(Package_ID));
        await calculateTotalAmount();
      } catch (error) {
        console.error("Error fetching package:", error.message);
      }
    };
    fetchPackageData();
  }, [Package_ID, dispatch]);

  useEffect(() => {
    if (paymentResponseUrl.length > 0) {
      setLoading(false);
      window.location.href = paymentResponseUrl;
    }
  }, [paymentResponseUrl]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = {
        Package_ID,
        Desciption: PackageName,
        totalAmount,
        Email,
        Phone,
        StudentName,
        Country:selectedCountry?.name,
        State:selectedState?.name,
        City:selectedCity?.name,
        Street:street,
        CompanyName:companyName,
        NIP:nip,
      }
      await dispatch(
        Create_Payment(formData)
      );
    } catch (error) {
      console.error("Payment failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNav />
      <form className="Student_mainPage_style" onSubmit={submitHandler}>
        <h2>Order Details</h2>
        <div className="d-flex flex-wrap confirm-Box">
          <div className="PersonalInfo">
            <h5>User Info</h5>

            <div class="form-group">
              <label for="exampleInputPassword1"> Username</label>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={StudentName}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Email</label>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={Email}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Phone No.</label>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={Phone}
                required
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1"> Name of Company</label>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1"> NIP</label>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1"> Country</label>

              <Select
                options={Country.getAllCountries()}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                value={selectedCountry}
                onChange={(item) => {
                  setSelectedCountry(item);
                }}
                required
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">State</label>

              <Select
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                value={selectedState}
                onChange={(item) => {
                  setSelectedState(item);
                }}
                required
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">City</label>

              <Select
                options={City.getCitiesOfState(
                  selectedState?.countryCode,
                  selectedState?.isoCode
                )}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                value={selectedCity}
                onChange={(item) => {
                  setSelectedCity(item);
                }}
                required
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Street</label>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="OrderInfo">
            <h5>Your Order</h5>

            <div class="form-group">
              <label for="exampleInputPassword1"> Package Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={PackageName}
                disabled
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1"> Amount Payable</label>
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={totalAmount}
                disabled
              />
            </div>
          </div>
        </div>

        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customCheck1"
            required
          />
          <label class="custom-control-label" for="customCheck1">
            I Read and accept Rules
          </label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customCheck1"
            required
          />
          <label class="custom-control-label" for="customCheck1">
            I read and confirm you agree to our privacy policy.
          </label>
        </div>

        <button
          type="submit"
          className={`btn btn-outline-success ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Confirming..." : "Confirm"}
        </button>
      </form>
    </>
  );
};

export default CheckDetails;
