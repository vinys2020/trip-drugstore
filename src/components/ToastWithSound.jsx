import React, { useEffect, useRef } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastStyles.css";
import dingSound from "../assets/ding.mp3";

const ToastWithSound = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };

    toast.onChange(({ status }) => {
      if (status === "added") playSound();
    });
  }, []);

  return (
    <>
      <audio ref={audioRef} src={dingSound} preload="auto" />
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        closeButton={false}
      />
    </>
  );
};

export default ToastWithSound;
