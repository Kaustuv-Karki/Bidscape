import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const params = useParams();
  const { id } = params;
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`/api/project/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProject(data);
    };
    fetchProject();
  }, []);
  console.log(id);
  console.log("This is project data", project);
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
      <div className="py-4">
        <h1 className="text-[2rem] font-semibold text-[#D6482C]">
          {project.title}
        </h1>
        <p className="text-[1.1rem] text-gray-500">{project.description}</p>
      </div>
      <div className="flex gap-4 items-center">
        <p className="font-semibold">Tags:</p>
        <div className="flex gap-4">
          {project.tags.map((tag) => {
            return (
              <p className="font-semibold text-gray-500 border border-gray-500 px-4 py-1 rounded-md">
                {tag}
              </p>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-semibold text-[1.1rem] text-gray-500">
          Skills Required:
        </h1>
        <div>
          {project.skills.map((skill, index) => {
            return (
              <div className="flex items-center pl-2">
                <p className="font-semibold text-gray-500  py-1">{index + 1}</p>
                <p className="font-semibold text-gray-500 px-4 py-1">{skill}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
