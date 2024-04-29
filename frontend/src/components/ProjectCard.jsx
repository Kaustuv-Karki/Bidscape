import React from "react";
import { useNavigate } from "react-router-dom";

/* 
budget
: 
50000
createdAt
: 
"2024-04-26T18:06:24.233Z"
description
: 
"This is the description"
duration
: 
1
email
: 
"this@gmail.com"
images
: 
(2) ['image1', 'image2']
skills
: 
(2) ['Frontend', 'Backend']
tags
: 
(2) ['Good', 'Bad']
title
: 
"This is the title of the project haha"
updatedAt
: 
"2024-04-26T18:06:24.233Z"
userId
: 
"662bed0112a6fefc4ef13d83"
__v
: 
0
_id
: 
"662bed2012a6fefc4ef13d86"
*/

const ProjectCard = ({ projectDetails, goTo = "/project/" }) => {
  const navigate = useNavigate();
  const {
    title,
    description,
    budget,
    duration,
    skills,
    tags,
    images,
    email,
    _id,
  } = projectDetails;
  return (
    <div
      onClick={() => navigate(`${goTo}${_id}`)}
      className="h-[450px] bg-white w-[320px] rounded-md cursor-pointer hover:shadow-lg transition-shadow py-4 px-4">
      <p className="font-bold py-4 text-[1.2rem] text-center px-2 text-[#D6482C]">
        {title}
      </p>
      <div className="flex px-4 py-2 gap-4 flex-wrap">
        {tags.map((tag, index) => {
          return (
            <p
              key={index}
              className="px-4 py-1 border rounded-md border-[#D6482C] text-[#D6482C] font-semibold">
              {tag}
            </p>
          );
        })}
      </div>
      <p className="text-left px-4 mt-4 text-slate-600 line-clamp-2 font-semibold">
        {description}
      </p>
      <div>
        <p className="text-left px-4 mt-4 text-slate-600 font-semibold">
          Skills Required:
        </p>
        <div className="flex px-4 py-2 gap-4 flex-wrap">
          {skills.map((skill, index) => {
            return (
              <p
                key={index}
                className="px-4 py-1 border rounded-md border-[#D6482C] text-[#D6482C] font-semibold">
                {skill}
              </p>
            );
          })}
        </div>
      </div>
      <p className="text-left px-4 mt-4 text-slate-600 font-semibold">
        Duration: {duration} days
      </p>
      <p className="text-left px-4 mt-4 text-slate-600 font-semibold">
        Budget: ${budget}
      </p>
      <p className="text-left px-4 mt-4 text-slate-600 font-semibold">
        Contact: {email}
      </p>
    </div>
  );
};

export default ProjectCard;
