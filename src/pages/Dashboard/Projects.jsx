import React from "react";
import { useOutletContext } from "react-router-dom";

const Projects = () => {
  const projectId = useOutletContext();

  console.log("Projects", projectId);
  return <h2 className="text-2xl font-bold">Your Projects</h2>;
};

export default Projects;
