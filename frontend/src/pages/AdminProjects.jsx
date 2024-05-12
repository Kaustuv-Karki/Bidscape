import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/user/userSlice.js";

const AdminProjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/project/projectByUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 401) {
          // console.log("True");
          const data = await response.json();
          if (data.message === "JWT expired") {
            dispatch(logout());
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }
        }
        const data = await response.json();
        setProjects(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);
  return (
    <div className="max-w-[1200px] mx-auto py-4 px-6 flex flex-col">
      <h1 className="text-center font-semibold text-[3rem] text-blue-500">
        Projects
      </h1>
      <div>
        {projects?.map((project) => {
          return (
            <ProjectCard
              key={project._id}
              projectDetails={project}
              goTo="/admin/projectBids/"
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminProjects;
