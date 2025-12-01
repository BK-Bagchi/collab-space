import { useState } from "react";
//prettier-ignore
import { FolderKanban, Hash, Layers, Palette, Save, StickyNote, Tag } from "lucide-react";

const CreateNote = ({ tasks = [], projects = [], onSave }) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: [],
    color: "#2979ff",
    pinned: false,
    archived: false,
    visibility: "PRIVATE",
    relatedTask: "",
    relatedProject: "",
  });

  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim()) {
      setNote({ ...note, tags: [...note.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  return (
    <div className="p-6 min-w-[430px] mx-auto animate-fadeIn">
      {/* Form */}
      <div className="space-y-5 bg-white shadow-md rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <StickyNote size={32} className="text-vibrantPurple" />
          <h2 className="text-2xl font-bold text-charcoalGray">Create Note</h2>
        </div>
        {/* Title */}
        <div>
          <label className="font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            placeholder="Enter title..."
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>

        {/* Content */}
        <div>
          <label className="font-medium text-gray-700">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            rows="6"
            placeholder="Write your note..."
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <Tag size={18} /> Tags
          </label>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              onClick={addTag}
              className="px-4 py-2 bg-electricBlue text-softWhite rounded-lg"
            >
              Add
            </button>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {note.tags.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[#2979FF]/10 text-electricBlue text-sm"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          {/* Color */}
          <div>
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <Palette size={18} /> Note Color
            </label>

            <input
              type="color"
              className="w-12 h-10 mt-2 cursor-pointer"
              value={note.color}
              onChange={(e) => setNote({ ...note, color: e.target.value })}
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <Hash size={18} /> Visibility
            </label>

            <select
              className="mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
              value={note.visibility}
              onChange={(e) => setNote({ ...note, visibility: e.target.value })}
            >
              <option value="PRIVATE">Private</option>
              {/* <option value="PROJECT">Project</option> */}
            </select>
          </div>
        </div>

        {/* Related task/project */}
        <div>
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <FolderKanban size={18} /> Related Task
          </label>
          <select
            className="mt-2 px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            value={note.relatedTask}
            onChange={(e) => setNote({ ...note, relatedTask: e.target.value })}
          >
            <option value="">None</option>
            {tasks.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <Layers size={18} /> Related Project
          </label>
          <select
            className="mt-2 px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            value={note.relatedProject}
            onChange={(e) =>
              setNote({ ...note, relatedProject: e.target.value })
            }
          >
            <option value="">None</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Save */}
        <button
          onClick={() => onSave(note)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-electricBlue text-softWhite rounded-lg hover:bg-electricBlue/90 mt-4"
        >
          <Save size={18} />
          Save Note
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
