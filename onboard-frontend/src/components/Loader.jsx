import React from "react";

const Loader = ({ isFullScreen = false, text = "Loading..." }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        isFullScreen ? "fixed inset-0 bg-white z-50" : "h-screen w-full"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo (only if fullscreen) */}
        {isFullScreen && (
          <img
            src="https://hrms-stag.napierhealthcare.com:9443/ONBOARD/assets/images/onboard_banner.jpg"
            alt="Onboard Logo"
            className="w-32 h-auto mb-4 animate-pulse"
          />
        )}

        {/* Spinning Loader */}
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="mt-3 text-blue-600 font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
