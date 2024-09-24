import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        { email, password, confirmPassword, role: "Admin" },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="max-h-[80vh] my-10 sm:items-center flex justify-center"
        >
          <div className="flex flex-col justify-center items-center border px-10 py-5 rounded-2xl bg-blue-900 text-white w-[350px]">
            <p className="text-2xl mb-5 border-b py-2 w-full text-center">
              Admin Login
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
            <button className="bg-yellow-500 text-blue-900 text-center w-[150px] py-2 my-2 rounded-3xl relative transition-all delay-100 ease-in-out hover:scale-110 hover:bg-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
