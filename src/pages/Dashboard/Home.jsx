import React from "react";
import { useOutletContext } from "react-router-dom";

const DashboardHome = () => {
  const projectId = useOutletContext();
  console.log("Dashboard Home", projectId);
  return <h2 className="text-2xl font-bold">Welcome to your Dashboard!</h2>;
};

export default DashboardHome;
