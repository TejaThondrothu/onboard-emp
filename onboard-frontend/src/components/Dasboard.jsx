import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen w-full text-center min-h-screen bg-blue-50  p-4">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
          Welcome to Onboard Dashboard
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-80">
          Manage users, track progress, and streamline onboarding in one place.
        </p>
        <button onClick={()=>{navigate("/onboard")}} className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 shadow-md">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
