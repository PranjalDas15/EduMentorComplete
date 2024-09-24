import React from "react";
import { useContext } from "react";
import { Context } from "../main";

const Stats = () => {
    const { users, teachers } = useContext(Context)
  return (
    <div className="text-white flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center text-white py-5">Stats</h1>
      <div className="flex justify-evenly w-full">
        <div>
          <h1>Total Users</h1>
          <p className="text-center font-bold text-xl">{users.length}</p>
        </div>
        <div>
          <h1>Total Teachers</h1>
          <p className="text-center font-bold text-xl">{teachers.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
