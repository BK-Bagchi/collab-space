import { useState } from "react";
//prettier-ignore
import { FolderKanban, Hash, Layers, Palette, Save, StickyNote, Tag, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../../validations/note.validation";

const CreateNote = () => {
  // prettier-ignore
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      color: "#2979ff",
      visibility: "PRIVATE",
      tags: [],
    },
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    if (!tagInput.trim()) return;

    setTags((prev) => [...prev, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (index) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    data.tags = tags;
    console.log("FINAL SUBMIT DATA:", data);
    reset();
    setTags([]); // reset tags
  };

  return (
    <div className="p-6 min-w-[430px] mx-auto animate-fadeIn">
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
            placeholder="Enter title..."
            {...register("title")}
            className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
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
            rows="6"
            placeholder="Write your note..."
            {...register("content")}
            className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
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
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            />

            <button
              onClick={addTag}
              className="px-4 py-2 bg-electricBlue text-softWhite rounded-lg"
            >
              Add
            </button>
          </div>

          {/* Tag list */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#2979FF]/10 text-electricBlue text-sm"
              >
                #{tag}
                <X
                  className="cursor-pointer"
                  size={14}
                  onClick={() => removeTag(i)}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Colors & Visibility */}
        <div className="flex justify-between">
          {/* Color */}
          <div>
            <label className="font-medium text-gray-700 flex items-center gap-2">
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
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <Hash size={18} /> Visibility
            </label>

            <select
              {...register("visibility")}
              className="mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            >
              <option value="PRIVATE">Private</option>
            </select>
          </div>
        </div>

        {/* Related Task */}
        <div>
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <FolderKanban size={18} /> Related Task
          </label>

          <select
            {...register("relatedTask")}
            className="mt-2 px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
          >
            <option value="">None</option>
          </select>
        </div>

        {/* Related Project */}
        <div>
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <Layers size={18} /> Related Project
          </label>

          <select
            {...register("relatedProject")}
            className="mt-2 px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
          >
            <option value="">None</option>
          </select>
        </div>

        {/* Save */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 bg-electricBlue text-softWhite rounded-lg hover:bg-electricBlue/90 mt-4"
        >
          <Save size={18} />
          {isSubmitting ? "Saving..." : "Save Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
