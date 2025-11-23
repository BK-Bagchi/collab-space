//prettier-ignore
import { Users, MessageSquare, FolderKanban, Bell, BarChart3, NotebookPen } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Shared workspace, project teams, member roles, and activity tracking.",
    bg: "bg-[#E3F2FD]",
    color: "text-electricBlue",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Chat",
    desc: "1:1 and group chat, typing indicators, file sharing, active status.",
    bg: "bg-[#F3E5F5]",
    color: "text-vibrantPurple",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    desc: "Tasks, deadlines, priorities, subtasks, Kanban boards.",
    bg: "bg-[#E0F2F1]",
    color: "text-tealGreen",
  },
  {
    icon: Bell,
    title: "Live Notifications",
    desc: "Instant updates for tasks, projects, role changes, and messages.",
    bg: "bg-[#FFF3E0]",
    color: "text-[#FB8C00]",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Team activity insights, progress charts, and productivity metrics.",
    bg: "bg-[#E8EAF6]",
    color: "text-[#3F51B5]",
  },
  {
    icon: NotebookPen,
    title: "Notes System",
    desc: "Personal notes, pinned items, todos, tags and project linking.",
    bg: "bg-[#E8F5E9]",
    color: "text-[#43A047]",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-8 md:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-charcoalGray mb-10 heading-font">
        Powerful Tools for Modern Teams 🔥
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              className={`p-6 flex flex-col items-center rounded-xl border shadow-sm transition hover:shadow-md ${feature.bg} ${feature.color}`}
            >
              {Icon && <Icon className="w-8 h-8 mb-4" />}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2 text-sm text-center">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
