import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Appointment = () => {
  const { user, isAuthenticated } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  if(!isAuthenticated) {
    navigate('/login')
  }
  const { teacherFirstName, teacherLastName, branch } = location.state || {};
  const [branchState, setBranchState] = useState(branch || "");
  const [teacherFirstNameState, setTeacherFirstName] = useState(teacherFirstName || "");
  const [teacherLastNameState, setTeacherLastName] = useState(teacherLastName || "");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  const formatDOB = (dob) => {
    const date = new Date(dob);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const branchArray = [
    "Physics",
    "Chemistry",
    "Biology",
    "Maths",
    "Computer Science",
    "General Awareness",
    "Business Studies",
  ];

  const timeSlots = ["9am-10am", "11am-12pm", "2pm-3pm", "4pm-5pm", "6pm-7pm"];

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const now = new Date();
      const days = [];
      const shifts = [
        { startHour: 9, endHour: 10 },
        { startHour: 11, endHour: 12 },
        { startHour: 14, endHour: 15 },
        { startHour: 16, endHour: 17 },
        { startHour: 18, endHour: 19 },
      ];

      let currentDate = new Date(now);
      for (let i = 0; i < 5; i++) {
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          let daySlots = [];
          const isToday = i === 0;
          const currentTime = now.getTime();

          for (const shift of shifts) {
            const shiftStart = new Date(currentDate);
            shiftStart.setHours(shift.startHour, 0, 0, 0);
            const shiftEnd = new Date(currentDate);
            shiftEnd.setHours(shift.endHour, 0, 0, 0);

            if (isToday && shiftEnd.getTime() <= currentTime) {
              continue;
            }

            if (
              isToday &&
              shiftStart.getTime() - currentTime <= 30 * 60 * 1000
            ) {
              continue;
            }

            daySlots.push({
              time: `${shiftStart.getHours() % 12 || 12}:${shiftStart
                .getMinutes()
                .toString()
                .padStart(2, "0")} - ${
                shiftEnd.getHours() % 12 || 12
              }:${shiftEnd.getMinutes().toString().padStart(2, "0")}`,
              datetime: shiftStart,
            });
          }

          if (daySlots.length > 0) {
            days.push({
              date: formatDate(currentDate.toISOString().split("T")[0]),
              slots: daySlots,
            });
          }
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      setAvailableDates(days);
    };

    fetchAvailableSlots();
  }, []);

  useEffect(() => {
    const selectedDay = availableDates.find((day) => day.date === selectedDate);
    if (selectedDay) {
      setAvailableTimes(selectedDay.slots);
    }
  }, [selectedDate, availableDates]);

  const handleAppointment = async (e) => {
    e.preventDefault();
    const formattedDate = formatDate(selectedDate);

    try {
      const response = await axios.post(
        "https://edumentor-backend-s85o.onrender.com/api/v1/appointment/post",
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
          gender: user.gender,
          date: formattedDate,
          time: selectedTime,
          branch: branchState,
          teacher_firstName: teacherFirstNameState,
          teacher_lastName: teacherLastNameState,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center my-10">
      <div className="rounded-2xl bg-blue-900 text-white w-[90vw]">
        <p className="text-[30px] lg:text-[50px] font-extrabold my-5 w-full text-center text-yellow-400">
          Book an Appointment
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* Left Side */}
          <div className="mx-5">
            <div className="my-10 flex flex-col justify-center items-center">
              <p className="text-[30px] md:text-[50px]  font-bold">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-sm text-gray-400">{user?.email}</p>
              <div className="grid grid-cols-2 w-[300px] mt-20">
                <p className="text-lg font-semibold w-[150px]">Gender:</p>
                <p>{user?.gender}</p>
                <p className="text-lg font-semibold w-[150px]">
                  Phone Number:
                </p>
                <p>{user?.phone}</p>
                <p className="text-lg font-semibold w-[150px]">
                  Date of Birth:
                </p>
                <p>{formatDOB(user.dob)}</p>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <form
            onSubmit={handleAppointment}
            className="border-t-2 lg:border-l-2 lg:border-t-0 border-yellow-400 mx-5 my-10 px-10 py-10 lg:py-0"
          >
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="py-2 w-full">
                  <p className="text-sm pb-2">Teacher First Name</p>
                  <input
                    className="w-full h-[35px] text-blue-900 rounded-md p-1"
                    type="text"
                    onChange={(e) => setTeacherFirstName(e.target.value)}
                    value={teacherFirstNameState}
                    placeholder="Teacher First Name"
                  />
                </div>
                <div className="py-2 w-full">
                  <p className="text-sm pb-2">Teacher Last Name</p>
                  <input
                    className="w-full h-[35px] text-blue-900 rounded-md p-1"
                    type="text"
                    onChange={(e) => setTeacherLastName(e.target.value)}
                    value={teacherLastNameState}
                    placeholder="Teacher Last Name"
                  />
                </div>
                <div className="py-2 w-full">
                  <p className="text-sm pb-2">Branch</p>
                  <select
                    className="w-full h-[35px] text-blue-900 rounded-md p-1"
                    onChange={(e) => setBranchState(e.target.value)}
                    value={branchState}
                  >
                    <option value="" disabled hidden>
                      Select Branch
                    </option>
                    {branchArray.map((branchName, index) => (
                      <option key={index} value={branchName}>
                        {branchName}
                      </option>
                    ))}
                  </select>
                  
                </div>
                <div></div>
                <div className="py-2 w-full">
                  <p className="text-sm pb-2">Select Date</p>
                  <select
                    className="w-full h-[35px] text-blue-900 rounded-md p-1"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    value={selectedDate}
                  >
                    <option value="" disabled hidden>
                      Select Date
                    </option>
                    {availableDates.map((day, index) => (
                      <option key={index} value={day.date}>
                        {day.date}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-2 w-full">
                  <p className="text-sm pb-2">Select Time Slot</p>
                  <select 
                    className={`w-full h-[35px] text-blue-900 rounded-md p-1 ${!selectedDate ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                    disabled={!selectedDate}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    value={selectedTime}
                  >
                    <option value="" disabled hidden>
                      Select Time Slot
                    </option>
                    {availableTimes.map((slot, index) => (
                      <option key={index} value={slot.time}>
                        {slot.time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-yellow-400 text-blue-900 text-center min-w-[150px] py-2 px-3 my-5 rounded-3xl relative transition-all delay-100 ease-in-out hover:scale-110 hover:bg-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
