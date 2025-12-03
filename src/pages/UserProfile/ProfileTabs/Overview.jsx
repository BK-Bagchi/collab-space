import { UserPlus, Users, FolderKanban } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectAPI } from "../../../api";
import Loading from "../../../components/Loading/Loading";

const Overview = () => {
  const [projects, setProjects] = useState([]);
  const [totalCreatedProjects, setTotalCreatedProjects] = useState(0);
  const [totalJoinedProjects, setTotalJoinedProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRes = await ProjectAPI.getUserProjects();
        setProjects(projectsRes.data.projects);
        setTotalCreatedProjects(projectsRes.data.totalCreated);
        setTotalJoinedProjects(projectsRes.data.totalMember);
      } catch (error) {
        console.warn("Overview Project error:", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="mt-6 space-y-8 animate-fadeIn">
      <Loading loading={loading}>
        {/* STATS GRID */}
        <div className="grid grid-cols-2 gap-4">
          {/* Created Projects */}
          <div className="rounded-xl bg-softWhite border border-gray-200 p-4 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-electricBlue/10 rounded-full">
              <UserPlus className="text-electricBlue w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Projects Created</p>
              <p className="text-2xl font-semibold text-electricBlue">
                {totalCreatedProjects}
              </p>
            </div>
          </div>

          {/* Joined Projects */}
          <div className="rounded-xl bg-softWhite border border-gray-200 p-4 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-vibrantPurple/10 rounded-full">
              <Users className="text-vibrantPurple w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Projects Joined</p>
              <p className="text-2xl font-semibold text-vibrantPurple">
                {totalJoinedProjects}
              </p>
            </div>
          </div>
        </div>

        {/* PROJECTS LIST */}
        <div>
          <h3 className="text-lg font-semibold text-charcoalGray mb-2 flex items-center gap-2">
            <FolderKanban size={25} className="text-electricBlue" />
            All Projects
          </h3>

          <div className="mt-6 grid gap-4 animate-fadeIn">
            {projects.map((p) => (
              <div
                key={p._id}
                className="bg-softWhite border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-medium text-charcoalGray">{p.title}</h3>
                  <p className="text-xs text-gray-500">{p.description}</p>
                </div>
                <Link
                  to={`/dashboard/projects`}
                  className="bg-electricBlue hover:bg-[#1E63D0] text-white px-4 py-1.5 rounded-lg text-sm transition"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default Overview;
