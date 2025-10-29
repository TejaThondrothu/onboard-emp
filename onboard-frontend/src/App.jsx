import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Onboard from './pages/Onboard'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Test from './components/Test'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const App = () => {
 // const [showLogin,setShowLogin] = useState(true);
  return (
    <>
    {/* <Navbar/>
    <div className="pt-16"> 
    <Onboard/>
    </div> */}
          {/* {showLogin?<Login/>:<></>} */}
          <div>
           <ToastContainer position="top-right" autoClose={3000} />
            {/* <Navbar/> */}
            <Routes className=''>
                <Route path='/login' element ={<Login/>}></Route>
                <Route path='/' element ={<Home/>}></Route>
                <Route path='/home' element ={<Home/>}></Route>
                <Route path='/onboard' element ={<Onboard/>}></Route>
                <Route path='/admin' element ={<Admin/>}></Route>
                <Route path='/test' element ={<Test/>}></Route>
            </Routes>
          </div>
    </>
  )
}

export default App