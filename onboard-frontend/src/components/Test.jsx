import React, { useState } from "react";
import Alert from "./Alert";

const Test = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Auto-remove after 3s
  };

  return (
    <div className="p-5">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
        onClick={() => showAlert("Operation successful!", "success")}
      >
        Show Success
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
        onClick={() => showAlert("Something went wrong!", "error")}
      >
        Show Error
      </button>
      <button
        className="bg-yellow-500 text-black px-4 py-2 rounded-md"
        onClick={() => showAlert("Warning: Check inputs!", "warning")}
      >
        Show Warning
      </button>

      {/* Render alert dynamically */}
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
    </div>
  );
};

export default Test;
