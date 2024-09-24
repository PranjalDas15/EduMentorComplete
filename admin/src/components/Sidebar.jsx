import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";

const Sidebar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(Context);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleButtonClick = (path) => {
    navigate(path);
    setIsSidebarVisible(false);
  };
  return (

    <div className="h-screen flex">
      <div className="h-screen w-5 bg-slate-200 flex md:hidden">
        <button onClick={toggleSidebar}>
          <img src={assets.chev_right} alt="" />
        </button>
      </div>

      {/* Sidebar */}
    <div className={`text-white h-screen w-[300px] bg-blue-900 transition-transform duration-300 ease-in-out z-50 
          ${isSidebarVisible ? "translate-x-0 absolute" : "-translate-x-[1080px] absolute"} 
          lg:translate-x-0 lg:relative`}>
      <div className="flex flex-col w-full items-center">
        <img src={assets.logo_dark} alt="" className="w-[120px]" />
        <div className="flex flex-col items-center gap-10 w-full my-10">
          <button
            disabled={!isAuthenticated}
            onClick={() => handleButtonClick("/")}
            className={`text-center w-[90%] py-3 bg-white text-blue-900 font-semibold rounded-xl transition-all duration-200 ease-in-out hover:bg-yellow-400 cursor-pointer hover:-translate-y-1 hover:shadow-[0px_10px_5px_rgba(0,0,0,0.2)] ${
              !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Dashboard
          </button>
          <button
            disabled={!isAuthenticated}
            onClick={() => handleButtonClick("/teachers")}
            className={`text-center w-[90%] py-3 bg-white text-blue-900 font-semibold rounded-xl transition-all duration-200 ease-in-out hover:bg-yellow-400 cursor-pointer hover:-translate-y-1 hover:shadow-[0px_10px_5px_rgba(0,0,0,0.2)] ${
              !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Teachers
          </button>
          <button
            disabled={!isAuthenticated}
            onClick={() => handleButtonClick("/new_teacher")}
            className={`text-center w-[90%] py-3 bg-white text-blue-900 font-semibold rounded-xl transition-all duration-200 ease-in-out hover:bg-yellow-400 cursor-pointer hover:-translate-y-1 hover:shadow-[0px_10px_5px_rgba(0,0,0,0.2)] ${
              !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add Teachers
          </button>
          <button
            disabled={!isAuthenticated}
            onClick={() => handleButtonClick("/new_admin")}
            className={`text-center w-[90%] py-3 bg-white text-blue-900 font-semibold rounded-xl transition-all duration-200 ease-in-out hover:bg-yellow-400 cursor-pointer hover:-translate-y-1 hover:shadow-[0px_10px_5px_rgba(0,0,0,0.2)] ${
              !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add Admin
          </button>
          
          {isAuthenticated ? (
            <button
            onClick={() => {
              handleLogout();
              setIsSidebarVisible(false); 
            }}
              className="text-center w-[90%] py-3 bg-white text-blue-900 font-semibold rounded-xl transition-all duration-200 ease-in-out hover:bg-yellow-400 cursor-pointer hover:-translate-y-1 hover:shadow-[0px_10px_5px_rgba(0,0,0,0.2)]"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleButtonClick("/login")}
              className="text-center w-[90%] py-3 bg-white text-blue-900 font-semibold rounded-xl transition-all duration-200 ease-in-out hover:bg-yellow-400 cursor-pointer hover:-translate-y-1 hover:shadow-[0px_10px_5px_rgba(0,0,0,0.2)]"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div></div>
  );
};

export default Sidebar;
