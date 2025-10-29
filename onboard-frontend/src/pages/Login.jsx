// import React, { useState } from "react";

// const Login = () => {
//   const [loginData, setLoginData] = useState({ userName: "", password: "" });
//   const [errors, setErrors] = useState({ userName: "", password: "" });

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     let formErrors = {};
//     if (!loginData.userName.trim()) {
//       formErrors.userName = "Please enter email address";
//     }
//     if (!loginData.password) {
//       formErrors.password = "Please enter password";
//     }
//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Form Submitted:", loginData);
//       // Perform login API call here
//     }
//   };

//   return (
//     <div
//       className="flex h-screen bg-cover bg-center pt-16"
      
//     >
//       {/* Left Section */}
//       <div className="hidden md:flex flex-col justify-between bg-opacity-80 text-white w-3/5 p-10" style={{ backgroundImage: "url('https://hrms-stag.napierhealthcare.com:9443/ONBOARD/assets/images/onboard_banner.jpg')" }}>
//         <div>
//           <h1 className="text-4xl font-bold">TEJA IT SOLUTIONS</h1>
//           <h1 className="text-5xl mt-4">Start <br /> Your <br /> Career</h1>
//         </div>
//         <h5 className="text-sm">&copy; {new Date().getFullYear()} Teja IT Solutions, All rights reserved.</h5>
//       </div>

//       {/* Right Section */}
//       <div className="w-full md:w-2/5 flex flex-col justify-center p-10 bg-gray-100 bg-opacity-90">
//         <h3 className="text-orange-500 text-3xl font-bold mb-5">Login</h3>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-gray-700 font-semibold">Username</label>
//             <input
//               type="text"
//               name="userName"
//               value={loginData.userName}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={loginData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//           </div>
//           <div className="flex justify-center space-x-3">
//             <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               Login
//             </button>
//             <button type="reset" onClick={() => setLoginData({ userName: "", password: "" })} className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;













import React, { useState } from "react";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [loginData, setLoginData] = useState({ emailId: "", password: "" });
  const [errors, setErrors] = useState({ emailId: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate =useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!loginData.emailId.trim()) {
      formErrors.emailId = "Please enter email address";
    }
    if (!loginData.password) {
      formErrors.password = "Please enter password";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5030/api/users/login", loginData);
      if (response.data.success) {
        toast.success("Login successful");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        setLoginData({ emailId: "", password: "" });
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Invalid credentials or server error");
    }
    setLoading(false);
  };

  return (
    <><Navbar/>
    <div className="flex h-screen bg-cover bg-center pt-16">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-between bg-opacity-80 text-white w-3/5 p-10" style={{ backgroundImage: "url('https://hrms-stag.napierhealthcare.com:9443/ONBOARD/assets/images/onboard_banner.jpg')" }}>
        <div>
          <h1 className="text-4xl font-bold">TEJA IT SOLUTIONS</h1>
          <h1 className="text-5xl mt-4">Start <br /> Your <br /> Career</h1>
        </div>
        <h5 className="text-sm">&copy; {new Date().getFullYear()} Teja IT Solutions, All rights reserved.</h5>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/5 flex flex-col justify-center p-10 bg-gray-100 bg-opacity-90">
        {/* {loading ? "Logging in..." : "Login"} */}
        <h3 className="text-orange-500 text-3xl font-bold mb-5">Login</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="emailId"
              value={loginData.emailId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="flex justify-center space-x-3">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button type="reset" onClick={() => setLoginData({ emailId: "", password: "" })} className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
    </>
  );
};

export default Login;

