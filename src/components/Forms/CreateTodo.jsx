import { useState } from "react";
//prettier-ignore
import { CheckSquare, FolderKanban, Hash, Layers, Palette, Save, Square, Tag } from "lucide-react";

const CreateTodo = ({ tasks = [], projects = [], onSave }) => {
  const [note, setNote] = useState({
    title: "",
    todos: [],
    tags: [],
    color: "#2979ff",
    pinned: false,
    archived: false,
    visibility: "PRIVATE",
    relatedTask: "",
    relatedProject: "",
  });

  const [todoInput, setTodoInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const addTodo = () => {
    if (todoInput.trim()) {
      setNote({
        ...note,
        todos: [...note.todos, { text: todoInput.trim(), done: false }],
      });
      setTodoInput("");
    }
  };

  return (
    <div className="p-6 min-w-[430px] mx-auto animate-fadeIn">
      <div className="space-y-6 bg-white p-6 rounded-2xl shadow">
        {/* Title */}
        <div>
          <label className="font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            placeholder="Enter todo list title..."
          />
        </div>

        {/* Todos */}
        <div>
          <label className="font-medium text-gray-700">
            Add Todo Item <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none rounded-lg"
              placeholder="Todo text..."
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-electricBlue text-softWhite rounded-lg"
            >
              Add
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {note.todos.map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg"
              >
                {t.done ? (
                  <CheckSquare
                    size={20}
                    className="text-green-600 cursor-pointer"
                    onClick={() => {
                      const updated = [...note.todos];
                      updated[i].done = false;
                      setNote({ ...note, todos: updated });
                    }}
                  />
                ) : (
                  <Square
                    size={20}
                    className="cursor-pointer"
                    onClick={() => {
                      const updated = [...note.todos];
                      updated[i].done = true;
                      setNote({ ...note, todos: updated });
                    }}
                  />
                )}

                <span className={t.done ? "line-through text-gray-500" : ""}>
                  {t.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <Tag size={18} /> Tags
          </label>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none rounded-lg"
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              onClick={() => {
                if (tagInput.trim()) {
                  setNote({ ...note, tags: [...note.tags, tagInput.trim()] });
                  setTagInput("");
                }
              }}
              className="px-4 py-2 bg-electricBlue text-softWhite rounded-lg"
            >
              Add
            </button>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {note.tags.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-electricBlue/10 text-electricBlue text-sm"
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

        {/* Related Task */}
        <div>
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <FolderKanban size={18} /> Related Task
          </label>
          <select
            className="mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:outline-none w-full"
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

        {/* Related Project */}
        <div>
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <Layers size={18} /> Related Project
          </label>
          <select
            className="mt-2 px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none rounded-lg w-full"
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
          onClick={() => onSave({ ...note, type: "TODO" })}
          className="w-full flex items-center justify-center gap-2 py-3 bg-electricBlue text-softWhite rounded-lg mt-4"
        >
          <Save size={18} />
          Save Todo
        </button>
      </div>
    </div>
  );
};

export default CreateTodo;
