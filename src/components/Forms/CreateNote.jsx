import { useState } from "react";
//prettier-ignore
import { FolderKanban, Hash, Layers, Palette, Save, StickyNote, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../../validations/note.validation";

const CreateNote = () => {
  // prettier-ignore
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      color: "#2979ff",
      visibility: "PRIVATE"
    },
  });
  const [note, setNote] = useState({
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim()) {
      setNote({ ...note, tags: [...note.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="p-6 min-w-[430px] mx-auto animate-fadeIn">
      {/* Form */}
      <form
        className="space-y-5 bg-white shadow-md rounded-2xl p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
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
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-500 text-xs mt-1">
              {errors.content.message}
            </p>
          )}
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
              {...register("tags")}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              onClick={(e) => addTag(e)}
              className="px-4 py-2 bg-electricBlue text-softWhite rounded-lg"
            >
              Add
            </button>
          </div>
          {errors.tags && (
            <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>
          )}

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
              {...register("color")}
            />
            {errors.color && (
              <p className="text-red-500 text-xs mt-1">
                {errors.color.message}
              </p>
            )}
          </div>

          {/* Visibility */}
          <div>
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <Hash size={18} /> Visibility
            </label>

            <select
              className="mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
              {...register("visibility")}
            >
              <option value="PRIVATE">Private</option>
              {/* <option value="PROJECT">Project</option> */}
            </select>
            {errors.visibility && (
              <p className="text-red-500 text-xs mt-1">
                {errors.visibility.message}
              </p>
            )}
          </div>
        </div>

        {/* Related task/project */}
        <div>
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <FolderKanban size={18} /> Related Task
          </label>
          <select
            className="mt-2 px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            {...register("relatedTask")}
          >
            <option value="">None</option>
            {/* {tasks.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))} */}
          </select>
          {errors.relatedTask && (
            <p className="text-red-500 text-xs mt-1">
              {errors.relatedTask.message}
            </p>
          )}
        </div>

        <div>
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <Layers size={18} /> Related Project
          </label>
          <select
            className="mt-2 px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            {...register("relatedProject")}
          >
            <option value="">None</option>
            {/* {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))} */}
          </select>
          {errors.relatedProject && (
            <p className="text-red-500 text-xs mt-1">
              {errors.relatedProject.message}
            </p>
          )}
        </div>

        {/* Save */}
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-electricBlue text-softWhite rounded-lg hover:bg-electricBlue/90 mt-4">
          <Save size={18} />
          {isSubmitting ? "Saving..." : "Save Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
