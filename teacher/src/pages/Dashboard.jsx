import React, { useEffect, useContext, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const { teacher, isAuthenticated } = useContext(Context); // Access the teacher info from context
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments for the logged-in teacher
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/appointment/getall",
          {
            withCredentials: true,
          }
        );
        setAppointments(response.data.appointments); // Save the appointments in state
      } catch (error) {
        toast.error("Error fetching appointments");
        console.error("Error fetching appointments:", error);
      }
    };

    if (teacher && teacher._id) {
      fetchAppointments();
    }
  }, [teacher]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/appointment/update/${appointmentId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(response.data.message);

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (error) {
      toast.error("Error updating appointment status");
      console.error("Error updating status:", error);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-full h-full lg:w-[70vw] flex flex-col gap-3 justify-items-start py-[5vh] mx-[2vw] ">
          {/* User Details */}
          <div className="bg-blue-900 rounded-3xl w-full py-5 min-h-[250px] px-10 gap-0 md:flex justify-center md:justify-evenly items-center">
            <p className=" text-yellow-400 text-center md:text-left font-bold text-[40px] lg:text-[50px]">
              {teacher?.firstName} {teacher?.lastName}
            </p>
            <div className="flex flex-col justify-center items-center text-white my-5 md:border-l md:pl-20 border-white">
              <h1 className="font-semibold text-center md:text-left text-2xl">
                Details
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 my-5 gap-1 w-[80%] md:w-full justify-items-center">
                <p className="my-2 text-sm font-semibold">Email : </p>
                <p className="md:col-span-3 my-2 text-sm justify-self-start">
                  {teacher?.email}
                </p>
                <p className="my-2 text-sm font-semibold">Phone : </p>
                <p className="md:col-span-3 my-2 text-sm justify-self-start">
                  {teacher?.phone}
                </p>
                <p className="my-2 text-sm font-semibold">Gender : </p>
                <p className="md:col-span-3 my-2 text-sm justify-self-start">
                  {teacher?.gender}
                </p>
                <p className="my-2 text-sm font-semibold">Age : </p>
                <p className="md:col-span-3 my-2 text-sm justify-self-start">
                  {calculateAge(teacher?.dob)}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-blue-900 overflow-x-hidden overflow-y-auto rounded-xl px-3">
            <div className="hidden m-3 bg-white px-5 py-3 rounded-xl md:grid grid-cols-2 md:grid-cols-4 md:justify-items-center">
              <p className="font-bold">Name</p>
              <p className="font-bold">Status</p>
              <p className="font-bold">User Details</p>
              <p className="font-bold">Timings</p>
            </div>
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="m-3 bg-white px-5 py-3 rounded-xl grid grid-cols-2 md:grid-cols-4 md:items-center justify-items-center"
              >
                <p className="text-md md:text-xl font-semibold">
                  {appointment.firstName} {appointment.lastName}
                </p>
                <p className="w-[100px] text-center">{appointment.status}</p>
                <div className="my-2 col-span-2 md:col-span-1 flex flex-col md:items-center w-full">
                  <p className="font-semibold block md:hidden">User Details</p>
                  <p className="">{appointment.email}</p>
                  <p>{appointment.phone}</p>
                </div>
                <div className="my-2 col-span-2 md:col-span-1 w-full flex flex-col md:items-center">
                  <p className="font-semibold block md:hidden">Timings</p>
                  <p className="">
                    {appointment.appointment_date.slice(0, 10)}
                  </p>
                  <p className="">
                    {appointment.appointment_date.slice(11, 25)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
