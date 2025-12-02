import { useState } from "react";
import { toast } from "react-toastify";
//prettier-ignore
import { FolderKanban, Hash, Layers, Palette, Plus, Save, StickyNote, Tag, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../../validations/note.validation";
import { cleanObject } from "../../utils/cleanObject";
import { NoteAPI } from "../../api";

const CreateNote = ({ setNotes, setAddNote }) => {
  const [creatingNoteError, setCreatingNoteError] = useState({
    status: false,
    message: "",
  });
  // prettier-ignore
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue} = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      color: "#2979ff",
      visibility: "PRIVATE",
      tags: [],
    },
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const newTags = [...tags, tagInput.trim()];
    setTags(newTags);
    setValue("tags", newTags);
    setTagInput("");
  };

  const handleRemoveTag = (i) => {
    const updated = tags.filter((_, idx) => idx !== i);
    setTags(updated);
    setValue("tags", updated);
  };

  const onSubmit = async (data) => {
    data.tags = tags;
    data.type = "TEXT";
    const cleanedData = cleanObject(data);

    try {
      const res = await NoteAPI.createNote(cleanedData);
      toast.success(res.data.message);
      setNotes((prev) => [res.data.note, ...prev]);
      setAddNote(false);
    } catch (error) {
      console.error("Error creating note:", error.response.data.message);
      setCreatingNoteError({
        status: true,
        message: error.response.data.message,
      });
    } finally {
      reset();
      setTags([]);
    }
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
          <label className="font-medium flex items-center gap-2">
            <Tag size={18} /> Tags
          </label>

          {/* Input + Add icon button */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-[#2979FF] focus:outline-none transition"
              placeholder="Add a tag..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />

            <button
              type="button"
              onClick={handleAddTag}
              className="p-2.5 rounded-xl bg-[#2979FF] focus:outline-none text-white shadow-md 
               hover:bg-blue-700 hover:shadow-lg active:scale-95
               transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Zod validation errors (global or per-tag) */}
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}

          {Array.isArray(errors.tags) &&
            errors.tags.map(
              (err, index) =>
                err && (
                  <p key={index} className="text-red-500 text-xs mt-1">
                    Tag {index + 1}: {err.message}
                  </p>
                )
            )}

          {/* Tags Preview */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
              >
                #{tag}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => handleRemoveTag(i)}
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
            {errors.color && (
              <p className="text-red-500 text-sm mt-1">
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
              {...register("visibility")}
              className="mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:outline-none"
            >
              <option value="PRIVATE">Private</option>
            </select>
            {errors.visibility && (
              <p className="text-red-500 text-sm mt-1">
                {errors.visibility.message}
              </p>
            )}
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
          {errors.relatedTask && (
            <p className="text-red-500 text-sm mt-1">
              {errors.relatedTask.message}
            </p>
          )}
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
          {errors.relatedProject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.relatedProject.message}
            </p>
          )}
          {creatingNoteError.status && (
            <p className="text-red-500 text-sm mt-1">
              Error creating note: {creatingNoteError.message}
            </p>
          )}
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
