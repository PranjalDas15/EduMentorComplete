import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";
import MessageArea from "../components/MessageComponents/MessageArea";
import { Context } from "../main";

const Teachers = () => {
  const { teacherId } = useParams();
  const { isAuthenticated } = useContext(Context);

  const [teacher, setTeacher] = useState(null);
  const [openChat, setOpenChat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/teachers/${teacherId}`
        );
        setTeacher(response.data.teacher);
        console.log(teacherId);
      } catch (error) {
        console.error("Failed to fetch teacher details", error);
      }
    };

    fetchTeacherDetails();
  }, [teacherId]);

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

  const handleChat = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else setOpenChat(true);
  };

  return (
    <div className="flex justify-center relative">
      {/* Chat Box */}
      <div
              className={`${
                !openChat
                  ? "hidden"
                  : "fixed bottom-[100px] right-6 bg-slate-200 w-[90%] md:w-[400px]  h-[60%] rounded-xl md:bottom-0 md:right-0 md:mx-10 md:my-20 z-20"
              }`}
            >
              <div className="flex w-full justify-end mt-4">
                <img
                  src={assets.close}
                  alt=""
                  className="w-10 hover:scale-125 mx-5 cursor-pointer transition-all duration-200 ease-in-out"
                  onClick={() => setOpenChat(false)}
                />
              </div>
              <MessageArea teacherId={teacherId} teacher={teacher} />
            </div>
      {!teacher ? (
        <p>Loading teacher details...</p>
      ) : (
        <div className="w-[90vw] lg:w-[70vw] bg-blue-900 rounded-3xl grid grid-cols-1 lg:grid-cols-2 justify-items-center my-[5vh] mx-[2vw] gap-10 lg:gap-5">
          
          <div className="relative overflow-hidden">
            <img
              src={teacher.teacherAvatar.url}
              alt=""
              className="w-full h-full object-cover rounded-tl-3xl rounded-tr-3xl lg:rounded-tl-3xl lg:rounded-bl-3xl lg:rounded-tr-none"
            />
            <p className="absolute top-0 left-0 my-5 sm:font-semibold text-[12px] sm:text-md text-blue-900 bg-yellow-400 p-2 rounded-r-2xl">
              Fees: ₹ 3000
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-col py-0 lg:py-5 px-5 w-full">
            {/* Chat Button */}
            <img
              onClick={handleChat}
              src={assets.chat_w}
              alt=""
              className="w-[40px] transition-all duration-200 ease-in-out hover:scale-125 cursor-pointer"
            />
            

            <div className="my-5 lg:my-10">
              <p className="font-bold text-[40px] md:text-[50px] mt-5 xl:mt-10 text-yellow-400">
                {teacher.firstName} {teacher.lastName}
              </p>
              <div className="mt-5 lg:mt-20">
                <h1 className="text-white font-semibold text-xl my-3">
                  Personal Details
                </h1>
                <p className="text-white mt-1 text-lg xl:text-xl">
                  {teacher.teacherBranch}
                </p>
                <p className="text-white mt-1 text-sm xl:text-xl">
                  {calculateAge(teacher.dob)} years
                </p>
                <p className="text-white mt-1 text-sm xl:text-xl">
                  {teacher.gender}
                </p>
              </div>

              <div className="my-3 mb-20">
                <h1 className="text-white font-semibold text-xl">
                  Contact Details
                </h1>
                <p className="text-white mt-1 text-sm xl:text-xl">
                  {teacher.email}
                </p>
                <p className="text-white mt-1 text-sm xl:text-xl">
                  {teacher.phone}
                </p>
              </div>
              <button
                onClick={() =>
                  navigate("/appointment", {
                    state: {
                      teacherFirstName: teacher.firstName,
                      teacherLastName: teacher.lastName,
                      teacherBranch: teacher.teacherBranch,
                    },
                  })
                }
                className="bg-yellow-400 text-blue-900 text-center min-w-[150px] py-2 px-3 my-2 rounded-3xl relative transition-all delay-100 ease-in-out hover:scale-110 hover:bg-white"
              >
                Book an appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;
