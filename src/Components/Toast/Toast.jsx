import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Toast({ toastTxt }) {
  const notify = () => {
    toast(toastTxt, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    notify(); // فراخوانی تابع notify() در useEffect()
  }, []); // خالی کردن آرایهٔ وابستگی‌ها به منظور یکبار فراخوانی

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
