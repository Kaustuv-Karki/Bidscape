import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project/projectByUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setProjects(data);
        console.log(data);
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
