//prettier-ignore
import { Activity, ListTodo, MessageSquare, BellRing, LayoutDashboard, NotebookPen } from "lucide-react";

const previews = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Overview",
    text: "Real-time charts, task progress, active users, and project stats.",
    color: "bg-electricBlue/20 text-electricBlue",
  },
  {
    icon: ListTodo,
    title: "Task Workflow",
    text: "Track, update, filter tasks with Kanban-style productivity flow.",
    color: "bg-[#20c997]/20 text-[#20c997]",
  },
  {
    icon: NotebookPen,
    title: "Notes & Todos",
    text: "Create personal notes or todo-lists, pin important items, and link them to tasks or projects.",
    color: "bg-[#8E24AA]/20 text-[#8E24AA]",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    text: "Instant messaging, group chat, file sharing, and online status.",
    color: "bg-[#8e24aa]/20 text-[#8e24aa]",
  },
  {
    icon: BellRing,
    title: "Notifications",
    text: "Receive live updates for tasks, projects, role changes, and messages.",
    color: "bg-[#FB8C00]/20 text-[#FB8C00]",
  },
  {
    icon: Activity,
    title: "Activity Logs",
    text: "Track every action in a clean, detailed timeline view.",
    color: "bg-[#3F51B5]/20 text-[#3F51B5]",
  },
];

const LivePreview = () => {
  return (
    <section className="py-20 px-8 md:px-16 bg-softWhite">
      <h2 className="text-3xl font-bold text-center text-charcoalGray mb-14 heading-font">
        What You Can Do Inside Collab Space ⚡
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {previews.map((preview, i) => {
          const Icon = preview.icon;

          return (
            <div
              key={i}
              className="relative flex flex-col items-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div
                className={`w-14 h-14 mx-auto flex items-center justify-center rounded-full mb-6 ${preview.color}`}
              >
                {Icon && <Icon size={28} />}
              </div>
              <h3 className="text-lg text-center font-semibold mb-2 text-charcoalGray heading-font">
                {preview.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center body-font">
                {preview.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LivePreview;
