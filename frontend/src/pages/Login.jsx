import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const response = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const { userDetails, token } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(loginSuccess(userDetails));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formData);

  return (
    <div className="flex mx-auto w-[400px] h-[400px] bg-white flex-col items-center justify-center my-[10%] rounded-sm">
      <h1 className="py-2 text-[2rem] font-semibold text-slate-700">LOGIN</h1>
      <form
        className="mt-8 px-4 py-4 flex flex-col gap-6"
        onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-slate-600">
            Email
          </label>
          <input
            className="w-[300px] py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
            type="email"
            name="email"
            value={formData.email}
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
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
