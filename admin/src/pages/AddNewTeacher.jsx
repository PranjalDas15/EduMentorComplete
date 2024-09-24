import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";

const AddNewTeacher = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  if(!isAuthenticated) {
    navigate('/login')
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [teacherBranch, setTeacherBranch] = useState("");
  const [teacherAvatar, setTeacherAvatar] = useState("");
  const [teacherAvatarPreview, setTeacherAvatarPreview] = useState("");

  

  const branchArray = [
    "Physics",
    "Chemistry",
    "Biology",
    "Maths",
    "Computer Science",
    "General Awareness",
    "Business Studies",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setTeacherAvatarPreview(reader.result);
      setTeacherAvatar(file);
    };
  };

  const handleAddNewTeacher = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("teacherBranch", teacherBranch);
      formData.append("teacherAvatar", teacherAvatar);
      await axios
        .post("https://edumentor-backend-s85o.onrender.com/api/v1/users/teacher/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigate("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-full">
      <h1 className="font-bold text-[50px] text-center text-blue-900 my-5">
        Add Admin
      </h1>
      <div className="flex flex-col items-center justify-center w-full px-10 my-10">
        <div className="bg-blue-900 rounded-xl mx-10 px-10 py-5 text-white  w-full">
          <form onSubmit={handleAddNewTeacher}>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 flex gap-3 ">
               { teacherAvatarPreview? <div className="w-[80px] rounded-full overflow-hidden">
                   <img
                    src={teacherAvatarPreview} 
                    alt="Doctor Avatar"
                    className="object-cover"
                  /> 
                  
                </div>: <></>}
                <input type="file" onChange={handleAvatar} />
              </div>
              <div className="py-2 w-full">
                <p className="text-sm pb-2">First Name</p>
                <input
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  placeholder="First Name"
                />
              </div>
              <div className="py-2 w-full">
                <p className="text-sm pb-2">Last Name</p>
                <input
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder="Last Name"
                />
              </div>

              <div className="py-2 w-full">
                <p className="text-sm pb-2">Email</p>
                <input
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email"
                />
              </div>
              <div className="py-2 w-full">
                <p className="text-sm pb-2">Password</p>
                <input
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                />
              </div>
              <div className="py-2 w-full col-span-2">
                <p className="text-sm pb-2">Phone Number</p>
                <input
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  placeholder="Phone Number"
                />
              </div>
              <div className="py-2 w-full">
                  <p className="text-sm pb-2">Branch</p>
                  <select
                    className="w-full h-[35px] text-blue-900 rounded-md p-1"
                    onChange={(e) => setTeacherBranch(e.target.value)}
                    value={teacherBranch}
                  >
                    <option value="" disabled hidden>
                      Select Branch
                    </option>
                    {branchArray.map((teacherBranch, index) => (
                      <option key={index} value={teacherBranch}>
                        {teacherBranch}
                      </option>
                    ))}
                  </select>
                  
                </div>
              
              

              <div className="py-2 w-full">
                <p className="text-sm pb-2">Gender</p>
                <select
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <option value="" disabled hidden>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="py-2 w-full">
                <p className="text-sm pb-2">Date of Birth</p>
                <input
                  className="w-full h-[35px] text-blue-900 rounded-md p-1"
                  type="date"
                  onChange={(e) => setDob(e.target.value)}
                  value={dob}
                  placeholder="Date of Birth"
                />
              </div>
            </div>
            <button className="bg-yellow-500 text-blue-900 text-center w-[150px] py-2 my-2 rounded-3xl relative transition-all delay-100 ease-in-out hover:scale-110 hover:bg-white">
              Add Teacher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewTeacher;
