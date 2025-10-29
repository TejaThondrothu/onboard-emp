import React, { useState, useEffect } from "react";

const Alert = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose(); // Notify parent to remove alert
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  // Define alert colors based on type
  const alertStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  return (
    <div className={`fixed right-5 z-50 px-4 py-3 rounded-md shadow-lg ${alertStyles[type]}`} style={{ top: "80px" }}>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
