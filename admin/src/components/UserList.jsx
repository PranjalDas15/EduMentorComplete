import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../main";

const UserList = () => {
  const { users, setUsers, isAuthenticated, setIsAuthenticated } =
    useContext(Context);
  const formatDOB = (dob) => {
    const date = new Date(dob);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/users",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUsers(response.data.users);
      } catch (error) {
        setIsAuthenticated(false);
        setUsers([]);
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setUsers]);

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-white py-5">
        Users
      </h1>
      {
        users.map((user) => (
          <div key={user._id} className="mb-10 overflow-y-auto overflow-x-hidden text-white">
            <ul className="flex flex-col gap-2 mx-5 py-2 border border-white rounded-xl px-2">
              <li className="text-xl">
                {user?.firstName} {user?.lastName}
              </li>
              <li className="flex justify-between">
                <p className="text-[10px]">{user?.email}</p>
                <p className="text-[10px]">{user?.phone}</p>
                <p className="text-[10px]">{user?.gender}</p>
              </li>
            </ul>
          </div>
        ))}
    </>
  );
};

export default UserList;
