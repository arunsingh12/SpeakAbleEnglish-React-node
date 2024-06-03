import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Booknow.css";
import { getOrderDetails } from "../../store/actions/paymentActions";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loader.png";

const Booknow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderData = useSelector((state) => state.payments.orderData);

  // loading
  const loading = useSelector((state) => state.payments.loading )
  console.log(orderData);
  const componentRef = useRef();
  const user = useSelector((state) => state.students.user);
  const NameUser = user?.Username;

  useEffect(() => {
    const getCookie = (name) => {
      const cookieString = document.cookie;
      const cookies = cookieString.split("; ");

      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName.trim() === name) {
          return decodeURIComponent(cookieValue);
        }
      }
      return null;
    };

    const orderId = getCookie("orderId");
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const generatePDF = () => {
    handlePrint();
  };

  const HomeNavigator = () => {
    navigate("/Student-dashboard/dash");
  };

  const convertStringToObject = (str) => {
    const pairs = str.split(",");
    const obj = {};
    pairs.forEach((pair) => {
      const [key, value] = pair.split(":");
      obj[key.trim()] = value.trim();
    });

    return obj;
  };

  return (
    <>
      {orderData !== null && loading !== true ? (
        <>
          <div className="Booknow_main_div">
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              ref={componentRef}
            >
              {orderData && (
                <>
                  {orderData?.properties?.map((val, index) => (
                    <div key={index}>
                      {val.name} - {val.value}
                    </div>
                  ))}
                </>
              )}
              {orderData && (
                <>
                  {orderData?.orders?.map((val, index) => (
                    <div className="text-center mt-3" key={index}>
                      {val.status === "COMPLETED" ? (
                        <div className="text-success fs-5 fbold ">
                          {val.status}
                        </div>
                      ) : (
                        <div className="text-danger">{val.status}</div>
                      )}

                      <div className="successDiv">
                        <p className="Paymessage">
                          <span>{NameUser}</span>, Thank you 😊 for purchasing
                          the <span>{val.description}</span>
                        </p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p>OrderId- </p>
                        <p className="fw-bold justify-content-center">
                          {val.orderId}
                        </p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p>Merchant PosId- </p>
                        <p className="fw-bold">{val.merchantPosId}</p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p>TotalAmount- </p>
                        <p className="fw-bold">{val.totalAmount}</p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p>CurrencyCode- </p>
                        <p className="fw-bold">{val.currencyCode}</p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p>Address- </p>
                        <p className="fw-bold">
                          {val.additionalDescription && (
                            <>
                              {Object.entries(
                                convertStringToObject(val.additionalDescription)
                              ).map(([key, value]) => (
                                <div key={key}>
                                  {key}: {value}
                                </div>
                              ))}
                            </>
                          )}
                        </p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p> Product ID - </p>
                        <p className="fw-bold">{val.description}</p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p> Product Price -</p>
                        <p className="fw-bold">
                          {val.products?.map((product, index) => {
                            return <>{product.unitPrice}</>;
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div>{orderData?.status?.statusDesc}</div>
                </>
              )}
            </div>
            <div>
              <button
                className="btn btn-outline-primary mt-3"
                onClick={generatePDF}
              >
                Download Reciept
              </button>
              <button
                className="btn btn-outline-primary mt-3 mx-3"
                onClick={HomeNavigator}
              >
                Back to Home
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="loaderClass">
            <img src={loader} alt={loader} />
          </div>
        </>
      )}
    </>
  );
};

export default Booknow;
