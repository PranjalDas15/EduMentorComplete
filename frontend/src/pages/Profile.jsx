import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, appointments, setAppointments } =
    useContext(Context);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/login");
  }

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-400";
      case "Accepted":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/appointment/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
      toast.success("Appointment deleted successfully!");
    } catch (error) {
      console.error(
        "Failed to delete appointment:",
        error.response?.data?.message
      );
      toast.error("Failed to delete appointment. Please try again!");
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <div>Please Log in First</div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-[95vw] lg:w-[70vw] flex flex-col gap-3 justify-items-start my-[5vh] mx-[2vw]">
            {/* User Details */}
            <div className="bg-blue-900 rounded-3xl w-full py-5 min-h-[250px] px-10 gap-0 md:flex justify-center md:justify-evenly items-center">
              <p className=" text-yellow-400 text-center md:text-left font-bold text-[40px] lg:text-[50px]">
                {user?.firstName} {user?.lastName}
              </p>
              <div className="flex flex-col justify-center items-center text-white my-5 md:border-l md:pl-20 border-white">
                <h1 className="font-semibold text-center md:text-left text-2xl">
                  Details
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 my-5 gap-1 w-[80%] md:w-full justify-items-center">
                  <p className="my-2 text-sm font-semibold">Email : </p>
                  <p className="md:col-span-3 my-2 text-sm justify-self-start">
                    {user?.email}
                  </p>
                  <p className="my-2 text-sm font-semibold">Phone : </p>
                  <p className="md:col-span-3 my-2 text-sm justify-self-start">
                    {user?.phone}
                  </p>
                  <p className="my-2 text-sm font-semibold">Gender : </p>
                  <p className="md:col-span-3 my-2 text-sm justify-self-start">
                    {user?.gender}
                  </p>
                  <p className="my-2 text-sm font-semibold">Age : </p>
                  <p className="md:col-span-3 my-2 text-sm justify-self-start">
                    {calculateAge(user?.dob)}
                  </p>
                </div>
              </div>
            </div>

            {/* All Appointments */}
            <div className="bg-blue-900 rounded-3xl w-full min-h-[200px] px-5 md:px-10 gap-4 flex flex-col justify-center items-center">
              <h1 className="text-white text-2xl font-semibold my-5">
                My Appointments
              </h1>
              <div className="w-full bg-blue-900 overflow-x-hidden overflow-y-auto rounded-xl px-3">
                <div className="hidden m-3 bg-white px-5 py-3 rounded-xl md:grid grid-cols-2 md:grid-cols-4 md:justify-items-center">
                  <p className="font-bold">Name</p>
                  <p className="font-bold">Status</p>
                  <p className="font-bold">User Details</p>
                  <p className="font-bold">Timings</p>
                </div>
                {appointments.map((appointment) => (
                  <div className="relative" 
                  key={appointment._id}>
                    <img
                      onClick={() => handleDeleteAppointment(appointment._id)}
                      src={assets.close}
                      alt=""
                      className="w-10 absolute top-0 right-0 mr-5 my-2 md:my-5 transition-all duration-200 ease-in-out hover:scale-125 cursor-pointer"
                    />
                    <div
                      className="m-3 bg-white px-5 py-3 rounded-xl grid grid-cols-2 md:grid-cols-4 md:items-center md:justify-items-center"
                    >
                      <p className="text-md md:text-xl font-semibold">
                        {appointment.firstName} {appointment.lastName}
                      </p>
                      <p
                        className={`font-semibold ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </p>

                      <div className="my-2 col-span-2 md:col-span-1 flex flex-col md:items-center w-full">
                        <p className="font-semibold block md:hidden">
                          User Details
                        </p>
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
