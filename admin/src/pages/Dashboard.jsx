import React from "react";
import { useContext } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import TeachersList from "../components/TeachersList";
import AdminDetails from "../components/AdminDetails";
import UserList from "../components/UserList";
import Stats from "../components/Stats";

const Dashboard = () => {
  const { isAuthenticated, admin } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="h-screen w-full overflow-y-scroll">
      <h1 className="font-bold text-[50px] text-center text-blue-900 my-5">
        Dashboard
      </h1>
      <div className="flex flex-col h-full gap-3 mx-5 my-5">
        <div className="w-full flex flex-col md:flex-row gap-3">
        <div className="col-span-4  bg-blue-900 shadow-lg rounded-xl h-[200px] w-full">
          <AdminDetails />
        </div>
        <div className="col-span-4  bg-blue-900 shadow-lg rounded-xl h-[200px] w-full">
          <Stats/>
        </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-3">
          <div className=" bg-blue-900 shadow-lg rounded-xl w-full h-[350px] overflow-y-scroll">
            <UserList />
          </div>
          <div className=" bg-blue-900 shadow-lg rounded-xl w-full h-[350px] overflow-y-scroll">
            <TeachersList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
