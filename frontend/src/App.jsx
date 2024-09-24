import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Context } from "./main";
import Footer from "./components/Footer";
import TeachersList from "./pages/TeachersList";
import Teacher from "./pages/Teacher";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";

function App() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    teachers,
    setTeachers,
    setAppointments,
  } = useContext(Context);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthenticated(false);
      setUser({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Error logging out");
    }
  };

  const fetchAppointments = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/appointment/getme",
          { withCredentials: true }
        );
        console.log("Response Data:", response.data);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error(
          "Failed to fetch appointments:",
          error.response?.data?.message
        );
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [isAuthenticated]);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/user/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/teachers"
        );
        setTeachers(response.data.teachers);
      } catch (error) {
        console.error("Failed to fetch teachers");
      }
    };
    fetchTeachers();
  }, [setTeachers]);

  

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route
          path="/teacher_list"
          element={<TeachersList teachers={teachers} />}
        />
        <Route path="/teacher_list/:teacherId" element={<Teacher />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/my_profile" element={<Profile />} />
        <Route path="/my_messages" element={<Messages/>} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="top-center" />
      <Footer />
    </Router>
  );
}

export default App;
