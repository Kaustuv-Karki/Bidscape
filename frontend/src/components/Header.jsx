import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };
  return (
    <div className="w-full bg-white  items-center">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4">
        <h1
          className="font-bold text-[2rem] text-[#D6482C] cursor-pointer"
          onClick={() => navigate("/")}>
          Bidscape
        </h1>
        {user ? (
          <div className="flex gap-6">
            <div>
              <p className="text-[1.1rem] font-semibold">{user.username}</p>
              <p className="font-semibold text-gray-600">{user.email}</p>
            </div>
            <button
              className="bg-red-600 text-white px-4 rounded-md"
              onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              className="py-2 px-6 bg-[#D6482C] text-white font-semibold rounded-md"
              onClick={() => navigate("/login")}>
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
