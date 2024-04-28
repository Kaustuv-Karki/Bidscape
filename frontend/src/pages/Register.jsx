import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin, ...formData }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setFormData({ username: "", email: "", password: "" });
  };

  console.log(formData, isAdmin);
  return (
    <div className="flex mx-auto w-[400px] h-[550px] bg-white flex-col items-center justify-center my-[10%] rounded-sm">
      <h1 className="py-2 text-[2rem] font-semibold text-slate-700">
        REGISTER
      </h1>
      <form
        className="mt-8 px-4 py-4 flex flex-col gap-6"
        onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div
            className={`py-2 px-4 font-semibold cursor-pointer ${
              !isAdmin ? "bg-[#D6482C] text-white" : "bg-[#EFEEEC] text-black"
            } rounded-md `}
            onClick={() => setIsAdmin(false)}>
            User Register
          </div>
          <div
            className={`py-2 px-4 font-semibold cursor-pointer ${
              isAdmin ? "bg-[#D6482C] text-white" : "bg-[#EFEEEC] text-black"
            } rounded-md `}
            onClick={() => setIsAdmin(true)}>
            Admin Register
          </div>
        </div>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-slate-600">
            Username
          </label>
          <input
            className="w-[300px] py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
            type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter Username"
          />
        </div>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-slate-600">
            Email
          </label>
          <input
            className="w-[300px] py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-slate-600 ">
            Password
          </label>
          <input
            className="w-[300px] py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
        </div>
        <button
          type="submit"
          className="w-[300px] py-2 px-4 bg-[#D6482C] text-white font-semibold rounded-md">
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Register;
