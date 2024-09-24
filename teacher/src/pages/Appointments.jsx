import React, { useEffect, useContext, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Appointments = () => {
  const { teacher } = useContext(Context);
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
        setAppointments(response.data.appointments);
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

  const rejectedCount = appointments.filter(
    (appointment) => appointment.status === "Rejected"
  ).length;
  const acceptedCount = appointments.filter(
    (appointment) => appointment.status === "Accepted"
  ).length;
  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  return (
    <>
      <div className="w-full h-screen flex flex-col gap-3 overflow-x-hidden overflow-y-auto px-3 pb-5">
        <div className="w-full bg-blue-900 text-white flex flex-col items-center justify-center mt-10 rounded-xl">
          <h1 className="mt-5 font-bold text-[30px] md:text-[40px]">
            Your appointments
          </h1>
          <div className="flex justify-evenly my-5 w-full px-4 gap-4">
            <div className="text-center">
              <h1 className="text-xl font-semibold">Total Pending</h1>
              <p className="text-lg mt-3">{pendingCount}</p>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold">Total Accepted</h1>
              <p className="text-lg mt-3">{acceptedCount}</p>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold">Total Rejected</h1>
              <p className="text-lg mt-3">{rejectedCount}</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-blue-900 overflow-x-hidden overflow-y-auto rounded-xl px-3">
          <div className="hidden m-3 bg-white px-5 py-3 rounded-xl md:grid grid-cols-2 lg:grid-cols-4 md:justify-items-center">
            <p className="font-bold">Name</p>
            <p className="font-bold">Status</p>
            <p className="font-bold">User Details</p>
            <p className="font-bold">Timings</p>
          </div>
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="m-3 bg-white px-5 py-3 rounded-xl grid grid-cols-1 lg:grid-cols-4 items-center md:justify-items-center"
            >
              <p className="text-xl font-semibold">
                {appointment.firstName} {appointment.lastName}
              </p>
              <select
                value={appointment.status}
                onChange={(e) =>
                  handleStatusChange(appointment._id, e.target.value)
                }
                className="w-[100px] h-10 rounded-xl border border-blue-900 text-center mt-5 md:mt-0"
              >
                <option value="Pending" className="text-gray-600">
                  Pending
                </option>
                <option value="Accepted" className="text-green-500">
                  Accepted
                </option>
                <option value="Rejected" className="text-red-600">
                  Rejected
                </option>
              </select>
              <div className="my-2 md:col-span-1 flex flex-col md:items-center w-full">
                  <p className="font-semibold block md:hidden">User Details</p>
                  <p className="">{appointment.email}</p>
                  <p>{appointment.phone}</p>
                </div>
              <div className="my-2 md:col-span-1 w-full flex flex-col md:items-center">
                <p className="font-semibold block md:hidden">Timings</p>
                <p className="">{appointment.appointment_date.slice(0, 10)}</p>
                <p className="">{appointment.appointment_date.slice(11, 25)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Appointments;
