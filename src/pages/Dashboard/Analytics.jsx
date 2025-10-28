import React, { useEffect, useState } from "react";
import { CalendarDays, Users, User, Clock, Palette } from "lucide-react";
// import ChartSection from "./ChartSection";
import ProjectDetailsCard from "../../components/ProjectDetailsCard/ProjectDetailsCard";
import { ProjectAPI } from "../../api";

const Analytics = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ProjectAPI.getUserProjects();
        setProjects(res.data.projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold text-charcoalGray mb-6">
        📊 Project Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectDetailsCard projects={projects} />
      </div>
    </div>
  );
};

export default Analytics;
