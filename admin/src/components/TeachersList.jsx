import React, { useContext } from "react";
import { Context } from "../main";

const TeachersList = () => {
  const { teachers } = useContext(Context);

  if (!teachers.length) {
    return <div>No teachers available</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-white py-5">
        Teachers
      </h1>
      {teachers.map((teacher) => (
        <div
          key={teacher._id}
          className="mb-10 overflow-y-auto overflow-x-hidden text-white"
        >
          <ul className="flex gap-2 mx-5 py-2 border border-white rounded-xl px-2">
            <li className="w-[50px] md:w-[80px] h-[50px] md:h-[80px] rounded-full overflow-hidden">
              <img
                src={teacher.teacherAvatar.url}
                alt=""
                className="object-cover  w-full h-full"
              />
            </li>
            <li className="flex flex-col w-full">
              <p className="text-xl">
                {teacher?.firstName} {teacher?.lastName}
              </p>
              <p className="text-[10px]">{teacher?.email}</p>
              <p className="text-[10px]">{teacher?.teacherBranch}</p>
              <div className="flex flex-row md:flex-col justify-between">
                <p className="text-[10px]">{teacher?.phone}</p>
                <p className="text-[10px]">{teacher?.gender}</p>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default TeachersList;
