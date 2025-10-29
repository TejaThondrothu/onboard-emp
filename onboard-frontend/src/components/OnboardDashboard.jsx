import { useState } from "react";
import { motion } from "framer-motion";

export default function OnboardDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white bg-gray-300"
      style={{
        backgroundImage: "url('')",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Container */}
      <div className="relative z-10 p-6 w-11/12 max-w-5xl bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Onboard Dashboard</h1>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          {["overview", "analytics", "users", "settings"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-md transition-all ${
                selectedTab === tab
                  ? "bg-blue-500 shadow-md scale-105"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <motion.div
          key={selectedTab}
          className="p-4 bg-gray-900 bg-opacity-60 rounded-md shadow-md transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {selectedTab === "overview" && <p>Welcome to the Onboard Dashboard! 🚀</p>}
          {selectedTab === "analytics" && <p>Analytics data will appear here 📊</p>}
          {selectedTab === "users" && <p>Manage users from this section 👥</p>}
          {selectedTab === "settings" && <p>Configure settings as per your needs ⚙️</p>}
        </motion.div>
      </div>
    </div>
  );
}
