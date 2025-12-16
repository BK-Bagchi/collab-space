import { useState } from "react";
import { toast } from "react-toastify";
//prettier-ignore
import { ListTodo, ListCheck, Trash2, PlusCircle, Tag, X, Palette, Hash, FolderKanban, Layers, Save, Plus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "../../validations/note.validation";
import { cleanObject } from "../../utils/cleanObject";
import { NoteAPI } from "../../api";
import Waiting from "../Loading/Waiting";

const CreateTodo = ({ setNotes, setAddTodo }) => {
  const [creatingTodoError, setCreatingTodoError] = useState({
    status: false,
    message: "",
  });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  //prettier-ignore
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset, setValue } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      tags: [],
      todos: [{ text: "" }],
      color: "#2979ff",
      visibility: "PRIVATE",
      relatedTask: "",
      relatedProject: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "todos",
  });

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
    data.type = "TODO";
    const cleanedData = cleanObject(data);

    try {
      const res = await NoteAPI.createTodo(cleanedData);
      toast.success(res.data.message);
      setNotes((prev) => [res.data.note, ...prev]);
      setAddTodo(false);
    } catch (error) {
      console.error("Error creating note:", error.response.data.message);
      setCreatingTodoError({
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
          <label className="font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("title")}
            className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electricBlue focus:outline-none"
            placeholder="Todo list title..."
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Todos Section */}
        <div className="mb-5">
          <label className="block font-medium mb-2">
            Todos <span className="text-red-500">*</span>
          </label>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    {...register(`todos.${index}.text`)}
                    placeholder={`Todo ${index + 1}`}
                    className="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electricBlue"
                  />
                  <ListCheck className="absolute left-3 top-1.5 h-4 w-4 text-gray-500" />
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Validation errors */}
          {errors.todos &&
            errors.todos.map(
              (err, index) =>
                err?.title && (
                  <p key={index} className="text-red-500 text-xs mt-1">
                    {err.title.message}
                  </p>
                )
            )}

          <button
            type="button"
            onClick={() => append({ title: "" })}
            className="flex items-center gap-1 mt-2 text-sm text-electricBlue hover:underline"
          >
            <PlusCircle size={14} /> Add Todo
          </button>
        </div>

        {/* TAGS */}
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
              className="flex-1 px-3 py-2 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-electricBlue focus:outline-none transition"
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
              className="p-2.5 rounded-xl bg-electricBlue focus:outline-none text-white shadow-md 
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

        {/* Color / Visibility */}
        <div className="flex justify-between">
          <div>
            <label className="font-medium flex items-center gap-2">
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

          <div>
            <label className="font-medium flex items-center gap-2">
              <Hash size={18} /> Visibility
            </label>
            <select
              {...register("visibility")}
              className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electricBlue"
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
          <label className="font-medium flex items-center gap-2">
            <FolderKanban size={18} /> Related Task
          </label>
          <select
            {...register("relatedTask")}
            className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electricBlue w-full"
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
          <label className="font-medium flex items-center gap-2">
            <Layers size={18} /> Related Project
          </label>
          <select
            {...register("relatedProject")}
            className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electricBlue w-full"
          >
            <option value="">None</option>
          </select>
          {errors.relatedProject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.relatedProject.message}
            </p>
          )}
          {creatingTodoError.status && (
            <p className="text-red-500 text-sm mt-1">
              Error creating todo: {creatingTodoError.message}
            </p>
          )}
        </div>

        {/* Create */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 bg-electricBlue text-white rounded-lg"
        >
          <Save size={18} />
          {isSubmitting ? (
            <p className="flex gap-2">
              <Waiting color="white" /> Creating...
            </p>
          ) : (
            "Create Todo"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
