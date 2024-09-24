import React, { useContext } from "react";
import { Context } from "../main"; 
import { useNavigate } from "react-router-dom";

const TeachersList = () => {
  const { teachers } = useContext(Context); 
  const navigate = useNavigate()

  if (!teachers.length) {
    return <div>No teachers available</div>;
  }

  return (
    <div className="relative my-10">
      <h1 className='font-bold text-[50px] text-center text-blue-900 my-5'>All Teachers</h1>
      <div className="mb-20 mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-20 justify-items-center">
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            onClick={() => navigate(`/teacher_list/${teacher._id}`)}
            className="relative w-[90vw] sm:w-[250px] min-h-[460px] sm:min-h-[380px] cursor-pointer border-2 rounded-3xl transition-all duration-200 ease-in-out hover:border-blue-900 sm:hover:scale-110"
          >
            <div className="rounded-t-3xl overflow-hidden">
              <img
                src={teacher.teacherAvatar.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-0 transition-all duration-200 ease-in-out hover:bg-blue-900 hover:bg-opacity-20 rounded-3xl h-full w-full flex flex-col justify-end group">
              <div className="bg-blue-900 transition-all duration-300 ease-in-out rounded-b-3xl h-[35%]">
                <p className="my-2 flex px-5 text-green-400 text-[15px] sm:text-[10px] mx-1">
                  Available
                </p>
                <p className="font-semibold text-[30px] sm:text-lg transition-all duration-200 ease-in-out text-yellow-400 px-5">
                  {teacher.firstName} {teacher.lastName}
                </p>
                <p className="font-light text-[20px] sm:text-sm px-5 transition-all duration-200 ease-in-out text-white">
                  {teacher.teacherBranch}
                </p>
                <p className="font-light text-[20px] sm:text-sm px-5 py-2 transition-all duration-200 ease-in-out text-white">
                  {teacher.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersList;
