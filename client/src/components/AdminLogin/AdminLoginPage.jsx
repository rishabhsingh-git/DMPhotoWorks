import React, { useState } from "react";
import SignInImg from "../../assets/SignInPageImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { createLogin } from "../../store/authReducer";
import { useEffect } from "react";
import { getAllCookies } from "../../common/common";
import { Toaster } from "../../shared";
import { clearLoginMessage } from "../../store/authReducer";
import { useNavigate } from "react-router-dom";

export const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isOTPLogin, setOTPLogin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isToastVisible, setShowToaster] = useState(false);
  const [toasterMessage, setShowToasterMesssage] = useState("");

  const { status, error, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const validateInputs = () => {
    if (!mobileNumber && (!password || !username)) {
      return "Enter either username and password or mobile number.";
    }
    if (mobileNumber && (password || username)) {
      return "Please choose a single login method.";
    }
    if ((!username || !password) && mobileNumber.length !== 10) {
      return "Please enter a valid mobile number (10 digits).";
    }
    return "";
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateInputs();
    if (errorMessage) {
      setIsError(true);
      setErrorMessage(errorMessage);
      return;
    }
    setIsError(false);
    setErrorMessage("");
    const payload = {};
    if (mobileNumber.length === 10) {
      payload.mobileNumber = mobileNumber;
    } else {
      payload.userName = username;
      payload.password = password;
    }
    if (mobileNumber.length === 10) {
      setOTPLogin(true);
    } else {
      dispatch(createLogin(payload));
    }
    handleReset();
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setMobileNumber("");
    setOTPLogin(false);
    setOtp("");
    setIsError(false);
    setErrorMessage("");
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);
    if (isError) {
      setIsError(false);
      setErrorMessage("");
    }
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobileNumber(value);
      if (value.length === 10) {
        setIsError(false);
        setErrorMessage("");
      }
    }
  };

  useEffect(() => {
    getAllCookies();
  }, []);

  useEffect(() => {
    if (isSuccess && status === 200) {
      const timeoutId = setTimeout(() => {
        navigate("/admin-dashboard");
      }, 600);

      return () => clearTimeout(timeoutId);
    }
  }, [isSuccess, status, navigate]);

  useEffect(() => {
    if (error?.isError || message) {
      setShowToaster(true);
      setShowToasterMesssage(message);
    }
  }, [error?.isError, message]);

  const handleToasterClose = () => {
    setShowToaster(false);
    setShowToasterMesssage("");
    dispatch(clearLoginMessage(""));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex bg-gray-900 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col w-full p-8 md:w-1/2">
          <h2 className="text-3xl font-extrabold italic text-center text-white mb-6">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <div>
                <label className="block text-gray-300 mb-2">Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={handleInputChange(setUsername)}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-500"
                  placeholder="Enter Username"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-500"
                  placeholder="Enter Password"
                />
              </div>
            </div>
            <div className="flex items-center my-4">
              <div
                className="flex-grow border-t border-gray-600"
                style={{ marginTop: "5%" }}
              ></div>
              <span className="mx-4 text-gray-400">OR</span>
              <div
                className="flex-grow border-t border-gray-600"
                style={{ marginTop: "5%" }}
              ></div>
            </div>

            {!isOTPLogin ? (
              <div>
                <label className="block text-gray-300 mb-2">Mobile No:</label>
                <input
                  type="number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-500"
                  placeholder="Enter Mobile Number"
                />
              </div>
            ) : (
              <div>
                <label className="block text-gray-300 mb-2">Enter OTP:</label>
                <input
                  type="text"
                  value={otp}
                  onChange={handleInputChange(setOtp)}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-500"
                  placeholder="One-Time Password"
                  required
                />
              </div>
            )}
            {isError && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
            <div className="flex gap-10">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
              <button
                onClick={handleReset}
                type="button"
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img
            src={SignInImg}
            alt="Cool Visual"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {isToastVisible ? (
        <Toaster
          isFailure={error?.isError}
          isSuccess={isSuccess}
          message={toasterMessage || error?.message}
          onClose={handleToasterClose}
        />
      ) : null}
    </div>
  );
};

export default AdminLoginPage;
