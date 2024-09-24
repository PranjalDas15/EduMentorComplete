import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../main";

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [isHidden, setisHidden] = useState(true);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogoutButton = () =>{
    handleLogout();
    navigate('/login')
  }


  return (
    <nav
      id="navbar"
      className={`grid grid-cols-3 gap-4 w-full justify-items-center md:justify-items-stretch items-center shadow-md sticky top-0 bg-white z-10 transition-all duration-300 ease-in-out ${
        isScrolled ? "h-[4rem]" : "sm:h-[8rem] "
      }`}
    >
      <div className="flex py-3 md:ml-10 md:hidden cursor-pointer">
        <img
          src={assets.menu}
          width={40}
          alt=""
          onClick={() => setisHidden(false)}
        />
      </div>
      <div
        className={`flex md:justify-center items-center ${
          isScrolled ? "w-[100px] " : "w-[100px] sm:w-[150px] lg:w-[200px]"
        }`}
      >
        <img
          src={assets.logo_main}
          onClick={() => navigate("/")}
          alt="logo"
          className="relative md:ml-10  cursor-pointer"
        />
      </div>

      {/* Hidden Menu  */}

      <ul
        className={`fixed top-0 left-0 flex-col flex items-center gap-4 bg-slate-200 h-screen w-[300px] z-30 transition-all duration-500 ease-in-out transform ${
          isHidden ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="w-full flex justify-end p-4">
          <img
            src={assets.close}
            alt=""
            className="w-12 transition-transform duration-100 ease-in-out hover:scale-110 cursor-pointer"
            onClick={() => setisHidden(true)}
          />
        </div>
        <NavLink to={"/"} onClick={()=>setisHidden(true)} className='w-[80%] transition-transform duration-100 ease-in-out hover:scale-110 mt-20'>
          <li
            className="rounded-xl py-3 flex items-center justify-center font-medium text-sm text-blue-900 hover:text-white bg-white hover:bg-blue-900 cursor-pointer"
          >
            Home
          </li>
        </NavLink>
        <NavLink to={"/teacher_list"} onClick={()=>setisHidden(true)} className='w-[80%] transition-transform duration-100 ease-in-out hover:scale-110 '>
          <li
            className="rounded-xl py-3 flex items-center justify-center font-medium text-sm text-blue-900 hover:text-white bg-white hover:bg-blue-900 cursor-pointer transition-transform delay-100 ease-in-out "
          >
            Teachers
          </li>
        </NavLink>
        <NavLink to={"/aboutus"} onClick={()=>setisHidden(true)} className='w-[80%] transition-transform duration-100 ease-in-out hover:scale-110 '>
          <li
            className="rounded-xl py-3 flex items-center justify-center font-medium text-sm text-blue-900 hover:text-white bg-white hover:bg-blue-900 cursor-pointer transition-transform delay-100 ease-in-out "
          >
            About Us
          </li>
        </NavLink>
      </ul>

      {/* Not Hidden Menu  */}
      <ul className="hidden md:flex justify-center  ">
        <NavLink to={"/"}>
          <li
            className={`w-[100px] flex items-center justify-center font-medium text-sm text-blue-900 hover:text-blue-500 cursor-pointer transition-transform delay-100 ease-in-out hover:-translate-y-1 ${
              isScrolled ? " relative top-0" : " relative top-2"
            }`}
          >
            Home
          </li>
        </NavLink>
        <NavLink to={"/teacher_list"}>
          <li
            className={`w-[100px] flex items-center justify-center font-medium text-sm text-blue-900 hover:text-blue-500 cursor-pointer transition-transform delay-100 ease-in-out hover:-translate-y-1 ${
              isScrolled ? " relative top-0" : " relative top-2"
            }`}
          >
            Teachers
          </li>
        </NavLink>
        <NavLink to={"/aboutus"}>
          <li
            className={`w-[100px] flex items-center justify-center font-medium text-sm text-blue-900 hover:text-blue-500 cursor-pointer transition-transform delay-100 ease-in-out hover:-translate-y-1 ${
              isScrolled ? " relative top-0" : " relative top-2"
            }`}
          >
            About Us
          </li>
        </NavLink>
      </ul>
      <div>
        <div className="flex md:justify-end items-center md:mx-10 ">
          {isAuthenticated ? (
            <div className="flex items-center justify-center gap-4 rounded-full w-12 group relative cursor-pointer bg-yellow-400">
              <p
                className='px-5 py-3 font-medium text-sm text-blue-900 hover:text-blue-500 cursor-pointer transition-transform duration-100 ease-in-out hover:-translate-y-1's>
                {user?.firstName.slice(0,1)}
              </p>
              <div className="absolute top-0 right-0 pt-[50px] text-base font-medium text-gray-600 hidden group-hover:block z-20">
                <p
                  onClick={() => navigate("/my_profile")}
                  className="w-[150px]  bg-slate-50 p-3 text-center text-blue-900 hover:bg-slate-200 cursor-pointer"
                >
                  Profile
                </p>
                <p
                  onClick={() => navigate("/my_messages")}
                  className="w-[150px]  bg-slate-50 p-3 text-center text-blue-900 hover:bg-slate-200 cursor-pointer"
                >
                  Messages
                </p>
                <button
                  onClick={handleLogout}
                  className="w-[150px] bg-slate-50 p-3 text-center text-blue-900 hover:bg-slate-200 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <img
                src={assets.login}
                alt=""
                width={40}
                onClick={handleLogin}
                className="w-[40px] text-white text-center py-3 rounded-3xl flex justify-end relative transition-all delay-100 ease-in-out hover:scale-110 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
