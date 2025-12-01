import { useState } from "react";
//prettier-ignore
import { X, Save, ListTodo, CheckSquare, Square, Tag, Palette, Hash, FolderKanban, Layers } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "../../validations/note.validation";

const CreateTodo = () => {
  // prettier-ignore
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      color: "#2979ff",
      visibility: "PRIVATE",
      todos: [],
      tags: [],
    },
  });
  console.log(errors);

  // Local state for dynamic lists
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Add Todo
  const addTodo = (e) => {
    e.preventDefault();
    if (todoInput.trim().length < 5) return;
    setTodos([...todos, { text: todoInput.trim(), done: false }]);
    setTodoInput("");
  };

  // Toggle Todo Done
  const toggleTodo = (i) => {
    const updated = [...todos];
    updated[i].done = !updated[i].done;
    setTodos(updated);
  };

  // Add Tag
  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim().length < 3) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  // Submit Handler
  const onSubmit = (data) => {
    data.todos = todos;
    data.tags = tags;

    console.log("FINAL DATA:", data);

    reset();
    setTodos([]);
    setTags([]);
  };

  return (
    <div className="p-6 min-w-[430px] mx-auto animate-fadeIn">
      <form
        className="space-y-6 bg-white p-6 rounded-2xl shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ListTodo size={32} className="text-vibrantPurple" />
          <h2 className="text-2xl font-bold">Create Todo</h2>
        </div>

        {/* Title */}
        <div>
          <label className="font-medium">Title *</label>
          <input
            type="text"
            {...register("title")}
            className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            placeholder="Todo list title..."
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Todo items */}
        <div>
          <label className="font-medium">Add Todo *</label>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              {...register("todos")}
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
              placeholder="Write your todo..."
            />
            <button
              className="px-4 py-2 bg-electricBlue text-white rounded-lg"
              onClick={addTodo}
            >
              Add
            </button>
          </div>

          {errors.todos && (
            <p className="text-red-500">{errors.todos.message}</p>
          )}

          <div className="mt-4 space-y-2">
            {todos.map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg"
              >
                {t.done ? (
                  <CheckSquare
                    size={20}
                    className="text-green-600 cursor-pointer"
                    onClick={() => toggleTodo(i)}
                  />
                ) : (
                  <Square
                    size={20}
                    className="cursor-pointer"
                    onClick={() => toggleTodo(i)}
                  />
                )}

                <span className={t.done ? "line-through" : ""}>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="font-medium flex items-center gap-2">
            <Tag size={18} /> Tags
          </label>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
              placeholder="Add a tag..."
            />
            <button
              className="px-4 py-2 bg-electricBlue text-white rounded-lg"
              onClick={addTag}
            >
              Add
            </button>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
              >
                #{tag}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          {/* Color */}
          <div>
            <label className="font-medium flex items-center gap-2">
              <Palette size={18} /> Note Color
            </label>
            <input
              type="color"
              {...register("color")}
              className="w-12 h-10 mt-2 cursor-pointer"
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="font-medium flex items-center gap-2">
              <Hash size={18} /> Visibility
            </label>
            <select
              {...register("visibility")}
              className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            >
              <option value="PRIVATE">Private</option>
            </select>
          </div>
        </div>

        {/* Related Task */}
        <div>
          <label className="font-medium flex items-center gap-2">
            <FolderKanban size={18} /> Related Task
          </label>
          <select
            {...register("relatedTask")}
            className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none w-full"
          >
            <option value="">None</option>
          </select>
        </div>

        {/* Related Project */}
        <div>
          <label className="font-medium flex items-center gap-2">
            <Layers size={18} /> Related Project
          </label>
          <select
            {...register("relatedProject")}
            className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none w-full"
          >
            <option value="">None</option>
          </select>
        </div>

        {/* Save */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 bg-electricBlue text-white rounded-lg"
        >
          <Save size={18} />
          {isSubmitting ? "Saving..." : "Save Todo"}
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
