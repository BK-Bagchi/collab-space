import Overview from "./ProfileTabs/Overview";
import Projects from "./ProfileTabs/Projects";
import Security from "./ProfileTabs/Security";
import Settings from "./ProfileTabs/Settings";

const selectTab = ({
  activeTab,
  user,
  projects,
  totalCreatedProjects,
  totalJoinedProjects,
  logout,
}) => {
  switch (activeTab) {
    case "overview":
      return (
        <Overview
          user={user}
          totalCreatedProjects={totalCreatedProjects}
          totalJoinedProjects={totalJoinedProjects}
        />
      );

    case "projects":
      return <Projects projects={projects} />;

    case "settings":
      return <Settings />;

    case "security":
      return <Security logout={logout} />;

    default:
      return null;
  }
};

export default selectTab;
