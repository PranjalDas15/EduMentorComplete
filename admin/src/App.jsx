import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import AddNewTeacher from "./pages/AddNewTeacher";
import Login from "./pages/Login";
import AddNewAdmin from "./pages/AddNewAdmin";
import Teachers from "./pages/Teachers";
import Sidebar from "./components/Sidebar";


const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin,message, setMessage, teachers, setTeachers } =
    useContext(Context);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          "https://edumentor-backend-s85o.onrender.com/api/v1/users/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchAdmin();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      const response = await axios.get("https://edumentor-backend-s85o.onrender.com/api/v1/users/admin/logout", { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthenticated(false);
      setAdmin({});
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error logging out';
      toast.error(errorMessage);
    }
  };


  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("https://edumentor-backend-s85o.onrender.com/api/v1/users/teachers");
        setTeachers(response.data.teachers); 
      } catch (error) {
        console.error("Failed to fetch teachers");
      }
    };
    fetchTeachers();
  }, [isAuthenticated, setTeachers]);


  return (
      <div className="flex w-full">
        <Sidebar handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Dashboard teachers={teachers} setTeachers={setTeachers}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/new_teacher" element={<AddNewTeacher/>}/>
          <Route path="/new_admin" element={<AddNewAdmin/>}/>
          <Route path="/teachers" element={<Teachers/>}/>
        </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
