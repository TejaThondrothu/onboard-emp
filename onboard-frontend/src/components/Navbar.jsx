import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
//import { showToast } from "../utils/toast";
import { toast } from "react-toastify";

const Navbar = ({ isAdmin, isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // same as isLoggedIn
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  //const { showAlert } = useAlert();


  useEffect(() => {
    // Check if user is logged in
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user); // Convert string to object
      setUserName(`${parsedUser.firstName} ${parsedUser.lastName}`);
    }
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    isLoggedIn= false;
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
<nav className="fixed top-0 left-0 w-full bg-blue-800 text-white px-6 py-3 shadow-md z-50 h-16">
<div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-xl font-semibold tracking-wide">Onboard Application</div>

        {/* Show Menu Only If Logged In */}
        {(isLoggedIn || isAuthenticated) && (
          <>
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <span className="text-white font-medium">
                Welcome, <span className="font-semibold">{userName || "USER"}</span>
              </span>
              {isAdmin ? (
                <>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                    Admin Dashboard
                  </button>
                  <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200">
                    All Users
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/home");
                  }}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                >
                  Home
                </button>
              )}
              <button onClick={handleLogout} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg">
                Sign Out
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {(isLoggedIn || isAuthenticated) && isOpen && (
        <div className="md:hidden absolute top-[50px] right-0 w-72 bg-blue-700 py-4 shadow-xl flex flex-col items-center space-y-3 transition-all duration-300">
          <span className="text-white font-medium px-4 py-2 rounded-lg w-5/6 text-center">
            Welcome, <span className="font-semibold">{userName || "USER"}</span>
          </span>
          {isAdmin ? (
            <>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-5/6 text-center">
                Admin Dashboard
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-5/6 text-center">
                All Users
              </button>
            </>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-5/6 text-center"
              onClick={() => navigate("/home")}
            >
              Home
            </button>
          )}
          <button onClick={handleLogout} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg w-5/6 text-center">
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

