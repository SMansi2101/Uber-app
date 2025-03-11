import React, { useState, useEffect } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OTPInput from "react-otp-input";
import Toaster, { toast } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const PhoneLogin = () => {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState(null);

  // Ensure Recaptcha container exists
  useEffect(() => {
    const recaptchaContainer = document.getElementById("recaptcha-container");
    if (!recaptchaContainer) {
      const div = document.createElement("div");
      div.id = "recaptcha-container";
      document.body.appendChild(div);
    }

  }, []);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          OnSignup();
        },
        "expired-callback": () => {
          console.log("Recaptcha expired. Please refresh.");
        }
      });
  
      window.recaptchaVerifier.render().catch((error) => 
        console.log("Recaptcha render error:", error)
      );
    }
  }
  


  function OnSignup() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = "+" + phone;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Failed to send OTP. Try again.");
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setUser(res.user);
        toast.success("Login Successful!");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Invalid OTP. Please try again.");
      });
  }

  return (
    <section className="bg-yellow-500 flex items-center justify-center h-screen">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {user ? (
        <h2 className="text-center text-white font-medium text-2xl">
          Login Successful
        </h2>
      ) : (
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
          {showOtp ? (
            <>
              <div className="bg-white text-yellow-500 w-fit mx-auto p-4 rounded-full">
                <BsFillShieldLockFill size={30} />
              </div>
              <label className="text-white text-2xl font-bold text-center">
                Enter Your OTP
              </label>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="bg-white text-black border border-gray-300 !w-12 !h-12 text-xl font-bold text-center mx-1.5 rounded-lg outline-none focus:border-yellow-500 flex justify-center items-center"
                  />
                )}
              />
              <button
                onClick={onOTPVerify}
                className="bg-yellow-700 text-white w-full flex gap-1 items-center justify-center py-2 rounded"
              >
                {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            <>
              <div className="bg-white text-yellow-500 w-fit mx-auto p-4 rounded-full">
                <BsTelephoneFill size={30} />
              </div>
              <label className="text-white text-2xl font-bold text-center">
                Verify Your Phone Number
              </label>
              <PhoneInput country={"in"} value={phone} onChange={setPhone} />
              <button
                onClick={OnSignup}
                className="bg-yellow-700 text-white w-full flex gap-1 items-center justify-center py-2 rounded"
              >
                {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                <span>Send code via SMS</span>
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default PhoneLogin;
