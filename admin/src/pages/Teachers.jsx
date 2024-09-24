import React, { useContext } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import TeachersList from "../components/TeachersList";

const Teachers = () => {
  const { teachers, isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  if (!teachers.length) {
    return <div>No teachers available</div>;
  }

  if (!isAuthenticated) {
    navigate("/login");
  }
  return (
    <div className="w-full h-screen overflow-y-auto">
      <h1 className="font-bold text-[50px] text-center text-blue-900 my-5">
        Teachers
      </h1>
      {teachers.map((teacher) => (
        <div
          key={teacher._id}
          className="mb-10 overflow-y-auto overflow-x-hidden text-white"
        >
          <ul className="h-[100px] py-10 flex gap-5 mx-5 border border-white bg-blue-900 rounded-xl px-2 items-center">
            <li className="w-[60px] md:w-[80px] h-[50px] md:h-[80px] rounded-full overflow-hidden">
              <img
                src={teacher.teacherAvatar.url}
                alt=""
                className="object-cover  w-full h-full"
              />
            </li>
            <li className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
              <p className="text-xl md:text-[30px] font-semibold md:w-[40%]">
                {teacher?.firstName} {teacher?.lastName}
              </p>
              
              <div className="flex flex-col md:flex-row w-full md:gap-4 md:justify-evenly">
                <p className="text-[10px] md:text-[25px]">{teacher?.email}</p>
                <p className="text-[10px] md:text-[25px]">
                  {teacher?.teacherBranch}
                </p>
                <p className="text-[10px] md:text-[25px]">{teacher?.phone}</p>
                <p className="text-[10px] md:text-[25px]">{teacher?.gender}</p>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Teachers;
