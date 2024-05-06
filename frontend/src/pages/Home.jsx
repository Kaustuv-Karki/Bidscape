import React, { useState, useEffect } from "react";
import Bidding from "../assets/Bidding.svg";
import ProjectCard from "../components/ProjectCard.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/project/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProjects(data);
      console.log(data);
    };
    fetchProjects();
  }, []);
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mt-16">
        <div className="flex flex-col text-left max-w-[400px]">
          <h1 className="text-[2.5rem] font-bold">
            Biscape <br />{" "}
            <span className="text-[#D6482C]">
              Where Projects Find Their Perfect Match
            </span>
          </h1>
          <p className="text-slate-700 font-semibold py-4">
            Discover seamless project management and talent acquisition on
            BidScape. Join our vibrant community today!
          </p>
          <div className="flex gap-4">
            <button
              className="py-2 px-6 bg-[#D6482C] text-white font-semibold rounded-md"
              onClick={() => navigate("/register")}>
              Sign Up
            </button>
            <button
              className="py-2 px-6 bg-white text-[#D6482C] font-semibold rounded-md"
              onClick={() => navigate("/login")}>
              Log In
            </button>
          </div>
        </div>
        <img className="max-w-[600px]" src={Bidding} alt="Bidding" />
      </div>
      <div className="mt-12">
        <h1 className="text-[#D6482C] font-bold text-[2.5rem] text-center mb-12">
          Current Projects
        </h1>
        <div>
          {projects.map((project) => {
            return <ProjectCard key={project._id} projectDetails={project} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
