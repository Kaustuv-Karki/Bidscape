import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const params = useParams();
  const { id } = params;
  const [project, setProject] = useState(null);
  const [bidData, setBidData] = useState({
    coverLetter: "",
    name: "",
    email: "",
    amount: 0,
  });

  const handleChange = (e) => {
    setBidData({ ...bidData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const response = await fetch(`/api/bid/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bidData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
      <div className="py-4">
        <h1 className="text-[2rem] font-semibold text-[#D6482C]">
          {project?.title}
        </h1>
        <p className="text-[1.1rem] text-gray-500">{project?.description}</p>
      </div>
      <div className="flex gap-4 items-center">
        <p className="font-semibold">Tags:</p>
        <div className="flex gap-4">
          {project?.tags.map((tag) => {
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
          {project?.skills.map((skill, index) => {
            return (
              <div className="flex items-center pl-2">
                <p className="font-semibold text-gray-500  py-1">{index + 1}</p>
                <p className="font-semibold text-gray-500 px-4 py-1">{skill}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="font-semibold text-gray-500">
          Duration: {project?.duration} days
        </p>
        <p className="font-semibold text-gray-500">
          Budget: ${project?.budget}
        </p>
        <p className="font-semibold text-gray-500">Contact: {project?.email}</p>
      </div>

      <div>
        <h1 className="text-[2rem] font-semibold text-[#D6482C]">
          Apply for Bid
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-6">
            <input
              className="py-2 px-4 rounded-md bg-white outline-none "
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              value={bidData.name}
            />
            <input
              className="py-2 px-4 rounded-md bg-white outline-none"
              type="email"
              placeholder="Enter your email"
              value={bidData.email}
              name="email"
              onChange={handleChange}
            />
            <input
              className="py-2 px-4 rounded-md bg-white outline-none"
              type="number"
              placeholder="Enter your bid amount"
              value={bidData.amount}
              name="amount"
              onChange={handleChange}
            />
            <textarea
              className="py-2 px-4 rounded-md bg-white outline-none"
              placeholder="Enter your cover letter"
              rows={5}
              value={bidData.coverLetter}
              name="coverLetter"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="py-2 px-4 bg-[#D6482C] text-white font-semibold rounded-md mt-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectPage;
