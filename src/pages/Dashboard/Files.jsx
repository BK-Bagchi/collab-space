import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Download, Folder } from "lucide-react";
import { ProjectAPI } from "../../api";
import Loading from "../../components/Loading/Loading";

const Files = () => {
  const [projects, setProjects] = useState([]);
  const [openProject, setOpenProject] = useState(null);
  const [projectFiles, setProjectFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileLoading, setFileLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ProjectAPI.getUserProjects();
        setProjects(res.data.projects);
      } catch (error) {
        console.warn("Error fetching projects:", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  //   console.log(projects);

  const toggleProject = async (id) => {
    const isClosing = openProject === id;
    setOpenProject(isClosing ? null : id);

    if (!isClosing) {
      try {
        const res = await ProjectAPI.getProjectFiles(id);
        setProjectFiles(res.data.files);
      } catch (error) {
        setProjectFiles([]);
        console.warn(
          "Error fetching project files:",
          error.response.data.message
        );
      } finally {
        setFileLoading(false);
      }
    }
  };
  //   console.log(projectFiles);

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-charcoalGray mb-4 flex items-center gap-2">
        <Folder />
        Project Files
      </h2>

      <Loading loading={loading}>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border border-gray-200 rounded-xl bg-white shadow-sm"
            >
              {/* -------- PROJECT HEADER -------- */}
              <div
                onClick={() => toggleProject(project._id)}
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow"
                    style={{ backgroundColor: project.color }}
                  >
                    <Folder size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-charcoalGray">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {project.description}
                    </p>
                  </div>
                </div>

                {openProject === project._id ? (
                  <ChevronDown className="text-gray-500" />
                ) : (
                  <ChevronRight className="text-gray-500" />
                )}
              </div>

              {/* -------- EXPANDED PROJECT FILES -------- */}
              {openProject === project._id && (
                <div className="px-4 pb-3 pt-1 space-y-3 animate-slideDown">
                  <Loading loading={fileLoading}>
                    {projectFiles.length > 0 ? (
                      projectFiles.map((file) => (
                        <div
                          key={file._id}
                          className="flex items-center justify-between gap-3 bg-gray-50 px-3 py-2 rounded-lg"
                        >
                          {/* Uploader Avatar */}
                          <img
                            src={file.uploadedBy?.avatar}
                            alt="Uploader"
                            className="w-5 h-5 rounded-full object-cover"
                            title={file.uploadedBy?.name}
                          />

                          {/* File Info */}
                          <div className="flex-1 truncate">
                            <p className="font-medium truncate">{file.name}</p>
                          </div>

                          {/* Download Button */}
                          <a
                            href={file.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md bg-electricBlue text-white hover:bg-[#1E63D1] transition"
                          >
                            <Download size={16} />
                          </a>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic pl-1">
                        No files uploaded yet.
                      </p>
                    )}
                  </Loading>
                </div>
              )}
            </div>
          ))}
        </div>
      </Loading>
    </div>
  );
};

export default Files;
