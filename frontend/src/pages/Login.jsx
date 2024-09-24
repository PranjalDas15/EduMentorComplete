import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

  const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log({ firstName, lastName, email, phone, dob, gender, password});
    
      const response = await axios.post("https://edumentor-backend-s85o.onrender.com/api/v1/users/register", 
        { firstName, lastName, email, phone, dob, gender, password},
        { withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true)
      navigate('/login');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://edumentor-backend-s85o.onrender.com/api/v1/users/login", 
        { email, password, confirmPassword, role:"User"},
        { withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true)
      navigate('/');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }

  };

  if(isAuthenticated){
    return <Navigate to={'/'}/>
  }

  return (
    <>
      {state === "Sign Up" ? (
        <form
          onSubmit={handleRegister}
          className="max-h-[80vh] my-10 sm:items-center flex justify-center"
        >
          <div className="flex flex-col justify-center items-center border px-10 py-5 rounded-2xl bg-blue-900 text-white w-[500px]">
            <p className="text-2xl mb-5 border-b py-2 w-full text-center">
              Sign Up
            </p>
            <p className="text-sm text-yellow-500 py-2">
              Create an account to book appointments
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="py-2 w-full">
                <p className='text-sm pb-2'>First Name</p>
                <input 
                  className='w-full h-[35px] text-blue-900 rounded-md p-1' 
                  type="text" 
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  placeholder="First Name"/>
              </div>
              <div className="py-2 w-full">
                <p className='text-sm pb-2'>Last Name</p>
                <input 
                  className='w-full h-[35px] text-blue-900 rounded-md p-1' 
                  type="text" 
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder="Last Name"/>
              </div>
              
              <div className="py-2 w-full">
                <p className="text-sm pb-2">Email</p>
                <input
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email"
                />
              </div>
              <div className="py-2 w-full">
                <p className="text-sm pb-2">Phone Number</p>
                <input
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  placeholder="Phone Number"
                />
              </div>  
              <div className="py-2 w-full">
                <p className="text-sm pb-2">Password</p>
                <input
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                />
              </div>
              
              <div className="py-2 w-full">
                <p className="text-sm pb-2">Gender</p>
                <select 
                  className="w-full h-[35px] text-blue-900 rounded-md p-1" 
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}>
                  <option value="" disabled hidden>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="py-2 w-full">
                <p className="text-sm pb-2">Date of Birth</p>
                <input
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  type="date"
                  onChange={(e) => setDob(e.target.value)}
                  value={dob}
                  placeholder="Date of Birth"
                />
              </div>
            </div>
            {state === "Sign Up" ? (
              <a
                onClick={() => setState("Login")}
                href="#"
                className="py-3 hover:underline underline-offset-4"
              >
                Already logged in?
              </a>
            ) : (
              <a
                onClick={() => setState("Sign Up")}
                href="#"
                className="py-3 hover:underline underline-offset-4"
              >
                Not Signed up yet?
              </a>
            )}
            <button className="bg-yellow-500 text-blue-900 text-center w-[150px] py-2 my-2 rounded-3xl relative transition-all delay-100 ease-in-out hover:scale-110 hover:bg-white">
              Sign Up
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleLogin}
          className="max-h-[80vh] my-10 sm:items-center flex justify-center"
        >
          <div className="flex flex-col justify-center items-center border px-10 py-5 rounded-2xl bg-blue-900 text-white w-[350px]">
            <p className="text-2xl mb-5 border-b py-2 w-full text-center">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </p>
            <p className="text-sm text-yellow-500 py-2">
              Login to to book an appointment
            </p>
            <div className="py-2 w-full">
              <p className="text-sm pb-2">Email</p>
              <input
                className="w-full h-[35px] text-blue-900 rounded-md p-1"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="py-2 w-full">
              <p className="text-sm pb-2">Password</p>
              <input
                className="w-full h-[35px] text-blue-900 rounded-md p-1"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="py-2 w-full">
              <p className="text-sm pb-2">Confirm Password</p>
              <input
                className="w-full h-[35px] text-blue-900 rounded-md p-1"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            {state === "Sign Up" ? (
              <a
                onClick={() => setState("Login")}
                href="#"
                className="py-3 hover:underline underline-offset-4"
              >
                Already logged in?
              </a>
            ) : (
              <a
                onClick={() => setState("Sign Up")}
                href="#"
                className="py-3 hover:underline underline-offset-4"
              >
                Not Signed up yet?
              </a>
            )}
            <button className="bg-yellow-500 text-blue-900 text-center w-[150px] py-2 my-2 rounded-3xl relative transition-all delay-100 ease-in-out hover:scale-110 hover:bg-white">
              Login
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
