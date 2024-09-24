import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Messages from "./pages/Messages";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    teacher,
    setTeacher,
  } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          "https://edumentor-backend-s85o.onrender.com/api/v1/users/teacher/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setTeacher(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setTeacher({});
        console.error("Error fetching teacher details:", error);
      }
    };
    fetchTeacher();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://edumentor-backend-s85o.onrender.com/api/v1/users/teacher/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthenticated(false);
      setTeacher({});
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error logging out";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Dashboard handleLogout={handleLogout} />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
}

export default App;
